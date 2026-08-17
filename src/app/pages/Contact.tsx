import { useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, MapPin, Phone, Mail, Clock, CheckCircle, Instagram } from "lucide-react";
import tfaweWorkImage from "../../assets/tfawework.png";

const ease = [0.25, 0.1, 0.25, 1] as const;

function Reveal({ children, delay = 0, y = 32, className = "" }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={`min-w-0 ${className}`}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
    >{children}</motion.div>
  );
}

const INFO = [
  {
    icon: <MapPin size={18} />,
    label: "Studio Address",
    lines: ["Toronto, Canada"],
  },
  {
    icon: <Phone size={18} />,
    label: "Phone",
    lines: ["+1 (437) 473-6685"],
  },
  {
    icon: <Mail size={18} />,
    label: "Email",
    lines: ["hello@tfawe.com"],
  },
  {
    icon: <Clock size={18} />,
    label: "Opening Hours",
    lines: ["Mon–Fri  10:00 AM – 6:00 PM", "Saturday  11:00 AM – 5:00 PM", "Sunday  Closed"],
  },
];

const SOCIALS = [
  { label: "Instagram", handle: "@tfawe_",   href: "https://www.instagram.com/tfawe_/" },
  { label: "Pinterest", handle: "TFawe",    href: "#" },
  { label: "LinkedIn",  handle: "TFawe",   href: "#" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 6000);
  }

  const field = "w-full box-border px-4 py-3.5 text-sm outline-none";
  const fieldStyle = { background: "#ECE1D8", border: "1px solid rgba(121,65,55,.2)", color: "#2C1810" };

  return (
    <div style={{ background: "#ECE1D8" }}>
      {/* ── PAGE HERO ── */}
      <section
        className="relative flex items-end px-6 lg:px-14"
        style={{ minHeight: 440, paddingTop: 140, paddingBottom: 80, background: "#794137" }}
      >
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(236,225,216,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(236,225,216,.3) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,#794137 30%,transparent 100%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mb-3 text-xs tracking-[0.35em] uppercase"
            style={{ color: "rgba(236,225,216,.6)" }}
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 400, color: "#ECE1D8", lineHeight: 1.05 }}
          >
            We would love<br />
            <em style={{ fontStyle: "italic", color: "rgba(236,225,216,.65)" }}>to hear from you.</em>
          </motion.h1>
        </div>
      </section>

      {/* ── INFO + FORM ── */}
      <section className="py-24 px-6 lg:px-14">
        <div className="max-w-7xl mx-auto grid min-w-0 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Contact details */}
          <div className="min-w-0">
            <div className="grid min-w-0 sm:grid-cols-2 gap-8 mb-14">
              {INFO.map(({ icon, label, lines }, i) => (
                <Reveal key={label} delay={i * 0.08}>
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="shrink-0 mt-0.5 p-3" style={{ background: "#794137", color: "#ECE1D8" }}>{icon}</div>
                    <div className="min-w-0">
                      <p className="mb-2 text-xs tracking-[0.2em] uppercase" style={{ color: "#B39085" }}>{label}</p>
                      {lines.map(l => (
                        <p key={l} className="text-sm leading-relaxed break-words" style={{ color: "#3D2218" }}>{l}</p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Socials */}
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>Follow Us</p>
            </Reveal>
            <div className="space-y-3 mb-12">
              {SOCIALS.map(({ label, handle, href }, i) => (
                <Reveal key={label} delay={i * 0.07}>
                  <a
                    href={href}
                    className="flex min-w-0 items-center justify-between gap-4 px-5 py-4 group transition-colors duration-200"
                    style={{ background: "#F5EDE7", border: "1px solid rgba(121,65,55,.12)" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(121,65,55,.3)")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(121,65,55,.12)")}
                  >
                    <div className="min-w-0">
                      <p className="text-xs tracking-[0.15em] uppercase" style={{ color: "#B39085" }}>{label}</p>
                      <p className="text-sm break-words" style={{ color: "#3D2218" }}>{handle}</p>
                    </div>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" style={{ color: "#794137" }} />
                  </a>
                </Reveal>
              ))}
            </div>

            {/* Studio image */}
            <Reveal y={0}>
              <div
                className="w-full max-w-full overflow-hidden"
                style={{ minHeight: 260, aspectRatio: "16 / 10", background: "#D9CBBF" }}
              >
                <img
                  src={tfaweWorkImage}
                  alt="TFawe tailored tuxedo"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="min-w-0">
            <Reveal><p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>Send a Message</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-8" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 400, color: "#2C1810" }}>
                Say hello
              </h2>
            </Reveal>

            <form onSubmit={handleSubmit} className="space-y-5 p-8 lg:p-10" style={{ background: "#F5EDE7" }}>
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="p-5 flex items-center gap-3"
                    style={{ background: "#794137" }}
                  >
                    <CheckCircle size={20} color="#ECE1D8" />
                    <p className="text-sm" style={{ color: "#ECE1D8" }}>
                      Thank you — we will get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Reveal delay={0.05}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-xs tracking-[0.18em] uppercase" style={{ color: "#794137" }}>Your Name</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Amelia Richardson" className={field} style={fieldStyle} />
                  </div>
                  <div>
                    <label className="block mb-2 text-xs tracking-[0.18em] uppercase" style={{ color: "#794137" }}>Email</label>
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="amelia@email.com" className={field} style={fieldStyle} />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <label className="block mb-2 text-xs tracking-[0.18em] uppercase" style={{ color: "#794137" }}>Subject</label>
                  <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    placeholder="How can we help you?" className={field} style={fieldStyle} />
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div>
                  <label className="block mb-2 text-xs tracking-[0.18em] uppercase" style={{ color: "#794137" }}>Message</label>
                  <textarea required rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about yourself and what you're looking for…"
                    className={`${field} resize-none`} style={fieldStyle} />
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}
                  className="w-full py-4 text-xs tracking-[0.22em] uppercase flex items-center justify-center gap-2 transition-colors duration-300"
                  style={{ background: "#794137", color: "#ECE1D8" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#5C2F26")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#794137")}
                >
                  Send Message <ArrowRight size={13} />
                </motion.button>
              </Reveal>
            </form>

            <Reveal delay={0.1}>
              <div className="mt-6 text-center">
                <p className="text-sm" style={{ color: "#7A5046" }}>
                  Prefer to book directly?
                </p>
                <Link
                  to="/appointment"
                  className="mt-2 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors duration-200"
                  style={{ color: "#794137" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#5C2F26")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#794137")}
                >
                  Book an Appointment <ArrowRight size={12} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ── */}
      <section className="px-6 lg:px-14 pb-24">
        <div className="max-w-7xl mx-auto">
          <Reveal y={0}>
            <motion.div
              className="w-full overflow-hidden relative"
              style={{ height: 320, background: "#D9CBBF" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1603394151492-5e9b974b090b?w=1400&h=640&fit=crop&fm=jpg&q=80"
                alt="Toronto, Canada"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ background: "#794137" }} />
                <div className="px-6 py-3" style={{ background: "rgba(26,14,11,.85)" }}>
                  <p className="text-xs tracking-[0.2em] uppercase text-center" style={{ color: "#ECE1D8" }}>TFawe</p>
                  <p className="text-xs text-center mt-1" style={{ color: "rgba(179,144,133,.7)" }}>Toronto, Canada</p>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
