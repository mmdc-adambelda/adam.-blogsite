import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h-display mt-1 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {children && <p className="mt-3 text-cream/65">{children}</p>}
    </div>
  );
}
