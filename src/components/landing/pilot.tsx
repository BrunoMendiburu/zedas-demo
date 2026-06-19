import Reveal from "./reveal";
import { Container, Eyebrow } from "./primitives";
import { COUNTRIES } from "@/lib/zedas-data";

const REGION_ORDER = ["Latin America", "Africa", "Asia"] as const;

export default function Pilot() {
  // Grounded in the live dataset (src/lib/zedas-data.ts) — the same 16 countries
  // the map colors, grouped by region.
  const byRegion = REGION_ORDER.map((region) => ({
    region,
    countries: COUNTRIES.filter((c) => c.region === region).map((c) => c.name),
  }));

  return (
    <section
      id="pilot"
      aria-labelledby="pilot-title"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>The Pilot</Eyebrow>
          <h2
            id="pilot-title"
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Sixteen countries, one standardized methodology
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            The pilot phase brings together National Focal Points, experts, and
            institutions from sixteen countries across Latin America, Africa,
            and Asia, developing the first standardized methodology for
            water-based economic planning.
          </p>
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.06}
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3"
        >
          {byRegion.map(({ region, countries }) => (
            <li key={region} className="bg-surface p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {region}
                </h3>
                <span className="tnum text-xs text-muted">
                  {countries.length}
                </span>
              </div>
              <ul className="mt-4 flex flex-col gap-2">
                {countries.map((name) => (
                  <li key={name} className="text-[15px] leading-snug text-muted">
                    {name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
