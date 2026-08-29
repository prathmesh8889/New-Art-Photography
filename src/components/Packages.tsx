import { ADDONS, PACKAGES } from "../data";
import { IconArrow, IconCheck, IconSparkle, Reveal, SectionHead } from "./ui";

export default function Packages({ onChoose }: { onChoose: (name: string) => void }) {
  const featured = PACKAGES.find((p) => p.featured)!;
  const others = PACKAGES.filter((p) => !p.featured);

  return (
    <section id="packages" className="relative border-y border-line/60 bg-coal/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="03"
          kicker="Packages & Pricing"
          title={
            <>
              Honest pricing,
              <br />
              <em className="text-gold italic">no day-of surprises.</em>
            </>
          }
          sub="Every package includes a free consultation at our Darwha Rd studio. An advance of just ₹2,000 blocks your date — the rest is split comfortably."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* featured package */}
          <Reveal className="lg:col-span-5">
            <div className="relative flex h-full flex-col overflow-hidden border border-gold/50 bg-ink p-8 shadow-[0_0_60px_rgba(217,164,65,0.08)] sm:p-10">
              <div className="absolute top-0 right-0 bg-gold px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] text-ink uppercase">
                Most booked
              </div>
              <span className="absolute -top-10 -right-10 text-gold/10" aria-hidden>
                <IconSparkle size={180} />
              </span>

              <p className="kicker">Signature Wedding</p>
              <h3 className="font-display mt-3 text-3xl font-semibold text-cream sm:text-4xl">{featured.name}</h3>
              <div className="mt-5 flex items-end gap-3">
                <p className="font-display text-5xl font-semibold text-gold sm:text-6xl">{featured.price}</p>
              </div>
              <p className="mt-1.5 text-[13px] tracking-wide text-fog">{featured.per}</p>

              <ul className="mt-8 flex-1 space-y-3.5 border-t border-line/70 pt-8">
                {featured.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px] text-paper">
                    <span className="mt-0.5 shrink-0 text-gold">
                      <IconCheck size={16} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onChoose(featured.name)}
                className="group mt-9 inline-flex w-full items-center justify-center gap-3 bg-gold px-6 py-4 text-sm font-bold tracking-wide text-ink transition-all duration-300 hover:bg-goldsoft hover:shadow-[0_0_32px_rgba(217,164,65,0.35)]"
              >
                Choose Signature
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  <IconArrow size={15} />
                </span>
              </button>
            </div>
          </Reveal>

          {/* the other two, as wide ledger rows */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {others.map((pkg, i) => (
              <Reveal key={pkg.name} delay={140 + i * 120} className="flex-1">
                <div className="group flex h-full flex-col justify-between border border-line bg-coal p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 sm:p-8 lg:flex-row lg:gap-8">
                  <div className="lg:w-[46%]">
                    <h3 className="font-display text-2xl font-semibold text-cream sm:text-3xl">{pkg.name}</h3>
                    <p className="mt-1 text-[12px] tracking-[0.18em] text-fog uppercase">{pkg.duration}</p>
                    <p className="font-display mt-4 text-4xl font-semibold text-gold">{pkg.price}</p>
                    <p className="mt-1 text-[13px] text-fog">{pkg.per}</p>
                  </div>
                  <div className="mt-6 flex-1 lg:mt-0">
                    <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-sand">
                          <span className="mt-0.5 shrink-0 text-gold/80">
                            <IconCheck size={13} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => onChoose(pkg.name)}
                      className="mt-6 inline-flex items-center gap-2.5 border border-gold/60 px-5 py-3 text-[13px] font-bold tracking-wide text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
                    >
                      Choose {pkg.name.split(" ")[0]}
                      <IconArrow size={14} />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* add-ons ledger */}
            <Reveal delay={380}>
              <div className="border border-dashed border-line bg-ink/60 p-6 sm:p-7">
                <p className="kicker">À la carte add-ons</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {ADDONS.map((a) => (
                    <span
                      key={a.name}
                      className="group flex items-center gap-2 border border-line bg-coal px-3.5 py-2 text-[13px] text-sand transition-colors hover:border-gold/60 hover:text-cream"
                    >
                      {a.name}
                      <span className="font-bold text-gold">{a.price}</span>
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-[12px] text-fog">
                  Mix any add-on into any package · Custom quotes for destination weddings within 24 hours.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
