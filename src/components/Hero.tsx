import type { CSSProperties } from "react";
import { IMG, MAPS_URL, MARQUEE_ITEMS } from "../data";
import { IconArrow, Reveal, Stars } from "./ui";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* breathing backdrop */}
      <div className="absolute inset-0">
        <img
          src={IMG.hero}
          alt="Bride and groom laughing at golden hour"
          className="kenburns h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />
      </div>

      {/* ghost watermark */}
      <div
        aria-hidden
        className="font-display pointer-events-none absolute -bottom-10 left-0 select-none text-[26vw] leading-none font-semibold italic text-cream/[0.04]"
      >
        New Art
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-14 px-5 pt-32 pb-20 sm:px-8 lg:grid-cols-12 lg:pt-36">
        {/* copy */}
        <div className="lg:col-span-7">
          <Reveal>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex flex-wrap items-center gap-2.5 border border-line/80 bg-ink/50 py-2 pr-4 pl-2.5 backdrop-blur-sm transition-colors hover:border-gold/60"
            >
              <Stars size={13} />
              <span className="text-[13px] font-semibold text-cream">5.0</span>
              <span className="text-[13px] text-sand">· 98 Google reviews</span>
              <span className="text-[11px] tracking-widest text-gold uppercase transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>

          <Reveal delay={110}>
            <p className="kicker mt-8">Wedding & Candid Photography — Darwha Rd, Yavatmal</p>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="font-display mt-5 text-[2.65rem] leading-[1.02] font-medium text-cream sm:text-6xl lg:text-[4.6rem]">
              Your wedding,
              <br />
              told in frames
              <br />
              of <em className="text-gold italic">golden light.</em>
            </h1>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-sand sm:text-lg">
              For 8+ years, New Art Photography has shot weddings across Vidarbha the honest way —
              candid first, colour-graded by hand, and delivered fast. No poses forced, no moment missed.
            </p>
          </Reveal>

          <Reveal delay={430}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#booking"
                className="group inline-flex items-center gap-3 bg-gold px-7 py-4 text-sm font-bold tracking-wide text-ink transition-all duration-300 hover:bg-goldsoft hover:shadow-[0_0_36px_rgba(217,164,65,0.4)]"
              >
                Book your date
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  <IconArrow size={16} />
                </span>
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-3 border border-sand/40 px-7 py-4 text-sm font-semibold text-cream transition-all duration-300 hover:border-gold hover:text-gold"
              >
                Browse the portfolio
              </a>
            </div>
          </Reveal>

          <Reveal delay={540}>
            <div className="mt-12 flex max-w-lg divide-x divide-line/80 border-t border-line/80 pt-6">
              {[
                ["350+", "weddings shot"],
                ["8+ yrs", "behind the lens"],
                ["15 days", "album delivery"],
              ].map(([n, t]) => (
                <div key={t} className="flex-1 px-4 first:pl-0">
                  <p className="font-display text-2xl font-semibold text-cream">{n}</p>
                  <p className="mt-1 text-[11px] tracking-[0.18em] text-fog uppercase">{t}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* scattered postcards */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="relative mx-auto h-[560px] max-w-[420px]">
            <div
              className="floaty absolute top-6 -left-10 z-10 w-44 rotate-[-7deg] border border-line bg-bark p-2 shadow-2xl shadow-black/60"
              style={{ "--fr": "-7deg" } as CSSProperties}
            >
              <img src={IMG.event1} alt="Sangeet night" className="h-32 w-full object-cover" />
              <p className="py-1.5 text-center text-[10px] tracking-[0.22em] text-fog uppercase">Sangeet · Ner</p>
            </div>

            <div className="group absolute top-0 right-0 z-20 w-[300px] rotate-[2.5deg] bg-cream p-3 pb-12 shadow-2xl shadow-black/70 transition-transform duration-700 ease-out hover:rotate-0 hover:scale-[1.03]">
              <img src={IMG.bride1} alt="Bridal portrait" className="h-[360px] w-full object-cover" />
              <p className="font-display absolute inset-x-0 bottom-3 text-center text-sm text-ink/70 italic">
                the bride, before the baraat
              </p>
            </div>

            <div
              className="floaty absolute -bottom-4 left-6 z-30 w-52 rotate-[5deg] border border-line bg-bark p-2 shadow-2xl shadow-black/60"
              style={{ "--fr": "5deg", animationDelay: "1.4s" } as CSSProperties}
            >
              <img src={IMG.prewed2} alt="Pre-wedding in marigold field" className="h-40 w-full object-cover" />
              <p className="py-1.5 text-center text-[10px] tracking-[0.22em] text-fog uppercase">Pre-wed · Wani</p>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="relative z-10 mb-6 ml-8 hidden items-center gap-3 sm:flex">
        <span className="block h-14 w-px overflow-hidden bg-line">
          <span className="scrollcue block h-full w-full bg-gold" />
        </span>
        <span className="text-[10px] font-semibold tracking-[0.4em] text-fog uppercase">Scroll</span>
      </div>

      <Marquee />
    </section>
  );
}

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative z-10 border-y border-line/70 bg-coal/90 py-4 backdrop-blur-sm">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="flex items-center" aria-hidden={i >= MARQUEE_ITEMS.length}>
            <span className="font-display px-6 text-lg font-medium tracking-wide text-sand italic">
              {item}
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--color-gold)" aria-hidden>
              <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
