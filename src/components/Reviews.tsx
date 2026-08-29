import { useEffect, useState } from "react";
import { MAPS_URL, RATING_BARS, REVIEWS } from "../data";
import { IconArrow, IconChevronL, IconChevronR, prefersReduced, Reveal, SectionHead, Stars } from "./ui";

export default function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = RATING_BARS.reduce((s, b) => s + b.count, 0);

  useEffect(() => {
    if (paused || prefersReduced()) return;
    const t = setInterval(() => setI((v) => (v + 1) % REVIEWS.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="reviews" className="relative border-t border-line/60 bg-coal/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="07"
          kicker="Word of Mouth"
          title={
            <>
              98 reviews.
              <br />
              <em className="text-gold italic">Not one below four stars.</em>
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* rating summary */}
          <Reveal className="lg:col-span-5">
            <div className="card flex h-full flex-col justify-between p-8 sm:p-10">
              <div>
                <div className="flex items-end gap-4">
                  <p className="font-display text-[5.5rem] leading-none font-semibold text-gold">5.0</p>
                  <div className="pb-3">
                    <Stars size={18} />
                    <p className="mt-1.5 text-[13px] text-sand">{total} Google reviews</p>
                  </div>
                </div>
                <div className="mt-8 space-y-2.5">
                  {RATING_BARS.map((b) => (
                    <div key={b.stars} className="flex items-center gap-3 text-[13px]">
                      <span className="w-7 font-semibold text-sand">{b.stars}★</span>
                      <span className="h-2 flex-1 overflow-hidden bg-line/50">
                        <span
                          className="block h-full bg-gold transition-all duration-1000"
                          style={{ width: `${(b.count / total) * 100}%` }}
                        />
                      </span>
                      <span className="w-8 text-right text-fog">{b.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="group mt-10 inline-flex items-center gap-3 border border-gold/60 px-6 py-3.5 text-sm font-bold text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
              >
                Read them on Google Maps
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  <IconArrow size={15} />
                </span>
              </a>
            </div>
          </Reveal>

          {/* rotating quotes */}
          <Reveal delay={160} className="lg:col-span-7">
            <div
              className="card relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden p-8 sm:p-12"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <span className="font-display absolute -top-8 left-4 text-[11rem] leading-none text-gold/10 select-none" aria-hidden>
                "
              </span>
              <div key={i} className="fade-up relative">
                <Stars size={15} className="mb-6" />
                <blockquote className="font-display text-xl leading-snug text-cream italic sm:text-2xl lg:text-[1.7rem]">
                  "{REVIEWS[i].quote}"
                </blockquote>
                <p className="mt-7 text-sm font-bold tracking-wide text-gold uppercase">{REVIEWS[i].names}</p>
                <p className="mt-1 text-[13px] text-fog">{REVIEWS[i].event}</p>
              </div>

              <div className="relative mt-10 flex items-center justify-between border-t border-line/70 pt-6">
                <div className="flex gap-2">
                  {REVIEWS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setI(idx)}
                      aria-label={`Show review ${idx + 1}`}
                      className={`h-1.5 transition-all duration-500 ${
                        idx === i ? "w-9 bg-gold" : "w-4 bg-line hover:bg-fog"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setI((v) => (v - 1 + REVIEWS.length) % REVIEWS.length)}
                    aria-label="Previous review"
                    className="flex h-10 w-10 items-center justify-center border border-line text-sand transition-colors hover:border-gold hover:text-gold"
                  >
                    <IconChevronL size={16} />
                  </button>
                  <button
                    onClick={() => setI((v) => (v + 1) % REVIEWS.length)}
                    aria-label="Next review"
                    className="flex h-10 w-10 items-center justify-center border border-line text-sand transition-colors hover:border-gold hover:text-gold"
                  >
                    <IconChevronR size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
