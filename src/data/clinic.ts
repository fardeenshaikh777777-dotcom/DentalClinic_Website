/* ------------------------------------------------------------------ */
/*  Central clinic data. In production this could be served by a CMS  */
/*  or API — the shape is intentionally serializable.                 */
/* ------------------------------------------------------------------ */

export const CLINIC = {
  name: "Pearl Dental & Aesthetics",
  shortName: "Pearl Dental",
  tagline: "Professional dental care for healthier, more confident smiles.",
  phone: "(503) 555-0142",
  phoneHref: "tel:+15035550142",
  email: "hello@pearldental.care",
  addressLine1: "2140 Cedar Park Avenue, Suite 310",
  addressLine2: "Portland, OR 97209",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=2140+Cedar+Park+Avenue+Portland+OR",
  founded: 2012,
  rating: 4.9,
  reviewCount: 480,
} as const;

export const HOURS = [
  { days: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
  { days: "Saturday", time: "9:00 AM – 2:00 PM" },
  { days: "Sunday", time: "Closed" },
] as const;

export const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
] as const;

/* ---------------------------- Images ----------------------------- */

export const IMAGES = {
  hero: "https://image.qwenlm.ai/generated-images/73219578-ba72-4752-baf1-1c319079b104/_result.png",
  reception:
    "https://image.qwenlm.ai/generated-images/df289f8f-847f-4dc5-9b85-ef40c38a8fef/_result.png",
} as const;

/* ---------------------------- Services ---------------------------- */

export type ServiceIconKey =
  | "general"
  | "cleaning"
  | "whitening"
  | "implant"
  | "root"
  | "cosmetic"
  | "ortho"
  | "pediatric"
  | "crown"
  | "emergency";

export interface Service {
  id: string;
  name: string;
  icon: ServiceIconKey;
  short: string;
  description: string;
  benefits: string[];
  expect: string[];
  duration: string;
  priceFrom: string;
}

