import { useEffect, useState } from "react";
import { MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from "../data";
import { IconAperture, IconPhone, IconPin, IconWhatsApp, IconX } from "./ui";

const LINKS = [
  { href: "#studio", label: "Studio" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#packages", label: "Packages" },
  { href: "#booking", label: "Book a Date" },
  { href: "#gallery", label: "Client Gallery" },
  { href: "#reviews", label: "Reviews" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-line bg-ink/90 py-3 backdrop-blur-md" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#home" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="text-gold transition-transform duration-700 group-hover:rotate-[60deg]">
              <IconAperture size={26} />
            </span>
            <span className="leading-none">
              <span className="font-display block text-xl font-semibold italic text-cream">New Art</span>
              <span className="block text-[9px] font-semibold tracking-[0.42em] text-sand">PHOTOGRAPHY</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[13px] font-medium tracking-wide text-sand transition-colors hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={PHONE_TEL}
              className="flex items-center gap-2 text-[13px] font-semibold text-sand transition-colors hover:text-gold"
            >
              <IconPhone size={15} /> {PHONE_DISPLAY}
            </a>
            <a
              href="#booking"
              className="bg-gold px-5 py-2.5 text-[13px] font-bold tracking-wide text-ink transition-all duration-300 hover:bg-goldsoft hover:shadow-[0_0_28px_rgba(217,164,65,0.35)]"
            >
              Book Now
            </a>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center border border-line text-cream lg:hidden"
          >
            {open ? (
              <IconX size={20} />
            ) : (
              <span className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-3.5 bg-gold" />
                <span className="block h-0.5 w-5 bg-current" />
              </span>
            )}
          </button>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-ink/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex flex-1 flex-col justify-center gap-1 px-8">
          {[...LINKS, { href: "#contact", label: "Contact" }].map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-display border-b border-line/60 py-4 text-3xl font-medium text-cream transition-all duration-500 hover:pl-3 hover:text-gold ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              <span className="mr-4 text-sm text-gold">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-line p-6">
          <a href={PHONE_TEL} className="flex items-center gap-3 text-lg font-semibold text-cream">
            <span className="text-gold"><IconPhone size={18} /></span> {PHONE_DISPLAY}
          </a>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-sand">
            <span className="text-gold"><IconPin size={17} /></span> Darwha Rd, Yavatmal · Open in Google Maps
          </a>
          <a
            href="#enquiry"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-gold py-3.5 font-bold text-ink"
          >
            <IconWhatsApp size={18} /> Start a Wedding Enquiry
          </a>
        </div>
      </div>
    </>
  );
}
