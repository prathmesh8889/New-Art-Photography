import { useMemo, useState } from "react";
import { CATEGORIES, PORTFOLIO, type Category, type PortfolioItem } from "../data";
import Lightbox from "./Lightbox";
import { IconArrow, IconCamera, Reveal, SectionHead } from "./ui";

type Filter = "All" | Category;

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items: PortfolioItem[] = useMemo(
    () => (filter === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter)),
    [filter]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: PORTFOLIO.length };
    for (const cat of CATEGORIES) c[cat] = PORTFOLIO.filter((p) => p.category === cat).length;
    return c;
  }, []);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            index="02"
            kicker="Portfolio"
            title={
              <>
                Frames we are
                <br />
                <em className="text-gold italic">quietly proud</em> of.
              </>
            }
            sub="A slice of recent work — weddings, pre-wedding escapes and the unscripted chaos in between. Tap any frame to view it large."
          />
          <Reveal delay={200} className="shrink-0">
            <div className="flex items-center gap-3 text-fog">
              <IconCamera size={20} className="text-gold" />
              <p className="max-w-[220px] text-[13px] leading-snug">
                Every gallery is colour-graded frame by frame, by hand.
              </p>
            </div>
          </Reveal>
        </div>

        {/* filters */}
        <Reveal delay={140}>
          <div className="mt-12 flex flex-wrap gap-2.5 border-b border-line/70 pb-6">
            {(["All", ...CATEGORIES] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`group flex items-center gap-2 border px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${
                  filter === f
                    ? "border-gold bg-gold text-ink"
                    : "border-line text-sand hover:border-gold/60 hover:text-cream"
                }`}
              >
                {f}
                <span className={`text-[10px] font-bold ${filter === f ? "text-ink/60" : "text-fog"}`}>
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* masonry */}
        <div key={filter} className="mt-10 columns-2 gap-4 md:columns-3 md:gap-5 [column-fill:balance]">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 90} className="mb-4 break-inside-avoid md:mb-5">
              <figure
                className="group relative cursor-zoom-in overflow-hidden border border-line/60 bg-coal"
                onClick={() => setLightbox(i)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className={`w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.06] ${
                    item.ratio === "tall" ? "aspect-[3/4]" : item.ratio === "wide" ? "aspect-[4/3]" : "aspect-square"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* corner ticks */}
                <span className="absolute top-3 left-3 h-5 w-5 border-t-2 border-l-2 border-gold opacity-0 transition-all duration-500 group-hover:opacity-100" />
                <span className="absolute right-3 bottom-3 h-5 w-5 border-r-2 border-b-2 border-gold opacity-0 transition-all duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[10px] font-semibold tracking-[0.25em] text-gold uppercase">{item.category}</p>
                  <p className="font-display mt-1 text-lg leading-tight text-cream">{item.title}</p>
                  <p className="mt-0.5 text-[12px] text-sand">{item.place}</p>
                </figcaption>
                <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest text-fog uppercase">
                  0{item.id}
                </span>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-start justify-between gap-5 border border-line/70 bg-coal/50 px-6 py-6 sm:flex-row sm:items-center sm:px-8">
            <p className="font-display text-xl text-cream italic sm:text-2xl">
              Want a gallery like this for your wedding?
            </p>
            <a
              href="#booking"
              className="group inline-flex shrink-0 items-center gap-3 bg-gold px-6 py-3.5 text-sm font-bold text-ink transition-all hover:bg-goldsoft"
            >
              Check your date
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                <IconArrow size={15} />
              </span>
            </a>
          </div>
        </Reveal>
      </div>

      {lightbox !== null && (
        <Lightbox
          images={items.map((it) => ({ src: it.src, title: it.title }))}
          startIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
