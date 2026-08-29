/* ------------------------------------------------------------------ */
/*  DentaCare Assistant — conversation engine.                        */
/*  Rule-based intent matching + a guided booking state machine.      */
/*  Designed to be swappable for a real LLM backend later: the UI     */
/*  only talks to `respond()`, `greetingMessage()` and the types.     */
/* ------------------------------------------------------------------ */

import { CLINIC, SERVICES } from "../data/clinic";

export interface AppointmentDraft {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export interface BotExtras {
  quickReplies?: string[];
  summary?: AppointmentDraft;
  urgent?: boolean;
}

export type BotMessage = { text: string } & BotExtras;

export type BookingStep =
  | "service"
  | "date"
  | "time"
  | "name"
  | "phone"
  | "email"
  | "notes"
  | "confirm"
  | null;

export interface BookingState {
  step: BookingStep;
  draft: Partial<AppointmentDraft>;
}

export const initialBooking: BookingState = { step: null, draft: {} };

export const SUGGESTED_QUESTIONS = [
  "What treatments do you offer?",
  "I want to book an appointment",
  "What are your clinic hours?",
  "Where are you located?",
  "How much does teeth whitening cost?",
  "I have a dental problem",
  "Do you provide emergency care?",
];

const SERVICE_CHOICES = [
  "General check-up",
  "Dental cleaning",
  "Teeth whitening",
  "Dental implants",
  "Orthodontics",
  "Pediatric visit",
  "Emergency care",
  "I'm not sure",
];

/* ------------------------------ helpers ---------------------------- */

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[.,!?;:"“”()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const has = (text: string, words: string[]) => words.some((w) => text.includes(w));

const firstName = (full: string) => full.trim().split(/\s+/)[0];

/* --------------------------- safety rules -------------------------- */
/* Red-flag symptoms: never diagnose, always escalate to urgent care.  */

const RED_FLAGS = [
  "can't breathe",
  "cant breathe",
  "difficulty breathing",
  "trouble breathing",
  "can't swallow",
  "cant swallow",
  "swelling",
  "swollen",
  "won't stop bleeding",
  "wont stop bleeding",
  "bleeding heavily",
  "heavy bleeding",
  "knocked out",
  "knocked-out",
  "avulsed",
  "broken jaw",
  "jaw is broken",
  "unbearable",
  "facial trauma",
  "car accident",
  "fever",
];

const urgentMessage = (): BotMessage => ({
  text: `That sounds like it may need urgent attention, and I'm not able to diagnose it. Severe swelling, uncontrolled bleeding, a knocked-out tooth, or any trouble breathing or swallowing should be seen immediately — if breathing is affected, call emergency services (911) now. Otherwise please call us right away on ${CLINIC.phone} — we hold same-day emergency slots on every open day.`,
  urgent: true,
  quickReplies: ["Do you provide emergency care?", "I want to book an appointment"],
});

/* ----------------------------- intents ----------------------------- */

const intentServices = (): BotMessage => ({
  text: `We cover ten areas: check-ups & fillings, professional cleaning, whitening, implants, root canals, veneers & cosmetics, braces and aligners, kids' dentistry, crowns & bridges, and same-day emergencies. Want the details on one, or shall we book something in?`,
  quickReplies: ["I want to book an appointment", "How much does teeth whitening cost?"],
});

const intentHours = (): BotMessage => ({
  text: `We're open Mon–Fri 8:00 AM – 6:00 PM and Saturday 9:00 AM – 2:00 PM (closed Sundays). We also keep same-day slots aside every open day for emergencies.`,
  quickReplies: ["I want to book an appointment", "Where are you located?"],
});

const intentLocation = (): BotMessage => ({
  text: `You'll find us at ${CLINIC.addressLine1}, ${CLINIC.addressLine2}. There's free patient parking behind the building, and the streetcar stops a block away.`,
  quickReplies: ["What are your clinic hours?", "I want to book an appointment"],
});

const intentContact = (): BotMessage => ({
  text: `The fastest way is the phone: ${CLINIC.phone} — a real person answers during opening hours. You can also email ${CLINIC.email}.`,
  quickReplies: ["I want to book an appointment", "What are your clinic hours?"],
});

const intentWhiteningCost = (): BotMessage => ({
  text: `In-office whitening starts at $290 and takes about 75 minutes — most people leave 4–8 shades brighter. Take-home top-up trays are included. The exact shade result is confirmed at a quick assessment first.`,
  quickReplies: ["I want to book an appointment", "What treatments do you offer?"],
});

const intentPricing = (): BotMessage => ({
  text: `A few starting points: check-up & exam from $95, professional cleaning from $95, whitening from $290, root canal from $540, crowns from $720, implants from $1,950. You'll always get a written quote before any treatment begins.`,
  quickReplies: ["How much does teeth whitening cost?", "I want to book an appointment"],
});

const intentImplants = (): BotMessage => ({
  text: `Yes — Dr. Okafor places implants with 3D-guided surgery, from $1,950 including the crown. It starts with a free consultation and a 3D scan, so you know the plan and full cost before anything happens.`,
  quickReplies: ["I want to book an appointment", "What treatments do you offer?"],
});

const intentCleaning = (): BotMessage => ({
  text: `A professional clean takes 45 minutes, starts at $95, and uses airflow polishing — gentler than traditional scaling if you're sensitive. Most patients come in every six months.`,
  quickReplies: ["I want to book an appointment", "What are your clinic hours?"],
});

const intentOrtho = (): BotMessage => ({
  text: `Dr. Lindqvist treats teens and adults with Invisalign and discreet braces — typically 12–18 months, from $2,400 all-inclusive. You'll see a digital preview of the expected result before committing.`,
  quickReplies: ["I want to book an appointment", "How much does teeth whitening cost?"],
});

const intentKids = (): BotMessage => ({
  text: `Yes — Dr. Whitfield is our pediatric dentist. First visits are gentle 'get to know you' sessions, and we recommend starting around age one. Parents stay in the room the whole time.`,
  quickReplies: ["I want to book an appointment", "What treatments do you offer?"],
});

const intentEmergency = (): BotMessage => ({
  text: `We do. Same-day emergency slots are held every open day — call ${CLINIC.phone} as early as you can and describe the problem; we'll triage you over the phone. If you develop facial swelling, uncontrolled bleeding or trouble breathing, seek urgent medical care first.`,
  urgent: true,
  quickReplies: ["I want to book an appointment", "What are your clinic hours?"],
});

const intentPain = (): BotMessage => ({
  text: `I'm sorry you're dealing with that. Tooth pain can have several causes, and a dentist would need to examine you to find this one — I can't diagnose it from here. In the meantime: keep the area clean, avoid very hot or cold food on that side, and over-the-counter pain relief can help short term. Shall we get you seen?`,
  quickReplies: ["I want to book an appointment", "Do you provide emergency care?"],
});

const intentProblem = (): BotMessage => ({
  text: `I'm sorry to hear that — let's figure out the right next step. Could you tell me a little more? For example: is it pain, sensitivity to cold, bleeding gums, or a broken or chipped tooth?`,
  quickReplies: ["I have tooth pain", "My gums bleed when brushing", "I chipped a tooth"],
});

const intentGums = (): BotMessage => ({
  text: `Bleeding when brushing is common and usually points to gum inflammation — the good news is it's very treatable. A hygiene visit plus a couple of technique tweaks typically turns it around within a few weeks.`,
  quickReplies: ["I want to book an appointment", "How much does teeth whitening cost?"],
});

const intentChipped = (): BotMessage => ({
  text: `Even a painless chip should be looked at soon — small ones are usually a quick bonding fix, and it protects the tooth from cracking further. Keep the area clean and try to chew on the other side until we've seen it.`,
  quickReplies: ["I want to book an appointment", "Do you provide emergency care?"],
});

const intentHowOften = (): BotMessage => ({
  text: `Every six months is right for most people. If you've had gum disease, frequent decay, or dry mouth, we might suggest every 3–4 months — we'll always explain why if that applies to you.`,
  quickReplies: ["I want to book an appointment", "What treatments do you offer?"],
});

const intentFirstVisit = (): BotMessage => ({
  text: `Bring photo ID, your insurance card if you have one, and a list of any medications. Ten minutes early is perfect — that covers the paperwork without cutting into your chair time.`,
  quickReplies: ["I want to book an appointment", "What are your clinic hours?"],
});

const intentInsurance = (): BotMessage => ({
  text: `We work with most PPO plans and will submit claims for you. Bring your card to the first visit and we'll check your coverage — and if something isn't covered, you'll know the cost before treatment, not after.`,
  quickReplies: ["I want to book an appointment", "What treatments do you offer?"],
});

const intentGreeting = (): BotMessage => ({
  text: `Hi, I'm DentaCare — Pearl Dental's assistant. Ask me about treatments, prices or opening hours, or I can help you book a visit right now.`,
  quickReplies: SUGGESTED_QUESTIONS.slice(0, 4),
});

const intentThanks = (): BotMessage => ({
  text: `You're very welcome. Anything else I can help with?`,
  quickReplies: ["I want to book an appointment", "What are your clinic hours?"],
});

const intentBye = (): BotMessage => ({
  text: `Take care — and we'll see you at your next visit. The team is on ${CLINIC.phone} if you need us sooner.`,
});

const intentFallback = (): BotMessage => ({
  text: `I want to get that right rather than guess. Could you rephrase it, or pick one of these?`,
  quickReplies: [
    "What treatments do you offer?",
    "I want to book an appointment",
    "What are your clinic hours?",
    "Do you provide emergency care?",
  ],
});

/* ------------------------- booking flow ---------------------------- */

const startBooking = (): { message: BotMessage; booking: BookingState } => ({
  message: {
    text: `Happy to help with that. Which treatment are you booking? If you're not sure, pick "I'm not sure" — the dentist will assess and guide you.`,
    quickReplies: SERVICE_CHOICES,
  },
  booking: { step: "service", draft: {} },
});

const confirmPrompt = (draft: AppointmentDraft): BotMessage => ({
  text: `That's everything — does this look right? Tap "Confirm request" and I'll send it to our care team, who'll call you to lock in the exact time.`,
  summary: draft,
  quickReplies: ["Confirm request", "Change details", "Cancel"],
});

const bookingReply = (
  raw: string,
  booking: BookingState
): { message: BotMessage; booking: BookingState } => {
  const input = raw.trim();
  const lower = norm(input);
  const draft = { ...booking.draft };

  if (lower.includes("cancel")) {
    return {
      message: {
        text: `No worries — I've cleared that. Anything else I can help with?`,
        quickReplies: SUGGESTED_QUESTIONS.slice(0, 4),
      },
      booking: { ...initialBooking },
    };
  }

  switch (booking.step) {
    case "service": {
      draft.service = input;
      return {
        message: {
          text: `Great — ${draft.service}. What day works for you? Pick a suggestion or type any date.`,
          quickReplies: ["Tomorrow", "This Friday", "Next Monday", "As soon as possible"],
        },
        booking: { step: "date", draft },
      };
    }
    case "date": {
      draft.date = input;
      return {
        message: {
          text: `And roughly what time suits you? We're here Mon–Fri 8–6 and Saturday mornings.`,
          quickReplies: ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "No preference"],
        },
        booking: { step: "time", draft },
      };
    }
    case "time": {
      draft.time = input;
      return {
        message: {
          text: `Nearly there. Whose appointment is this? (Full name, please.)`,
        },
        booking: { step: "name", draft },
      };
    }
    case "name": {
      draft.name = input;
      return {
        message: {
          text: `Thanks, ${firstName(input)}. What's the best phone number to reach you on?`,
        },
        booking: { step: "phone", draft },
      };
    }
    case "phone": {
      if (input.replace(/\D/g, "").length < 7) {
        return {
          message: { text: `Hmm, that number doesn't look complete — could you double-check it? Digits only is fine.` },
          booking,
        };
      }
      draft.phone = input;
      return {
        message: {
          text: `What email should the confirmation go to? (Or tap Skip.)`,
          quickReplies: ["Skip"],
        },
        booking: { step: "email", draft },
      };
    }
    case "email": {
      if (lower !== "skip" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
        return {
          message: {
            text: `That email doesn't look quite right — mind checking it? Or tap Skip to continue without one.`,
            quickReplies: ["Skip"],
          },
          booking,
        };
      }
      draft.email = lower === "skip" ? "" : input;
      return {
        message: {
          text: `Last one: anything we should know before the visit — allergies, medications, dental anxiety? Tap Skip if not.`,
          quickReplies: ["Skip"],
        },
        booking: { step: "notes", draft },
      };
    }
    case "notes": {
      draft.notes = lower === "skip" ? "" : input;
      const full: AppointmentDraft = {
        service: draft.service ?? "",
        date: draft.date ?? "",
        time: draft.time ?? "",
        name: draft.name ?? "",
        phone: draft.phone ?? "",
        email: draft.email ?? "",
        notes: draft.notes ?? "",
      };
      return {
        message: confirmPrompt(full),
        booking: { step: "confirm", draft: full },
      };
    }
    case "confirm": {
      if (lower.includes("change")) {
        return {
          message: {
            text: `No problem — let's run through it again. Which treatment?`,
            quickReplies: SERVICE_CHOICES,
          },
          booking: { step: "service", draft },
        };
      }
      return {
        message: {
          text: `Tap "Confirm request" below the summary and I'll send it through. Or choose "Change details" to edit something.`,
          summary: booking.draft as AppointmentDraft,
          quickReplies: ["Confirm request", "Change details", "Cancel"],
        },
        booking,
      };
    }
    default:
      return { message: intentFallback(), booking: { ...initialBooking } };
  }
};

/* ------------------------------ router ----------------------------- */

export function greetingMessage(): BotMessage {
  return {
    text: `Hello! I'm DentaCare, the assistant for ${CLINIC.name}. How can I help you today?`,
    quickReplies: SUGGESTED_QUESTIONS,
  };
}

export function successMessage(reference: string): BotMessage {
  return {
    text: `Your request is in — reference ${reference}. Our care team will call you within one business hour to confirm the exact time. Nothing is booked until that call, so keep an eye on your phone. Need changes sooner? Call ${CLINIC.phone}.`,
    quickReplies: ["What are your clinic hours?", "Where are you located?"],
  };
}

export function failureMessage(): BotMessage {
  return {
    text: `I'm sorry — I couldn't send the request just now. Please try again in a moment, or call us directly on ${CLINIC.phone} and we'll book you in.`,
    quickReplies: ["I want to book an appointment"],
  };
}

export function respond(
  rawInput: string,
  booking: BookingState
): { message: BotMessage; booking: BookingState } {
  const input = rawInput.trim();
  const t = norm(input);

  // 1) Medical safety first — escalate red-flag symptoms immediately.
  if (has(t, RED_FLAGS)) {
    return { message: urgentMessage(), booking };
  }

  // 2) Active booking flow takes priority over intents.
  if (booking.step) {
    return bookingReply(input, booking);
  }

  // 3) Intent matching.
  if (has(t, ["book", "appointment", "schedule", "reserve a", "come in"])) {
    return startBooking();
  }
  if (has(t, ["emergency", "urgent", "asap", "broken tooth", "chipped", "cracked"])) {
    if (has(t, ["chipped", "cracked", "broken tooth"])) {
      return { message: intentChipped(), booking };
    }
    return { message: intentEmergency(), booking };
  }
  if (has(t, ["hour", "open", "close", "when are you", "weekend", "sunday", "saturday"])) {
    return { message: intentHours(), booking };
  }
  if (has(t, ["where", "location", "address", "find you", "parking", "located"])) {
    return { message: intentLocation(), booking };
  }
  if (has(t, ["phone", "call you", "email", "contact", "reach you", "number"])) {
    return { message: intentContact(), booking };
  }
  if (has(t, ["cost", "price", "how much", "fee", "charge", "expensive", "whitening cost"])) {
    if (has(t, ["whiten"])) return { message: intentWhiteningCost(), booking };
    return { message: intentPricing(), booking };
  }
  if (has(t, ["whiten", "bleach", "whiter", "stain"])) {
    return { message: intentWhiteningCost(), booking };
  }
  if (has(t, ["implant", "missing tooth", "missing teeth"])) {
    return { message: intentImplants(), booking };
  }
  if (has(t, ["clean", "hygien", "scale", "polish"])) {
    return { message: intentCleaning(), booking };
  }
  if (has(t, ["brace", "aligner", "invisalign", "straighten", "orthodont"])) {
    return { message: intentOrtho(), booking };
  }
  if (has(t, ["child", "kid", "pediatric", "daughter", "son", "baby", "toddler"])) {
    return { message: intentKids(), booking };
  }
  if (has(t, ["insurance", "coverage", "plan"])) {
    return { message: intentInsurance(), booking };
  }
  if (has(t, ["how often", "check up", "checkup", "routine"])) {
    return { message: intentHowOften(), booking };
  }
  if (has(t, ["first appointment", "first visit", "bring"])) {
    return { message: intentFirstVisit(), booking };
  }
  if (has(t, ["tooth pain", "toothache", "hurts", "ache", "pain", "sensitive", "sore"])) {
    return { message: intentPain(), booking };
  }
  if (has(t, ["gum", "bleed when"])) {
    return { message: intentGums(), booking };
  }
  if (has(t, ["problem", "issue", "wrong with", "something up"])) {
    return { message: intentProblem(), booking };
  }
  if (has(t, ["treatment", "service", "offer", "do you do", "what do you"])) {
    return { message: intentServices(), booking };
  }
  if (has(t, ["thank", "thanks", "great", "perfect", "awesome"])) {
    return { message: intentThanks(), booking };
  }
  if (has(t, ["bye", "goodbye", "see you"])) {
    return { message: intentBye(), booking };
  }
  if (has(t, ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"])) {
    return { message: intentGreeting(), booking };
  }
  return { message: intentFallback(), booking };
}

// SERVICES is referenced for parity with future LLM-backed engines
// (context injection) and keeps imports stable.
void SERVICES;
