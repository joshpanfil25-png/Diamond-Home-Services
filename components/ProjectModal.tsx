"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { MapPin, X } from "lucide-react";
import type { MediaAsset } from "@/content/media";
import CtaButton from "@/components/CtaButton";

export type ProjectModalData = {
  image: MediaAsset;
  // Optional "before" photo — when present the modal shows before & after
  // side-by-side; otherwise a single photo.
  beforeImage?: MediaAsset;
  area: string;
  type: string;
  narrative: {
    problem: string;
    solution: string;
    products: string;
    timeline: string;
  };
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectModalData;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Scroll-lock the page while the modal is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Move focus into the dialog on open.
  useEffect(() => {
    dialogRef.current
      ?.querySelector<HTMLElement>("[data-autofocus]")
      ?.focus();
  }, []);

  // Escape closes; Tab is trapped inside the dialog.
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  function handleEstimateClick() {
    onClose();
    // Wait a frame so the scroll lock is released before scrolling.
    requestAnimationFrame(() => {
      document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  const titleId = "project-modal-title";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop — click closes */}
      <div
        className="absolute inset-0 bg-diamond-black/70"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-[10px] bg-diamond-white shadow-xl"
      >
        {/* Photo(s) */}
        <div className={project.beforeImage ? "grid grid-cols-2 gap-px" : ""}>
          {project.beforeImage && (
            <div className="relative">
              <Image
                src={project.beforeImage.src}
                alt={project.beforeImage.alt}
                width={project.beforeImage.width}
                height={project.beforeImage.height}
                className="aspect-[4/3] w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-[4px] bg-diamond-black/80 px-2.5 py-1 text-xs font-bold uppercase text-diamond-white">
                Before
              </span>
            </div>
          )}
          <div className="relative">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              className="aspect-[4/3] w-full object-cover"
            />
            {project.beforeImage && (
              <span className="absolute left-3 top-3 rounded-[4px] bg-diamond-red px-2.5 py-1 text-xs font-bold uppercase text-diamond-white">
                After
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          data-autofocus
          aria-label="Close project details"
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-diamond-black/60 text-diamond-white hover:bg-diamond-black focus:outline-none focus:ring-2 focus:ring-diamond-red"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="p-5 sm:p-6">
          <p className="inline-flex items-center gap-1.5 rounded-[4px] bg-diamond-warm px-2.5 py-1 text-xs font-bold text-diamond-charcoal">
            <MapPin className="h-3.5 w-3.5 text-diamond-red" aria-hidden="true" />
            {project.area}
          </p>
          <h3
            id={titleId}
            className="mt-2 font-display text-2xl font-extrabold text-diamond-charcoal"
          >
            {project.type}
          </h3>

          <dl className="mt-4 space-y-3">
            {(
              [
                ["Problem", project.narrative.problem],
                ["Solution", project.narrative.solution],
                ["Products installed", project.narrative.products],
                ["Timeline", project.narrative.timeline],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs font-bold uppercase tracking-wide text-diamond-red">
                  {label}
                </dt>
                <dd className="mt-0.5 text-sm text-diamond-charcoal/85">{value}</dd>
              </div>
            ))}
          </dl>

          <CtaButton
            as="button"
            type="button"
            variant="red"
            className="mt-6 w-full"
            onClick={handleEstimateClick}
          >
            Get a Free Estimate
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
