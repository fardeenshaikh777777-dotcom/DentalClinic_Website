import { useCallback, useEffect, useRef, useState } from "react";
import {
  failureMessage,
  greetingMessage,
  initialBooking,
  respond,
  successMessage,
  type AppointmentDraft,
  type BookingState,
  type BotMessage,
} from "../lib/chatEngine";
import { submitAppointment } from "../services/api";
import {
  IconAlert,
  IconChat,
  IconClose,
  IconSend,
  IconSpinner,
  IconTooth,
} from "./icons";

type Extras = Omit<BotMessage, "text">;

interface ChatMsg {
  id: number;
  from: "user" | "bot";
  text: string;
  extras?: Extras;
}

let nextId = 0;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const [booking, setBooking] = useState<BookingState>(initialBooking);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  const pushBot = useCallback((msg: BotMessage, delay = 700) => {
    setTyping(true);
    timerRef.current = window.setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: ++nextId,
          from: "bot",
          text: msg.text,
          extras: {
            quickReplies: msg.quickReplies,
            summary: msg.summary,
            urgent: msg.urgent,
          },
        },
      ]);
    }, delay);
  }, []);

  /* Other parts of the site can open the assistant via this event. */
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("pearl:open-chat", onOpen);
    return () => {
      window.removeEventListener("pearl:open-chat", onOpen);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  /* Greet on first open. */
  useEffect(() => {
    if (open && messages.length === 0 && !typing) {
      pushBot(greetingMessage(), 600);
    }
  }, [open, messages.length, typing, pushBot]);

  /* Keep the latest message in view. */
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  /* Esc closes; focus the input when opening. */
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const confirmSummary = useCallback(
    async (draft: AppointmentDraft) => {
      if (busy || typing || booking.step !== "confirm") return;
      setBusy(true);
      try {
        const res = await submitAppointment(draft);
        setBooking(initialBooking);
        pushBot(successMessage(res.reference), 900);
      } catch {
        pushBot(failureMessage(), 400);
      } finally {
        setBusy(false);
      }
    },
    [busy, typing, booking.step, pushBot]
  );

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing || busy) return;
    setMessages((prev) => [...prev, { id: ++nextId, from: "user", text }]);
    setInput("");

    // The summary card's confirm button is the primary path, but the
    // quick-reply chip should work identically.
    if (text === "Confirm request" && booking.step === "confirm" && booking.draft.name) {
      confirmSummary(booking.draft as AppointmentDraft);
      return;
    }

    const result = respond(text, booking);
    setBooking(result.booking);
    pushBot(result.message);
  };

  const lastMsg = messages[messages.length - 1];
  const showQuickReplies =
    !busy && !typing && lastMsg?.from === "bot" && (lastMsg.extras?.quickReplies?.length ?? 0) > 0;

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open DentaCare Assistant chat"
          className="bg-navy-900 text-paper hover:bg-navy-700 fixed right-4 bottom-5 z-50 flex h-12 cursor-pointer items-center gap-2.5 rounded-full pr-5 pl-3.5 shadow-[0_10px_30px_-8px_rgba(7,28,41,0.5)] transition-all duration-200 hover:-translate-y-0.5 sm:right-6"
        >
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="soft-ping bg-brass-400 absolute inset-0 rounded-full" />
            <IconChat className="relative h-5 w-5" />
          </span>
          <span className="font-display text-sm font-semibold">Ask DentaCare</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          id="dentacare-panel"
          role="dialog"
          aria-label="DentaCare Assistant chat"
          className="border-line chat-panel bg-paper fixed right-4 bottom-5 z-50 flex h-[min(36rem,calc(100dvh-6.5rem))] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-xl border shadow-[0_24px_60px_-16px_rgba(7,28,41,0.45)] sm:right-6"
        >
          {/* Header */}
          <div className="bg-navy-900 text-paper flex items-start gap-3 p-4">
            <span className="bg-mist-100 text-navy-900 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
              <IconTooth className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-[15px] leading-tight font-bold">
                DentaCare Assistant
              </h2>
              <p className="text-navy-200 mt-0.5 text-xs">How can I help you today?</p>
              <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-mist-200">
                <span className="bg-mist-500 inline-block h-1.5 w-1.5 rounded-full" />
                Online · replies instantly
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-navy-200 hover:text-paper hover:bg-navy-800 -mt-1 -mr-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors"
            >
              <IconClose className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            role="log"
            aria-live="polite"
            className="chat-scroll bg-paper flex-1 space-y-3 overflow-y-auto p-4"
          >
            {messages.map((msg, idx) =>
              msg.from === "user" ? (
                <div key={msg.id} className="msg-in flex justify-end">
                  <p className="bg-navy-900 text-paper max-w-[85%] rounded-lg rounded-br-sm px-3.5 py-2.5 text-sm leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              ) : (
                <div key={msg.id} className="msg-in flex items-end gap-2">
                  <span className="bg-navy-900 text-paper mb-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    <IconTooth className="h-3.5 w-3.5" />
                  </span>
                  <div className="max-w-[85%] space-y-2">
                    <div
                      className={`rounded-lg rounded-bl-sm border px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.extras?.urgent
                          ? "border-clay-600/40 bg-clay-100/70 text-ink"
                          : "border-line bg-shell text-ink"
                      }`}
                    >
                      {msg.extras?.urgent && (
                        <IconAlert className="text-clay-600 -mt-0.5 mb-1 h-4 w-4" />
                      )}
                      {msg.text}
                    </div>

                    {msg.extras?.summary && (
                      <div className="border-line bg-shell rounded-lg border p-3.5">
                        <p className="font-display text-tide-700 text-[11px] font-bold tracking-[0.14em] uppercase">
                          Appointment Request
                        </p>
                        <dl className="mt-2.5 space-y-1.5 text-[13px]">
                          {[
                            ["Patient", msg.extras.summary.name],
                            ["Service", msg.extras.summary.service],
                            ["Date", msg.extras.summary.date],
                            ["Time", msg.extras.summary.time],
                            ["Phone", msg.extras.summary.phone],
                          ].map(([label, value]) => (
                            <div key={label} className="flex justify-between gap-4">
                              <dt className="text-ink-soft">{label}</dt>
                              <dd className="text-navy-900 text-right font-semibold">
                                {value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        <button
                          type="button"
                          onClick={() => confirmSummary(msg.extras!.summary!)}
                          disabled={busy || typing || booking.step !== "confirm" || idx !== messages.length - 1}
                          className="btn-primary mt-3.5 h-9 w-full text-[13px] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {busy && idx === messages.length - 1 ? (
                            <>
                              <IconSpinner className="h-3.5 w-3.5 animate-spin" />
                              Sending…
                            </>
                          ) : (
                            "Confirm Request"
                          )}
                        </button>
                        <div className="mt-2 flex gap-2">
                          <button
                            type="button"
                            onClick={() => send("Change details")}
                            disabled={busy || idx !== messages.length - 1}
                            className="btn-outline h-8 flex-1 px-2 text-xs disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Change details
                          </button>
                          <button
                            type="button"
                            onClick={() => send("Cancel")}
                            disabled={busy || idx !== messages.length - 1}
                            className="btn-outline h-8 flex-1 px-2 text-xs disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Cancel
                          </button>
                        </div>
                        <p className="text-ink-soft mt-2.5 text-[11px] leading-snug">
                          We'll call to confirm — nothing is booked until then.
                        </p>
                      </div>
                    )}

                    {idx === messages.length - 1 && showQuickReplies && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {lastMsg!.extras!.quickReplies!.map((qr) => (
                          <button
                            key={qr}
                            type="button"
                            onClick={() => send(qr)}
                            className="chip h-7 px-3 text-xs"
                          >
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}

            {typing && (
              <div className="flex items-end gap-2" aria-label="DentaCare is typing">
                <span className="bg-navy-900 text-paper flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <IconTooth className="h-3.5 w-3.5" />
                </span>
                <div className="border-line bg-shell flex items-center gap-1 rounded-lg rounded-bl-sm border px-3.5 py-3 text-ink-soft">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-line bg-shell flex items-center gap-2 border-t p-3"
          >
            <label htmlFor="dentacare-input" className="sr-only">
              Message DentaCare Assistant
            </label>
            <input
              id="dentacare-input"
              ref={inputRef}
              type="text"
              className="field h-10 text-sm"
              placeholder="Type your question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim() || typing || busy}
              className="btn-primary h-10 w-10 shrink-0 p-0 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <IconSend className="h-4 w-4" />
            </button>
          </form>

          <p className="border-line text-ink-soft bg-paper border-t px-4 py-2 text-[10px] leading-snug">
            DentaCare Assistant provides general information and is not a substitute for
            professional dental diagnosis or treatment.
          </p>
        </div>
      )}
    </>
  );
}
