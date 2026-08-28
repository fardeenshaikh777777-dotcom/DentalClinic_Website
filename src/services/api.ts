/* ------------------------------------------------------------------ */
/*  API layer.                                                        */
/*  When a real backend exists, set VITE_API_BASE_URL and this module */
/*  will POST appointment requests to it. Until then it runs against  */
/*  a local mock with the same interface, so the rest of the app      */
/*  doesn't need to change.                                           */
/* ------------------------------------------------------------------ */

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitAppointment(
  request: AppointmentRequest
): Promise<AppointmentResponse> {
  // Real backend path
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    if (!res.ok) {
      throw new Error(`Appointment request failed with status ${res.status}`);
    }
    return (await res.json()) as AppointmentResponse;
  }

  // Mock path — simulates network latency and persists locally
  await delay(900);
  const reference = `PD-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  try {
    const key = "pearl.appointments";
    const existing = JSON.parse(
      localStorage.getItem(key) ?? "[]"
    ) as AppointmentRequest[];
    existing.push(request);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {
    // Storage unavailable (private mode etc.) — the reference is still valid for the session.
  }
  return { reference, status: "pending_confirmation" };
}
