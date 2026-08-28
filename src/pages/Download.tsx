import { useEffect, useRef, useState } from "react";
import { PROJECT_FILES } from "../lib/projectFiles";
import {
  ZIP_NAME,
  buildSourceText,
  copyAllSource,
  createSourceZipBlob,
  formatKb,
  isInIframe,
  openZipInNewTab,
  saveViaFileSystemAccess,
  totalSourceBytes,
  triggerAnchorDownload,
  validateManifest,
  verifySourceZip,
} from "../lib/downloadZip";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import {
  IconAlert,
  IconArrowUpRight,
  IconCheck,
  IconClose,
  IconSpinner,
  IconTooth,
} from "../components/icons";

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

type Phase = "building" | "ready" | "error";
type Tone = "info" | "success" | "error";

export default function Download() {
  const [phase, setPhase] = useState<Phase>("building");
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const [zipSize, setZipSize] = useState<number | null>(null);
  const [verification, setVerification] = useState<{
    entries: number;
    totalBytes: number;
  } | null>(null);
  const [verifyFailed, setVerifyFailed] = useState(false);
  const [inFrame] = useState<boolean>(() => isInIframe());
  const [status, setStatus] = useState<{ tone: Tone; text: string } | null>(null);
  const [sourceOpen, setSourceOpen] = useState(false);
  const sourceRef = useRef<HTMLTextAreaElement>(null);

  const manifest = validateManifest();

  // Build the archive once, verify it by reading it back, and hold a
  // live blob + object URL so every delivery method uses the same file.
  useEffect(() => {
    let cancelled = false;
    let url: string | null = null;

    (async () => {
      try {
        const blob = await createSourceZipBlob();
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        setZipBlob(blob);
        setZipUrl(url);
        setZipSize(blob.size);

        const check = await verifySourceZip(blob);
        if (!cancelled) {
          setVerification({ entries: check.entries, totalBytes: check.totalBytes });
          setPhase("ready");
        }
      } catch {
        if (!cancelled) {
          setVerifyFailed(true);
          setPhase("error");
        }
      }
    })();

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  const say = (tone: Tone, text: string) => setStatus({ tone, text });

  /* ------------------------- delivery ladder ----------------------- */

  const handleDownload = async () => {
    if (!zipBlob || !zipUrl) return;

    // 1) Native "Save As" dialog — immune to the download sandbox.
    const saved = await saveViaFileSystemAccess(zipBlob);
    if (saved === "saved") {
      say("success", `${ZIP_NAME} saved to the folder you picked.`);
      return;
    }
    if (saved === "cancelled") {
      say("info", "Save dialog closed — nothing was written.");
      return;
    }

    // 2) Inside a preview frame: open the blob in a new top-level tab.
    if (inFrame) {
      if (openZipInNewTab(zipUrl)) {
        say(
          "success",
          "A new tab opened outside the preview frame — the download starts there. If it didn't, allow popups for this site and click again, or use “Show source” below."
        );
      } else {
        say(
          "error",
          "The popup was blocked. Allow popups and click again — or use “Copy all source” / “Show source”. Both always work."
        );
      }
      return;
    }

    // 3) Top level: the ordinary browser download path.
    triggerAnchorDownload(zipUrl);
    say("success", "Download requested — check your browser's download bar.");
  };

  const handleNewTab = () => {
    if (!zipUrl) return;
    if (openZipInNewTab(zipUrl)) {
      say("success", "A new tab opened and the ZIP download starts there.");
    } else {
      say("error", "Your browser blocked the popup. Allow popups for this site, or use “Show source”.");
    }
  };

  const handleCopy = async () => {
    say("info", "Copying source…");
    try {
      await copyAllSource();
      say(
        "success",
        `Copied ${PROJECT_FILES.length + 1} files to your clipboard. Paste into a .txt file and split on the "=== FILE:" markers.`
      );
    } catch {
      setSourceOpen(true);
      say("info", "Clipboard is blocked here — the source view opened instead. Use “Select all”, then Ctrl+C.");
    }
  };

  /* --------------------------- source view ------------------------- */

  useEffect(() => {
    if (!sourceOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSourceOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sourceOpen]);

  const selectAllSource = () => {
    const el = sourceRef.current;
    if (!el) return;
    el.focus();
    el.select();
    say("info", "All source selected — press Ctrl+C (⌘C on Mac) to copy it.");
  };

  /* ------------------------------ render --------------------------- */

  return (
    <>
      <PageHeader
        eyebrow="Source archive"
        title="Take the whole project with you"
        description={`The complete, buildable source — ${PROJECT_FILES.length + 1} files, ${formatKb(
          totalSourceBytes
        )} uncompressed — packed into ${ZIP_NAME} right in your browser. Four independent ways to get it below; at least one always works.`}
      />

      {inFrame && (
        <div className="wrap pt-8">
          <div className="border-brass-500/40 bg-brass-100/60 flex items-start gap-3 rounded-lg border px-5 py-4">
            <IconAlert className="text-brass-600 mt-0.5 h-5 w-5 shrink-0" />
            <div className="text-sm leading-relaxed">
              <p className="font-display text-navy-900 font-bold">
                You're viewing this page inside a preview frame.
              </p>
              <p className="text-ink-soft mt-1">
                Preview frames often silently swallow file downloads.{" "}
                <strong className="text-navy-900">Download ZIP</strong> therefore tries a
                native Save&nbsp;As dialog first, then a new browser tab. If both are
                blocked, <strong className="text-navy-900">Copy all source</strong> or{" "}
                <strong className="text-navy-900">Show source</strong> will always get the
                files to you.
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="wrap grid gap-10 py-12 sm:py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="card overflow-hidden">
              {/* Header */}
              <div className="border-line bg-parchment/60 border-b px-6 py-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-navy-900 font-bold tracking-tight">
                      {ZIP_NAME}
                    </h2>
                    <p className="text-ink-soft mt-0.5 text-xs">
                      {PROJECT_FILES.length + 1} files
                      {zipSize !== null && <> · {formatKb(zipSize)} zipped</>} ·{" "}
                      {formatKb(totalSourceBytes)} source
                    </p>
                  </div>

                  {verification && (
                    <span className="border-moss-600/30 bg-moss-100 text-moss-600 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold">
                      <IconCheck className="h-3.5 w-3.5" />
                      Verified · {verification.entries} entries incl. README.md
                    </span>
                  )}
                  {verifyFailed && (
                    <span className="border-clay-600/30 bg-clay-100 text-clay-600 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold">
                      <IconAlert className="h-3.5 w-3.5" />
                      Verification failed
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="border-line space-y-4 border-b px-6 py-6">
                <div className="flex flex-wrap items-center gap-3">
                  {phase === "ready" && zipUrl ? (
                    <>
                      <button type="button" onClick={() => void handleDownload()} className="btn-primary">
                        <IconTooth className="h-4 w-4" />
                        Download ZIP
                      </button>
                      <button type="button" onClick={handleNewTab} className="btn-outline">
                        <IconArrowUpRight className="h-4 w-4" />
                        Open in new tab
                      </button>
                      <button type="button" onClick={() => void handleCopy()} className="btn-outline">
                        Copy all source
                      </button>
                      <button type="button" onClick={() => setSourceOpen(true)} className="btn-outline">
                        Show source
                      </button>
                    </>
                  ) : phase === "error" ? (
                    <span className="text-clay-600 inline-flex items-center gap-2 text-sm font-semibold">
                      <IconAlert className="h-4 w-4" />
                      The archive could not be built.
                    </span>
                  ) : (
                    <span className="btn-primary pointer-events-none opacity-70">
                      <IconSpinner className="h-4 w-4 animate-spin" />
                      Packing archive…
                    </span>
                  )}
                </div>

                {/* Manual anchor link — right-click → Save link as… */}
                {phase === "ready" && zipUrl && (
                  <p className="text-xs leading-relaxed">
                    <span className="text-ink-soft">Prefer a plain link? </span>
                    <a
                      href={zipUrl}
                      download={ZIP_NAME}
                      className="text-tide-700 hover:text-navy-900 font-semibold underline underline-offset-2"
                    >
                      {ZIP_NAME}
                    </a>
                    <span className="text-ink-soft"> — click it, or right-click → “Save link as…”.</span>
                  </p>
                )}

                {status && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`flex items-start gap-2 rounded-md border px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      status.tone === "success"
                        ? "border-moss-600/30 bg-moss-100 text-moss-600"
                        : status.tone === "error"
                          ? "border-clay-600/30 bg-clay-100 text-clay-600"
                          : "border-line bg-paper text-ink-soft"
                    }`}
                  >
                    {status.tone === "error" ? (
                      <IconAlert className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    <span>{status.text}</span>
                  </p>
                )}
              </div>

              {/* File list */}
              <ul className="chat-scroll max-h-[24rem] overflow-y-auto px-2 py-2">
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

        {/* Right column */}
        <div className="space-y-6 lg:col-span-5">
          <Reveal delay={80}>
            <div className="card p-6 sm:p-7">
              <h2 className="font-display text-navy-900 text-lg font-bold tracking-tight">
                If the button does nothing
              </h2>
              <ol className="mt-4 space-y-4">
                {[
                  {
                    t: "A native Save As dialog should appear",
                    d: "Download ZIP first tries your operating system's file picker (Chrome & Edge on Windows). That path ignores the preview's download restrictions entirely.",
                  },
                  {
                    t: "Otherwise a new tab opens",
                    d: "The ZIP opens in a top-level browser tab outside the frame and downloads there. If it's blocked, allow popups for this site and click again.",
                  },
                  {
                    t: "Copy all source — always works",
                    d: `All ${PROJECT_FILES.length + 1} files go to your clipboard as marked text. Paste into a file; split on the "=== FILE:" markers.`,
                  },
                  {
                    t: "Show source — the last resort",
                    d: "Opens the entire source on screen with one “Select all” button. Copy it manually with Ctrl+C and save it on your machine.",
                  },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-3.5">
                    <span className="font-display text-brass-500 pt-0.5 text-sm font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-navy-900 text-sm font-bold">{s.t}</p>
                      <p className="text-ink-soft mt-0.5 text-[13px] leading-relaxed">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="border-line text-ink-soft mt-5 border-t pt-4 text-xs leading-relaxed">
                Archive integrity: {manifest.ok ? "✓" : "✗"} {manifest.files} source files
                bundled, all non-empty · README.md included · verified by reading the ZIP
                back after generation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card p-6 sm:p-7">
              <h2 className="font-display text-navy-900 text-lg font-bold tracking-tight">
                Running it locally
              </h2>
              <ol className="mt-4 space-y-4">
                {SETUP_STEPS.map((s, i) => (
                  <li key={s.cmd} className="flex gap-3.5">
                    <span className="font-display text-brass-500 pt-0.5 text-sm font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <code className="bg-navy-900 text-paper rounded px-2 py-1 font-mono text-[13px]">
                        {s.cmd}
                      </code>
                      <p className="text-ink-soft mt-1.5 text-[13px] leading-relaxed">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Source view modal — guaranteed egress */}
      {sourceOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-950/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Complete project source"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSourceOpen(false);
          }}
        >
          <div className="border-line bg-paper flex h-[min(44rem,90dvh)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border shadow-2xl">
            <div className="border-line bg-shell flex items-center justify-between gap-4 border-b px-5 py-3.5">
              <div>
                <h3 className="font-display text-navy-900 text-sm font-bold">
                  Complete project source
                </h3>
                <p className="text-ink-soft text-xs">
                  {PROJECT_FILES.length + 1} files · {formatKb(totalSourceBytes)} · split on
                  the “=== FILE:” markers
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={selectAllSource} className="btn-outline h-9 px-3.5 text-[13px]">
                  Select all
                </button>
                <button
                  type="button"
                  onClick={() => setSourceOpen(false)}
                  aria-label="Close source view"
                  className="text-ink-soft hover:bg-navy-50 hover:text-navy-900 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md transition-colors"
                >
                  <IconClose className="h-4 w-4" />
                </button>
              </div>
            </div>
            <textarea
              ref={sourceRef}
              readOnly
              spellCheck={false}
              aria-label="Project source text"
              className="chat-scroll bg-navy-950 text-navy-100 flex-1 resize-none p-5 font-mono text-xs leading-relaxed focus:outline-none"
              defaultValue={buildSourceText()}
            />
            <p className="border-line bg-shell text-ink-soft border-t px-5 py-2.5 text-[11px]">
              Press Ctrl+A inside the box (or use “Select all”), then Ctrl+C — paste into
              a text file on your machine. Esc closes this view.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
