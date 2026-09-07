import { FormEvent, useEffect, useState } from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqR7HoF255CLC8JGYuZ5jZ2NZ6nlbtUlguXqZ5p6Yjhf0e6hPbuipVz1_-EyZ8n5Ml/exec';
const SLOT_DURATION_MINUTES = 90;

type Slot = { start: Date; end: Date };
type BusySlot = { start: string; end: string };


const STUDIO_TIMEZONE = "America/Toronto";

// Returns the UTC offset (e.g. "-04:00") that `timeZone` observes on the given date.
// Computed per-date so it's correct across the DST boundary (EST vs EDT).
function getUtcOffset(date: Date, timeZone: string): string {
  const dtf = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" });
  const tzPart = dtf.formatToParts(date).find(p => p.type === "timeZoneName")?.value || "GMT+0";
  const match = tzPart.match(/GMT([+-]\d+)(?::(\d+))?/);
  if (!match) return "+00:00";
  const hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const sign = hours < 0 ? "-" : "+";
  return `${sign}${String(Math.abs(hours)).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

// Builds an absolute Date representing `HH:mm:ss` wall-clock time in Toronto on `dateStr`,
// regardless of the visitor's own browser timezone.
function torontoDateTime(dateStr: string, timeStr: string): Date {
  const noonUtc = new Date(`${dateStr}T12:00:00Z`); // just to resolve DST status for this date
  const offset = getUtcOffset(noonUtc, STUDIO_TIMEZONE);
  return new Date(`${dateStr}T${timeStr}${offset}`);
}

// "Today" as Toronto sees it, not the visitor's local calendar date.
function torontoTodayISODate(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: STUDIO_TIMEZONE }).format(new Date());
}

function isSunday(dateStr: string) {
  return torontoDateTime(dateStr, "12:00:00").getDay() === 0;
}

function generateDaySlots(dateStr: string): Slot[] {
  const slots: Slot[] = [];
  const firstSlot = torontoDateTime(dateStr, "11:00:00");
  const finalStart = torontoDateTime(dateStr, "17:00:00");

  for (let start = firstSlot; start <= finalStart; start = new Date(start.getTime() + SLOT_DURATION_MINUTES * 60000)) {
    const end = new Date(start.getTime() + SLOT_DURATION_MINUTES * 60000);
    slots.push({ start, end });
  }
  return slots;
}

export default function BookingForm() {
  const [date, setDate] = useState("");
  const [busySlots, setBusySlots] = useState<BusySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch busy slots whenever the date changes
  useEffect(() => {
    if (!date) {
      setBusySlots([]);
      return;
    }
    fetch(`${SCRIPT_URL}?date=${encodeURIComponent(date)}`)
      .then(res => res.json())
      .then((data: { busySlots?: BusySlot[] }) => setBusySlots(data.busySlots || []))
      .catch(() => setBusySlots([]));
  }, [date]);

  function isSlotTaken(slot: Slot) {
    return busySlots.some(busy => {
      const busyStart = new Date(busy.start).getTime();
      const busyEnd = new Date(busy.end).getTime();
      return slot.start.getTime() < busyEnd && slot.end.getTime() > busyStart;
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSunday(date)) {
      setSelectedSlot(null);
      setStatus("error");
      setErrorMsg("Sundays are unavailable for appointments.");
      return;
    }
    if (!selectedSlot) return;
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          phone,
          startTime: selectedSlot.start.toISOString(),
          endTime: selectedSlot.end.toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Unable to complete booking");
      const result = await res.json() as { success?: boolean; error?: string };

      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(result.error || 'That slot was just taken.');
        // Refresh busy slots so the picker updates
        const refreshed = await fetch(`${SCRIPT_URL}?date=${encodeURIComponent(date)}`).then(r => r.json()) as { busySlots?: BusySlot[] };
        setBusySlots(refreshed.busySlots || []);
        setSelectedSlot(null);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  }

  if (status === "success") {
    return (
      <div className="p-8 sm:p-10" role="status">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#794137" }}>Booking confirmed</p>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#2C1810" }}>Thank you, {name}.</h3>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "#5A3A30" }}>Your appointment is reserved. Please check your email for the confirmation details.</p>
      </div>
    );
  }

  const slots = date ? generateDaySlots(date) : [];

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8" aria-label="Appointment booking form">
      <p className="mb-6 text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#794137" }}>Select a date and time</p>
      <label className="block text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: "#5A3A30" }}>
        Preferred date
        <input
          type="date"
          value={date}
          min={torontoTodayISODate()}
          onChange={e => {
            const nextDate = e.target.value;
            setSelectedSlot(null);
            if (isSunday(nextDate)) {
              setDate("");
              setStatus("error");
              setErrorMsg("Sundays are unavailable for appointments.");
              return;
            }
            setDate(nextDate);
            setStatus("idle");
            setErrorMsg("");
          }}
          required
          className="mt-2 w-full px-4 py-3 text-sm outline-none"
          style={{ background: "#FFF9F5", border: "1px solid rgba(121,65,55,.28)", color: "#2C1810" }}
        />
      </label>

      {date && (
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: "#5A3A30" }}>Available times</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {slots.map((slot) => {
            const taken = isSlotTaken(slot);
            const isSelected = selectedSlot?.start.getTime() === slot.start.getTime();
            return (
              <button
                type="button"
                key={slot.start.toISOString()}
                disabled={taken}
                onClick={() => setSelectedSlot(slot)}
                style={{
                  opacity: taken ? 0.38 : 1,
                  fontWeight: isSelected ? 700 : 500,
                  background: isSelected ? "#794137" : "#FFF9F5",
                  border: `1px solid ${isSelected ? "#794137" : "rgba(121,65,55,.22)"}`,
                  color: isSelected ? "#ECE1D8" : "#5A3A30",
                }}
                className="px-3 py-3 text-xs transition-colors disabled:cursor-not-allowed"
              >
                {slot.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: STUDIO_TIMEZONE })}
                {taken ? " · Booked" : ""}
              </button>
            );
          })}
          </div>
        </div>
      )}

      {date && (
        <div className="mt-6 flex gap-3 border-l-[3px] p-4" style={{ background: "rgba(121,65,55,.08)", borderColor: "#794137" }}>
          <div>
            <p className="mb-1 text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: "#794137" }}>Consultation fee</p>
            <p className="text-sm leading-relaxed" style={{ color: "#5A3A30" }}>$50 to secure your appointment, credited toward your garment when you proceed.</p>
          </div>
        </div>
      )}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
      <label className="block text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: "#5A3A30" }}>
        Full name
        <input value={name} onChange={e => setName(e.target.value)} required className="mt-2 w-full px-4 py-3 text-sm outline-none" style={{ background: "#FFF9F5", border: "1px solid rgba(121,65,55,.28)", color: "#2C1810" }} />
      </label>

      <label className="block text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: "#5A3A30" }}>
        Email
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-2 w-full px-4 py-3 text-sm outline-none" style={{ background: "#FFF9F5", border: "1px solid rgba(121,65,55,.28)", color: "#2C1810" }} />
      </label>

      <label className="block text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: "#5A3A30" }}>
  Phone number
  <div className="mt-2 phone-input-wrapper">
    <PhoneInput
      international
      defaultCountry="CA"
      value={phone}
      onChange={value => setPhone(value || "")}
      required
    />
  </div>
</label>
      </div>

      <button type="submit" disabled={!selectedSlot || status === "loading"} className="mt-7 w-full px-5 py-4 text-xs font-bold tracking-[0.18em] uppercase transition-opacity disabled:cursor-not-allowed disabled:opacity-45" style={{ background: "#794137", color: "#ECE1D8" }}>
        {status === "loading" ? "Booking..." : "Book appointment"}
      </button>

      {status === "error" && <p className="mt-4 text-sm" role="alert" style={{ color: "#9B302C" }}>{errorMsg}</p>}
    </form>
  );
}
