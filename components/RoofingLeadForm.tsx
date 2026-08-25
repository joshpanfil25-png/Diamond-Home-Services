"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Check, Loader2, Lock, ShieldCheck } from "lucide-react";
import { company } from "@/content/site";
import CtaButton from "@/components/CtaButton";

const PROJECT_TYPES = [
  "Roofing",
  "Windows",
  "Gutters",
  "Siding",
  "Bathroom",
  "Flooring",
  "Other Home Improvement",
  "Not Sure",
] as const;

const CONTACT_METHODS = ["Phone", "Email", "Either"] as const;

type FormData = {
  zip: string;
  projectType: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contactMethod: (typeof CONTACT_METHODS)[number];
  financing: boolean;
};

const initialData: FormData = {
  zip: "",
  projectType: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  contactMethod: "Phone",
  financing: false,
};

// Submits to /api/lead (app/api/lead/route.ts), which re-validates
// server-side and forwards to the destination configured via env vars
// (LEAD_WEBHOOK_URL or Resend) — see .env.example.
async function submitLead(data: FormData & { company: string }): Promise<void> {
  const utm: Record<string, string> = {};
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params) {
    if (key.startsWith("utm_")) utm[key] = value;
  }
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      page: window.location.pathname,
      utm,
    }),
  });
  if (!res.ok) throw new Error(`Lead submission failed (${res.status})`);
}

const labelClass = "block text-sm font-semibold text-diamond-charcoal mb-1.5";

function inputClass(hasError: boolean) {
  return `w-full rounded-[6px] border bg-white px-3.5 py-2.5 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-diamond-red ${
    hasError ? "border-diamond-red" : "border-diamond-border"
  }`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-diamond-red">
      {message}
    </p>
  );
}