export const SERVICES: Service[] = [
  {
    id: "general-dentistry",
    name: "General Dentistry",
    icon: "general",
    short: "Check-ups, exams, fillings and gum care — the foundation of a healthy mouth.",
    description:
      "Your twice-yearly home base. We combine full clinical exams with digital X-rays and intraoral photography, so you can actually see what we see — and understand every recommendation before you agree to anything.",
    benefits: [
      "Comprehensive exams with digital X-rays",
      "Tooth-colored, mercury-free fillings",
      "Gum disease screening at every visit",
      "Honest, prioritized treatment plans",
    ],
    expect: [
      "A full visual and X-ray examination",
      "A guided tour of your results on screen",
      "A written plan with clear options and costs",
    ],
    duration: "30–60 min",
    priceFrom: "from $95",
  },
  {
    id: "dental-cleaning",
    name: "Dental Cleaning",
    icon: "cleaning",
    short: "Gentle professional hygiene with airflow polishing for a noticeably cleaner feel.",
    description:
      "More than a polish. Our hygienists remove plaque and tartar that brushing can't reach, then finish with guided airflow polishing that's kinder to enamel — and to sensitive teeth.",
    benefits: [
      "Ultrasonic and airflow polishing",
      "Gentler on sensitivity than traditional scaling",
      "Personalized home-care coaching",
      "Stain removal from coffee, tea and wine",
    ],
    expect: [
      "A gum health check and pocket measurement",
      "Plaque and tartar removal above and below the gumline",
      "A polish, floss and fluoride if you want it",
    ],
    duration: "45 min",
    priceFrom: "from $95",
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    icon: "whitening",
    short: "In-office whitening that lifts 4–8 shades in a single 75-minute visit.",
    description:
      "We assess your starting shade, protect your gums, and use a professionally supervised in-office system — not a one-size kit. Most patients leave 4–8 shades brighter in one sitting.",
    benefits: [
      "Visible results in a single visit",
      "Gum protection and sensitivity management built in",
      "Take-home top-up trays included",
      "Results typically last 1–3 years",
    ],
    expect: [
      "A shade assessment and suitability check",
      "Three short whitening cycles with gum barrier",
      "Aftercare guidance and top-up trays",
    ],
    duration: "75 min",
    priceFrom: "from $290",
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    icon: "implant",
    short: "Permanent, natural-feeling replacements for missing teeth, planned in 3D.",
    description:
      "Implants are the closest thing to getting your own tooth back. Every case is planned with 3D CBCT imaging and guided surgery, so placement is precise, predictable and as comfortable as possible.",
    benefits: [
      "A fixed solution that functions like a natural tooth",
      "Protects jawbone and neighboring teeth",
      "3D-guided placement for precision",
      "10-year implant warranty",
    ],
    expect: [
      "A free implant consultation with 3D scan",
      "Placement visit under local anesthetic",
      "Healing period, then your custom crown",
    ],
    duration: "2–3 visits",
    priceFrom: "from $1,950",
  },
  {
    id: "root-canal",
    name: "Root Canal Treatment",
    icon: "root",
    short: "Save a badly damaged tooth instead of losing it — usually in one comfortable visit.",
    description:
      "Modern root canal treatment has more in common with a filling than with its old reputation. We use magnification and rotary instruments to clean the canals gently and seal the tooth in a single visit when possible.",
    benefits: [
      "Keeps your natural tooth in place",
      "Relieves toothache at its source",
      "Microscope-assisted precision",
      "Usually completed in one visit",
    ],
    expect: [
      "X-rays and a vitality assessment",
      "Gentle cleaning and shaping under anesthesia",
      "A final seal, with a crown if the tooth needs one",
    ],
    duration: "60–90 min",
    priceFrom: "from $540",
  },
  {
    id: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    icon: "cosmetic",
    short: "Veneers, bonding and smile design tailored to your face — not a template.",
    description:
      "Good cosmetic dentistry should look like you on your best day. We design smiles digitally, preview the result before touching a tooth, and choose the most conservative option that gets you there.",
    benefits: [
      "Digital smile preview before treatment",
      "Minimally invasive veneers and bonding",
      "Natural translucency — never 'chiclet' white",
      "One-visit bonding for chips and gaps",
    ],
    expect: [
      "A smile consultation with photos and scan",
      "A digital preview of your proposed result",
      "Conservative preparation and placement",
    ],
    duration: "1–3 visits",
    priceFrom: "from $380 / tooth",
  },
  {
    id: "orthodontics",
    name: "Orthodontics",
    icon: "ortho",
    short: "Clear aligners and discreet braces for teenagers and adults alike.",
    description:
      "Straightening isn't just for teenagers. Dr. Lindqvist plans every case herself — Invisalign or fixed braces — with digital tracking at each check-in, so you always know where treatment stands.",
    benefits: [
      "Invisalign Diamond provider",
      "Discreet options for adults and teens",
      "Digital progress tracking at every visit",
      "Typical treatment in 12–18 months",
    ],
    expect: [
      "A 3D scan and simulated outcome preview",
      "A fixed, all-inclusive price quote",
      "Check-ins every 6–8 weeks",
    ],
    duration: "12–18 months",
    priceFrom: "from $2,400",
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    icon: "pediatric",
    short: "Calm, patient-first dentistry that helps kids actually like the dentist.",
    description:
      "First visits are about trust, not treatment. Dr. Whitfield lets children explore, count teeth and ask questions — building the habits (and the comfort) that prevent problems before they start.",
    benefits: [
      "Gentle 'get to know you' first visits",
      "Fluoride and fissure sealant prevention",
      "Parent stays in the room throughout",
      "Special-care dentistry training",
    ],
    expect: [
      "A relaxed introduction to the clinic",
      "A quick, gentle count and clean",
      "A plain-English update for parents",
    ],
    duration: "30 min",
    priceFrom: "from $70",
  },
  {
    id: "crowns-bridges",
    name: "Crowns & Bridges",
    icon: "crown",
    short: "Precision ceramic crowns — many designed and milled in a single day.",
    description:
      "With our in-house CEREC milling, many crowns are designed, made and fitted while you wait — no temporary crown, no second appointment, no goopy impressions.",
    benefits: [
      "Same-day crowns with CEREC technology",
      "Digital scanning instead of gag-inducing molds",
      "Natural-matched ceramics",
      "Strong option for root-filled teeth",
    ],
    expect: [
      "A digital scan of the prepared tooth",
      "Crown design while you relax with a coffee",
      "Fitting and bite adjustment in the same visit",
    ],
    duration: "Single visit",
    priceFrom: "from $720",
  },
  {
    id: "emergency-care",
    name: "Emergency Dental Care",
    icon: "emergency",
    short: "Same-day slots held every open day for pain, trauma and broken teeth.",
    description:
      "Dental emergencies don't wait for convenient times. We reserve same-day appointments on every open day for patients in pain — call us as early as you can and we'll get you seen.",
    benefits: [
      "Same-day emergency appointments",
      "Pain relief as the first priority",
      "Honest advice — sometimes 'wait and watch' is right",
      "Out-of-hours guidance by phone",
    ],
    expect: [
      "A fast assessment of the problem",
      "Pain control before anything else",
      "A clear plan, including costs, before treatment",
    ],
    duration: "Same day",
    priceFrom: "from $120",
  },
];

