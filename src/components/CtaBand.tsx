import { Link } from "react-router-dom";
import { CLINIC } from "../data/clinic";
import { IconArrowRight, IconPhone } from "./icons";
import Reveal from "./Reveal";

interface CtaBandProps {
  title: string;
  text: string;
  primaryLabel?: string;
  primaryTo?: string;
}

export default function CtaBand({
  title,
  text,
  primaryLabel = "Book an Appointment",
  primaryTo = "/contact",
}: CtaBandProps) {
  return (
    <section className="wrap pb-20 sm:pb-24">
      <Reveal>
        <div className="bg-navy-900 relative overflow-hidden rounded-xl">
          <div className="bg-dotgrid-light pointer-events-none absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-navy-800" />
          <div className="relative flex flex-col gap-8 px-7 py-10 sm:px-12 sm:py-14 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-paper text-2xl font-bold tracking-tight sm:text-3xl">
                {title}
              </h2>
              <p className="text-navy-200 mt-3 leading-relaxed">{text}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link to={primaryTo} className="btn-brass">
                {primaryLabel}
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <a href={CLINIC.phoneHref} className="btn-ghost">
                <IconPhone className="h-4 w-4" />
                {CLINIC.phone}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
