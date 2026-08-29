import { useEffect, useState } from "react";
import { BUDGETS, ENQUIRY_STYLES, PACKAGES, PHONE_TEL, WA_URL } from "../data";
import { IconArrow, IconCheck, IconChevronL, IconPhone, IconSparkle, IconWhatsApp, Reveal, SectionHead } from "./ui";

const STEPS = ["Couple", "Event", "Package", "Style"];

export default function Enquiry({ selectedPkg }: { selectedPkg: string }) {
  const [step, setStep] = useState(0);
  const [pkg, setPkg] = useState(selectedPkg);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [d, setD] = useState({
    partner1: "",
    partner2: "",
    phone: "",
    date: "",
    venue: "",
    guests: "100 – 300",
    budget: BUDGETS[1],
    styles: [] as string[],
    message: "",
  });

  useEffect(() => setPkg(selectedPkg), [selectedPkg]);

  const todayStr = new Date().toISOString().split("T")[0];

  const validate = (): string => {
    if (step === 0) {
      if (d.partner1.trim().length < 2) return "Please enter the first partner's name.";
      if (d.partner2.trim().length < 2) return "Please enter the second partner's name.";
      const digits = d.phone.replace(/\D/g, "");
      if (digits.length < 10) return "Phone number needs at least 10 digits.";
    }
    if (step === 1) {
      if (!d.date) return "Please pick your wedding date.";
      if (d.venue.trim().length < 2) return "Please tell us the venue or city.";
    }
    return "";
  };

  const next = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep((s) => Math.min(3, s + 1));
  };

  const toggleStyle = (s: string) =>
    setD((v) => ({ ...v, styles: v.styles.includes(s) ? v.styles.filter((x) => x !== s) : [...v.styles, s] }));

  const summary = `New wedding enquiry ✦\n• Couple: ${d.partner1} & ${d.partner2}\n• Phone: ${d.phone}\n• Date: ${d.date}\n• Venue: ${d.venue}\n• Guests: ${d.guests}\n• Package: ${pkg}\n• Budget: ${d.budget}${d.styles.length ? `\n• Style: ${d.styles.join(", ")}` : ""}${d.message ? `\n• Note: ${d.message}` : ""}`;
  const waHref = `${WA_URL}?text=${encodeURIComponent(summary)}`;

  const prettyDate = d.date
    ? new Date(d.date + "T00:00:00").toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <section id="enquiry" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="06"
          kicker="Wedding Enquiry"
          title={
            <>
              Tell us about
              <br />
              your <em className="text-gold italic">big day.</em>
            </>
          }
          sub="Four quick steps. We reply within 2 hours between 9 AM and 9 PM — usually with a date-hold and a custom quote."
        />

        <Reveal delay={150}>
          <div className="card relative mt-14 overflow-hidden">
            <span className="absolute -top-16 -right-16 text-gold/[0.06]" aria-hidden>
              <IconSparkle size={280} />
            </span>

            {/* progress */}
            <div className="flex border-b border-line/70">
              {STEPS.map((s, i) => (
                <button
                  key={s}
                  onClick={() => !sent && i < step && setStep(i)}
                  className={`relative flex-1 px-2 py-4 text-center transition-colors ${
                    i === step && !sent ? "text-gold" : i < step && !sent ? "text-sand hover:text-gold" : "text-fog"
                  }`}
                >
                  <span className="text-[10px] font-bold tracking-[0.22em] uppercase sm:text-[11px]">
                    {i < step && !sent ? "✓ " : `${i + 1} · `}
                    <span className="hidden sm:inline">{s}</span>
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-500 ${
                      i <= step && !sent ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              ))}
            </div>

            {sent ? (
              <div className="fade-up mx-auto flex max-w-2xl flex-col items-center px-6 py-16 text-center sm:py-20">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold text-gold">
                  <IconCheck size={34} />
                </span>
                <h3 className="font-display mt-7 text-4xl font-semibold text-cream">
                  Shukriya, {d.partner1.split(" ")[0]} & {d.partner2.split(" ")[0]}!
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-sand">
                  Your enquiry for <span className="font-semibold text-cream">{prettyDate}</span> at{" "}
                  <span className="font-semibold text-cream">{d.venue}</span> is with our team. For an instant
                  reply, send the same details on WhatsApp:
                </p>
                <div className="mt-8 flex w-full max-w-md flex-col gap-3">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-gold px-6 py-4 text-sm font-bold text-ink transition-all hover:bg-goldsoft hover:shadow-[0_0_32px_rgba(217,164,65,0.35)]"
                  >
                    <IconWhatsApp size={17} /> Send on WhatsApp
                  </a>
                  <a
                    href={PHONE_TEL}
                    className="inline-flex items-center justify-center gap-2.5 border border-line px-6 py-4 text-sm font-semibold text-sand transition-colors hover:border-gold hover:text-gold"
                  >
                    <IconPhone size={16} /> Call +91 88560 05550
                  </a>
                  <button
                    onClick={() => {
                      setSent(false);
                      setStep(0);
                      setD({ partner1: "", partner2: "", phone: "", date: "", venue: "", guests: "100 – 300", budget: BUDGETS[1], styles: [], message: "" });
                    }}
                    className="text-[13px] text-fog underline-offset-4 transition-colors hover:text-gold hover:underline"
                  >
                    Start another enquiry
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-6 py-10 sm:px-12 sm:py-12">
                <div key={step} className="fade-up mx-auto max-w-2xl">
                  {step === 0 && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="label" htmlFor="en-p1">Partner one</label>
                        <input id="en-p1" className="input" placeholder="First name" value={d.partner1}
                          onChange={(e) => setD({ ...d, partner1: e.target.value })} />
                      </div>
                      <div>
                        <label className="label" htmlFor="en-p2">Partner two</label>
                        <input id="en-p2" className="input" placeholder="First name" value={d.partner2}
                          onChange={(e) => setD({ ...d, partner2: e.target.value })} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label" htmlFor="en-phone">Phone / WhatsApp</label>
                        <input id="en-phone" className="input" inputMode="tel" placeholder="10-digit mobile number"
                          value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} />
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="label" htmlFor="en-date">Wedding date</label>
                        <input id="en-date" type="date" min={todayStr} className="input" value={d.date}
                          onChange={(e) => setD({ ...d, date: e.target.value })} />
                      </div>
                      <div>
                        <label className="label" htmlFor="en-venue">Venue / city</label>
                        <input id="en-venue" className="input" placeholder="e.g. Darwha, Yavatmal" value={d.venue}
                          onChange={(e) => setD({ ...d, venue: e.target.value })} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="label" htmlFor="en-guests">Expected guests</label>
                        <select id="en-guests" className="input" value={d.guests}
                          onChange={(e) => setD({ ...d, guests: e.target.value })}>
                          {["Under 100", "100 – 300", "300 – 700", "700 – 1500", "1500+"].map((g) => (
                            <option key={g}>{g}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <p className="label">Preferred package</p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {PACKAGES.map((p) => (
                          <button key={p.name} onClick={() => setPkg(p.name)}
                            className={`border p-4 text-left transition-all duration-300 ${
                              pkg === p.name ? "border-gold bg-gold/12" : "border-line hover:border-gold/60"
                            }`}>
                            <p className={`font-display text-lg leading-tight font-semibold ${pkg === p.name ? "text-gold" : "text-cream"}`}>
                              {p.name}
                            </p>
                            <p className="mt-1 text-[12px] text-fog">{p.price} · {p.duration.split(" · ")[0]}</p>
                          </button>
                        ))}
                      </div>
                      <p className="label mt-7">Comfortable budget</p>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {BUDGETS.map((b) => (
                          <button key={b} onClick={() => setD({ ...d, budget: b })}
                            className={`border px-3 py-3 text-[13px] font-semibold transition-all duration-300 ${
                              d.budget === b ? "border-gold bg-gold/12 text-gold" : "border-line text-sand hover:border-gold/60 hover:text-cream"
                            }`}>
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <p className="label">What should the photos feel like? <span className="normal-case tracking-normal text-fog">(pick any)</span></p>
                      <div className="flex flex-wrap gap-2.5">
                        {ENQUIRY_STYLES.map((s) => {
                          const on = d.styles.includes(s);
                          return (
                            <button key={s} onClick={() => toggleStyle(s)}
                              className={`border px-4 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
                                on ? "border-gold bg-gold text-ink" : "border-line text-sand hover:border-gold/60 hover:text-cream"
                              }`}>
                              {on && <span className="mr-1.5">✓</span>}
                              {s}
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-7">
                        <label className="label" htmlFor="en-msg">Anything else? (optional)</label>
                        <textarea id="en-msg" className="input min-h-[96px] resize-none"
                          placeholder="Functions across multiple days, a surprise entry, drone restrictions at the venue…"
                          value={d.message} onChange={(e) => setD({ ...d, message: e.target.value })} />
                      </div>
                    </div>
                  )}
                </div>

                {error && <p className="mt-6 text-center text-[13px] font-semibold text-ember">⚠ {error}</p>}

                <div className="mx-auto mt-8 flex max-w-2xl items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      setError("");
                      setStep((s) => Math.max(0, s - 1));
                    }}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 border border-line px-5 py-3 text-sm font-semibold text-sand transition-colors enabled:hover:border-gold enabled:hover:text-gold disabled:opacity-30"
                  >
                    <IconChevronL size={15} /> Back
                  </button>
                  {step < 3 ? (
                    <button
                      onClick={next}
                      className="group inline-flex items-center gap-3 bg-gold px-7 py-3.5 text-sm font-bold text-ink transition-all duration-300 hover:bg-goldsoft hover:shadow-[0_0_28px_rgba(217,164,65,0.35)]"
                    >
                      Continue
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                        <IconArrow size={15} />
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setError("");
                        setSent(true);
                      }}
                      className="group inline-flex items-center gap-3 bg-gold px-7 py-3.5 text-sm font-bold text-ink transition-all duration-300 hover:bg-goldsoft hover:shadow-[0_0_28px_rgba(217,164,65,0.35)]"
                    >
                      <IconSparkle size={16} /> Send enquiry
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