/* ----------------------------- Doctors ---------------------------- */

export interface Doctor {
  id: string;
  name: string;
  role: string;
  focus: string;
  years: number;
  bio: string;
  credentials: string[];
  image: string;
  accepting: boolean;
}

export const DOCTORS: Doctor[] = [
  {
    id: "elena-marsh",
    name: "Dr. Elena Marsh, DDS",
    role: "Lead Dentist · Cosmetic & Restorative",
    focus: "Veneers, smile design & complex restorative care",
    years: 14,
    bio: "Elena founded Pearl Dental in 2012 with a simple rule: show patients everything, in plain English, before recommending anything. She leads our cosmetic work and still insists on reviewing every treatment plan personally.",
    credentials: [
      "DDS, University of Michigan School of Dentistry",
      "Accredited member, American Academy of Cosmetic Dentistry",
      "200+ hours of postgraduate restorative training",
    ],
    image:
      "https://image.qwenlm.ai/generated-images/19254dd2-1554-4768-aee8-6441bbf25967/_result.png",
    accepting: true,
  },
  {
    id: "david-okafor",
    name: "Dr. David Okafor, DDS, MS",
    role: "Implant Surgery & Periodontics",
    focus: "3D-guided implants & gum health",
    years: 12,
    bio: "David handles everything below the gumline — implants, gum therapy and the surgical side of smile makeovers. His patients know him for unhurried consultations and follow-up calls he makes himself.",
    credentials: [
      "MS in Periodontics, Columbia University",
      "Fellow, International Congress of Oral Implantologists",
      "1,200+ implants placed",
    ],
    image:
      "https://image.qwenlm.ai/generated-images/9142c496-3d90-49a3-a1d9-f7fb0a952430/_result.png",
    accepting: true,
  },
  {
    id: "sofia-lindqvist",
    name: "Dr. Sofia Lindqvist, DDS, MSc",
    role: "Orthodontist",
    focus: "Invisalign, clear aligners & adult orthodontics",
    years: 9,
    bio: "Sofia straightens teeth for a living and hates guessing: every case is planned digitally, tracked at each visit, and finished on the date she promised. Adults make up two-thirds of her caseload.",
    credentials: [
      "MSc in Orthodontics, University of Gothenburg",
      "Invisalign Diamond provider",
      "Member, American Association of Orthodontists",
    ],
    image:
      "https://image.qwenlm.ai/generated-images/e1aef7e4-6010-4af9-a8a7-26a7d7afccb4/_result.png",
    accepting: true,
  },
  {
    id: "james-whitfield",
    name: "Dr. James Whitfield, DDS",
    role: "Pediatric Dentist",
    focus: "Children's dentistry & anxious patients",
    years: 10,
    bio: "James is the reason kids ask to come back. Trained in special-care dentistry, he works at each child's pace — and is equally good with grown-ups who never quite got over their own dental anxiety.",
    credentials: [
      "DDS, Harvard School of Dental Medicine",
      "Pediatric residency, Boston Children's Hospital",
      "Certified in special-care and sedation-free anxiety management",
    ],
    image:
      "https://image.qwenlm.ai/generated-images/c2a248fa-59c7-4c07-ac5e-e25ee280a3e2/_result.png",
    accepting: true,
  },
];

