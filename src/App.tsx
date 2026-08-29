import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Studio from "./components/Studio";
import Portfolio from "./components/Portfolio";
import Packages from "./components/Packages";
import Booking from "./components/Booking";
import ClientGallery from "./components/ClientGallery";
import Enquiry from "./components/Enquiry";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import { IconPhone, IconWhatsApp } from "./components/ui";
import { PHONE_TEL, WA_URL } from "./data";

export default function App() {
  const [selectedPkg, setSelectedPkg] = useState("Signature Wedding");

  const choosePackage = (name: string) => {
    setSelectedPkg(name);
    const el = document.getElementById("enquiry");
    if (el) {
      const reduced =
        typeof window !== "undefined" &&
        !!window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <div className="grain relative min-h-screen bg-ink font-body text-paper">
      <Nav />
      <main>
        <Hero />
        <Studio />
        <Portfolio />
        <Packages onChoose={choosePackage} />
        <Booking />
        <ClientGallery />
        <Enquiry selectedPkg={selectedPkg} />
        <Reviews />
      </main>
      <Footer />

      {/* floating contact stack */}
      <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
        <a
          href={PHONE_TEL}
          aria-label="Call New Art Photography"
          title="Call the studio"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-coal text-gold shadow-lg shadow-black/50 transition-all duration-300 hover:scale-110 hover:border-gold hover:text-goldsoft"
        >
          <IconPhone size={19} />
        </a>
        <a
          href={`${WA_URL}?text=${encodeURIComponent("Hi New Art Photography! I saw your website and want to know more.")}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
          className="pulse-ring flex h-14 w-14 items-center justify-center rounded-full bg-leaf text-ink shadow-lg shadow-black/50 transition-all duration-300 hover:scale-110"
        >
          <IconWhatsApp size={24} />
        </a>
      </div>
    </div>
  );
}
