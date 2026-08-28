import { CLINIC } from "../data/clinic";
import { IconArrowUpRight } from "./icons";

/**
 * Stylized map placeholder. Swap the SVG for a real embed
 * (Google Maps / Mapbox) when API keys are provisioned.
 */
export default function MapCard() {
  return (
    <div className="card relative overflow-hidden">
      <svg
        viewBox="0 0 480 300"
        className="h-64 w-full sm:h-72"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={`Stylized map showing the location of ${CLINIC.name} at ${CLINIC.addressLine1}`}
      >
        <rect width="480" height="300" fill="#EAE5D8" />
        {/* city blocks */}
        <rect x="18" y="16" width="120" height="84" rx="6" fill="#E0DAC9" />
        <rect x="18" y="124" width="120" height="160" rx="6" fill="#E0DAC9" />
        <rect x="166" y="16" width="180" height="84" rx="6" fill="#E0DAC9" />
        <rect x="374" y="16" width="90" height="84" rx="6" fill="#E0DAC9" />
        <rect x="374" y="124" width="90" height="160" rx="6" fill="#E0DAC9" />
        <rect x="166" y="216" width="180" height="68" rx="6" fill="#E0DAC9" />
        {/* park */}
        <rect x="166" y="124" width="80" height="68" rx="6" fill="#CBE0DB" />
        <circle cx="196" cy="150" r="7" fill="#A9CDC4" />
        <circle cx="218" cy="168" r="9" fill="#A9CDC4" />
        <circle cx="188" cy="172" r="5" fill="#A9CDC4" />
        {/* streets */}
        <rect x="146" y="0" width="14" height="300" fill="#F6F2E8" />
        <rect x="352" y="0" width="14" height="300" fill="#F6F2E8" />
        <rect x="0" y="104" width="480" height="14" fill="#F6F2E8" />
        <rect x="0" y="198" width="480" height="12" fill="#F6F2E8" />
        {/* route accent */}
        <path
          d="M153 300V111H40"
          stroke="#B4893F"
          strokeWidth="2.5"
          strokeDasharray="5 6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M153 111H359"
          stroke="#B4893F"
          strokeWidth="2.5"
          strokeDasharray="5 6"
          fill="none"
          strokeLinecap="round"
        />
        {/* destination pin */}
        <g transform="translate(288 152)">
          <circle cx="0" cy="0" r="16" fill="#0C2737" opacity="0.12" />
          <path d="M0 14C-9 6-13 1-13-5a13 13 0 1 1 26 0c0 6-4 11-13 19Z" fill="#0C2737" />
          <circle cx="0" cy="-5" r="4.5" fill="#C8A25C" />
        </g>
      </svg>

      <div className="border-line bg-shell border-t p-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div>
          <p className="font-display text-navy-900 text-sm font-bold">{CLINIC.name}</p>
          <p className="text-ink-soft mt-0.5 text-[13px]">
            {CLINIC.addressLine1} · {CLINIC.addressLine2}
          </p>
        </div>
        <a
          href={CLINIC.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="text-tide-700 hover:text-navy-900 font-display mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors sm:mt-0"
        >
          Open in Google Maps
          <IconArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
