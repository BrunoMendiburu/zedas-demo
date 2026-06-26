import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Reveal from "./reveal";
import { Container } from "./primitives";

// Data partners shown beneath the Pilot map. Logos are read dynamically from
// /public/carrusel at render time — drop any .png into that folder and it shows
// up in the strip. The filename becomes the alt text ("LatamWater.png" → "Latam
// Water", "UNDelta.png" → "UN Delta"); the PNG's own pixels set the aspect ratio.
// No code edit needed to add / remove / reorder logos — order is alphabetical by
// filename, so prefix with 01_, 02_, … to control it. The landing page is
// statically rendered, so production reflects new files on the next build;
// `next dev` shows them on refresh.

type Partner = {
  src: string;
  alt: string;
  width: number;
  height: number;
  cap: string;
};

const CARRUSEL_DIR = join(process.cwd(), "public", "carrusel");

// Optional: nicer alt text for specific files, keyed by lowercase base filename.
// Anything without an entry falls back to a humanized version of its filename.
const ALT_OVERRIDES: Record<string, string> = {
  caa: "Cámara Argentina del Agua",
};

// Per-logo optical-weight correction. The source PNGs are trimmed to their
// artwork (see scripts/trim), so a single cap already gives near-equal height;
// these caps are the finer "equal visual weight" pass — the heaviest wordmark is
// held back a touch, lighter lockups fill a touch more. Each caps the mark's
// height to a % of the cell. Keyed by lowercase base filename; anything else uses
// DEFAULT_CAP. Tuned by eye from a screenshot.
const DEFAULT_CAP = "max-h-[80%]";
const CAP_OVERRIDES: Record<string, string> = {
  latamwater: "max-h-[74%]", // bold black wordmark — heaviest, so hold it back
  caa: "max-h-[82%]", // blue wordmark + fine subtitle — mid weight
  undelta: "max-h-[84%]", // lighter lockup + subtitle — let it fill a touch more
};

// A PNG's width/height live in its IHDR chunk (big-endian) right after the 8-byte
// signature — read them straight from the header, no image library needed.
function pngSize(buf: Buffer): { width: number; height: number } | null {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function humanize(file: string): string {
  return file
    .replace(/\.[^.]+$/, "") // drop extension
    .replace(/[_-]+/g, " ") // separators → spaces
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // "UNDelta" → "UN Delta"
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // "LatamWater" → "Latam Water"
    .replace(/\s+/g, " ")
    .trim();
}

function readPartners(): Partner[] {
  let files: string[];
  try {
    files = readdirSync(CARRUSEL_DIR).filter((f) => /\.png$/i.test(f));
  } catch {
    return []; // folder missing → render nothing
  }
  return files
    .sort((a, b) => a.localeCompare(b))
    .map((file): Partner | null => {
      const dim = pngSize(readFileSync(join(CARRUSEL_DIR, file)));
      if (!dim) return null;
      const base = file.replace(/\.[^.]+$/, "").toLowerCase();
      return {
        src: `/carrusel/${encodeURIComponent(file)}`,
        alt: ALT_OVERRIDES[base] ?? humanize(file),
        width: dim.width,
        height: dim.height,
        cap: CAP_OVERRIDES[base] ?? DEFAULT_CAP,
      };
    })
    .filter((p): p is Partner => p !== null);
}

// Uniform slot for every logo. The cell (not the image) defines the footprint;
// the image is centred inside it and scaled by object-contain up to its per-logo
// cap — so sizing is consistent and nothing is ever stretched.
const CELL_CLASS =
  "flex h-12 w-40 shrink-0 items-center justify-center md:h-14 md:w-48";

// Soft, uniform 60% so the strip reads as a quiet wall, not a row of loud badges.
// Each mark lifts to full on hover (the marquee also pauses then). Only ever an
// auto dimension plus max caps — never a fixed width AND height — so object-
// contain has nothing to distort.
const LOGO_CLASS =
  "h-auto w-auto max-w-full object-contain opacity-60 transition-opacity duration-300 hover:opacity-100";

function Logo({
  partner,
  decorative = false,
}: {
  partner: Partner;
  decorative?: boolean;
}) {
  return (
    <Image
      src={partner.src}
      alt={decorative ? "" : partner.alt}
      width={partner.width}
      height={partner.height}
      sizes="192px"
      className={`${LOGO_CLASS} ${partner.cap}`}
    />
  );
}

function MarqueeGroup({
  group,
  baseCount,
  hidden = false,
}: {
  group: Partner[];
  baseCount: number;
  hidden?: boolean;
}) {
  // The trailing padding equals the inter-item gap, so the spacing across the
  // group boundary matches the spacing within a group — no wider/narrower seam.
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16"
    >
      {group.map((partner, i) => (
        <li key={i} className={CELL_CLASS}>
          {/* Announce each partner once: real alt on the first pass, decorative
              on the repeats; the entire duplicate group is aria-hidden. */}
          <Logo partner={partner} decorative={hidden || i >= baseCount} />
        </li>
      ))}
    </ul>
  );
}

export default function PartnersMarquee() {
  const partners = readPartners();
  if (partners.length === 0) return null;

  // Repeat the set enough times that one group is wider than the viewport, so it
  // reads as a continuous strip. The marquee stacks two identical groups and
  // slides by one group width (translateX(-50%)) for a seamless loop.
  const repeat = Math.max(2, Math.ceil(12 / partners.length));
  const group = Array.from({ length: repeat }, () => partners).flat();

  return (
    <section
      aria-label="Data partners"
      className="border-t border-border py-16 md:py-24"
    >
      <Container>
        <Reveal
          as="p"
          className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted"
        >
          Data partners
        </Reveal>
      </Container>

      {/* Animated strip — full-bleed, with a symmetric edge fade (a mask, so it
          sits cleanly over the flat surface). Hidden under reduced motion;
          the static row below takes over. */}
      <div className="zd-marquee group relative mt-8 overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] motion-reduce:hidden md:mt-10">
        <div className="flex w-max [animation:zedas-marquee_38s_linear_infinite] group-hover:[animation-play-state:paused]">
          <MarqueeGroup group={group} baseCount={partners.length} />
          <MarqueeGroup group={group} baseCount={partners.length} hidden />
        </div>
      </div>

      {/* Reduced-motion fallback: one static, centered row of the marks. */}
      <Container className="mt-8 hidden motion-reduce:block md:mt-10">
        <ul className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {partners.map((partner) => (
            <li key={partner.src} className={CELL_CLASS}>
              <Logo partner={partner} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
