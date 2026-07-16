import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "red" | "outline" | "outlineLight" | "charcoal";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-sm font-semibold uppercase tracking-wide font-display transition-colors min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  red: "bg-diamond-red text-white hover:bg-diamond-red-dark border border-diamond-red hover:border-diamond-red-dark",
  outline:
    "bg-transparent text-diamond-charcoal border border-diamond-border hover:border-diamond-red hover:text-diamond-red",
  outlineLight:
    "bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white",
  charcoal:
    "bg-diamond-charcoal text-white border border-diamond-charcoal hover:bg-diamond-black hover:border-diamond-black",
};

type CtaAnchorProps = {
  as?: "a";
  variant?: Variant;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type CtaButtonElProps = {
  as: "button";
  variant?: Variant;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type CtaButtonProps = CtaAnchorProps | CtaButtonElProps;

export default function CtaButton(props: CtaButtonProps) {
  const { variant = "red", className, children } = props;
  const classes = [base, variants[variant], className].filter(Boolean).join(" ");

  if (props.as === "button") {
    const { as: _as, variant: _v, className: _c, ...rest } = props;
    return (
      <button className={classes} {...rest}>
        {children}
      </button>
    );
  }

  const { as: _as, variant: _v, className: _c, ...rest } = props;
  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  );
}
