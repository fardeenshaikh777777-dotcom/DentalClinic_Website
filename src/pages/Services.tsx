import { Link } from "react-router-dom";
import { CLINIC, SERVICES } from "../data/clinic";
import CtaBand from "../components/CtaBand";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import {
  IconArrowRight,
  IconChat,
  IconCheck,
  IconClock,
  IconPhone,
  SERVICE_ICONS,
} from "../components/icons";

const openChat = () => window.dispatchEvent(new Event("pearl:open-chat"));

const scrollToService = (id: string) => {
  document.getElementById(`svc-${id}`)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
};

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services & pricing"
        title="Ten treatments, one standard of care"
        description="What each treatment involves, what it costs, and what to expect — written by our dentists. Every price below is a genuine starting point, confirmed in writing before treatment."
      >
        <div className="flex flex-wrap gap-2" role="navigation" aria-label="Jump to a treatment">
          {SERVICES.map((s) => (
            <button key={s.id} type="button" onClick={() => scrollToService(s.id)} className="chip">
              {s.name}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className="wrap space-y-8 py-16 sm:py-20">
        {SERVICES.map((s, idx) => {
          const Icon = SERVICE_ICONS[s.icon];
          return (
            <Reveal key={s.id}>
              <section
                id={`svc-${s.id}`}
                aria-labelledby={`svc-${s.id}-title`}
                className="card scroll-mt-28 overflow-hidden"
              >
                <div className="grid lg:grid-cols-12">
                  <div className="border-line bg-parchment/60 border-b p-7 lg:col-span-4 lg:border-r lg:border-b-0">
                    <span className="bg-navy-900 text-paper flex h-12 w-12 items-center justify-center rounded-lg">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h2
                      id={`svc-${s.id}-title`}
                      className="font-display text-navy-900 mt-5 text-2xl font-bold tracking-tight"
                    >
                      <span className="text-brass-500 mr-2 align-middle text-sm font-bold">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {s.name}
                    </h2>
                    <p className="text-ink-soft mt-3 text-sm leading-relaxed">{s.short}</p>
                    <dl className="mt-6 space-y-2.5 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <dt className="text-ink-soft flex items-center gap-2">
                          <IconClock className="h-4 w-4" />
                          Typical visit
                        </dt>
                        <dd className="text-navy-900 font-semibold">{s.duration}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <dt className="text-ink-soft">Starting at</dt>
                        <dd className="text-tide-700 font-bold">{s.priceFrom}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="p-7 lg:col-span-8">
                    <p className="max-w-2xl leading-relaxed">{s.description}</p>
                    <div className="mt-7 grid gap-8 sm:grid-cols-2">
                      <div>
                        <h3 className="font-display text-navy-900 text-sm font-bold tracking-[0.14em] uppercase">
                          Benefits
                        </h3>
                        <ul className="mt-3.5 space-y-2.5">
                          {s.benefits.map((b) => (
                            <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed">
                              <IconCheck className="text-mist-600 mt-0.5 h-4 w-4 shrink-0" />
                              <span className="text-ink-soft">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-display text-navy-900 text-sm font-bold tracking-[0.14em] uppercase">
                          What to expect
                        </h3>
                        <ol className="mt-3.5 space-y-2.5">
                          {s.expect.map((e, i) => (
                            <li key={e} className="flex items-start gap-3 text-sm leading-relaxed">
                              <span className="font-display text-brass-500 pt-0.5 text-xs font-bold">
                                {i + 1}
                              </span>
                              <span className="text-ink-soft">{e}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    <div className="border-line mt-8 flex flex-wrap items-center gap-4 border-t pt-6">
                      <Link
                        to={`/contact?service=${encodeURIComponent(s.name)}`}
                        className="btn-primary h-10 text-[13px]"
                      >
                        Book this treatment
                        <IconArrowRight className="h-4 w-4" />
                      </Link>
                      <p className="text-ink-soft text-xs">
                        You'll receive a written quote before any treatment begins.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>
          );
        })}

        <div className="grid gap-5 pt-4 sm:grid-cols-2">
          <Reveal>
            <div className="card flex h-full flex-col p-6">
              <h2 className="font-display text-navy-900 text-lg font-bold tracking-tight">
                Not sure which treatment fits?
              </h2>
              <p className="text-ink-soft mt-2 flex-1 text-sm leading-relaxed">
                Tell DentaCare what's going on — pain, sensitivity, a chip, or just a
                feeling something's off — and it will point you to the right service.
              </p>
              <button type="button" onClick={openChat} className="btn-outline mt-5 self-start">
                <IconChat className="h-4 w-4" />
                Ask DentaCare
              </button>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card flex h-full flex-col p-6">
              <h2 className="font-display text-navy-900 text-lg font-bold tracking-tight">
                Insurance &amp; payment
              </h2>
              <p className="text-ink-soft mt-2 flex-1 text-sm leading-relaxed">
                We work with most PPO plans, submit claims for you, and offer payment
                plans for larger treatments. Questions before you book? Call{" "}
                <a href={CLINIC.phoneHref} className="text-tide-700 font-semibold hover:underline">
                  {CLINIC.phone}
                </a>{" "}
                — a person picks up.
              </p>
              <a href={CLINIC.phoneHref} className="btn-outline mt-5 self-start">
                <IconPhone className="h-4 w-4" />
                Call the clinic
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <CtaBand
        title="Found what you need? Let's find a time."
        text="Book online in under two minutes — or let DentaCare collect the details for you."
      />
    </>
  );
}
