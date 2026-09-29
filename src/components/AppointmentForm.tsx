import { useEffect, useState } from "react";
import { CLINIC, SERVICES, TIME_SLOTS } from "../data/clinic";
import { bookingAvailable, submitAppointment, type AppointmentRequest } from "../services/api";
import { IconAlert, IconCheck, IconSpinner } from "./icons";

interface FormState {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  service: string;
  notes: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  service: "",
  notes: "",
};

const FIELD_ORDER: (keyof FormState)[] = [
  "name",
  "phone",
  "email",
  "date",
  "time",
  "service",
];

const todayStr = () => {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

function validate(f: FormState): FormErrors {
  const e: FormErrors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name.";
  if (f.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a valid phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "Enter a valid email address.";
  if (!f.date) e.date = "Choose a preferred date.";
  else if (f.date < todayStr()) e.date = "The date can't be in the past.";
  if (!f.time) e.time = "Choose a preferred time.";
  if (!f.service) e.service = "Select a treatment or service.";
  return e;
}

export default function AppointmentForm({
  defaultService = "",
}: {
  defaultService?: string;
}) {
  const [form, setForm] = useState<FormState>({ ...EMPTY, service: defaultService });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [reference, setReference] = useState("");
  const [confirmed, setConfirmed] = useState<AppointmentRequest | null>(null);

  // Keep the pre-selected service in sync when navigating with ?service=…
  useEffect(() => {
    setForm((f) => ({ ...f, service: SERVICES.some((s) => s.name === defaultService) ? defaultService : "" }));
  }, [defaultService]);

  const set = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "submitting") return;
    const errs = validate(form);
    if (Object.values(errs).some(Boolean)) {
      setErrors(errs);
      const first = FIELD_ORDER.find((k) => errs[k]);
      if (first) document.getElementById(`appt-${first}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await submitAppointment({
        ...form,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
      });
      setReference(res.reference);
      setConfirmed({ ...form });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setForm({ ...EMPTY });
    setErrors({});
    setStatus("idle");
    setReference("");
    setConfirmed(null);
  };

  if (status === "success" && confirmed) {
    return (
      <div className="msg-in" role="status" aria-live="polite">
        <span className="bg-moss-100 text-moss-600 flex h-12 w-12 items-center justify-center rounded-full">
          <IconCheck className="h-6 w-6" />
        </span>
        <h3 className="font-display text-navy-900 mt-5 text-xl font-bold">
          Request received
        </h3>
        <p className="mt-1 text-sm text-ink-soft">
          Reference <span className="font-semibold text-navy-900">{reference}</span>. Our
          care team will call you within one business hour to confirm the exact time —
          your appointment isn't final until that call.
        </p>
        <dl className="border-line mt-6 divide-y divide-[var(--color-line)] rounded-lg border text-sm">
          {[
            ["Patient", confirmed.name],
            ["Service", confirmed.service],
            ["Date", confirmed.date],
            ["Time", confirmed.time],
            ["Phone", confirmed.phone],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 px-4 py-2.5">
              <dt className="text-ink-soft">{label}</dt>
              <dd className="text-navy-900 text-right font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <button type="button" onClick={reset} className="btn-outline mt-6">
          Make another request
        </button>
      </div>
    );
  }

  const err = (k: keyof FormState) =>
    errors[k] ? (
      <span className="field-error" id={`appt-${k}-error`}>
        {errors[k]}
      </span>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {!bookingAvailable && <p role="status" className="mb-5 text-sm text-ink-soft">Online appointment requests are currently unavailable. Please <a className="font-semibold underline" href={CLINIC.phoneHref}>call {CLINIC.phone}</a> to book.</p>}
      {status === "error" && (
        <div
          role="alert"
          className="border-clay-600/30 bg-clay-100 text-clay-600 mb-5 flex items-start gap-2.5 rounded-md border px-4 py-3 text-sm"
        >
          <IconAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Something went wrong sending your request. Please try again, or call us on{" "}
            <a href={CLINIC.phoneHref} className="font-semibold underline">
              {CLINIC.phone}
            </a>
            .
          </span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="appt-name" className="field-label">
            Full Name <span className="text-clay-600">*</span>
          </label>
          <input
            id="appt-name"
            type="text"
            autoComplete="name"
            className={`field ${errors.name ? "field-invalid" : ""}`}
            placeholder="Jane Cooper"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "appt-name-error" : undefined}
          />
          {err("name")}
        </div>

        <div>
          <label htmlFor="appt-phone" className="field-label">
            Phone <span className="text-clay-600">*</span>
          </label>
          <input
            id="appt-phone"
            type="tel"
            autoComplete="tel"
            className={`field ${errors.phone ? "field-invalid" : ""}`}
            placeholder="(503) 555-0000"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "appt-phone-error" : undefined}
          />
          {err("phone")}
        </div>

        <div>
          <label htmlFor="appt-email" className="field-label">
            Email <span className="text-clay-600">*</span>
          </label>
          <input
            id="appt-email"
            type="email"
            autoComplete="email"
            className={`field ${errors.email ? "field-invalid" : ""}`}
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "appt-email-error" : undefined}
          />
          {err("email")}
        </div>

        <div>
          <label htmlFor="appt-date" className="field-label">
            Preferred Date <span className="text-clay-600">*</span>
          </label>
          <input
            id="appt-date"
            type="date"
            min={todayStr()}
            className={`field ${errors.date ? "field-invalid" : ""}`}
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "appt-date-error" : undefined}
          />
          {err("date")}
        </div>

        <div>
          <label htmlFor="appt-time" className="field-label">
            Preferred Time <span className="text-clay-600">*</span>
          </label>
          <select
            id="appt-time"
            className={`field ${errors.time ? "field-invalid" : ""} ${
              form.time ? "" : "text-ink-soft/60"
            }`}
            value={form.time}
            onChange={(e) => set("time", e.target.value)}
            aria-invalid={!!errors.time}
            aria-describedby={errors.time ? "appt-time-error" : undefined}
          >
            <option value="" disabled>
              Select a time…
            </option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {err("time")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="appt-service" className="field-label">
            Treatment / Service <span className="text-clay-600">*</span>
          </label>
          <select
            id="appt-service"
            className={`field ${errors.service ? "field-invalid" : ""} ${
              form.service ? "" : "text-ink-soft/60"
            }`}
            value={form.service}
            onChange={(e) => set("service", e.target.value)}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "appt-service-error" : undefined}
          >
            <option value="" disabled>
              Select a treatment…
            </option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet — general check-up</option>
          </select>
          {err("service")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="appt-notes" className="field-label">
            Message <span className="text-ink-soft font-normal">(optional)</span>
          </label>
          <textarea
            id="appt-notes"
            rows={4}
            className="field h-auto resize-none py-2.5"
            placeholder="Tell us anything that helps — symptoms, anxiety, insurance questions…"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!bookingAvailable || status === "submitting"}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <IconSpinner className="h-4 w-4 animate-spin" />
            Sending request…
          </>
        ) : (
          "Request Appointment"
        )}
      </button>
      <p className="text-ink-soft mt-3 text-center text-xs leading-relaxed">
        {bookingAvailable ? "This sends a request — we confirm appointments by phone. Nothing is booked until then." : "Please contact the clinic directly to request an appointment."}
      </p>
    </form>
  );
}
