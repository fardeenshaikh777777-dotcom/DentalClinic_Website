import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CLINIC, HOURS } from "../data/clinic";
import { IconArrowRight, IconClock, IconClose, IconMenu, IconPhone, IconPin, IconTooth } from "./icons";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Pearl Dental & Aesthetics — home">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
          light ? "bg-paper text-navy-900" : "bg-navy-900 text-paper group-hover:bg-navy-700"
        }`}
      >
        <IconTooth className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span className={`font-display block text-[15px] font-bold tracking-tight ${light ? "text-paper" : "text-navy-900"}`}>
          Pearl Dental
        </span>
        <span className={`block text-[10px] font-semibold tracking-[0.24em] uppercase ${light ? "text-navy-300" : "text-ink-soft"}`}>
          &amp; Aesthetics
        </span>
      </span>
    </Link>
  );
}

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/doctors", label: "Doctors" },
  { to: "/contact", label: "Contact" },
];

export function TopBar() {
  return (
    <div className="bg-navy-950 text-navy-100">
      <div className="wrap flex h-9 items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-5">
          <a href={CLINIC.phoneHref} className="hover:text-paper inline-flex items-center gap-1.5 transition-colors">
            <IconPhone className="h-3.5 w-3.5" />
            <span className="font-medium">{CLINIC.phone}</span>
          </a>
          <span className="text-navy-300 hidden items-center gap-1.5 sm:inline-flex">
            <IconClock className="h-3.5 w-3.5" />
            {HOURS[0].days}: {HOURS[0].time}
          </span>
        </div>
        <p className="text-navy-300 hidden items-center gap-1.5 md:flex">
          <IconPin className="h-3.5 w-3.5" />
          {CLINIC.addressLine1}
        </p>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div className="border-line bg-paper/95 border-b backdrop-blur-sm">
        <div className="wrap flex h-16 items-center justify-between gap-6 sm:h-[72px]">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn-primary hidden h-10 px-4 sm:inline-flex">
              Book Appointment
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              className="text-navy-900 inline-flex h-10 w-10 items-center justify-center rounded-md border border-transparent transition-colors hover:bg-navy-50 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          hidden={!open}
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav aria-label="Mobile" className="wrap border-line flex flex-col gap-1 border-t py-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2.5 text-[15px] font-medium transition-colors ${
                    isActive ? "bg-navy-50 text-navy-900 font-semibold" : "text-ink-soft hover:bg-navy-50 hover:text-navy-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary mt-3">
              Book Appointment
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
