import { useCallback, useEffect, useState } from "react";
import { IconChevronL, IconChevronR, IconDownload, IconX } from "./ui";

export interface LightboxImage {
  src: string;
  title?: string;
}

export default function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: LightboxImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const total = images.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-ink/97 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <p className="text-[12px] font-semibold tracking-[0.3em] text-sand uppercase">
          {index + 1} <span className="text-fog">/ {total}</span>
        </p>
        <div className="flex items-center gap-2">
          <a
            href={current.src}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex h-10 w-10 items-center justify-center border border-line text-sand transition-colors hover:border-gold hover:text-gold"
            aria-label="Open full resolution"
            title="Open full resolution"
          >
            <IconDownload size={17} />
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="flex h-10 w-10 items-center justify-center border border-line text-sand transition-colors hover:border-gold hover:text-gold"
            aria-label="Close viewer"
          >
            <IconX size={17} />
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center border border-line bg-ink/60 text-sand transition-all hover:border-gold hover:text-gold sm:left-6"
        >
          <IconChevronL size={20} />
        </button>

        <figure key={index} className="fade-up flex max-h-full flex-col items-center">
          <img
            src={current.src}
            alt={current.title ?? "Photograph"}
            className="max-h-[72vh] w-auto max-w-full border border-line object-contain shadow-2xl shadow-black/70"
          />
          {current.title && (
            <figcaption className="font-display mt-4 text-center text-lg text-sand italic">{current.title}</figcaption>
          )}
        </figure>

        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center border border-line bg-ink/60 text-sand transition-all hover:border-gold hover:text-gold sm:right-6"
        >
          <IconChevronR size={20} />
        </button>
      </div>

      <div className="flex justify-center gap-2 pb-6" onClick={(e) => e.stopPropagation()}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-1 transition-all duration-300 ${i === index ? "w-8 bg-gold" : "w-3 bg-line hover:bg-fog"}`}
          />
        ))}
      </div>
    </div>
  );
}