/* --------------------------- Testimonials ------------------------- */

export interface Testimonial {
  name: string;
  treatment: string;
  quote: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rebecca T.",
    treatment: "General dentistry",
    quote:
      "I hadn't seen a dentist in six years because I was embarrassed about my teeth. Nobody lectured me — they just made a plan. Three painless visits later, I'm back on track.",
    rating: 5,
  },
  {
    name: "Marcus D.",
    treatment: "Dental implants",
    quote:
      "Dr. Okafor placed two implants for me. He explained every step and the cost up front, and the follow-up calls afterward were unlike anything I've experienced at a clinic.",
    rating: 5,
  },
  {
    name: "Priya N.",
    treatment: "Pediatric dentistry",
    quote:
      "My daughter asks to go to the dentist now. Which is absurd, and I love it. Dr. Whitfield is genuinely brilliant with kids — patient, funny, and never rushed.",
    rating: 5,
  },
  {
    name: "Alex M.",
    treatment: "Orthodontics",
    quote:
      "Invisalign with Dr. Lindqvist ran exactly on schedule — fourteen months, done. The team even texted me proactively when a tray delivery was going to be late.",
    rating: 5,
  },
  {
    name: "Dana K.",
    treatment: "Emergency care",
    quote:
      "I called at 8:05 with a broken tooth and was in the chair by 9:30. Calm, clear about costs, no drama. That's why I'll never go anywhere else.",
    rating: 5,
  },
];

/* ------------------------------ FAQs ------------------------------ */

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "What dental services do you provide?",
    a: "Everything from routine check-ups and cleanings to implants, veneers, orthodontics and same-day emergency care. Ten treatment areas in total — you can browse them on our Services page, or ask DentaCare, our assistant, to point you in the right direction.",
  },
  {
    q: "How often should I visit the dentist?",
    a: "For most people, every six months is right. If you have a history of gum disease, decay or dry mouth, we may suggest every three to four months — we'll tell you honestly if that applies to you, and why.",
  },
  {
    q: "Do you offer emergency dental care?",
    a: "Yes. We hold same-day slots every open day for patients in pain or with dental trauma. Call (503) 555-0142 as early as you can. If you have severe facial swelling, uncontrolled bleeding or trouble breathing, seek urgent medical care first.",
  },
  {
    q: "How long does teeth whitening take?",
    a: "In-office whitening takes about 75 minutes, and most patients gain 4–8 shades in that single visit. We include take-home top-up trays to maintain the result, which typically lasts one to three years.",
  },
  {
    q: "Do you provide dental implants?",
    a: "Yes — Dr. Okafor places implants using 3D-guided surgery, starting at $1,950 including the crown. Every case begins with a free consultation and a 3D scan so you know the plan and the full cost before anything starts.",
  },
  {
    q: "Do you treat children?",
    a: "Absolutely. Dr. Whitfield is our dedicated pediatric dentist, and we recommend a first visit around age one — mostly so your child gets comfortable before any treatment is ever needed.",
  },
  {
    q: "How can I book an appointment?",
    a: "Three ways: the booking form on our Contact page, DentaCare (the assistant in the corner of this site), or a phone call to (503) 555-0142. We confirm every request by phone within one business hour.",
  },
  {
    q: "What should I bring to my first appointment?",
    a: "Photo ID, your insurance card if you have one, and a list of any medications you take. Arriving ten minutes early lets us handle paperwork without eating into your chair time.",
  },
];

/* --------------------------- Why choose us ------------------------- */

export interface Reason {
  title: string;
  text: string;
}

