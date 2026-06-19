import { Droplets, LineChart, Sprout, Globe } from "lucide-react";
import Reveal from "./reveal";
import { Container, Eyebrow } from "./primitives";

const REASONS = [
  {
    icon: Droplets,
    title: "Water First",
    body: "Water becomes the primary variable for industrial location decisions.",
  },
  {
    icon: LineChart,
    title: "Smarter Investment",
    body: "Helping governments and investors identify resilient opportunities.",
  },
  {
    icon: Sprout,
    title: "Sustainable Production",
    body: "Supporting economic growth while protecting freshwater resources.",
  },
  {
    icon: Globe,
    title: "Global Cooperation",
    body: "Building a common language for water-based development.",
  },
];

export default function WhyZedas() {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>Why ZEDAS</Eyebrow>
          <h2
            id="why-title"
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Four shifts behind a water-first approach
          </h2>
        </Reveal>

        <Reveal
          stagger={0.07}
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {REASONS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col bg-surface p-7">
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-inset ring-accent/15">
                <Icon className="size-5" aria-hidden strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {body}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
