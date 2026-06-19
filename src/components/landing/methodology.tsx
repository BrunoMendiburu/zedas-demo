import Reveal from "./reveal";
import { Container, Eyebrow, FuturePageLink } from "./primitives";

// Six assessment dimensions (verbatim names from the brief), each with a short,
// accurate gloss. Numbered because this is a real, ordered framework — not
// decorative scaffolding.
const DIMENSIONS = [
  {
    name: "Water Availability",
    gloss:
      "Renewable resources and per-capita supply that set the ceiling for new demand.",
  },
  {
    name: "Supply Capacity & Resilience",
    gloss: "Storage, variability, and the ability to absorb drought and shocks.",
  },
  {
    name: "Water Quality",
    gloss: "Whether available water meets the standards a given industry needs.",
  },
  {
    name: "Treatment, Reuse & Efficiency",
    gloss: "How far each cubic metre is stretched through reuse and productivity.",
  },
  {
    name: "Water–Industry Compatibility",
    gloss: "Matching sectoral water intensity to what a territory can sustain.",
  },
  {
    name: "Legislation",
    gloss: "The governance, rights, and rules that direct allocation and use.",
  },
];

export default function Methodology() {
  return (
    <section
      id="methodology"
      aria-labelledby="methodology-title"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>Methodology</Eyebrow>
          <h2
            id="methodology-title"
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Six dimensions, scored consistently
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Every territory is assessed across the same six dimensions, so that
            results are comparable from one country to the next.
          </p>
        </Reveal>

        <Reveal
          as="ol"
          stagger={0.05}
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {DIMENSIONS.map((d, i) => (
            <li key={d.name} className="flex flex-col bg-surface p-7">
              <span className="tnum text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                {d.name}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {d.gloss}
              </p>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-8">
          <FuturePageLink>Explore the full methodology</FuturePageLink>
        </Reveal>
      </Container>
    </section>
  );
}
