import { describe, expect, it, vi } from "vitest";
import {
  buildLeadEmail,
  DEFAULT_LEAD_TO_EMAIL,
  forwardLead,
  type Lead,
} from "./lead";

const lead: Lead = {
  zip: "60630",
  projectType: "Bathroom",
  firstName: "Pat",
  lastName: "Homeowner",
  phone: "773-555-0100",
  email: "pat@example.com",
  contactMethod: "Phone",
  financing: true,
  page: "/",
  utm: { utm_source: "google" },
};

const submittedAt = "2026-07-29T12:00:00.000Z";

function okFetch() {
  return vi.fn().mockResolvedValue({ ok: true, status: 200 }) as unknown as typeof fetch;
}

describe("buildLeadEmail", () => {
  it("formats the subject as New Estimate Request — {projectType} — {ZIP}", () => {
    const { subject } = buildLeadEmail(lead, submittedAt);
    expect(subject).toBe("New Estimate Request — Bathroom — 60630");
  });

  it("labels every field in the body and sets reply-to to the homeowner", () => {
    const { text, replyTo } = buildLeadEmail(lead, submittedAt);
    expect(replyTo).toBe("pat@example.com");
    for (const label of [
      "Project type: Bathroom",
      "ZIP: 60630",
      "Name: Pat Homeowner",
      "Phone: 773-555-0100",
      "Email: pat@example.com",
      "Preferred contact: Phone",
      "Interested in financing: Yes",
      `Submitted: ${submittedAt}`,
      "Page: /",
      'UTM: {"utm_source":"google"}',
    ]) {
      expect(text).toContain(label);
    }
  });
});

describe("forwardLead", () => {
  it("sends via Resend to the default recipient when only the key is set", async () => {
    const fetchFn = okFetch();
    await forwardLead(lead, submittedAt, { RESEND_API_KEY: "re_test" }, fetchFn);

    expect(fetchFn).toHaveBeenCalledTimes(1);
    const [url, init] = (fetchFn as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const body = JSON.parse(init.body);
    expect(body.to).toEqual([DEFAULT_LEAD_TO_EMAIL]);
    expect(body.to).toEqual(["info@diamondhomeservice.com"]);
    expect(body.reply_to).toBe("pat@example.com");
    expect(body.subject).toBe("New Estimate Request — Bathroom — 60630");
    expect(init.headers.Authorization).toBe("Bearer re_test");
  });

  it("honors a LEAD_TO_EMAIL override", async () => {
    const fetchFn = okFetch();
    await forwardLead(
      lead,
      submittedAt,
      { RESEND_API_KEY: "re_test", LEAD_TO_EMAIL: "other@example.com" },
      fetchFn
    );
    const body = JSON.parse(
      (fetchFn as ReturnType<typeof vi.fn>).mock.calls[0][1].body
    );
    expect(body.to).toEqual(["other@example.com"]);
  });

  it("prefers Resend over the webhook when both are configured", async () => {
    const fetchFn = okFetch();
    await forwardLead(
      lead,
      submittedAt,
      { RESEND_API_KEY: "re_test", LEAD_WEBHOOK_URL: "https://hooks.example.com/x" },
      fetchFn
    );
    expect((fetchFn as ReturnType<typeof vi.fn>).mock.calls[0][0]).toBe(
      "https://api.resend.com/emails"
    );
  });

  it("falls back to the webhook when no Resend key is set", async () => {
    const fetchFn = okFetch();
    await forwardLead(
      lead,
      submittedAt,
      { LEAD_WEBHOOK_URL: "https://hooks.example.com/x" },
      fetchFn
    );
    const [url, init] = (fetchFn as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toBe("https://hooks.example.com/x");
    const body = JSON.parse(init.body);
    expect(body.email).toBe("pat@example.com");
    expect(body.submittedAt).toBe(submittedAt);
  });

  it("throws when the provider responds non-2xx", async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValue({ ok: false, status: 500 }) as unknown as typeof fetch;
    await expect(
      forwardLead(lead, submittedAt, { RESEND_API_KEY: "re_test" }, fetchFn)
    ).rejects.toThrow("Resend responded 500");
  });

  it("warns loudly and calls no provider when nothing is configured", async () => {
    const fetchFn = okFetch();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await forwardLead(lead, submittedAt, {}, fetchFn);
    expect(fetchFn).not.toHaveBeenCalled();
    expect(warn.mock.calls.flat().join(" ")).toContain("NO LEAD PROVIDER CONFIGURED");
    warn.mockRestore();
  });
});
