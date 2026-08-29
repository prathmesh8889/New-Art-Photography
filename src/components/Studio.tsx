import { IMG, MAPS_URL } from "../data";
import { Counter, IconCheck, IconPin, Reveal, SectionHead } from "./ui";

const PROMISES = [
  "Candid-first storytelling, traditional on request",
  "Hand colour-grading on every single frame",
  "Albums delivered within 15 days",
  "Female photographer available on request",
  "Local & destination shoots across Maharashtra",
];

export default function Studio() {
  return (
    <section id="studio" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* image with offset frame */}
          <Reveal className="relative lg:col-span-5">
            <div className="relative">
              <div className="absolute -top-5 -left-5 h-full w-full border border-gold/40" aria-hidden />
              <div className="group relative overflow-hidden">
                <img
                  src={IMG.bts}
                  alt="Photographer at work during a wedding"
                  className="w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <p className="font-display absolute bottom-4 left-5 text-sm text-cream/90 italic">
                  on location, 6:47 PM — chasing the last light
                </p>
              </div>
              <div className="absolute -right-4 -bottom-6 border border-line bg-coal px-5 py-4 shadow-xl shadow-black/50">
                <p className="font-display text-2xl font-semibold text-gold italic">est. 2017</p>
                <p className="mt-0.5 text-[10px] tracking-[0.25em] text-fog uppercase">Darwha Rd studio</p>
              </div>
            </div>
          </Reveal>

          {/* story */}
          <div className="lg:col-span-7">
            <SectionHead
              index="01"
              kicker="The Studio"
              title={
                <>
                  Based on Darwha Road,
                  <br />
                  booked across <em className="text-gold italic">Vidarbha.</em>
                </>
              }
            />
            <Reveal delay={200}>
              <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-sand sm:text-base">
                New Art Photography began with one camera, one scooter, and a stubborn belief that a
                wedding album should feel like a film you can hold. Today our small team travels from
                Yavatmal to Nagpur, Nanded and beyond — still small enough that the person you meet at
                the studio is the person behind your viewfinder.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PROMISES.map((p, i) => (
                <Reveal key={p} delay={240 + i * 70}>
                  <div className="flex items-start gap-3 border border-line/70 bg-coal/50 px-4 py-3.5 transition-colors hover:border-gold/50">
                    <span className="mt-0.5 shrink-0 text-gold">
                      <IconCheck size={15} />
                    </span>
                    <span className="text-sm leading-snug text-paper">{p}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={620}>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-2.5 text-sm font-semibold text-gold transition-colors hover:text-goldsoft"
              >
                <IconPin size={16} />
                Find the studio on Google Maps
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          </div>
        </div>

        {/* stat band */}
        <Reveal delay={150}>
          <div className="mt-20 grid grid-cols-2 divide-line/70 border border-line/70 bg-coal/40 lg:grid-cols-4 lg:divide-x">
            {[
              { to: 350, suffix: "+", label: "Weddings photographed" },
              { to: 900, suffix: "+", label: "Albums delivered" },
              { to: 12, suffix: "", label: "Cities covered" },
              { to: 98, suffix: "", label: "Five-star reviews" },
            ].map((s) => (
              <div
                key={s.label}
                className="group border-line/70 px-6 py-8 text-center transition-colors hover:bg-bark/50 lg:border-b-0"
              >
                <p className="font-display text-4xl font-semibold text-gold transition-transform duration-500 group-hover:-translate-y-1 sm:text-5xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-2.5 text-[11px] font-medium tracking-[0.22em] text-fog uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
