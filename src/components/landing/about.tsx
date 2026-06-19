import Reveal from "./reveal";
import { Container, Eyebrow } from "./primitives";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28 lg:py-32"
    >
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow>About ZEDAS</Eyebrow>
          <h2
            id="about-title"
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            A new question for an era of water scarcity
          </h2>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:pt-1" delay={0.05}>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            ZEDAS — Water Availability and Water-Resilient Economic Zones — is
            an international initiative combining hydrology, economics,
            industrial policy, and geospatial intelligence to identify
            territories suitable for sustainable production. Rather than asking
            how industries can adapt to water scarcity, ZEDAS asks:
          </p>
          <p className="mt-6 max-w-2xl text-balance text-2xl font-semibold leading-snug tracking-[-0.01em] text-foreground sm:text-[1.75rem]">
            Where should future industries be located according to water
            availability?
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
