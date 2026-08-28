import { Link } from "react-router-dom";
import { DOCTORS } from "../data/clinic";
import CtaBand from "../components/CtaBand";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { IconArrowRight, IconCheck, IconHeart } from "../components/icons";

export default function Doctors() {
  return (
    <>
      <PageHeader
        eyebrow="Our doctors"
        title="Specialists who explain, not sell"
        description="Four doctors, four specialties, one shared record — and a standing instruction to recommend the least treatment that does the job properly."
      />

      <div className="wrap space-y-16 py-16 sm:space-y-20 sm:py-20">
        {DOCTORS.map((d, i) => (
          <Reveal key={d.id}>
            <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={`relative mx-auto w-full max-w-[400px] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div
                  className={`border-brass-400/60 absolute -top-4 h-full w-full rounded-lg border ${
                    i % 2 === 1 ? "-right-4" : "-left-4"
                  }`}
                  aria-hidden="true"
                />
                <img
                  src={d.image}
                  alt={`Portrait of ${d.name}`}
                  loading="lazy"
                  className="border-line relative aspect-[4/5] w-full rounded-lg border object-cover object-top"
                />
                <span className="bg-navy-900/90 text-paper absolute bottom-4 left-4 rounded px-3 py-1.5 text-xs font-semibold">
                  {d.years} years of experience
                </span>
              </div>

              <div>
                <span className="bg-tide-50 text-tide-700 inline-flex rounded-full px-3 py-1 text-xs font-semibold">
                  {d.role}
                </span>
                <h2 className="font-display text-navy-900 mt-4 text-3xl font-bold tracking-tight">
                  {d.name}
                </h2>
                <p className="text-brass-600 mt-1.5 text-sm font-semibold">{d.focus}</p>
                <p className="text-ink-soft mt-4 max-w-xl leading-relaxed">{d.bio}</p>

                <div className="card mt-6 max-w-xl p-5">
                  <h3 className="font-display text-navy-900 text-sm font-bold tracking-[0.14em] uppercase">
                    Credentials
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {d.credentials.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <IconCheck className="text-mist-600 mt-0.5 h-4 w-4 shrink-0" />
                        <span className="text-ink-soft">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-5 flex items-center gap-2 text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="soft-ping bg-moss-600 absolute inline-flex h-full w-full rounded-full" />
                    <span className="bg-moss-600 relative inline-flex h-2 w-2 rounded-full" />
                  </span>
                  <span className="text-moss-600 font-semibold">Currently accepting new patients</span>
                </p>

                <Link to="/contact" className="btn-primary mt-6">
                  Book with {d.name.split(" ")[1]}
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <section className="wrap pb-20 sm:pb-24">
        <Reveal>
          <div className="card flex flex-col gap-4 p-7 sm:flex-row sm:items-center sm:gap-5">
            <span className="bg-mist-100 text-navy-800 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
              <IconHeart className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-display text-navy-900 font-bold">
                And the team behind them
              </h2>
              <p className="text-ink-soft mt-1 text-sm leading-relaxed">
                Six hygienists, dental assistants and care coordinators keep the clinic
                running on time. They're the ones who remember your kids' names, flag
                your insurance changes, and make the follow-up call after your visit.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand
        title="Every doctor here would rather meet you before you need them."
        text="A first consultation is the gentlest way to find out if we're the right clinic for you."
        primaryLabel="Book an Appointment"
      />
    </>
  );
}
