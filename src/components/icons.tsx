import type { ReactNode } from "react";
import type { ServiceIconKey } from "../data/clinic";

export interface IconProps {
  className?: string;
}

function Svg({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

/* ------------------------- Brand & treatments ---------------------- */

const TOOTH_PATH =
  "M12 5.6C10.8 4.7 9.5 4.2 8.1 4.2 5.4 4.2 3.6 6.3 3.6 8.9c0 4.8 2 11 3.7 11 1.8 0 1.4-6.3 4.7-6.3s2.9 6.3 4.7 6.3c1.7 0 3.7-6.2 3.7-11 0-2.6-1.8-4.7-4.5-4.7-1.4 0-2.7.5-3.9 1.4Z";

export const IconTooth = (p: IconProps) => (
  <Svg {...p}>
    <path d={TOOTH_PATH} />
  </Svg>
);

export const IconGeneral = (p: IconProps) => (
  <Svg {...p}>
    <path d={TOOTH_PATH} />
    <path d="M9.4 10.6l1.8 1.8 3.3-3.9" />
  </Svg>
);

export const IconCleaning = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13.4 6.8c-1-.8-2.1-1.2-3.3-1.2-2.3 0-3.8 1.8-3.8 4 0 4.1 1.7 9.4 3.2 9.4 1.5 0 1.2-5.4 4-5.4s2.5 5.4 4 5.4c1.5 0 3.2-5.3 3.2-9.4 0-2.2-1.5-4-3.8-4-1.2 0-2.3.4-3.5 1.2Z" />
    <path d="M5 4.6v3M3.5 6.1h3" />
    <path d="M7.2 10.6l1.2 1.1" />
  </Svg>
);

export const IconWhitening = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 6.6c-1.1-.8-2.2-1.2-3.4-1.2-2.3 0-3.8 1.8-3.8 4.1 0 4.2 1.7 9.5 3.2 9.5 1.5 0 1.2-5.5 4-5.5s2.5 5.5 4 5.5c1.5 0 3.2-5.3 3.2-9.5 0-2.3-1.5-4.1-3.8-4.1-1.2 0-2.3.4-3.4 1.2Z" />
    <path d="M12 1.6v1.8M6.6 2.8l.9 1.6M17.4 2.8l-.9 1.6" />
  </Svg>
);

export const IconImplant = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8.6 3.2h6.8l-.7 3.4H9.3L8.6 3.2Z" />
    <path d="M10.4 6.6h3.2" />
    <path d="M9.4 8.4h5.2l-.6 9.3c-.1 1.6-.9 2.9-2 2.9s-1.9-1.3-2-2.9l-.6-9.3Z" />
    <path d="M9.7 11h4.6M10 13.6h4M10.3 16.2h3.4" />
  </Svg>
);

export const IconRoot = (p: IconProps) => (
  <Svg {...p}>
    <path d={TOOTH_PATH} />
    <path d="M12 7.6v3.2" />
    <path d="M12 10.8c-1.5 1.9-2.1 4.5-2.3 7.2M12 10.8c1.5 1.9 2.1 4.5 2.3 7.2" />
  </Svg>
);

export const IconCosmetic = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 9.2c.9 5.3 4 8.6 7.5 8.6s6.6-3.3 7.5-8.6" />
    <path d="M4.5 9.2c2.4 1.3 4.9 1.9 7.5 1.9s5.1-.6 7.5-1.9" />
    <path d="M12 3l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6L12 3Z" />
  </Svg>
);

export const IconOrtho = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 18C4.5 10.8 7.9 6 12 6s7.5 4.8 7.5 12" />
    <path d="M5.4 13.6c1.9-1.5 4.2-2.3 6.6-2.3s4.7.8 6.6 2.3" />
    <rect x="10.6" y="10" width="2.8" height="2.6" rx="0.6" />
    <rect x="5.6" y="12.4" width="2.5" height="2.4" rx="0.6" />
    <rect x="15.9" y="12.4" width="2.5" height="2.4" rx="0.6" />
  </Svg>
);

