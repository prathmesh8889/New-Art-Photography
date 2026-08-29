import { useState } from "react";
import { ALBUMS, GALLERY_CODE } from "../data";
import Lightbox from "./Lightbox";
import { IconAlbum, IconCheck, IconDownload, IconLock, IconX, Reveal, SectionHead } from "./ui";

export default function ClientGallery() {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [openAlbum, setOpenAlbum] = useState<number | null>(null);

  const tryUnlock = () => {
    if (code.trim().toUpperCase() === GALLERY_CODE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setShakeKey((k) => k + 1);
    }
  };

  const album = openAlbum !== null ? ALBUMS.find((a) => a.id === openAlbum) : null;

  return (
    <section id="gallery" className="relative border-y border-line/60 bg-coal/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            index="05"
            kicker="Client Gallery"
            title={
              <>
                Your photos,
                <br />
                <em className="text-gold italic">privately delivered.</em>
              </>
            }
            sub="Every couple receives a password-protected online gallery — full-resolution downloads, easy sharing with family, and it stays live for a full year."
          />

          {/* access panel */}
          <Reveal delay={180} className="w-full shrink-0 lg:w-[380px]">
            {unlocked ? (
              <div className="flex items-center justify-between border border-gold/50 bg-gold/10 px-5 py-4">
                <span className="flex items-center gap-2.5 text-sm font-semibold text-gold">
                  <IconCheck size={16} /> Galleries unlocked
                </span>
                <button
                  onClick={() => {
                    setUnlocked(false);
                    setCode("");
                  }}
                  className="text-fog transition-colors hover:text-cream"
                  aria-label="Lock galleries"
                >
                  <IconX size={16} />
                </button>
              </div>
            ) : (
              <div key={shakeKey} className={`border border-line bg-ink p-5 ${error ? "shake border-ember/60" : ""}`}>
                <label className="label flex items-center gap-2" htmlFor="gallery-code">
                  <IconLock size={13} /> Gallery access code
                </label>
                <div className="flex gap-2">
                  <input
                    id="gallery-code"
                    className="input uppercase tracking-widest"
                    placeholder="ENTER CODE"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setError(false);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
                  />
                  <button
                    onClick={tryUnlock}
                    className="shrink-0 bg-gold px-5 text-sm font-bold text-ink transition-colors hover:bg-goldsoft"
                  >
                    Unlock
                  </button>
                </div>
                {error ? (
                  <p className="mt-2.5 text-[12px] font-semibold text-ember">That code didn't match — try again.</p>
                ) : (
                  <p className="mt-2.5 text-[12px] text-fog">
                    Demo code: <span className="font-bold tracking-widest text-gold">NEWART2025</span> · real couples
                    get theirs on delivery day
                  </p>
                )}
              </div>
            )}
          </Reveal>
        </div>

        {/* album wall */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ALBUMS.map((a, i) => (
            <Reveal key={a.id} delay={i * 110}>
              <button
                onClick={() => unlocked && setOpenAlbum(a.id)}
                className={`group relative block w-full overflow-hidden border text-left transition-all duration-500 ${
                  unlocked
                    ? "border-line hover:-translate-y-1.5 hover:border-gold/70 hover:shadow-[0_18px_44px_rgba(0,0,0,0.5)]"
                    : "cursor-not-allowed border-line/60"
                }`}
              >
                <img
                  src={a.cover}
                  alt={`${a.couple} — ${a.event}`}
                  loading="lazy"
                  className={`aspect-[3/4] w-full object-cover transition-all duration-700 ${
                    unlocked ? "group-hover:scale-105" : "opacity-60 grayscale-[0.7]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-transparent" />

                {unlocked ? (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="flex items-center gap-2 border border-gold bg-ink/80 px-4 py-2.5 text-[12px] font-bold tracking-[0.2em] text-gold uppercase backdrop-blur-sm">
                      <IconAlbum size={15} /> View gallery
                    </span>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-sand/40 bg-ink/60 text-sand backdrop-blur-sm">
                      <IconLock size={20} />
                    </span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-lg leading-tight text-cream">{a.couple}</p>
                  <p className="mt-0.5 text-[12px] text-sand">{a.event}</p>
                  <p className="mt-1 flex items-center justify-between text-[11px] tracking-wide text-fog">
                    <span>{a.date}</span>
                    <span className="font-semibold text-gold">{a.images.length} photos</span>
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border border-dashed border-line/80 px-6 py-4 text-[13px] text-sand">
            <span className="flex items-center gap-2"><IconDownload size={15} className="text-gold" /> Full-resolution downloads</span>
            <span className="flex items-center gap-2"><IconLock size={15} className="text-gold" /> Password protected</span>
            <span className="flex items-center gap-2"><IconCheck size={15} className="text-gold" /> Live for 12 months</span>
            <span className="flex items-center gap-2"><IconAlbum size={15} className="text-gold" /> Family sharing links</span>
          </div>
        </Reveal>
      </div>

      {album && (
        <Lightbox
          images={album.images.map((src, i) => ({ src, title: `${album.couple} — ${album.event} · ${i + 1}` }))}
          startIndex={0}
          onClose={() => setOpenAlbum(null)}
        />
      )}
    </section>
  );
}
