import { useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, MapPin, Clock, Calendar, CheckCircle } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

function Reveal({ children, delay = 0, y = 32, className = "" }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
    >{children}</motion.div>
  );
}

const SERVICES = [
  "Personal Styling Session",
  "Wardrobe Consultation",
  "Bespoke Suit Fitting",
  "Bridal & Event Styling",
  "Colour Analysis",
  "Virtual Styling",
];

const TIME_SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const STEPS = [
  { num: "01", title: "Fill in the form", body: "Tell us your preferred date, time, and what you're looking for." },
  { num: "02", title: "We confirm",       body: "Our team will reach out within 24 hours to confirm your slot." },
  { num: "03", title: "Meet your stylist", body: "Arrive at our Toronto studio for a relaxed, unhurried session." },
  { num: "04", title: "Your garment",     body: "We begin crafting. Three fittings follow before the final reveal." },
];

export function Appointment() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", date: "", time: "", notes: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", service: "", date: "", time: "", notes: "" });
  }

  const field = "w-full px-4 py-3.5 text-sm outline-none";
  const fieldStyle = { background: "#F5EDE7", border: "1px solid rgba(121,65,55,.2)", color: "#2C1810" };
  const labelClass = "block mb-2 text-xs tracking-[0.18em] uppercase";
  const labelStyle = { color: "#794137" };

  return (
    <div style={{ background: "#ECE1D8" }}>
      {/* ── PAGE HERO ── */}
      <section
        className="relative flex items-end px-6 lg:px-14"
        style={{ minHeight: 480, paddingTop: 140, paddingBottom: 80, background: "#2C1810" }}
      >
        <img
          src="https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?w=1600&h=700&fit=crop&auto=format"
          alt="Fashion consultation"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,#2C1810 35%,rgba(44,24,16,.6) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mb-3 text-xs tracking-[0.35em] uppercase"
              style={{ color: "#B39085" }}
            >
              Reserve Your Session
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 400, color: "#ECE1D8", lineHeight: 1.05 }}
            >
              Book an<br />
              <em style={{ fontStyle: "italic", color: "#B39085" }}>appointment.</em>
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="space-y-4"
          >
            {[
              { icon: <MapPin size={15} />,    text: "Toronto, Canada" },
              { icon: <Clock size={15} />,     text: "Mon–Fri 10AM–6PM · Sat 11AM–6PM" },
              { icon: <Calendar size={15} />,  text: "Flexible weekday and weekend slots available" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-3 text-sm" style={{ color: "rgba(179,144,133,.7)" }}>
                <span className="mt-0.5 shrink-0" style={{ color: "#B39085" }}>{icon}</span>
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 lg:px-14" style={{ background: "#F5EDE7" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal><p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>The Process</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mb-14" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 400, color: "#2C1810" }}>
              How it works
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.1}>
                <div className="relative">
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-5 left-full w-full h-px" style={{ background: "rgba(121,65,55,.15)", zIndex: 0 }} />
                  )}
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", color: "rgba(121,65,55,.18)", fontWeight: 400, lineHeight: 1 }}>{s.num}</p>
                  <p className="mt-2 mb-2 text-sm font-semibold tracking-wide" style={{ color: "#2C1810" }}>{s.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#7A5046" }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section className="py-24 px-6 lg:px-14" style={{ background: "#ECE1D8" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left info */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>Booking Form</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 400, color: "#2C1810" }}>
                Reserve your<br />
                <em style={{ fontStyle: "italic", color: "#794137" }}>session.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.15}><div className="w-10 h-px mb-6" style={{ background: "#B39085" }} /></Reveal>
            <Reveal delay={0.2}>
              <p className="mb-8 text-sm leading-loose" style={{ color: "#5A3A30" }}>
                Complete the form and our team will confirm your booking within 24 hours. Each session is entirely unhurried and tailored to you.
              </p>
            </Reveal>
            <Reveal y={0}>
              <motion.div
                className="overflow-hidden"
                style={{ aspectRatio: "4/3", background: "#D9CBBF" }}
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease }}
              >
                <img
                  src="https://images.unsplash.com/photo-1629511565591-a1d494ad6c58?w=800&h=600&fit=crop&auto=format"
                  alt="Styling session"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </Reveal>
          </div>

          {/* Form */}
          <div>
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mb-8 p-6 flex flex-col items-center text-center gap-3"
                  style={{ background: "#794137" }}
                >
                  <CheckCircle size={28} color="#ECE1D8" />
                  <p className="text-sm" style={{ color: "#ECE1D8" }}>
                    Your appointment request has been received. We will confirm your slot within 24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-xs tracking-[0.15em] uppercase"
                    style={{ color: "rgba(236,225,216,.65)" }}
                  >
                    Book another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {!sent && (
              <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-5" style={{ background: "#F5EDE7" }}>
                <Reveal delay={0.05}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass} style={labelStyle}>Full Name</label>
                      <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Sophia Laurent" className={field} style={fieldStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Email</label>
                      <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="sophia@email.com" className={field} style={fieldStyle} />
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div>
                    <label className={labelClass} style={labelStyle}>Phone (optional)</label>
                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+44 7700 900000" className={field} style={fieldStyle} />
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <div>
                    <label className={labelClass} style={labelStyle}>Service</label>
                    <select required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                      className={`${field} appearance-none cursor-pointer`}
                      style={{ ...fieldStyle, color: form.service ? "#2C1810" : "#9A7B73" }}>
                      <option value="" disabled>Select a service…</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass} style={labelStyle}>Preferred Date</label>
                      <input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                        className={field} style={fieldStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Preferred Time</label>
                      <select required value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}
                        className={`${field} appearance-none cursor-pointer`}
                        style={{ ...fieldStyle, color: form.time ? "#2C1810" : "#9A7B73" }}>
                        <option value="" disabled>Select time…</option>
                        {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.25}>
                  <div>
                    <label className={labelClass} style={labelStyle}>Additional Notes (optional)</label>
                    <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                      rows={4} placeholder="Tell us about your style goals or any special requirements…"
                      className={`${field} resize-none`} style={fieldStyle} />
                  </div>
                </Reveal>

                <Reveal delay={0.3}>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}
                    className="w-full py-4 text-xs tracking-[0.22em] uppercase flex items-center justify-center gap-2 transition-colors duration-300"
                    style={{ background: "#794137", color: "#ECE1D8" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#5C2F26")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#794137")}
                  >
                    Request Appointment <ArrowRight size={13} />
                  </motion.button>
                </Reveal>

                <p className="text-xs text-center" style={{ color: "rgba(121,65,55,.45)" }}>
                  We respond within 24 hours. No payment required to book.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 px-6 lg:px-14 text-center" style={{ background: "#1A0E0B" }}>
        <Reveal>
          <p className="text-sm" style={{ color: "rgba(179,144,133,.6)" }}>
            Have a question before booking?
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors duration-200"
            style={{ color: "#B39085" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#ECE1D8")}
            onMouseLeave={e => (e.currentTarget.style.color = "#B39085")}
          >
            Get in touch <ArrowRight size={12} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
