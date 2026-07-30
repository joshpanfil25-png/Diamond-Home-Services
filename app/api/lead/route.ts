import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { forwardLead } from "@/lib/lead";

// ---------------------------------------------------------------------------
// POST /api/lead — receives estimate-form submissions.
//
// Validation mirrors the client-side rules in RoofingLeadForm exactly, then
// the lead is forwarded via lib/lead.ts:
//   1. RESEND_API_KEY → formatted email to LEAD_TO_EMAIL
//      (default info@diamondhomeservice.com), reply-to the homeowner
//   2. LEAD_WEBHOOK_URL → POST the JSON there (Zapier/Make/CRM webhook)
//   3. (neither) → prominent server warning; lead only logged
// See .env.example.
// ---------------------------------------------------------------------------

// Must match PROJECT_TYPES in components/RoofingLeadForm.tsx exactly.
const PROJECT_TYPES = [
  "Roofing",
  "Windows",
  "Gutters",
  "Siding",
  "Storm Damage",
  "Bathroom",
  "Flooring",
  "Other Home Improvement",
  "Not Sure",
] as const;

const CONTACT_METHODS = ["Phone", "Email", "Either"] as const;

const leadSchema = z.object({
  zip: z.string().regex(/^\d{5}$/, "Invalid ZIP code"),
  projectType: z.enum(PROJECT_TYPES),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  phone: z.string().regex(/^[\d\s().+-]{10,}$/, "Invalid phone number").max(30),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email").max(200),
  contactMethod: z.enum(CONTACT_METHODS),
  financing: z.boolean(),
  // Honeypot — real users never see or fill this field.
  company: z.string().optional().default(""),
  // Context captured by the form.
  page: z.string().max(500).optional(),
  utm: z.record(z.string(), z.string().max(500)).optional(),
});

// Simple in-memory rate limit: max 5 requests per IP per 10 minutes.
// Good enough for a single-instance deployment; swap for a shared store
// (e.g. Upstash) if this ever runs on multiple instances.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Opportunistic cleanup so the map can't grow unbounded.
  if (hits.size > 10_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please call us instead." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid submission" },
      { status: 400 }
    );
  }

  // Honeypot filled → almost certainly a bot. Pretend success, forward nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  try {
    // Strip the honeypot field before forwarding.
    const { company: _company, ...lead } = parsed.data;
    await forwardLead(lead, new Date().toISOString());
  } catch (err) {
    console.error("[lead] forwarding failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not submit right now. Please call us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
