import { MAPS_URL, PHONE_DISPLAY, PHONE_TEL, WA_URL } from "../data";
import { IconAperture, IconArrow, IconClock, IconPhone, IconPin, IconWhatsApp, Reveal } from "./ui";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* CTA band */}
      <div className="relative border-t border-line/70 bg-ink py-20 sm:py-24">
        <div
          aria-hidden
          className="font-display pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[24vw] leading-none font-semibold italic text-cream/[0.03] select-none"
        >
          shukriya
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="kicker">One last frame</p>
          </Reveal>
          <Reveal delay={110}>
            <h2 className="font-display mt-4 max-w-3xl text-4xl leading-[1.05] font-medium text-cream sm:text-6xl">
              Let's make something
              <br />
              <em className="text-gold italic">timeless</em> together.
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={PHONE_TEL}
                className="group inline-flex items-center gap-4 bg-gold px-7 py-4 text-lg font-bold text-ink transition-all duration-300 hover:bg-goldsoft hover:shadow-[0_0_40px_rgba(217,164,65,0.4)] sm:text-xl"
              >
                <IconPhone size={20} />
                {PHONE_DISPLAY}
              </a>
              <a
                href={`${WA_URL}?text=${encodeURIComponent("Hi New Art Photography! I'd like to talk about a shoot.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-sand/40 px-7 py-4 text-sm font-semibold text-cream transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <IconWhatsApp size={18} /> WhatsApp the studio
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* info columns */}
      <div className="border-t border-line/70 bg-coal/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="text-gold"><IconAperture size={24} /></span>
              <span className="font-display text-xl font-semibold italic text-cream">New Art Photography</span>
            </a>
            <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-fog">
              Wedding & candid photography studio. Candid first, colour-graded by hand, delivered on time — since 2017.
            </p>
          </div>

          <div>
            <p className="label">Studio</p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 text-sm leading-relaxed text-sand transition-colors hover:text-cream"
            >
              <span className="mt-0.5 shrink-0 text-gold"><IconPin size={16} /></span>
              <span>
                New Art Photography,
                <br />
                Darwha Road, Yavatmal,
                <br />
                Maharashtra, India
                <span className="mt-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-gold">
                  Open in Google Maps
                  <span className="transition-transform duration-300 group-hover:translate-x-1"><IconArrow size={12} /></span>
                </span>
              </span>
            </a>
          </div>

          <div>
            <p className="label">Hours</p>
            <ul className="space-y-2.5 text-sm text-sand">
              <li className="flex items-center gap-3">
                <span className="text-gold"><IconClock size={15} /></span> Mon – Sun · 9:00 AM – 9:00 PM
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold"><IconAperture size={15} /></span> Studio visits by appointment
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold"><IconPhone size={15} /></span> Shoot days — call anyway, we pick up
              </li>
            </ul>
          </div>

          <div>
            <p className="label">Quick links</p>
            <ul className="space-y-2.5 text-sm">
              {[
                ["#portfolio", "Portfolio"],
                ["#packages", "Packages & Pricing"],
                ["#booking", "Booking Calendar"],
                ["#gallery", "Client Gallery"],
                ["#enquiry", "Wedding Enquiry"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="group flex items-center gap-2 text-sand transition-colors hover:text-gold">
                    <span className="h-px w-3 bg-line transition-all duration-300 group-hover:w-5 group-hover:bg-gold" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-line/70">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-[12px] text-fog sm:flex-row sm:px-8">
            <p>© {year} New Art Photography · Darwha Rd, Yavatmal · All frames belong to their couples.</p>
            <p className="flex items-center gap-2">
              Rated <span className="font-bold text-gold">5.0 ★</span> by 98 couples across Vidarbha
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
