import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./reveal";
import { Container } from "./primitives";

export default function JoinBand() {
  return (
    <section
      id="join"
      aria-labelledby="join-title"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <Reveal className="mx-auto max-w-3xl rounded-2xl bg-accent/[0.06] px-6 py-12 text-center ring-1 ring-inset ring-accent/15 sm:px-12 sm:py-16">
          <h2
            id="join-title"
            className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Join the network shaping water-based development
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
            ZEDAS is growing through international collaboration. Researchers,
            governments, companies, universities, and development organizations
            are invited to join.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 text-[15px] font-semibold text-muted"
            >
              Join the Network
              <span className="rounded-full border border-border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                Soon
              </span>
            </button>
            <Link
              href="/map"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              In the meantime, explore the Global Map
              <ArrowRight
                className="size-4 transition-transform duration-200 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