export const REASONS: Reason[] = [
  {
    title: "Diagnosis before treatment",
    text: "Full exams, X-rays and photos first — you'll see exactly what we see, and recommendations always come with a 'do nothing yet' option when that's honest.",
  },
  {
    title: "Transparent, written pricing",
    text: "You get a written quote before we start anything. No surprise line items on the day, ever — the number we agree is the number you pay.",
  },
  {
    title: "Gentle by design",
    text: "Comfort isn't an extra here: noise-cancelling headphones, warm blankets, a hand-signal to pause, and doctors who explain what they're doing as they do it.",
  },
  {
    title: "Technology that shortens visits",
    text: "Intraoral scanners instead of goopy molds, same-day CEREC crowns, and 3D imaging that means fewer appointments and fewer referrals elsewhere.",
  },
  {
    title: "A human answers the phone",
    text: "No call menus. We pick up during opening hours, we hold same-day emergency slots, and we'll tell you on the phone if we're not the right clinic for you.",
  },
];

/* ------------------------------ Process ---------------------------- */

export interface ProcessStep {
  title: string;
  text: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Book your visit",
    text: "Online, by phone, or with DentaCare in about two minutes. We'll confirm by phone within one business hour.",
  },
  {
    title: "Consultation & 3D scan",
    text: "A full exam with digital X-rays and an intraoral scan — you'll see your own teeth on screen, in detail.",
  },
  {
    title: "Your plan & clear quote",
    text: "Options explained in plain English, prioritized by what matters now versus what can wait, with written pricing.",
  },
  {
    title: "Treatment & follow-up",
    text: "Careful, unhurried treatment — then a check-in call afterward. Recovery questions always get answered.",
  },
];

/* ------------------------------- Values ---------------------------- */

export interface Value {
  icon: "shield" | "leaf" | "diamond" | "heart";
  title: string;
  text: string;
}

export const VALUES: Value[] = [
  {
    icon: "shield",
    title: "Honesty first",
    text: "We show you the evidence and give you options — including 'no treatment needed'. Trust is earned one honest conversation at a time.",
  },
  {
    icon: "leaf",
    title: "Comfort is clinical",
    text: "A relaxed patient is a safer patient. We treat anxiety as a clinical factor, not an inconvenience, and plan visits around it.",
  },
  {
    icon: "diamond",
    title: "Craft over speed",
    text: "We book longer slots than most clinics because rushed dentistry shows. Fillings, crowns and veneers are finished to a standard we'd want ourselves.",
  },
  {
    icon: "heart",
    title: "Care beyond the chair",
    text: "Follow-up calls after treatment, text reminders, and a real person on the phone. The appointment ends when you're okay — not when the drill stops.",
  },
];

/* ----------------------------- Technology -------------------------- */

export interface TechItem {
  title: string;
  text: string;
}

export const TECHNOLOGY: TechItem[] = [
  {
    title: "Intraoral 3D scanning",
    text: "A small wand replaces traditional impressions — no gag reflex, and you can watch your own teeth rendered in 3D in real time.",
  },
  {
    title: "CEREC same-day crowns",
    text: "Crowns designed and milled in-house while you wait. One visit, no temporaries, no second appointment.",
  },
  {
    title: "Low-dose CBCT 3D imaging",
    text: "Three-dimensional X-ray imaging for implants and root canals, at a fraction of the radiation of a transatlantic flight.",
  },
  {
    title: "Digital X-rays",
    text: "Around 90% less radiation than traditional film, with images on your screen in seconds — not days.",
  },
  {
    title: "Computer-guided anesthesia",
    text: "The Wand™ delivers anesthetic slowly and precisely, which means the injection itself is often the part patients don't feel.",
  },
];

/* ------------------------- Trust indicators ------------------------ */

export const TRUST_POINTS = [
  "Experienced dental specialists",
  "Modern, low-radiation equipment",
  "Patient-centered, unhurried care",
  "Flexible & same-day appointments",
] as const;

export const METRICS = [
  { value: "12+", label: "Years of experience" },
  { value: "5,000+", label: "Patients served" },
  { value: "15+", label: "Dental treatments" },
  { value: "4.9/5", label: "Patient rating" },
] as const;
