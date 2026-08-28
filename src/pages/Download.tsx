import { useEffect, useRef, useState } from "react";
import { PROJECT_FILES } from "../lib/projectFiles";
import { downloadProjectZip, formatKb, totalSourceBytes } from "../lib/downloadZip";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { IconAlert, IconCheck, IconSpinner, IconTooth } from "../components/icons";

type Status = "idle" | "working" | "done" | "error";

const SETUP_STEPS = [
  {
    cmd: "npm install",
    text: "Restore dependencies (node_modules and the lockfile are deliberately left out of the archive).",
  },
  {
    cmd: "npm run dev",
    text: "Start the local dev server and open the printed URL — the site is fully functional offline.",
  },
  {
    cmd: "npm run build",
    text: "Produce a production build in dist/, ready to deploy to any static host.",
  },
];

export default function Download() {
  const [status, setStatus] = useState<Status>("idle");
  const attempted = useRef(false);

  const trigger = async () => {
    if (status === "working") return;
    setStatus("working");
    try {
      await downloadProjectZip();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  // Attempt once on arrival; if the browser blocks a programmatic
  // download, the button below remains one click away.
  useEffect(() => {
    if (attempted.current) return;
    attempted.current = true;
    const t = window.setTimeout(() => void trigger(), 600);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Source archive"
        title="Take the whole project with you"
        description={`Everything below is packed into pearl-dental-source.zip — ${PROJECT_FILES.length + 1} files, ${formatKb(
          totalSourceBytes
        )} of source, zipped right in your browser.`}
      />

      <section className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="card overflow-hidden">
              <div className="border-line bg-parchment/60 flex flex-wrap items-center justify-between gap-4 border-b px-6 py-5">
                <div>
                  <h2 className="font-display text-navy-900 font-bold tracking-tight">
                    pearl-dental-source.zip
                  </h2>
                  <p className="text-ink-soft mt-0.5 text-xs">
                    {PROJECT_FILES.length + 1} files · {formatKb(totalSourceBytes)} uncompressed
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void trigger()}
                  disabled={status === "working"}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "working" ? (
                    <>
                      <IconSpinner className="h-4 w-4 animate-spin" />
                      Packing…
                    </>
                  ) : (
                    <>
                      <IconTooth className="h-4 w-4" />
                      Download ZIP
                    </>
                  )}
                </button>
              </div>

              {status === "done" && (
                <p
                  role="status"
                  className="border-moss-600/25 bg-moss-100 text-moss-600 flex items-center gap-2.5 border-b px-6 py-3 text-sm font-medium"
                >
                  <IconCheck className="h-4 w-4 shrink-0" />
                  Download started — check your browser's downloads.
                </p>
              )}
              {status === "error" && (
                <p
                  role="alert"
                  className="border-clay-600/25 bg-clay-100 text-clay-600 flex items-center gap-2.5 border-b px-6 py-3 text-sm font-medium"
                >
                  <IconAlert className="h-4 w-4 shrink-0" />
                  The browser blocked the automatic download — use the button above.
                </p>
              )}

              <ul className="chat-scroll max-h-[26rem] overflow-y-auto px-2 py-2">
                <li className="text-ink-soft flex items-center justify-between gap-4 px-4 py-2 font-mono text-[13px]">
                  <span>README.md</span>
                  <span className="text-xs whitespace-nowrap">generated</span>
                </li>
                {PROJECT_FILES.map((f) => (
                  <li
                    key={f.path}
                    className="hover:bg-navy-50/60 text-ink flex items-center justify-between gap-4 rounded-md px-4 py-2 font-mono text-[13px] transition-colors"
                  >
                    <span className="truncate">{f.path}</span>
                    <span className="text-ink-soft text-xs whitespace-nowrap">
                      {formatKb(f.content.length)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="space-y-6 lg:col-span-5">
          <Reveal delay={80}>
            <div className="card p-6 sm:p-7">
              <h2 className="font-display text-navy-900 text-lg font-bold tracking-tight">
                Running it locally
              </h2>
              <ol className="mt-5 space-y-5">
                {SETUP_STEPS.map((s, i) => (
                  <li key={s.cmd} className="flex gap-4">
                    <span className="font-display text-brass-500 text-sm font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <code className="bg-navy-900 text-paper rounded px-2 py-1 font-mono text-[13px]">
                        {s.cmd}
                      </code>
                      <p className="text-ink-soft mt-2 text-sm leading-relaxed">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="border-tide-600/25 bg-tide-50 rounded-lg border p-6 sm:p-7">
              <h2 className="font-display text-navy-900 font-bold">Good to know</h2>
              <ul className="text-ink-soft mt-3 space-y-2.5 text-sm leading-relaxed">
                <li>
                  <strong className="text-navy-900">No secrets inside.</strong> The archive
                  contains only frontend source — appointment requests hit a mock layer
                  until you point <code className="font-mono text-[13px]">VITE_API_BASE_URL</code>{" "}
                  at a real backend.
                </li>
                <li>
                  <strong className="text-navy-900">Photography is remote.</strong> Hero and
                  doctor images load from their generated URLs; drop your own files into{" "}
                  <code className="font-mono text-[13px]">public/</code> and update{" "}
                  <code className="font-mono text-[13px]">src/data/clinic.ts</code>.
                </li>
                <li>
                  <strong className="text-navy-900">DentaCare travels with you.</strong> The
                  whole conversation engine lives in{" "}
                  <code className="font-mono text-[13px]">src/lib/chatEngine.ts</code> — swap
                  it for a real LLM backend without touching the UI.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
