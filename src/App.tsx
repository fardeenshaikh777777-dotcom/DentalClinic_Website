import { Component, lazy, Suspense, useEffect, type ReactNode } from "react";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import Navbar, { TopBar } from "./components/Navbar";
import PageHeader from "./components/PageHeader";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import Services from "./pages/Services";
import { CLINIC } from "./data/clinic";

// Lazy: carries the whole raw-source manifest + jszip, which the rest
// of the clinic site should never have to download.
const Download = lazy(() => import("./pages/Download"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

/* A failed lazy chunk or page error must never blank the whole site. */
class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="wrap flex justify-center py-32">
          <div className="card max-w-md p-8 text-center">
            <h1 className="font-display text-navy-900 text-xl font-bold tracking-tight">
              That page couldn't be loaded
            </h1>
            <p className="text-ink-soft mt-2 text-sm leading-relaxed">
              A part of the site failed to load — usually a stale cached file after an
              update. A quick reload almost always fixes it.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-primary mt-6"
            >
              Reload the site
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ------------------------- Lightweight legal pages ---------------- */

function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} description={`Last updated ${updated}.`} />
      <div className="wrap max-w-3xl space-y-8 py-16 sm:py-20">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-navy-900 text-xl font-bold tracking-tight">
              {s.heading}
            </h2>
            <p className="text-ink-soft mt-2.5 leading-relaxed">{s.body}</p>
          </section>
        ))}
        <p className="text-ink-soft border-line border-t pt-6 text-sm">
          Questions about this page? Email{" "}
          <a href={`mailto:${CLINIC.email}`} className="text-tide-700 font-semibold hover:underline">
            {CLINIC.email}
          </a>{" "}
          or call {CLINIC.phone}.
        </p>
      </div>
    </>
  );
}

const PrivacyPage = () => (
  <LegalPage
    title="Privacy Policy"
    updated="January 2026"
    sections={[
      {
        heading: "What we collect",
        body: "When you request an appointment — via our form, by phone, or through the DentaCare assistant — we collect the details you provide: your name, contact information, preferred time, and any health notes you choose to share. We don't collect more than we need to arrange your care.",
      },
      {
        heading: "How we use it",
        body: "Your information is used to schedule appointments, confirm bookings by phone, send reminders, and coordinate care between our doctors. We never sell patient data or use it for third-party advertising.",
      },
      {
        heading: "Storage & retention",
        body: "Appointment requests are stored securely and retained only as long as needed for your care and our legal record-keeping obligations. Clinical records follow state healthcare retention rules.",
      },
      {
        heading: "Your rights",
        body: "You may request a copy of the information we hold about you, ask us to correct it, or ask us to delete non-clinical records. Contact the clinic and we'll respond within 30 days.",
      },
    ]}
  />
);

const TermsPage = () => (
  <LegalPage
    title="Terms of Service"
    updated="January 2026"
    sections={[
      {
        heading: "Appointment requests",
        body: "Submitting an appointment form or a DentaCare booking request sends us a request — it does not reserve a chair. Your appointment is confirmed when our care team calls you, typically within one business hour during opening times.",
      },
      {
        heading: "The DentaCare assistant",
        body: "DentaCare provides general information about our clinic, treatments and pricing. It does not diagnose conditions, prescribe medication, or replace professional dental advice. For symptoms that may be urgent — severe swelling, uncontrolled bleeding, facial trauma, or trouble breathing — seek urgent medical care immediately.",
      },
      {
        heading: "Pricing",
        body: "Prices shown on this website are genuine starting points. You will always receive a written, itemized quote before any treatment begins, and any change to that quote requires your approval first.",
      },
      {
        heading: "Cancellations",
        body: "Life happens. We ask for 24 hours' notice where possible so we can offer the slot to a patient in pain. Repeated late cancellations may require a booking deposit.",
      },
    ]}
  />
);

/* -------------------------------- App ----------------------------- */

function SiteRoutes() {
  const { pathname } = useLocation();
  return (
    // Keyed per route: if one page's chunk fails, navigating elsewhere
    // resets the boundary instead of leaving the site dead.
    <ErrorBoundary key={pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/download"
          element={
            <Suspense
              fallback={
                <div className="wrap flex items-center justify-center py-32">
                  <p className="text-ink-soft font-display text-sm font-semibold tracking-wide">
                    Preparing source archive…
                  </p>
                </div>
              }
            >
              <Download />
            </Suspense>
          }
        />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <Navbar />
        <main id="main" className="flex-1">
          <SiteRoutes />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </HashRouter>
  );
}
