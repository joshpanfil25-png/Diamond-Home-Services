// Left-aligned section header matching the Lovable reference pattern:
// diamond-mark + red eyebrow row, extrabold h2, optional lead paragraph.
type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  lead?: string;
};

export default function SectionHeading({ eyebrow, heading, lead }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2">
        <span className="diamond-mark" aria-hidden="true" />
        <span className="text-sm font-bold uppercase tracking-widest text-diamond-red">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-diamond-charcoal">
        {heading}
      </h2>
      {lead && <p className="mt-4 text-lg text-diamond-charcoal/80">{lead}</p>}
    </div>
  );
}