export default function RoofingLeadForm() {
  const [data, setData] = useState<FormData>(initialData);
  const [step, setStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  // Honeypot — hidden from real users; bots that fill it are silently dropped.
  const [honeypot, setHoneypot] = useState("");

  function update<K extends keyof FormData>(field: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [field]: value }));
    // Updating any field clears that field's error.
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function handleZipChange(e: ChangeEvent<HTMLInputElement>) {
    update("zip", e.target.value.replace(/\D/g, ""));
  }

  function validateStep1(): boolean {
    const next: Record<string, string> = {};
    if (!/^\d{5}$/.test(data.zip)) {
      next.zip = "Enter a valid 5-digit ZIP code.";
    }
    if (!data.projectType) {
      next.projectType = "Please choose a project type.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateStep2(): boolean {
    const next: Record<string, string> = {};
    if (!data.firstName.trim()) next.firstName = "First name is required.";
    if (!data.lastName.trim()) next.lastName = "Last name is required.";
    if (!/^[\d\s().+-]{10,}$/.test(data.phone)) {
      next.phone = "Enter a valid phone number.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = "Enter a valid email address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleContinue() {
    if (validateStep1()) setStep(2);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateStep2()) return;
    setStatus("loading");
    try {
      await submitLead({ ...data, company: honeypot });
      setStatus("success");
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: "Something went wrong. Please call us or try again.",
      }));
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-[8px] border border-diamond-border shadow-sm p-5 sm:p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-diamond-red/10">
          <Check className="h-7 w-7 text-diamond-red" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-display text-xl font-bold text-diamond-charcoal">
          Request received
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you, {data.firstName}. A member of our team will reach out about
          your free estimate. Prefer to talk now?
        </p>
        <CtaButton
          variant="charcoal"
          href={company.phoneHref}
          className="mt-5 w-full"
        >
          Call {company.phoneDisplay}
        </CtaButton>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[8px] border border-diamond-border shadow-sm p-5 sm:p-6">
      {/* Card header */}
      <div className="flex items-center gap-2.5">
        <span className="diamond-mark" aria-hidden="true" />
        <h3 className="font-display text-xl font-bold text-diamond-charcoal">
          Tell Us About Your Project
        </h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Free, no-obligation estimate.
      </p>

      {/* Step indicator */}
      <div className="mt-4 flex gap-2" aria-hidden="true">
        <span
          className={`h-1.5 flex-1 rounded-full ${
            step >= 1 ? "bg-diamond-red" : "bg-diamond-border"
          }`}
        />
        <span
          className={`h-1.5 flex-1 rounded-full ${
            step >= 2 ? "bg-diamond-red" : "bg-diamond-border"
          }`}
        />
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-diamond-red">
        Step {step} of 2
      </p>

      {step === 1 ? (
        <div className="mt-4 space-y-4" role="group" aria-label="Step 1 of 2">
          <div>
            <label htmlFor="lead-zip" className={labelClass}>
              ZIP code
            </label>
            <input
              id="lead-zip"
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="60630"
              value={data.zip}
              onChange={handleZipChange}
              className={inputClass(!!errors.zip)}
              aria-invalid={!!errors.zip}
              aria-describedby={errors.zip ? "lead-zip-error" : undefined}
            />
            <FieldError id="lead-zip-error" message={errors.zip} />
          </div>

          <div>
            <label htmlFor="lead-project-type" className={labelClass}>
              Project type
            </label>
            <select
              id="lead-project-type"
              value={data.projectType}
              onChange={(e) => update("projectType", e.target.value)}
              className={inputClass(!!errors.projectType)}
              aria-invalid={!!errors.projectType}
              aria-describedby={
                errors.projectType ? "lead-project-type-error" : undefined
              }
            >
              <option value="">Select an option</option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <FieldError id="lead-project-type-error" message={errors.projectType} />
          </div>

          <CtaButton as="button" type="button" className="w-full" onClick={handleContinue}>
            Continue
          </CtaButton>
        </div>
      ) : (
        <form className="mt-4 space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Honeypot — visually hidden, ignored by real users */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="lead-company">Company</label>
            <input
              id="lead-company"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="lead-first-name" className={labelClass}>
                First name
              </label>
              <input
                id="lead-first-name"
                type="text"
                autoComplete="given-name"
                value={data.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className={inputClass(!!errors.firstName)}
                aria-invalid={!!errors.firstName}
                aria-describedby={
                  errors.firstName ? "lead-first-name-error" : undefined
                }
              />
              <FieldError id="lead-first-name-error" message={errors.firstName} />
            </div>
            <div>
              <label htmlFor="lead-last-name" className={labelClass}>
                Last name
              </label>
              <input
                id="lead-last-name"
                type="text"
                autoComplete="family-name"
                value={data.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className={inputClass(!!errors.lastName)}
                aria-invalid={!!errors.lastName}
                aria-describedby={
                  errors.lastName ? "lead-last-name-error" : undefined
                }
              />
              <FieldError id="lead-last-name-error" message={errors.lastName} />
            </div>
          </div>

          <div>
            <label htmlFor="lead-phone" className={labelClass}>
              Phone
            </label>
            <input
              id="lead-phone"
              type="tel"
              autoComplete="tel"
              placeholder="773-286-5446"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass(!!errors.phone)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "lead-phone-error" : undefined}
            />
            <FieldError id="lead-phone-error" message={errors.phone} />
          </div>

          <div>
            <label htmlFor="lead-email" className={labelClass}>
              Email
            </label>
            <input
              id="lead-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass(!!errors.email)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "lead-email-error" : undefined}
            />
            <FieldError id="lead-email-error" message={errors.email} />
          </div>

          <div>
            <label htmlFor="lead-contact-method" className={labelClass}>
              Preferred contact method
            </label>
            <select
              id="lead-contact-method"
              value={data.contactMethod}
              onChange={(e) =>
                update(
                  "contactMethod",
                  e.target.value as FormData["contactMethod"]
                )
              }
              className={inputClass(false)}
            >
              {CONTACT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2.5 text-sm font-semibold text-diamond-charcoal">
            <input
              type="checkbox"
              className="h-5 w-5 accent-[#c72127]"
              checked={data.financing}
              onChange={(e) => update("financing", e.target.checked)}
            />
            I&apos;m interested in financing options
          </label>

          {errors.form && (
            <p className="text-sm text-diamond-red" role="alert">
              {errors.form}
            </p>
          )}

          <div className="flex gap-3">
            <CtaButton
              as="button"
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              disabled={status === "loading"}
            >
              Back
            </CtaButton>
            <CtaButton
              as="button"
              type="submit"
              className="flex-1"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Submitting…
                </>
              ) : (
                "Request My Free Estimate"
              )}
            </CtaButton>
          </div>
        </form>
      )}

      {/* Trust footer */}
      <div className="mt-5 space-y-1.5 border-t border-diamond-border pt-4">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          No obligation. Your information is kept private.
        </p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Backed by written warranties &amp; 50+ years of local experience.
        </p>
      </div>
    </div>
  );
}
