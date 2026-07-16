import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ---------------------------------------------------------------------------
// POST /api/lead — receives estimate-form submissions.
//
// Validation mirrors the client-side rules in RoofingLeadForm exactly, then
// the lead is forwarded to the first configured destination:
//   1. LEAD_WEBHOOK_URL          → POST the JSON there (Zapier/Make/CRM webhook)
//   2. RESEND_API_KEY + LEAD_TO_EMAIL → formatted lead email via Resend
//   3. (dev fallback)            → log to the server console
// See .env.example.
// ---------------------------------------------------------------------------

const PROJECT_TYPES = [
  "Roof replacement",
  "Roof repair",
  "Storm damage",
  "Free roof inspection",
  "Not sure",
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

type Lead = z.infer<typeof leadSchema>;

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

async function forwardLead(lead: Lead, submittedAt: string): Promise<void> {
  const payload = {
    ...lead,
    company: undefined, // never forward the honeypot field
    submittedAt,
    source: "diamondhomeservice.com estimate form",
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return;
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL;
  if (resendKey && toEmail) {
    const lines = [
      `New estimate request — ${lead.projectType}`,
      ``,
      `Name: ${lead.firstName} ${lead.lastName}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email}`,
      `ZIP: ${lead.zip}`,
      `Preferred contact: ${lead.contactMethod}`,
      `Interested in financing: ${lead.financing ? "Yes" : "No"}`,
      `Submitted: ${submittedAt}`,
      lead.page ? `Page: ${lead.page}` : "",
      lead.utm && Object.keys(lead.utm).length
        ? `UTM: ${JSON.stringify(lead.utm)}`
        : "",
    ].filter(Boolean);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Diamond Home Service Website <leads@diamondhomeservice.com>",
        to: [toEmail],
        subject: `New roofing lead: ${lead.firstName} ${lead.lastName} (${lead.zip})`,
        text: lines.join("\n"),
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return;
  }

  // Dev fallback — no destination configured.
  console.log("[lead] no LEAD_WEBHOOK_URL / RESEND_API_KEY configured; payload:", payload);
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
    await forwardLead(parsed.data, new Date().toISOString());
  } catch (err) {
    console.error("[lead] forwarding failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not submit right now. Please call us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
