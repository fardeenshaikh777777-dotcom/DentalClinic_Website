import { Link, useLocation } from "react-router-dom";
import { CLINIC, HOURS } from "../data/clinic";
import AppointmentForm from "../components/AppointmentForm";
import MapCard from "../components/MapCard";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import {
  IconAlert,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
} from "../components/icons";

const NEXT_STEPS = [
  {
    title: "We call you back",
    text: "Within one business hour, a care coordinator confirms the details and answers any questions.",
  },
  {
    title: "Your time is locked in",
    text: "We agree the exact appointment — or suggest the closest alternative if your slot is taken.",
  },
  {
    title: "A reminder before you arrive",
    text: "You'll get a text 24 hours ahead with directions, parking notes and anything to bring.",
  },
];

export default function Contact() {
  const location = useLocation();
  const preselected = new URLSearchParams(location.search).get("service") ?? "";

  return (
    <>
      <PageHeader
        eyebrow="Contact & appointments"
        title="Book a visit, or just say hello"
        description="Request an appointment below, call, email, or ask DentaCare in the corner of the screen. Whichever you choose, a person confirms every booking by phone."
      />

      <section className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
        {/* Left: clinic information */}
        <div className="space-y-6 lg:col-span-5">
          <Reveal>
            <div className="card p-6 sm:p-7">
              <h2 className="font-display text-navy-900 text-lg font-bold tracking-tight">
                Get in touch
              </h2>
              <ul className="mt-5 space-y-5">
                <li className="flex items-start gap-3.5">
                  <span className="bg-mist-100 text-navy-800 flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-navy-900 text-sm font-bold">Phone</p>
                    <a
                      href={CLINIC.phoneHref}
                      className="text-ink-soft hover:text-tide-700 text-sm transition-colors"
                    >
                      {CLINIC.phone} — a person answers, no menus
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="bg-mist-100 text-navy-800 flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                    <IconMail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-navy-900 text-sm font-bold">Email</p>
                    <a
                      href={`mailto:${CLINIC.email}`}
                      className="text-ink-soft hover:text-tide-700 text-sm transition-colors"
                    >
                      {CLINIC.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="bg-mist-100 text-navy-800 flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                    <IconPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-navy-900 text-sm font-bold">Address</p>
                    <p className="text-ink-soft text-sm">
                      {CLINIC.addressLine1}
                      <br />
                      {CLINIC.addressLine2}
                    </p>
                    <a
                      href={CLINIC.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-tide-700 hover:text-navy-900 text-sm font-medium transition-colors"
                    >
                      Get directions →
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div className="card p-6 sm:p-7">
              <h2 className="font-display text-navy-900 flex items-center gap-2 text-lg font-bold tracking-tight">
                <IconClock className="text-tide-600 h-5 w-5" />
                Opening hours
              </h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                {HOURS.map((h) => (
                  <div key={h.days} className="border-line flex justify-between gap-6 border-b pb-2.5 last:border-b-0 last:pb-0">
                    <dt className="text-ink-soft">{h.days}</dt>
                    <dd className="text-navy-900 font-semibold">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-ink-soft mt-4 text-xs leading-relaxed">
                We hold same-day emergency slots on every open day — call early for the
                best chance of a morning visit.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border-clay-600/25 bg-clay-100/60 rounded-lg border p-6 sm:p-7">
              <h2 className="font-display text-navy-900 flex items-center gap-2 text-lg font-bold tracking-tight">
                <IconAlert className="text-clay-600 h-5 w-5" />
                In pain right now?
              </h2>
              <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                Don't wait for a form. Call and describe the problem — we triage over
                the phone and will tell you honestly how soon you need to be seen.
                Severe swelling, uncontrolled bleeding or trouble breathing needs urgent
                medical care first.
              </p>
              <a href={CLINIC.phoneHref} className="btn-primary mt-4">
                <IconPhone className="h-4 w-4" />
                Call {CLINIC.phone}
              </a>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <MapCard />
          </Reveal>
        </div>

        {/* Right: appointment form */}
        <div className="lg:col-span-7">
          <Reveal delay={100}>
            <div className="card p-6 sm:p-9 lg:sticky lg:top-28">
              <p className="eyebrow text-tide-600">Appointment form</p>
              <h2 className="font-display text-navy-900 mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Request an appointment
              </h2>
              <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                Fill this in and we'll confirm by phone within one business hour. Fields
                marked <span className="text-clay-600">*</span> are required.
              </p>
              <div className="mt-7">
                <AppointmentForm defaultService={preselected} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap pb-20 sm:pb-24">
        <Reveal>
          <h2 className="font-display text-navy-900 text-center text-2xl font-bold tracking-tight">
            What happens after you hit send
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {NEXT_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="card h-full p-6">
                <span className="font-display text-brass-500 text-sm font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-navy-900 mt-3 font-bold">{s.title}</h3>
                <p className="text-ink-soft mt-1.5 text-sm leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-ink-soft mt-8 text-center text-sm">
          Prefer to chat?{" "}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("pearl:open-chat"))}
            className="text-tide-700 hover:text-navy-900 cursor-pointer font-semibold transition-colors"
          >
            Ask DentaCare
          </button>{" "}
          — or{" "}
          <Link to="/services" className="text-tide-700 hover:text-navy-900 font-semibold transition-colors">
            browse treatments
          </Link>{" "}
          first.
        </p>
      </section>
    </>
  );
}
