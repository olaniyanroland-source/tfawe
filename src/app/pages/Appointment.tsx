import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, MapPin, Clock, Calendar, Ruler, CreditCard } from "lucide-react";

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

const STEPS = [
  { num: "01", title: "Choose a time", body: "Select the appointment type and time that works best for you." },
  { num: "02", title: "Confirm your details", body: "Add your details to reserve your selected appointment slot." },
  { num: "03", title: "Meet your stylist", body: "Arrive at our Toronto studio for a relaxed, unhurried session." },
  { num: "04", title: "Your garment",     body: "We begin crafting. Three fittings follow before the final reveal." },
];

const CALENDLY_URL = "https://calendly.com/olaniyanroland/30min?background_color=ece1d8&text_color=794137&primary_color=b39085";

export function Appointment() {
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "calendly-widget-script";
    const initializeCalendly = () => {
      window.requestAnimationFrame(() => {
        const parentElement = calendlyRef.current;
        const calendly = (window as Window & {
          Calendly?: {
            initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
          };
        }).Calendly;

        if (parentElement && !parentElement.querySelector("iframe") && calendly) {
          calendly.initInlineWidget({ url: CALENDLY_URL, parentElement });
        }
      });
    };

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener("load", initializeCalendly);
      initializeCalendly();
      return () => existingScript.removeEventListener("load", initializeCalendly);
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.addEventListener("load", initializeCalendly);
    document.body.appendChild(script);

    return () => script.removeEventListener("load", initializeCalendly);
  }, []);

  return (
    <div style={{ background: "#ECE1D8" }}>
      {/* ── PAGE HERO ── */}
      <section
        className="relative flex items-end px-6 lg:px-14"
        style={{ minHeight: 480, paddingTop: 140, paddingBottom: 80, background: "#2C1810" }}
      >
        <img
          src="https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?w=1600&h=700&fit=crop&fm=jpg&q=80"
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

      {/* ── PRIVATE CONSULTATION ── */}
      <section className="py-20 px-6 lg:px-14" style={{ background: "#F5EDE7" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
          <div>
            <Reveal>
              <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>Consultation</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="mb-6"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 400, color: "#2C1810", lineHeight: 1.15 }}
              >
                Your Private<br />
                <em style={{ fontStyle: "italic", color: "#794137" }}>Consultation</em>
              </h2>
            </Reveal>
            <Reveal delay={0.15}><div className="w-10 h-px mb-6" style={{ background: "#B39085" }} /></Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm leading-loose" style={{ color: "#5A3A30" }}>
                Your TFAWE consultation is the first step in creating a garment made specifically for you.
              </p>
            </Reveal>
          </div>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <p className="text-sm leading-loose" style={{ color: "#5A3A30" }}>
                We’ll explore our fabric selections together and discuss your preferred style, colours, details, and overall vision. It’s also an opportunity to ask questions and understand the options available for your custom garment.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-px" style={{ background: "rgba(121,65,55,.14)" }}>
              <Reveal delay={0.15}>
                <div className="h-full p-7 lg:p-8" style={{ background: "#F5EDE7" }}>
                  <div className="mb-5 p-3 w-fit" style={{ background: "rgba(121,65,55,.08)", color: "#794137" }}>
                    <Ruler size={20} />
                  </div>
                  <h3 className="mb-3 text-sm font-semibold tracking-[0.12em] uppercase" style={{ color: "#2C1810" }}>
                    Measurements
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5A3A30" }}>
                    Once you decide to proceed with your custom garment, measurements will be taken.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="h-full p-7 lg:p-8" style={{ background: "#F5EDE7" }}>
                  <div className="mb-5 p-3 w-fit" style={{ background: "rgba(121,65,55,.08)", color: "#794137" }}>
                    <CreditCard size={20} />
                  </div>
                  <h3 className="mb-3 text-sm font-semibold tracking-[0.12em] uppercase" style={{ color: "#2C1810" }}>
                    Consultation Fee
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5A3A30" }}>
                    A $50 consultation fee is required to secure your appointment. If you decide to proceed with your order, the full consultation fee will be credited toward the final cost of your garment.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <div className="grid md:grid-cols-2 gap-6 pt-2">
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: "#794137" }}>
                    In-person appointments
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#5A3A30" }}>
                    Measurements will be taken by a TFAWE representative during your appointment.
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: "#794137" }}>
                    Virtual appointments
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#5A3A30" }}>
                    You will need a measuring tape and someone available to assist with taking your measurements. Our team will guide both of you through the process step by step to ensure the measurements are taken correctly.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
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

      {/* ── BOOKING ── */}
      <section className="py-24 px-6 lg:px-14" style={{ background: "#ECE1D8" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left info */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>Book Your Appointment</p>
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
                Choose a time that suits you, then complete your booking directly through our scheduling calendar. Each session is entirely unhurried and tailored to you.
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
                  src="https://images.unsplash.com/photo-1629511565591-a1d494ad6c58?w=800&h=600&fit=crop&fm=jpg&q=80"
                  alt="Styling session"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden" style={{ background: "#F5EDE7" }}>
              <div
                ref={calendlyRef}
                className="calendly-inline-widget"
                data-url={CALENDLY_URL}
                style={{ minWidth: 320 }}
              />
            </div>
          </Reveal>
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
