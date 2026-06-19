import Reveal from "./reveal";
import { Container, Eyebrow, FuturePageLink } from "./primitives";
import ContourField from "./contour-field";

export default function Manifesto() {
  return (
    <section
      aria-labelledby="manifesto-title"
      className="relative scroll-mt-20 overflow-hidden border-t border-border bg-surface py-20 sm:py-28 lg:py-32"
    >
      <ContourField
        className="pointer-events-none absolute inset-0 h-full w-full text-accent opacity-[0.06] dark:opacity-[0.1]"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl">
          <Eyebrow>The Water Century</Eyebrow>
          <figure className="mt-5">
            <blockquote
              id="manifesto-title"
              className="text-balance text-2xl font-medium leading-snug tracking-[-0.01em] text-foreground sm:text-[1.875rem] sm:leading-[1.3]"
            >
              For more than two centuries, the geography of development was
              shaped by coal, oil, ports, labor, and capital. Today water is
              emerging as the defining strategic asset of the twenty-first
              century. The question is no longer how to bring water to
              production — production must adapt to water.
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <span className="text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-[-0.01em] text-accent">
                Production follows water.
              </span>
              <FuturePageLink>Read the full manifesto</FuturePageLink>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
