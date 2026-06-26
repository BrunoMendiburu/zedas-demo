import Reveal from "./reveal";
import { Container, Eyebrow, Measure } from "./primitives";
import { PROJECT_LEAD, FOCAL_POINTS } from "@/lib/focal-points";

// A sober, typographic roster of the project's focal points — name + country
// only, grouped by region, with the project lead set apart on top. No photos,
// cards, borders, or affiliations: hierarchy is carried by type and quiet
// hairline dividers (brief). Gonzalo intentionally appears both as the lead here
// and inside Argentina's list in the roster — both are kept.
export default function FocalPoints() {
  return (
    <section
      id="focal-points"
      aria-labelledby="focal-points-title"
      className="scroll-mt-20 py-20 sm:py-28 lg:py-32"
    >
      <Container>
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <Reveal className="max-w-3xl">
          <Eyebrow>The Network</Eyebrow>
          <h2
            id="focal-points-title"
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            The people behind the pilot
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            The pilot is powered by focal points across the DFC National Network.
          </p>
        </Reveal>

        {/* ── Project Direction — set apart above the roster, no card ─────── */}
        <Reveal
          delay={0.05}
          className="mt-12 border-t border-border pt-10 sm:mt-14 sm:pt-12"
        >
          <Measure>Project Direction</Measure>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">
            {PROJECT_LEAD.name}
          </p>
          <p className="mt-1 text-sm font-medium text-muted">
            {PROJECT_LEAD.role}
          </p>
        </Reveal>

        {/* ── Roster, grouped by region ──────────────────────────────────── */}
        {FOCAL_POINTS.map((region) => (
          <Reveal
            key={region.region}
            className="mt-12 border-t border-border pt-10 sm:mt-16 sm:pt-12"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              {region.region}
            </h3>
            <div className="mt-7 grid grid-cols-1 items-start gap-x-8 gap-y-9 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
              {region.entries.map((entry) => (
                <div key={entry.iso3}>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                    {entry.country}
                  </h4>
                  <ul className="mt-3 space-y-1.5">
                    {entry.names.map((name) => (
                      <li
                        key={name}
                        className="text-pretty text-[15px] leading-relaxed text-foreground/90"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