export const IconPediatric = (p: IconProps) => (
  <Svg {...p}>
    <path d={TOOTH_PATH} transform="translate(3.4 4.6) scale(0.72)" />
    <path d="M6.1 3.2c-.8-1.3-3-1-3 .8 0 1.1 1.7 2.3 3 3.1 1.3-.8 3-2 3-3.1 0-1.8-2.2-2.1-3-.8Z" />
  </Svg>
);

export const IconCrown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 3.4l1.6 2.2L12 3.2l2.4 2.4L16 3.4l-.7 3.2H8.7L8 3.4Z" />
    <path d="M12 9.6c-.9-.7-1.9-1-2.9-1-1.9 0-3.2 1.5-3.2 3.3 0 3.4 1.4 7.8 2.7 7.8 1.3 0 1-4.5 3.4-4.5s2.1 4.5 3.4 4.5c1.3 0 2.7-4.4 2.7-7.8 0-1.8-1.3-3.3-3.2-3.3-1 0-2 .3-2.9 1Z" />
  </Svg>
);

export const IconEmergency = (p: IconProps) => (
  <Svg {...p}>
    <path d={TOOTH_PATH} />
    <path
      d="M13.3 7.4l-3.5 4.7h2.7l-1.1 4.5 3.7-5.4h-2.7l.9-3.8Z"
      fill="currentColor"
      stroke="none"
    />
  </Svg>
);

export const SERVICE_ICONS: Record<
  ServiceIconKey,
  (p: IconProps) => ReactNode
> = {
  general: IconGeneral,
  cleaning: IconCleaning,
  whitening: IconWhitening,
  implant: IconImplant,
  root: IconRoot,
  cosmetic: IconCosmetic,
  ortho: IconOrtho,
  pediatric: IconPediatric,
  crown: IconCrown,
  emergency: IconEmergency,
};

/* ------------------------------ Values ----------------------------- */

export const IconShield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l7 2.6v5.7c0 4.6-3 8-7 9.7-4-1.7-7-5.1-7-9.7V5.6L12 3Z" />
    <path d="M9 11.6l2.1 2.1 4-4.5" />
  </Svg>
);

export const IconLeaf = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 19.5C5.5 10.5 11.5 5 19.5 4.8c.3 8.2-4.5 14.7-12.5 14.7" />
    <path d="M5.5 19.5C7.5 14 10.5 10.5 15 8.5" />
  </Svg>
);

export const IconDiamond = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 4h10l3 5-8 11L4 9l3-5Z" />
    <path d="M4 9h16M12 20L9 9l3-5 3 5-3 11" />
  </Svg>
);

export const IconHeart = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 19.8S4.8 15.4 3.4 10.9C2.5 8 4.4 5.3 7.1 5.3c1.9 0 3.5 1 4.9 3 1.4-2 3-3 4.9-3 2.7 0 4.6 2.7 3.7 5.6C19.2 15.4 12 19.8 12 19.8Z" />
  </Svg>
);

export const VALUE_ICONS = {
  shield: IconShield,
  leaf: IconLeaf,
  diamond: IconDiamond,
  heart: IconHeart,
};

/* --------------------------- Technology ---------------------------- */

export const IconScan = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.2" y="4.2" width="17.6" height="11.6" rx="1.6" />
    <path d="M12 15.8v3.4M8.6 19.2h6.8" />
    <path d="M12 7.6c-.6-.4-1.2-.7-1.9-.7-1.2 0-2 .9-2 2 0 2 1 4.6 1.8 4.6.8 0 .6-2.6 2.1-2.6s1.3 2.6 2.1 2.6c.8 0 1.8-2.6 1.8-4.6 0-1.1-.8-2-2-2-.7 0-1.3.3-1.9.7Z" />
  </Svg>
);

