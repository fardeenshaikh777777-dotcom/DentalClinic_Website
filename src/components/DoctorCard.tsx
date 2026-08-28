import { Link } from "react-router-dom";
import type { Doctor } from "../data/clinic";
import { IconArrowRight, IconCheck } from "./icons";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-16px_rgba(12,39,55,0.25)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-100">
        <img
          src={doctor.image}
          alt={`Portrait of ${doctor.name}`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="bg-navy-900/90 text-paper absolute bottom-3 left-3 rounded px-2.5 py-1 text-[11px] font-semibold tracking-wide">
          {doctor.years} years experience
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-navy-900 text-lg font-bold tracking-tight">{doctor.name}</h3>
        <p className="text-tide-600 mt-0.5 text-[13px] font-semibold">{doctor.role}</p>
        <p className="text-ink-soft mt-3 flex-1 text-sm leading-relaxed">{doctor.bio}</p>
        <ul className="border-line mt-4 space-y-1.5 border-t pt-4">
          {doctor.credentials.slice(0, 2).map((c) => (
            <li key={c} className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
              <IconCheck className="text-mist-600 mt-0.5 h-3.5 w-3.5 shrink-0" />
              {c}
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="text-navy-900 group/link font-display mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
        >
          Book with {doctor.name.split(" ")[1]}
          <IconArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
