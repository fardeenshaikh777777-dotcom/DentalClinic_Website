import { Link } from "react-router-dom";
import { CLINIC, HOURS, SERVICES } from "../data/clinic";
import { Logo } from "./Navbar";
import { IconMail, IconPhone, IconPin, IconWhatsApp } from "./icons";

const SOCIALS = [
  { label: "WhatsApp", href: "https://wa.me/15035550142", Icon: IconWhatsApp },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{CLINIC.tagline}</p>
          <div className="mt-6 flex items-center gap-2.5">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Pearl Dental on ${label}`}
                className="border-navy-800 text-navy-200 hover:border-brass-500 hover:text-brass-400 flex h-9 w-9 items-center justify-center rounded-md border transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h3 className="font-display text-paper text-sm font-bold tracking-wide">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/services", label: "Services" },
              { to: "/doctors", label: "Doctors" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-paper transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Treatments" className="lg:col-span-3">
          <h3 className="font-display text-paper text-sm font-bold tracking-wide">Treatments</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.id}>
                <Link to="/services" className="hover:text-paper transition-colors">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="font-display text-paper text-sm font-bold tracking-wide">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brass-400" />
              <span>
                {CLINIC.addressLine1}
                <br />
                {CLINIC.addressLine2}
              </span>
            </li>
            <li>
              <a href={CLINIC.phoneHref} className="hover:text-paper inline-flex items-center gap-2.5 transition-colors">
                <IconPhone className="h-4 w-4 shrink-0 text-brass-400" />
                {CLINIC.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CLINIC.email}`} className="hover:text-paper inline-flex items-center gap-2.5 transition-colors">
                <IconMail className="h-4 w-4 shrink-0 text-brass-400" />
                {CLINIC.email}
              </a>
            </li>
          </ul>
          <div className="border-navy-800 mt-5 border-t pt-4 text-xs leading-relaxed">
            {HOURS.map((h) => (
              <p key={h.days} className="flex justify-between gap-4">
                <span className="text-navy-300">{h.days}</span>
                <span>{h.time}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="border-navy-800 border-t">
        <div className="wrap text-navy-300 flex flex-col items-start justify-between gap-3 py-6 text-xs sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {CLINIC.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-paper transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-paper transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
