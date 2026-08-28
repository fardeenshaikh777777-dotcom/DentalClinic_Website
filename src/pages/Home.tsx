import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";
import CtaBand from "../components/CtaBand";
import DoctorCard from "../components/DoctorCard";
import MapCard from "../components/MapCard";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import {
  IconArrowRight,
  IconCheck,
  IconChat,
  IconChevronDown,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconQuote,
  IconStar,
  IconTooth,
  SERVICE_ICONS,
} from "../components/icons";
import {
  CLINIC,
  DOCTORS,
  FAQS,
  HOURS,
  IMAGES,
  METRICS,
  PROCESS_STEPS,
  REASONS,
  SERVICES,
  TESTIMONIALS,
  TRUST_POINTS,
} from "../data/clinic";

const openChat = () => window.dispatchEvent(new Event("pearl:open-chat"));

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
}

/* ------------------------------- Hero ------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-dotgrid pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]" />
      <div className="wrap relative grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
              <span className="font-display text-navy-900 flex items-center gap-1.5 font-bold">
                <IconStar className="text-brass-500 h-4 w-4" />
                {CLINIC.rating}/5
              </span>
              <span className="bg-ink-soft/30 h-3.5 w-px" aria-hidden="true" />
              <span className="text-ink-soft">
                from {CLINIC.reviewCount}+ patient reviews
              </span>
            </div>
            <h1 className="font-display text-navy-900 mt-5 text-[2.5rem] leading-[1.08] font-extrabold tracking-tight text-balance sm:text-[3.2rem]">
              Confident smiles start with{" "}
              <span className="text-tide-600">better care.</span>
            </h1>
            <p className="text-ink-soft mt-6 max-w-lg text-lg leading-relaxed">
              Comprehensive dental care delivered by experienced professionals in a
              comfortable, modern environment.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link to="/contact" className="btn-primary">
                Book an Appointment
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="btn-outline">
                Explore Services
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              {TRUST_POINTS.map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <IconCheck className="text-mist-600 h-4 w-4 shrink-0" />
                  <span className="text-ink-soft">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={120}>
            <div className="relative">
              <div
                className="bg-navy-900 absolute -top-5 right-6 h-24 w-24 rounded-t-[10rem] rounded-b-lg opacity-90"
                aria-hidden="true"
              />
              <div
                className="bg-brass-500/25 absolute -top-3 right-8 h-24 w-24 rounded-t-[10rem] rounded-b-lg"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-xl rounded-tr-[11rem]">
                <img
                  src={IMAGES.hero}
                  alt="A patient relaxing with Dr. Marsh during a dental check-up at Pearl Dental"
                  className="aspect-[4/5] w-full object-cover sm:aspect-[5/5] lg:aspect-[4/5]"
                  fetchPriority="high"
                />
              </div>
              <div className="border-line bg-shell absolute bottom-5 left-3 flex items-center gap-3.5 rounded-lg border py-3 pr-6 pl-4 shadow-[0_10px_30px_-12px_rgba(12,39,55,0.25)] sm:-left-6">
                <span className="bg-moss-100 text-moss-600 flex h-9 w-9 items-center justify-center rounded-full">
                  <IconCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-navy-900 text-sm font-bold">
                    Same-day emergency care
                  </p>
                  <p className="text-ink-soft text-xs">Slots held every open day</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Trust metrics -------------------------- */

