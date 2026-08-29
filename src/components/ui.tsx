import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type SVGProps } from "react";

/* ---------- motion helpers ---------- */
export const prefersReduced = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useInView<T extends HTMLElement>(threshold = 0.16) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -7% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ "--rd": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function Counter({
  to,
  suffix = "",
  decimals = 0,
  duration = 1500,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (prefersReduced()) {
      setVal(to);
      return;
    }
    let start: number | null = null;
    let raf = 0;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ---------- typography helpers ---------- */
export function SectionHead({
  index,
  kicker,
  title,
  sub,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  sub?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="kicker flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-gold/70" />
          {index} — {kicker}
        </p>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="font-display mt-4 text-4xl leading-[1.06] font-medium text-cream sm:text-5xl lg:text-6xl">
          <span className="mask-line">
            <span>{title}</span>
          </span>
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={170}>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-sand sm:text-base">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Stars({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-gold ${className}`} aria-label="5 star rating">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9L12 2.6z" />
        </svg>
      ))}
    </span>
  );
}

/* ---------- hand-drawn icon set ---------- */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };
const base = (size?: number) => ({
  width: size ?? 18,
  height: size ?? 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const IconAperture = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v6.4M18.8 7.6l-5.5 3.2M18.8 16.4l-5.5-3.2M12 21v-6.4M5.2 16.4l5.5-3.2M5.2 7.6l5.5 3.2" />
  </svg>
);

export const IconCamera = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 8.2h2.6l1.7-2.4h7.4l1.7 2.4H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.2a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="13.3" r="3.4" />
    <path d="M17.8 10.6h.01" />
  </svg>
);

export const IconPhone = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5.2 4.4 7.6 4c.5-.1 1 .2 1.2.7l1 2.6c.2.4 0 .9-.3 1.2l-1.4 1.2a13.4 13.4 0 0 0 6.2 6.2l1.2-1.4c.3-.4.8-.5 1.2-.3l2.6 1c.5.2.8.7.7 1.2l-.4 2.4c-.1.5-.5.9-1 .9C10.7 19.9 4.1 13.3 4.3 5.4c0-.5.4-.9.9-1z" />
  </svg>
);

export const IconWhatsApp = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3.7a8.3 8.3 0 0 0-7.2 12.5l-1 4 4.1-1.1A8.3 8.3 0 1 0 12 3.7z" />
    <path d="M8.9 8.6c.3-.6.9-.6 1.3-.1l.6 1c.2.4.1.8-.2 1.1-.3.3-.3.6-.1 1 .5.8 1.1 1.5 2 1.9.4.2.7.2 1-.1.3-.3.7-.4 1.1-.2l1 .6c.5.3.5.9 0 1.3-2.6 1.6-7.3-3.4-5.8-6.2l.1-.3z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconPin = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 21.2s-6.6-5.6-6.6-10.3a6.6 6.6 0 1 1 13.2 0c0 4.7-6.6 10.3-6.6 10.3z" />
    <circle cx="12" cy="10.8" r="2.3" />
  </svg>
);

export const IconArrow = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 12h15M13.5 5.5 20 12l-6.5 6.5" />
  </svg>
);

export const IconCheck = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4.5 12.8 9.4 17.6 19.5 6.6" />
  </svg>
);

export const IconLock = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="5.5" y="10.5" width="13" height="9.5" rx="1.5" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2" />
  </svg>
);

export const IconCalendar = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="4" y="5.5" width="16" height="15" rx="1.5" />
    <path d="M4 10h16M8.5 3.5v3.6M15.5 3.5v3.6" />
  </svg>
);

export const IconClock = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3.2 2" />
  </svg>
);

export const IconDownload = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 4v10.5M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15" />
  </svg>
);

export const IconX = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconChevronL = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M14.5 5.5 8 12l6.5 6.5" />
  </svg>
);

export const IconChevronR = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M9.5 5.5 16 12l-6.5 6.5" />
  </svg>
);

export const IconFilm = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="4" y="4.5" width="16" height="15" rx="1.5" />
    <path d="M8.5 4.5v15M15.5 4.5v15M4 9h4.5M4 15h4.5M15.5 9H20M15.5 15H20" />
  </svg>
);

export const IconAlbum = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 4.5h9.5a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5z" />
    <path d="M16 8h3v10a2 2 0 0 1-2 2h-1M5 4.5V18M8.5 8.5h4M8.5 11.5h4" />
  </svg>
);

export const IconUsers = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M15.5 5.8a3.2 3.2 0 0 1 0 5.4M17.5 14.9c1.6.7 2.7 2.3 3 4.6" />
  </svg>
);

export const IconSparkle = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3.5c.7 4.3 1.9 5.5 6.2 6.2-4.3.7-5.5 1.9-6.2 6.2-.7-4.3-1.9-5.5-6.2-6.2 4.3-.7 5.5-1.9 6.2-6.2z" />
    <path d="M18.7 15.5c.3 1.9.9 2.5 2.8 2.8-1.9.3-2.5.9-2.8 2.8-.3-1.9-.9-2.5-2.8-2.8 1.9-.3 2.5-.9 2.8-2.8z" />
  </svg>
);
