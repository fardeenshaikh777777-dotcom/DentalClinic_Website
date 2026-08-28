/* ------------------------------------------------------------------ */
/*  Source manifest — every project file, imported as raw text via    */
/*  Vite's `?raw` suffix, so the Download page can package the whole  */
/*  project into a zip entirely in the browser.                       */
/* ------------------------------------------------------------------ */

// Root config
import packageJson from "../../package.json?raw";
import tsconfig from "../../tsconfig.json?raw";
import viteConfig from "../../vite.config.js?raw";
import indexHtml from "../../index.html?raw";
import envExample from "../../.env.example?raw";

// Entry
import mainTsx from "../main.tsx?raw";
import appTsx from "../App.tsx?raw";
import indexCss from "../index.css?raw";
import viteEnvDts from "../vite-env.d.ts?raw";

// Data / logic / services
import clinicData from "../data/clinic.ts?raw";
import chatEngine from "./chatEngine.ts?raw";
import apiService from "../services/api.ts?raw";

// Components
import icons from "../components/icons.tsx?raw";
import reveal from "../components/Reveal.tsx?raw";
import sectionHeading from "../components/SectionHeading.tsx?raw";
import pageHeader from "../components/PageHeader.tsx?raw";
import ctaBand from "../components/CtaBand.tsx?raw";
import navbar from "../components/Navbar.tsx?raw";
import footer from "../components/Footer.tsx?raw";
import doctorCard from "../components/DoctorCard.tsx?raw";
import mapCard from "../components/MapCard.tsx?raw";
import appointmentForm from "../components/AppointmentForm.tsx?raw";
import chatbot from "../components/Chatbot.tsx?raw";

// Pages
import homePage from "../pages/Home.tsx?raw";
import aboutPage from "../pages/About.tsx?raw";
import servicesPage from "../pages/Services.tsx?raw";
import doctorsPage from "../pages/Doctors.tsx?raw";
import contactPage from "../pages/Contact.tsx?raw";
import downloadPage from "../pages/Download.tsx?raw";

// Zip utilities — each file imports its own raw source, so the
// archive always contains exactly what shipped.
import projectFilesSource from "./projectFiles.ts?raw";
import downloadZipSource from "./downloadZip.ts?raw";

export interface ProjectFile {
  path: string;
  content: string;
}

export const PROJECT_FILES: ProjectFile[] = [
  { path: "package.json", content: packageJson },
  { path: "tsconfig.json", content: tsconfig },
  { path: "vite.config.js", content: viteConfig },
  { path: "index.html", content: indexHtml },
  { path: ".env.example", content: envExample },
  { path: "src/main.tsx", content: mainTsx },
  { path: "src/App.tsx", content: appTsx },
  { path: "src/index.css", content: indexCss },
  { path: "src/vite-env.d.ts", content: viteEnvDts },
  { path: "src/data/clinic.ts", content: clinicData },
  { path: "src/lib/chatEngine.ts", content: chatEngine },
  { path: "src/lib/projectFiles.ts", content: projectFilesSource },
  { path: "src/lib/downloadZip.ts", content: downloadZipSource },
  { path: "src/services/api.ts", content: apiService },
  { path: "src/components/icons.tsx", content: icons },
  { path: "src/components/Reveal.tsx", content: reveal },
  { path: "src/components/SectionHeading.tsx", content: sectionHeading },
  { path: "src/components/PageHeader.tsx", content: pageHeader },
  { path: "src/components/CtaBand.tsx", content: ctaBand },
  { path: "src/components/Navbar.tsx", content: navbar },
  { path: "src/components/Footer.tsx", content: footer },
  { path: "src/components/DoctorCard.tsx", content: doctorCard },
  { path: "src/components/MapCard.tsx", content: mapCard },
  { path: "src/components/AppointmentForm.tsx", content: appointmentForm },
  { path: "src/components/Chatbot.tsx", content: chatbot },
  { path: "src/pages/Home.tsx", content: homePage },
  { path: "src/pages/About.tsx", content: aboutPage },
  { path: "src/pages/Services.tsx", content: servicesPage },
  { path: "src/pages/Doctors.tsx", content: doctorsPage },
  { path: "src/pages/Contact.tsx", content: contactPage },
  { path: "src/pages/Download.tsx", content: downloadPage },
];

export const README = `# Pearl Dental & Aesthetics

A complete dental clinic website with an integrated AI assistant ("DentaCare"),
built with React 18, TypeScript, Vite and Tailwind CSS v4.

## Quick start

\`\`\`bash
npm install
npm run dev      # local development
npm run build    # production build to dist/
\`\`\`

## Pages

- Home — hero, services, trust metrics, doctors, testimonials, FAQ, CTAs
- About — story, mission, values, technology, team, trust
- Services — 10 detailed treatment sections with pricing
- Doctors — full specialist profiles with credentials
- Contact — validated appointment form, clinic info, map placeholder
- Legal — privacy policy and terms of service

## Architecture

- src/data/clinic.ts      — all clinic content (services, doctors, FAQ, hours)
- src/services/api.ts     — appointment API layer (mock now; set
                            VITE_API_BASE_URL to connect a real backend)
- src/lib/chatEngine.ts   — DentaCare conversation engine: intent matching,
                            guided booking state machine, medical safety rules
- src/lib/projectFiles.ts — source manifest used by the Download page
- src/components/         — reusable UI (navbar, chatbot, forms, icons…)
- src/pages/              — route-level pages (HashRouter)

## Notes

- Appointment requests are simulated locally until a backend is connected;
  the UI never claims a booking is final — every request is confirmed by phone.
- DentaCare never diagnoses. Red-flag symptoms (severe swelling, bleeding,
  trauma, breathing difficulty) are escalated to urgent care immediately.
- Hero and portrait photography is referenced by remote URL (AI-generated
  originals); replace with real photography before going live.
`;