/* ------------------------------- UI -------------------------------- */

export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.8 3.8h2.9l1.4 3.9-1.9 1.5a12.9 12.9 0 0 0 5.6 5.6l1.5-1.9 3.9 1.4v2.9c0 1.1-.9 2.1-2 2-7.3-.4-13.1-6.2-13.4-13.4 0-1.1.9-2 2-2Z" />
  </Svg>
);

export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.2" y="5.2" width="17.6" height="13.6" rx="1.8" />
    <path d="M4.5 7.5l7.5 5.6 7.5-5.6" />
  </Svg>
);

export const IconPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21.3c-3.8-3.3-6.8-6.6-6.8-10.2a6.8 6.8 0 1 1 13.6 0c0 3.6-3 6.9-6.8 10.2Z" />
    <circle cx="12" cy="11" r="2.4" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.4V12l3 2.1" />
  </Svg>
);

export const IconStar = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 3.3l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.5l5.9-.8L12 3.3Z" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12.6l4.4 4.4L19 7.4" />
  </Svg>
);

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </Svg>
);

export const IconArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17L17 7M9.5 7H17v7.5" />
  </Svg>
);

export const IconChat = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.6a8.6 8.6 0 0 0-7.4 12.9L3.4 20l3.7-1.1A8.6 8.6 0 1 0 12 3.6Z" />
    <path d="M8.6 12h.01M12 12h.01M15.4 12h.01" strokeWidth={2.4} />
  </Svg>
);

export const IconSend = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 11.3L19.5 4.5l-4.3 15-3.9-6.4L4 11.3Z" />
    <path d="M11.3 13.1l8.2-8.6" />
  </Svg>
);

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const IconAlert = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4.5L2.9 19.8h18.2L12 4.5Z" />
    <path d="M12 10.2v4M12 17.1v.1" />
  </Svg>
);

export const IconChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 9.5l6 6 6-6" />
  </Svg>
);

export const IconQuote = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M9.6 6.8C6.6 8 5 10.3 5 13c0 2.3 1.4 3.9 3.4 3.9 1.8 0 3.1-1.3 3.1-3.1 0-1.7-1.2-2.9-2.9-2.9h-.5c.3-1.5 1.3-2.7 3-3.6l-1.5-.5Zm8 0c-3 1.2-4.6 3.5-4.6 6.2 0 2.3 1.4 3.9 3.4 3.9 1.8 0 3.1-1.3 3.1-3.1 0-1.7-1.2-2.9-2.9-2.9h-.5c.3-1.5 1.3-2.7 3-3.6l-1.5-.5Z" />
  </svg>
);

export const IconSpinner = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="42"
      strokeDashoffset="30"
    />
  </svg>
);

/* ----------------------------- Socials ----------------------------- */

export const IconFacebook = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M13.4 21v-6.9h2.5l.5-3h-3V9.2c0-.9.3-1.6 1.7-1.6h1.4V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.7v2.6H8v3h2.6V21h2.8Z" />
  </svg>
);

export const IconInstagram = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <path d="M17.2 6.8h.01" strokeWidth={2.6} />
  </Svg>
);

export const IconWhatsApp = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 3.6a8.4 8.4 0 0 0-7.2 12.7L3.6 20.4l4.2-1.1A8.4 8.4 0 1 0 12 3.6Zm0 1.9a6.5 6.5 0 1 1-3.3 12.1l-.5-.3-2.1.6.6-2-.3-.5A6.5 6.5 0 0 1 12 5.5Zm-2.5 3.2c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.2.9 2.4 1 2.6.1.2 1.9 3 4.6 4 2.3.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3-1.8-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a5.4 5.4 0 0 1-2.7-2.4c-.1-.2 0-.3.1-.5l.5-.6c.1-.2.1-.4 0-.6l-.8-1.8c-.2-.5-.4-.6-.9-.6Z" />
  </svg>
);
