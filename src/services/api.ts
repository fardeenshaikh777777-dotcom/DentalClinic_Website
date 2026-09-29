export interface AppointmentRequest {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

export interface AppointmentResponse {
  reference: string;
  status: "pending_confirmation";
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").trim().replace(/\/+$/, "");
export const bookingAvailable = Boolean(API_BASE_URL);

export async function submitAppointment(request: AppointmentRequest): Promise<AppointmentResponse> {
  if (!bookingAvailable) throw new Error("Online booking is unavailable. Please call the clinic.");
  const res = await fetch(API_BASE_URL + "/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error("Appointment request failed");
  const data: unknown = await res.json();
  if (!data || typeof data !== "object" || !("reference" in data) ||
      typeof data.reference !== "string" || !data.reference.trim() ||
      !("status" in data) || data.status !== "pending_confirmation") {
    throw new Error("The booking service returned an invalid response. Please call the clinic before retrying.");
  }
  return { reference: data.reference, status: data.status };
}
