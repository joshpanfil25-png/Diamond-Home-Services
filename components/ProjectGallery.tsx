"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { projects } from "@/content/media";
import { projects as projectNarratives } from "@/content/site";
import ProjectModal from "@/components/ProjectModal";

export default function ProjectGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // The button that opened the modal, so focus can return to it on close.
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  function close() {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }

  return (
    <section id="projects" className="bg-diamond-warm scroll-mt-32">
      <div className="container-diamond py-16 lg:py-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="diamond-mark" aria-hidden="true" />
            <span className="text-sm font-bold uppercase tracking-widest text-diamond-red">
              Recent Projects
            </span>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-diamond-charcoal">
            {projects.headline}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((project, i) => (
            <article
              key={project.area + project.type}
              className="group flex flex-col overflow-hidden rounded-[8px] border border-diamond-border bg-diamond-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-[4px] bg-diamond-red px-2.5 py-1 text-xs font-bold text-diamond-white">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  {project.area}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-diamond-charcoal">{project.type}</h3>
                <p className="mt-1.5 text-sm text-diamond-charcoal/75">{project.result}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setOpenIndex(i);
                  }}
                  className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-diamond-red hover:text-diamond-red-dark"
                >
                  View Project
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Project photos are representative of Diamond Home Service roofing,
          siding, window, and gutter work.
        </p>
      </div>

      {openIndex !== null && (
        <ProjectModal
          project={{
            ...projects.items[openIndex],
            narrative: projectNarratives.items[openIndex],
          }}
          onClose={close}
        />
      )}
    </section>
  );
}
