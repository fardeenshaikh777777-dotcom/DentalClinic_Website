import { useEffect, useState } from "react";
import { PROJECT_FILES } from "../lib/projectFiles";
import {
  ZIP_NAME,
  copyAllSource,
  createSourceZipBlob,
  formatKb,
  totalSourceBytes,
} from "../lib/downloadZip";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { IconAlert, IconCheck, IconSpinner, IconTooth } from "../components/icons";

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
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const [zipError, setZipError] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "working" | "done" | "error">("idle");

  // Build the archive once on arrival and hold a live object URL,
  // so the button can be a real <a download> link — the most reliable
  // way to save a file, even in restricted preview windows.
  useEffect(() => {
    let revoked = false;
    let url: string | null = null;
    createSourceZipBlob()
      .then((blob) => {
        if (revoked) return;
        url = URL.createObjectURL(blob);
        setZipUrl(url);
      })
      .catch(() => {
        if (!revoked) setZipError(true);
      });
    return () => {
      revoked = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  const handleCopy = async () => {
    if (copyState === "working") return;
    setCopyState("working");
    try {
      await copyAllSource();
      setCopyState("done");
    } catch {
      setCopyState("error");
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Source archive"
        title="Take the whole project with you"
        description={`Everything below is packed into ${ZIP_NAME} — ${PROJECT_FILES.length + 1} files, ${formatKb(
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
                    {ZIP_NAME}
                  </h2>
                  <p className="text-ink-soft mt-0.5 text-xs">
                    {PROJECT_FILES.length + 1} files · {formatKb(totalSourceBytes)} uncompressed
                  </p>
                </div>

                {zipUrl ? (
                  <a
                    href={zipUrl}
                    download={ZIP_NAME}
                    onClick={() => setDownloaded(true)}
                    className="btn-primary"
                  >
                    <IconTooth className="h-4 w-4" />
                    Download ZIP
                  </a>
                ) : (
                  <span className="btn-primary pointer-events-none opacity-70">
                    {zipError ? (
                      <>
                        <IconAlert className="h-4 w-4" />
                        Archive failed
                      </>
                    ) : (
                      <>
                        <IconSpinner className="h-4 w-4 animate-spin" />
                        Packing…
                      </>
                    )}
                  </span>
                )}
              </div>

              {downloaded && (
                <p
                  role="status"
                  className="border-moss-600/25 bg-moss-100 text-moss-600 flex items-center gap-2.5 border-b px-6 py-3 text-sm font-medium"
                >
                  <IconCheck className="h-4 w-4 shrink-0" />
                  Saving {ZIP_NAME} — check your browser's download bar.
                </p>
              )}
              {zipError && (
                <p
                  role="alert"
                  className="border-clay-600/25 bg-clay-100 text-clay-600 flex items-center gap-2.5 border-b px-6 py-3 text-sm font-medium"
                >
                  <IconAlert className="h-4 w-4 shrink-0" />
                  The archive couldn't be built here — use "Copy all source" below instead.
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

          {/* Fallback for locked-down previews */}
          <Reveal delay={80}>
            <div className="card mt-6 p-6">
              <h2 className="font-display text-navy-900 font-bold">
                Download button does nothing?
              </h2>
              <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                Some preview windows block file downloads. Copy the entire source as
                text instead — every file is included, clearly marked — and paste it
                into files on your machine, or save it as{" "}
                <code className="font-mono text-[13px]">pearl-dental-source.txt</code>.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void handleCopy()}
                  disabled={copyState === "working"}
                  className="btn-outline disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {copyState === "working" ? (
                    <>
                      <IconSpinner className="h-4 w-4 animate-spin" />
                      Copying…
                    </>
                  ) : copyState === "done" ? (
                    <>
                      <IconCheck className="text-moss-600 h-4 w-4" />
                      Copied to clipboard
                    </>
                  ) : (
                    "Copy all source"
                  )}
                </button>
                {copyState === "error" && (
                  <span className="text-clay-600 text-xs font-medium">
                    Clipboard blocked too — select and copy manually from the file list
                    above, or open this page in a normal browser tab.
                  </span>
                )}
              </div>
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