function MetricsBand() {
  return (
    <section className="border-line border-y bg-navy-900/95">
      <div className="wrap grid grid-cols-2 divide-x divide-y divide-navy-800 lg:grid-cols-4 lg:divide-y-0">
        {METRICS.map((m, i) => (
          <Reveal key={m.label} delay={i * 70} className="px-4 py-8 sm:px-8">
            <p className="font-display text-paper text-3xl font-extrabold tracking-tight sm:text-4xl">
              {m.value}
            </p>
            <p className="text-navy-200 mt-1.5 text-sm">{m.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Services ---------------------------- */

function ServicesPreview() {
  return (
    <section className="wrap py-20 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Our services"
          title="Every kind of care, under one roof"
          description="From routine check-ups to full smile makeovers — with honest pricing before any treatment begins."
        />
        <Reveal delay={100}>
          <Link to="/services" className="btn-outline hidden sm:inline-flex">
            View all treatments
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.slice(0, 6).map((s, i) => {
          const Icon = SERVICE_ICONS[s.icon];
          return (
            <Reveal key={s.id} delay={(i % 3) * 80}>
              <Link
                to="/services"
                className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-16px_rgba(12,39,55,0.25)]"
              >
                <div className="flex items-start justify-between">
                  <span className="bg-tide-50 text-tide-700 flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-paper">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-brass-600 text-xs font-semibold">{s.priceFrom}</span>
                </div>
                <h3 className="font-display text-navy-900 mt-5 text-lg font-bold tracking-tight">
                  {s.name}
                </h3>
                <p className="text-ink-soft mt-2 flex-1 text-sm leading-relaxed">{s.short}</p>
                <span className="text-tide-700 font-display mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Learn more
                  <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          );
        })}

        {/* Assistant card */}
        <Reveal delay={160}>
          <div className="border-navy-800 bg-navy-900 relative flex h-full flex-col overflow-hidden rounded-lg border p-6">
            <div className="bg-dotgrid-light pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative flex-1">
              <span className="bg-navy-800 text-brass-400 flex h-11 w-11 items-center justify-center rounded-lg">
                <IconChat className="h-6 w-6" />
              </span>
              <h3 className="font-display text-paper mt-5 text-lg font-bold tracking-tight">
                Not sure what you need?
              </h3>
              <p className="text-navy-200 mt-2 text-sm leading-relaxed">
                Describe what's going on and DentaCare will point you to the right
                treatment — and can book it for you.
              </p>
            </div>
            <button
              type="button"
              onClick={openChat}
              className="btn-light relative mt-5 self-start"
            >
              Ask DentaCare
              <IconArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-8 sm:hidden">
        <Link to="/services" className="btn-outline w-full">
          View all treatments
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}

/* ------------------------------- About ------------------------------ */

function AboutPreview() {
  return (
    <section className="border-line bg-parchment/70 border-y">
      <div className="wrap grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">
        <Reveal className="relative">
          <div
            className="border-brass-400/60 absolute -bottom-5 -left-5 h-full w-full rounded-lg border"
            aria-hidden="true"
          />
          <img
            src={IMAGES.reception}
            alt="The calm reception lounge at Pearl Dental with warm wood, plants and soft light"
            loading="lazy"
            className="border-line relative aspect-[4/3] w-full rounded-lg border object-cover"
          />
          <div className="bg-navy-900 text-paper absolute -right-3 bottom-6 rounded-lg px-5 py-4 sm:-right-6">
            <p className="font-display text-2xl font-extrabold">2012</p>
            <p className="text-navy-200 text-xs">Serving Portland since</p>
          </div>
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="About the clinic"
            title="A calmer way to do dentistry"
            description="We founded Pearl Dental around one idea: patients deserve to see what we see, understand what we recommend, and never feel rushed through a chair."
          />
          <Reveal delay={80}>
            <ul className="mt-8 space-y-3.5">
              {REASONS.slice(0, 3).map((r) => (
                <li key={r.title} className="flex items-start gap-3">
                  <IconCheck className="text-mist-600 mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong className="font-display text-navy-900">{r.title}.</strong>{" "}
                    <span className="text-ink-soft text-[15px]">{r.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={140}>
            <Link to="/about" className="btn-outline mt-8">
              Our story &amp; values
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Why choose us ------------------------- */

function WhyChooseUs() {
  return (
    <section className="wrap grid gap-12 py-20 sm:py-24 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            eyebrow="Why choose us"
            title="The difference is in the details"
            description="Five habits we've kept for over a decade — the reasons patients drive across the city to sit in our chairs."
          />
          <Reveal delay={100}>
            <div className="border-line mt-8 flex items-center gap-4 rounded-lg border bg-shell p-5">
              <IconTooth className="text-tide-600 h-8 w-8 shrink-0" />
              <p className="text-ink-soft text-sm leading-relaxed">
                <strong className="font-display text-navy-900">Still unsure?</strong>{" "}
                Ask DentaCare anything about our treatments — it answers in seconds.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="space-y-5 lg:col-span-7">
        {REASONS.map((r, i) => (
          <Reveal key={r.title} delay={i * 60}>
            <div className="card flex gap-5 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-16px_rgba(12,39,55,0.22)]">
              <span className="font-display text-brass-500 pt-1 text-lg font-bold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-navy-900 text-lg font-bold tracking-tight">
                  {r.title}
                </h3>
                <p className="text-ink-soft mt-1.5 text-sm leading-relaxed">{r.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Doctors ----------------------------- */

function DoctorsPreview() {
  return (
    <section className="border-line bg-parchment/70 border-y">
      <div className="wrap py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Meet the team"
            title="Specialists who listen first"
            description="Four doctors, four disciplines, one shared patient record — so your care is always coordinated."
          />
          <Reveal delay={100}>
            <Link to="/doctors" className="btn-outline hidden sm:inline-flex">
              All doctors
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.map((d, i) => (
            <Reveal key={d.id} delay={i * 70}>
              <DoctorCard doctor={d} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Testimonials --------------------------- */

function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setInterval(() => {
      setActive((a) => (a + 1) % count);
    }, 6000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused, count]);

  const t = TESTIMONIALS[active];

  return (
    <section className="bg-navy-900 relative overflow-hidden">
      <div className="bg-dotgrid-light pointer-events-none absolute inset-0 opacity-50" />
      <div className="wrap relative py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <SectionHeading
              light
              eyebrow="Patient stories"
              title="Trusted by the people who matter"
              description="Real words from real patients — the kind of reviews we read at every team meeting."
            />
            <Reveal delay={100}>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <IconStar key={i} className="text-brass-400 h-4 w-4" />
                  ))}
                </div>
                <p className="text-navy-200 text-sm">
                  {CLINIC.rating}/5 · {CLINIC.reviewCount}+ reviews
                </p>
              </div>
            </Reveal>
          </div>

          <div
            className="lg:col-span-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Reveal delay={140}>
              <figure className="border-navy-800 bg-navy-800/60 relative rounded-xl border p-8 sm:p-10">
                <IconQuote className="text-brass-400/40 absolute top-7 right-8 h-14 w-14" />
                <blockquote
                  key={active}
                  className="msg-in font-display text-paper text-xl leading-relaxed font-medium text-balance sm:text-2xl"
                >
                  “{t.quote}”
                </blockquote>
                <figcaption key={`c-${active}`} className="msg-in mt-7 flex items-center gap-4">
                  <span className="bg-brass-500 text-navy-950 font-display flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold">
                    {t.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="text-paper block font-semibold">{t.name}</span>
                    <span className="text-navy-200 block text-sm">{t.treatment}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
            <div className="mt-6 flex items-center gap-2.5">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-current={i === active}
                  className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                    i === active ? "bg-brass-400 w-8" : "bg-navy-700 hover:bg-navy-600 w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Process ----------------------------- */

function ProcessSection() {
  return (
    <section className="wrap py-20 sm:py-24">
      <SectionHeading
        align="center"
        eyebrow="How it works"
        title="Your care, in four clear steps"
        description="No mystery, no pressure. Here's exactly what happens from your first click to your follow-up call."
      />
      <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div
          className="border-line absolute top-6 right-[12%] left-[12%] hidden border-t-2 border-dashed lg:block"
          aria-hidden="true"
        />
        {PROCESS_STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 90}>
            <div className="relative text-center lg:text-left">
              <span className="border-line bg-shell font-display text-navy-900 relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 text-base font-extrabold lg:mx-0">
                {i + 1}
              </span>
              <h3 className="font-display text-navy-900 mt-5 text-lg font-bold tracking-tight">
                {step.title}
              </h3>
              <p className="text-ink-soft mt-2 text-sm leading-relaxed">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- Assistant CTA -------------------------- */

function AssistantCta() {
  return (
    <section className="border-line border-y bg-parchment/70">
      <div className="wrap grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Meet DentaCare"
            title="Your questions, answered in seconds"
            description="Prices, opening hours, which treatment fits your situation — DentaCare handles it all, and can even collect your booking details before you call."
          />
          <Reveal delay={100}>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Answers questions about all ten treatments",
                "Explains procedures in plain language",
                "Shares hours, prices and directions",
                "Guides you step-by-step to a booking",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <IconCheck className="text-mist-600 h-4 w-4 shrink-0" />
                  <span className="text-ink-soft">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={160}>
            <button type="button" onClick={openChat} className="btn-primary mt-8">
              <IconChat className="h-4 w-4" />
              Start a conversation
            </button>
          </Reveal>
        </div>

        {/* Conversation preview */}
        <Reveal delay={140}>
          <div className="border-line bg-shell mx-auto w-full max-w-md overflow-hidden rounded-xl border shadow-[0_20px_50px_-24px_rgba(12,39,55,0.35)]">
            <div className="bg-navy-900 text-paper flex items-center gap-3 px-5 py-4">
              <span className="bg-mist-100 text-navy-900 flex h-8 w-8 items-center justify-center rounded-full">
                <IconTooth className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="font-display text-sm leading-tight font-bold">DentaCare Assistant</p>
                <p className="text-navy-200 text-[11px]">Online · replies instantly</p>
              </div>
            </div>
            <div className="space-y-3 p-5">
              <div className="flex justify-end">
                <p className="bg-navy-900 text-paper max-w-[80%] rounded-lg rounded-br-sm px-3.5 py-2 text-[13px]">
                  How much does teeth whitening cost?
                </p>
              </div>
              <div className="flex items-end gap-2">
                <span className="bg-navy-900 text-paper flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <IconTooth className="h-3.5 w-3.5" />
                </span>
                <p className="border-line bg-paper max-w-[80%] rounded-lg rounded-bl-sm border px-3.5 py-2 text-[13px] leading-relaxed">
                  In-office whitening starts at $290 for one 75-minute visit — most
                  patients leave 4–8 shades brighter. Want me to book you in?
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pl-8">
                <button type="button" onClick={openChat} className="chip h-7 px-3 text-xs">
                  I want to book an appointment
                </button>
                <button type="button" onClick={openChat} className="chip h-7 px-3 text-xs">
                  What are your clinic hours?
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- FAQ ---------------------------------- */

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [openItem, setOpenItem] = useState(false);
  return (
    <Reveal delay={index * 40}>
      <div className="card overflow-hidden">
        <h3>
          <button
            type="button"
            className="font-display text-navy-900 hover:bg-navy-50/60 flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4.5 text-left text-[15px] font-bold transition-colors"
            aria-expanded={openItem}
            aria-controls={`faq-panel-${index}`}
            id={`faq-button-${index}`}
            onClick={() => setOpenItem((v) => !v)}
          >
            {q}
            <IconChevronDown
              className={`h-4 w-4 shrink-0 text-tide-600 transition-transform duration-300 ${
                openItem ? "rotate-180" : ""
              }`}
            />
          </button>
        </h3>
        <div
          id={`faq-panel-${index}`}
          role="region"
          aria-labelledby={`faq-button-${index}`}
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            openItem ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-ink-soft px-6 pb-5 text-sm leading-relaxed">{a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function FaqSection() {
  return (
    <section className="wrap grid gap-12 py-20 sm:py-24 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            eyebrow="Questions & answers"
            title="Asked often, answered honestly"
            description="Can't find yours? DentaCare is one click away — or call and talk to a human."
          />
          <Reveal delay={100}>
            <a href={CLINIC.phoneHref} className="btn-outline mt-8">
              <IconPhone className="h-4 w-4" />
              {CLINIC.phone}
            </a>
          </Reveal>
        </div>
      </div>
      <div className="space-y-3.5 lg:col-span-8">
        {FAQS.map((f, i) => (
          <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------- Booking strip -------------------------- */

function BookingStrip() {
  return (
    <section className="border-line bg-parchment/70 border-t">
      <div className="wrap grid items-start gap-12 py-20 sm:py-24 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Ready when you are"
            title="Book your appointment"
            description="Request a time below and we'll confirm by phone within one business hour — every booking gets a human touch."
          />
          <Reveal delay={80}>
            <div className="mt-8 space-y-4">
              <div className="card flex items-center gap-4 p-4">
                <span className="bg-mist-100 text-navy-800 flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                  <IconClock className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-navy-900 text-sm font-bold">Opening hours</p>
                  <p className="text-ink-soft text-[13px]">
                    {HOURS[0].days} · {HOURS[0].time}
                  </p>
                  <p className="text-ink-soft text-[13px]">
                    {HOURS[1].days} · {HOURS[1].time} — {HOURS[2].days}: {HOURS[2].time}
                  </p>
                </div>
              </div>
              <div className="card flex items-center gap-4 p-4">
                <span className="bg-mist-100 text-navy-800 flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                  <IconPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-navy-900 text-sm font-bold">Find us</p>
                  <p className="text-ink-soft text-[13px]">
                    {CLINIC.addressLine1}, {CLINIC.addressLine2}
                  </p>
                </div>
              </div>
              <div className="card flex items-center gap-4 p-4">
                <span className="bg-mist-100 text-navy-800 flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                  <IconMail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-navy-900 text-sm font-bold">Prefer to write?</p>
                  <a
                    href={`mailto:${CLINIC.email}`}
                    className="text-tide-700 hover:text-navy-900 text-[13px] font-medium transition-colors"
                  >
                    {CLINIC.email}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div className="card p-6 sm:p-8">
            <AppointmentForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- Contact strip -------------------------- */

function ContactStrip() {
  return (
    <section className="wrap grid items-start gap-10 pb-20 sm:pb-24 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <SectionHeading
          eyebrow="Visit the clinic"
          title="Easy to find, easier to love"
          description="Free patient parking behind the building, streetcar a block away — and a team that greets you by name from your second visit."
        />
        <Reveal delay={80}>
          <a href={CLINIC.mapsUrl} target="_blank" rel="noreferrer" className="btn-outline mt-8">
            Get directions
            <IconArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
      <Reveal delay={120} className="lg:col-span-7">
        <MapCard />
      </Reveal>
    </section>
  );
}

/* -------------------------------- Page ------------------------------ */

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsBand />
      <ServicesPreview />
      <AboutPreview />
      <WhyChooseUs />
      <DoctorsPreview />
      <Testimonials />
      <ProcessSection />
      <AssistantCta />
      <FaqSection />
      <CtaBand
        title="Your smile deserves a second opinion from people who listen."
        text="New patients welcome at every doctor. Booking takes about two minutes — or ask DentaCare to do it with you."
      />
      <BookingStrip />
      <ContactStrip />
    </>
  );
}
