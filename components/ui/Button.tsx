import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";
type Tone = "light" | "dark"; // the background the button sits on

const base =
  "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full text-base font-semibold whitespace-nowrap transition-[translate,background-color,border-color,color,text-decoration-color] duration-200 ease-out";

const variants: Record<Variant, Record<Tone, string>> = {
  primary: {
    light: "bg-gold px-6 text-navy-900 hover:-translate-y-0.5 hover:bg-gold-soft",
    dark: "bg-gold px-6 text-navy-900 hover:-translate-y-0.5 hover:bg-gold-soft",
  },
  secondary: {
    light: "border border-ink/30 px-6 text-ink hover:-translate-y-0.5 hover:border-ink hover:bg-white",
    dark: "border border-white/60 px-6 text-white hover:-translate-y-0.5 hover:border-white hover:bg-white/10",
  },
  text: {
    light: "px-1 text-ink underline decoration-ink/40 decoration-1 underline-offset-4 hover:decoration-ink",
    dark: "px-1 text-white underline decoration-white/50 decoration-1 underline-offset-4 hover:decoration-white",
  },
};

export function buttonClass(variant: Variant = "primary", tone: Tone = "light", className = "") {
  return `${base} ${variants[variant][tone]} ${className}`.trim();
}

type Common = { variant?: Variant; tone?: Tone; className?: string; children: ReactNode };
type LinkProps = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href" | "children">;
type NativeButtonProps = Common & { href?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button(props: LinkProps | NativeButtonProps) {
  if (typeof props.href === "string") {
    const { variant, tone, className, children, href, ...anchor } = props as LinkProps;
    const cls = buttonClass(variant, tone, className);
    if (/^https?:/.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...anchor}>
          {children}
        </a>
      );
    }
    if (/^(tel|mailto):/.test(href)) {
      return (
        <a href={href} className={cls} {...anchor}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...anchor}>
        {children}
      </Link>
    );
  }
  const { variant, tone, className, children, type = "button", ...button } = props as NativeButtonProps;
  return (
    <button type={type} className={buttonClass(variant, tone, className)} {...button}>
      {children}
    </button>
  );
}
