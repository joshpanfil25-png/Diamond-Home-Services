import { processSteps } from "@/content/site";
import SectionHeading from "@/components/SectionHeading";

export default function ProcessSteps() {
  return (
    <section id="process" className="bg-diamond-white">
      <div className="container-diamond py-16 lg:py-20">
        <SectionHeading eyebrow="Our Process" heading={processSteps.headline} />

        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.steps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-[8px] border border-diamond-border bg-diamond-warm p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-diamond-red font-display text-lg font-extrabold text-diamond-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-diamond-charcoal">{step.title}</h3>
              <p className="mt-2 text-sm text-diamond-charcoal/75">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
