import { useMemo, useState } from "react";
import { EVENT_TYPES, PHONE_TEL, WA_URL } from "../data";
import { IconCalendar, IconCheck, IconChevronL, IconChevronR, IconPhone, IconWhatsApp, Reveal, SectionHead } from "./ui";

const SLOTS = [
  { id: 0, label: "Morning", time: "9 AM – 12 PM" },
  { id: 1, label: "Afternoon", time: "2 – 5 PM" },
  { id: 2, label: "Evening", time: "6 – 9 PM" },
];

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

/** deterministic pseudo-availability so the calendar feels alive */
function bookedSlotsFor(day: number, month: number): number[] {
  if (day % 9 === 4) return [0, 1, 2];
  const h = (day * 7 + month * 13) % 5;
  if (h < 2) return [0];
  if (h === 2) return [2];
  return [];
}

export default function Booking() {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selected, setSelected] = useState<Date | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [userBooked, setUserBooked] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", event: "Wedding", notes: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const monthIndex = (view.y - today.getFullYear()) * 12 + (view.m - today.getMonth());
  const canPrev = monthIndex > 0;
  const canNext = monthIndex < 3;

  const monthLabel = new Date(view.y, view.m, 1).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const cells = useMemo(() => {
    const first = new Date(view.y, view.m, 1).getDay();
    const days = new Date(view.y, view.m + 1, 0).getDate();
    const arr: (number | null)[] = [];
    for (let i = 0; i < first; i++) arr.push(null);
    for (let d = 1; d <= days; d++) arr.push(d);
    return arr;
  }, [view]);

  const keyFor = (d: number) => `${view.y}-${view.m + 1}-${d}`;
  const isPast = (d: number) => new Date(view.y, view.m, d) < today;
  const isFullyBooked = (d: number) => {
    const sys = bookedSlotsFor(d, view.m);
    const extra = SLOTS.filter((s) => userBooked.includes(`${keyFor(d)}:${s.id}`)).length;
    return sys.length + extra >= 3;
  };

  const slotsForSelected = selected
    ? SLOTS.map((s) => ({
        ...s,
        booked:
          bookedSlotsFor(selected.getDate(), selected.getMonth()).includes(s.id) ||
          userBooked.includes(`${selected.getFullYear()}-${selected.getMonth() + 1}-${selected.getDate()}:${s.id}`),
      }))
    : [];

  const selectDate = (d: number) => {
    if (isPast(d) || isFullyBooked(d)) return;
    setSelected(new Date(view.y, view.m, d));
    setSlot(null);
    setDone(false);
    setError("");
  };

  const pretty = (d: Date) =>
    d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const submit = () => {
    if (slot === null) {
      setError("Please pick a time slot first.");
      return;
    }
    if (form.name.trim().length < 2) {
      setError("Please tell us your name.");
      return;
    }
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      setError("Please enter a valid phone number (10 digits).");
      return;
    }
    setError("");
    setUserBooked((b) => [...b, `${selected!.getFullYear()}-${selected!.getMonth() + 1}-${selected!.getDate()}:${slot}`]);
    setDone(true);
  };

  const waText = selected
    ? encodeURIComponent(
        `Hi New Art Photography! I'd like to hold a booking:\n• Event: ${form.event}\n• Date: ${pretty(selected)}\n• Slot: ${SLOTS[slot!].label} (${SLOTS[slot!].time})\n• Name: ${form.name}\n• Phone: ${form.phone}${form.notes ? `\n• Notes: ${form.notes}` : ""}`
      )
    : "";

  return (
    <section id="booking" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="04"
          kicker="Booking Calendar"
          title={
            <>
              Pick a date,
              <br />
              <em className="text-gold italic">hold it today.</em>
            </>
          }
          sub="Live availability for the next 4 months. Choose a date and a slot, and we'll confirm on WhatsApp within 2 hours. Weekends fill fastest."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* calendar */}
          <Reveal className="lg:col-span-7">
            <div className="card h-full p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold text-cream sm:text-3xl">{monthLabel}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => canPrev && setView((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { ...v, m: v.m - 1 }))}
                    disabled={!canPrev}
                    aria-label="Previous month"
                    className="flex h-10 w-10 items-center justify-center border border-line text-sand transition-colors enabled:hover:border-gold enabled:hover:text-gold disabled:opacity-30"
                  >
                    <IconChevronL size={17} />
                  </button>
                  <button
                    onClick={() => canNext && setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { ...v, m: v.m + 1 }))}
                    disabled={!canNext}
                    aria-label="Next month"
                    className="flex h-10 w-10 items-center justify-center border border-line text-sand transition-colors enabled:hover:border-gold enabled:hover:text-gold disabled:opacity-30"
                  >
                    <IconChevronR size={17} />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-7 gap-1.5 text-center">
                {WEEKDAYS.map((w, i) => (
                  <span key={i} className="pb-2 text-[11px] font-bold tracking-[0.2em] text-fog uppercase">
                    {w}
                  </span>
                ))}
                {cells.map((d, i) => {
                  if (d === null) return <span key={`b${i}`} />;
                  const past = isPast(d);
                  const full = isFullyBooked(d);
                  const isSel =
                    selected !== null &&
                    selected.getDate() === d &&
                    selected.getMonth() === view.m &&
                    selected.getFullYear() === view.y;
                  const weekend = new Date(view.y, view.m, d).getDay() % 6 === 0;
                  return (
                    <button
                      key={i}
                      onClick={() => selectDate(d)}
                      disabled={past || full}
                      className={`relative aspect-square border text-sm font-semibold transition-all duration-200 ${
                        isSel
                          ? "border-gold bg-gold text-ink shadow-[0_0_22px_rgba(217,164,65,0.35)]"
                          : past
                            ? "cursor-not-allowed border-transparent text-fog/30"
                            : full
                              ? "cursor-not-allowed border-line/40 text-fog/50 line-through"
                              : "border-line/70 text-paper hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                      }`}
                    >
                      {d}
                      {weekend && !past && !full && !isSel && (
                        <span className="absolute right-1.5 bottom-1.5 h-1 w-1 rounded-full bg-ember" title="High demand" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line/70 pt-5 text-[12px] text-fog">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 border border-line/70" /> Available
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 bg-gold" /> Selected
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-fog line-through">14</span> Fully booked
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" /> Weekend · high demand
                </span>
              </div>
            </div>
          </Reveal>

          {/* slots + form */}
          <Reveal delay={150} className="lg:col-span-5">
            <div className="card flex h-full flex-col p-6 sm:p-8">
              {done && selected && slot !== null ? (
                <div className="fade-up flex h-full flex-col justify-center text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold text-gold">
                    <IconCheck size={28} />
                  </span>
                  <h3 className="font-display mt-6 text-3xl font-semibold text-cream">Date requested!</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sand">
                    <span className="font-semibold text-cream">{pretty(selected)}</span>
                    <br />
                    {SLOTS[slot].label} · {SLOTS[slot].time}
                    <br />
                    We'll confirm on <span className="text-gold">+91 88560 05550</span> within 2 hours.
                  </p>
                  <div className="mt-7 flex flex-col gap-3">
                    <a
                      href={`${WA_URL}?text=${waText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 bg-gold px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-goldsoft"
                    >
                      <IconWhatsApp size={17} /> Confirm faster on WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        setDone(false);
                        setSelected(null);
                        setSlot(null);
                        setForm({ name: "", phone: "", event: "Wedding", notes: "" });
                      }}
                      className="border border-line px-6 py-3 text-sm font-semibold text-sand transition-colors hover:border-gold hover:text-gold"
                    >
                      Book another date
                    </button>
                  </div>
                </div>
              ) : selected ? (
                <div className="flex h-full flex-col">
                  <p className="kicker">Selected date</p>
                  <h3 className="font-display mt-2 text-2xl font-semibold text-cream">{pretty(selected)}</h3>

                  <p className="label mt-6">Time slot</p>
                  <div className="grid grid-cols-1 gap-2.5">
                    {slotsForSelected.map((s) => (
                      <button
                        key={s.id}
                        disabled={s.booked}
                        onClick={() => setSlot(s.id)}
                        className={`flex items-center justify-between border px-4 py-3 text-left transition-all duration-200 ${
                          slot === s.id
                            ? "border-gold bg-gold/15 text-gold"
                            : s.booked
                              ? "cursor-not-allowed border-line/40 text-fog/50 line-through"
                              : "border-line text-paper hover:border-gold/70 hover:text-gold"
                        }`}
                      >
                        <span className="text-sm font-semibold">{s.label}</span>
                        <span className="text-[12px] text-fog">{s.booked ? "Booked" : s.time}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3">
                    <div>
                      <label className="label" htmlFor="bk-name">Your name</label>
                      <input
                        id="bk-name"
                        className="input"
                        placeholder="e.g. Aarti Wankhede"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label" htmlFor="bk-phone">Phone / WhatsApp</label>
                      <input
                        id="bk-phone"
                        className="input"
                        placeholder="10-digit mobile number"
                        inputMode="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label" htmlFor="bk-event">Event type</label>
                      <select
                        id="bk-event"
                        className="input"
                        value={form.event}
                        onChange={(e) => setForm({ ...form, event: e.target.value })}
                      >
                        {EVENT_TYPES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label" htmlFor="bk-notes">Notes (optional)</label>
                      <textarea
                        id="bk-notes"
                        className="input min-h-[70px] resize-none"
                        placeholder="Venue, functions, anything else…"
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      />
                    </div>
                  </div>

                  {error && <p className="mt-3 text-[13px] font-semibold text-ember">⚠ {error}</p>}

                  <button
                    onClick={submit}
                    className="group mt-5 inline-flex w-full items-center justify-center gap-3 bg-gold px-6 py-4 text-sm font-bold tracking-wide text-ink transition-all duration-300 hover:bg-goldsoft hover:shadow-[0_0_30px_rgba(217,164,65,0.35)]"
                  >
                    Confirm booking request
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </button>
                </div>
              ) : (
                <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center border border-dashed border-line text-fog">
                    <IconCalendar size={26} />
                  </span>
                  <h3 className="font-display mt-6 text-2xl font-semibold text-cream">Choose a date</h3>
                  <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-fog">
                    Select any open day on the calendar to see morning, afternoon and evening slots.
                  </p>
                  <a href={PHONE_TEL} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-goldsoft">
                    <IconPhone size={15} /> Or just call us — we love calls
                  </a>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
