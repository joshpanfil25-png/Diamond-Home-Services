// ---------------------------------------------------------------------------
// Lead delivery — formatting + forwarding, separated from the route handler so
// the email path is unit-testable with a mocked provider (see lib/lead.test.ts).
//
// Provider order:
//   1. Resend (RESEND_API_KEY present) → formatted email to LEAD_TO_EMAIL,
//      which defaults to info@diamondhomeservice.com.
//   2. LEAD_WEBHOOK_URL → POST the JSON there (Zapier/Make/CRM webhook).
//   3. Neither → prominent server warning; the lead is only logged.
// ---------------------------------------------------------------------------

export const DEFAULT_LEAD_TO_EMAIL = "info@diamondhomeservice.com";

export type Lead = {
  zip: string;
  projectType: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contactMethod: string;
  financing: boolean;
  page?: string;
  utm?: Record<string, string>;
};

export type LeadEnv = {
  RESEND_API_KEY?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
  LEAD_WEBHOOK_URL?: string;
};

export function buildLeadEmail(lead: Lead, submittedAt: string) {
  const subject = `New Estimate Request — ${lead.projectType} — ${lead.zip}`;
  const lines = [
    `New estimate request from the website`,
    ``,
    `Project type: ${lead.projectType}`,
    `ZIP: ${lead.zip}`,
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Preferred contact: ${lead.contactMethod}`,
    `Interested in financing: ${lead.financing ? "Yes" : "No"}`,
    `Submitted: ${submittedAt}`,
    lead.page ? `Page: ${lead.page}` : "",
    lead.utm && Object.keys(lead.utm).length
      ? `UTM: ${JSON.stringify(lead.utm)}`
      : "",
  ].filter(Boolean);
  return {
    subject,
    text: lines.join("\n"),
    // Replying to the notification goes straight to the homeowner.
    replyTo: lead.email,
  };
}

export async function forwardLead(
  lead: Lead,
  submittedAt: string,
  env: LeadEnv = process.env as LeadEnv,
  fetchFn: typeof fetch = fetch
): Promise<void> {
  if (env.RESEND_API_KEY) {
    const toEmail = env.LEAD_TO_EMAIL || DEFAULT_LEAD_TO_EMAIL;
    const fromEmail =
      env.LEAD_FROM_EMAIL || "Diamond Home Service Website <leads@diamondhomeservice.com>";
    const { subject, text, replyTo } = buildLeadEmail(lead, submittedAt);
    const res = await fetchFn("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: replyTo,
        subject,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return;
  }

  if (env.LEAD_WEBHOOK_URL) {
    const res = await fetchFn(env.LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        submittedAt,
        source: "diamondhomeservice.com estimate form",
      }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return;
  }

  // No provider configured — make this loud so it can't be missed in logs.
  console.warn(
    "[lead] ⚠️ WARNING: NO LEAD PROVIDER CONFIGURED — this lead was NOT " +
      "delivered. Set RESEND_API_KEY (emails go to LEAD_TO_EMAIL, default " +
      `${DEFAULT_LEAD_TO_EMAIL}) or LEAD_WEBHOOK_URL in the deploy environment.`
  );
  console.warn("[lead] undelivered payload:", { ...lead, submittedAt });
}
