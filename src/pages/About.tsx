import { Link } from "react-router-dom";
import { CLINIC, DOCTORS, IMAGES, TECHNOLOGY, VALUES } from "../data/clinic";
import CtaBand from "../components/CtaBand";
import DoctorCard from "../components/DoctorCard";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import {
  IconArrowRight,
  IconCheck,
  IconScan,
  IconStar,
  VALUE_ICONS,
} from "../components/icons";

const TRUST_CHECKS = [
  "Every dentist holds postgraduate training in their specialty",
  "Written, itemized pricing before any treatment starts",
  "Same-day emergency slots held every open day",
  "Digital records shared across the whole team — no repeating your history",
  "We'll tell you when treatment can wait, or isn't needed at all",
  "Follow-up call after every significant procedure",
];

const COMFORT_POINTS = [
  "Noise-cancelling headphones & curated playlists",
  "Warm blankets and dimmable lighting on request",
  "A simple hand signal pauses treatment instantly",
  "Longer slots — we never double-book chair time",
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Built on honest dentistry"
        description="Since 2012, Pearl Dental & Aesthetics has practiced one way: show the patient everything, explain it plainly, and only treat what needs treating."
      />

      {/* Story */}
      <section className="wrap grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">
        <Reveal className="relative order-2 lg:order-1">
          <div
            className="border-brass-400/60 absolute -bottom-5 -left-5 h-full w-full rounded-lg border"
            aria-hidden="true"
          />
          <img
            src={IMAGES.reception}
            alt="The reception lounge at Pearl Dental — warm wood, soft light and plants"
            loading="lazy"
            className="border-line relative aspect-[4/3] w-full rounded-lg border object-cover"
          />
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Our story"
            title="It started with a waiting room"
            description="Dr. Elena Marsh spent her first decade in dentistry watching patients tense up before they'd even been greeted. In 2012 she opened Pearl Dental around a different idea: the clinic should lower your blood pressure, not raise it."
          />
          <Reveal delay={80}>
            <p className="text-ink-soft mt-5 leading-relaxed">
              That idea shaped everything — the calm reception, the unhurried
              appointments, the written pricing, and a team of specialists who share one
              patient record so nobody has to tell their story twice. Twelve years and
              five thousand patients later, it's still how we practice.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                ["12+", "Years in practice"],
                ["4", "Specialist doctors"],
                ["5,000+", "Patients cared for"],
              ].map(([v, l]) => (
                <div key={l} className="border-line border-l-2 pl-4">
                  <p className="font-display text-navy-900 text-2xl font-extrabold">{v}</p>
                  <p className="text-ink-soft mt-0.5 text-xs">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-navy-900 relative overflow-hidden">
        <div className="bg-dotgrid-light pointer-events-none absolute inset-0 opacity-50" />
        <div className="wrap relative py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-brass-400">Our mission</p>
            <blockquote className="font-display text-paper mt-5 text-2xl leading-snug font-bold tracking-tight text-balance sm:text-3xl">
              “Dentistry we'd want for our own families — honest diagnoses, clear
              pricing, and the time to do it properly.”
            </blockquote>
            <p className="text-navy-200 mt-5 text-sm">
              Dr. Elena Marsh, DDS — Founder &amp; Lead Dentist
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="wrap py-20 sm:py-24">
        <SectionHeading
          align="center"
          eyebrow="Our values"
          title="Four promises we keep"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = VALUE_ICONS[v.icon];
            return (
              <Reveal key={v.title} delay={i * 70}>
                <div className="card hover:border-tide-500/60 h-full p-6 transition-all duration-300 hover:-translate-y-1">
                  <span className="bg-mist-100 text-navy-800 flex h-11 w-11 items-center justify-center rounded-md">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-navy-900 mt-5 text-lg font-bold tracking-tight">
                    {v.title}
                  </h3>
                  <p className="text-ink-soft mt-2 text-sm leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Technology & environment */}
      <section className="border-line bg-parchment/70 border-y">
        <div className="wrap grid gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Technology & environment"
              title="Modern equipment, used gently"
              description="We invest in technology that makes visits shorter, scans more comfortable and diagnoses more certain — never gadgets for their own sake."
            />
            <div className="mt-9 space-y-6">
              {TECHNOLOGY.map((t, i) => (
                <Reveal key={t.title} delay={i * 60}>
                  <div className="flex gap-4">
                    <span className="bg-shell border-line text-tide-700 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
                      <IconScan className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-navy-900 font-bold">{t.title}</h3>
                      <p className="text-ink-soft mt-1 text-sm leading-relaxed">{t.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Reveal delay={100}>
              <img
                src={IMAGES.hero}
                alt="A relaxed patient with Dr. Marsh in a Pearl Dental treatment room"
                loading="lazy"
                className="border-line aspect-[4/3] w-full rounded-lg border object-cover"
              />
            </Reveal>
            <Reveal delay={160}>
              <div className="card p-6">
                <h3 className="font-display text-navy-900 font-bold">Designed around comfort</h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {COMFORT_POINTS.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm leading-snug">
                      <IconCheck className="text-mist-600 mt-0.5 h-4 w-4 shrink-0" />
                      <span className="text-ink-soft">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="wrap py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The team"
            title="The doctors behind the care"
            description="Each doctor leads their own field — and every treatment plan is reviewed between them."
          />
          <Reveal delay={100}>
            <Link to="/doctors" className="btn-outline hidden sm:inline-flex">
              Full profiles
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
      </section>

      {/* Why patients trust us */}
      <section className="wrap grid items-start gap-10 pb-20 sm:pb-24 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Why patients trust us"
            title="Trust is a practice, not a slogan"
            description="These are the habits that turned first-time visitors into patients who've stayed for a decade."
          />
          <Reveal delay={80}>
            <ul className="mt-8 space-y-3.5">
              {TRUST_CHECKS.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <IconCheck className="text-mist-600 mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-[15px] leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="space-y-5 lg:mt-24">
          <Reveal delay={120}>
            <div className="card p-7">
              <div className="flex items-end gap-4">
                <p className="font-display text-navy-900 text-5xl font-extrabold tracking-tight">
                  {CLINIC.rating}
                </p>
                <div className="pb-1.5">
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <IconStar key={i} className="text-brass-500 h-4 w-4" />
                    ))}
                  </div>
                  <p className="text-ink-soft mt-1 text-xs">
                    from {CLINIC.reviewCount}+ verified Google reviews
                  </p>
                </div>
              </div>
              <p className="text-ink-soft mt-5 text-sm leading-relaxed">
                We read every review — and our Monday team meeting starts with the ones
                that didn't go perfectly.
              </p>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="border-tide-600/25 bg-tide-50 rounded-lg border p-7">
              <h3 className="font-display text-navy-900 font-bold">Insurance &amp; pricing</h3>
              <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                We work with most PPO plans, submit claims on your behalf, and put every
                estimate in writing. If a cost changes mid-treatment, you approve it
                first — always.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Come and see the difference a calm clinic makes."
        text="New patients are welcome at every doctor. Book online and we'll confirm by phone within one business hour."
      />
    </>
  );
}
