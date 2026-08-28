import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={`${centered ? "mx-auto text-center" : "max-w-2xl"} ${className}`}
    >
      <p className={`eyebrow ${light ? "text-brass-400" : "text-tide-600"} ${centered ? "justify-center" : ""}`}>
        {eyebrow}
      </p>
      <h2
        className={`font-display mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl ${
          light ? "text-paper" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 leading-relaxed ${light ? "text-navy-200" : "text-ink-soft"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
