import type { ReactNode } from "react";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** A small, named section label. Used as deliberate wayfinding (it mirrors the
 *  nav), not as a decorative kicker over every block. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.16em] text-accent ${className}`}
    >
      {children}
    </p>
  );
}

/** A Phase-2 destination that doesn't exist yet — rendered as a quiet,
 *  non-navigating link with an honest "Coming soon" tag (brief §4). */
export function FuturePageLink({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-disabled="true"
      className={`inline-flex items-center gap-2 text-sm font-medium text-muted ${className}`}
    >
      {children}
      <span className="rounded-full border border-border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
        Soon
      </span>
    </span>
  );
}
