import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="border-line bg-parchment/70 relative overflow-hidden border-b">
      <div className="bg-dotgrid pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]" />
      <div className="wrap relative py-14 sm:py-20">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-tide-600">{eyebrow}</p>
          <h1 className="font-display text-navy-900 mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="text-ink-soft mt-5 max-w-2xl text-lg leading-relaxed">{description}</p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
