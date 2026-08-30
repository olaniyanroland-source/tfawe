import { useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroVideo from "../../assets/tfawevid.mp4";
import suit2Image from "../../assets/suit2.jpg";
import suit5Image from "../../assets/suit5.jpg";
import suit6Image from "../../assets/suit6.jpg";
import suit7Image from "../../assets/suit7.jpg";
import suit8Image from "../../assets/suit8.jpg";
import tfaweWorkImage from "../../assets/tfawework.png";
import { SelectedWork } from "../components/SelectedWork";

const ease = [0.25, 0.1, 0.25, 1] as const;
const heroTextShadow = "0 3px 18px rgba(26,14,11,.82), 0 1px 2px rgba(26,14,11,.9)";

function Reveal({ children, delay = 0, y = 32, className = "" }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
    >{children}</motion.div>
  );
}

const EDITORIAL = [
  { src: tfaweWorkImage, alt: "TFawe tailoring work", h: "h-80 lg:h-[500px]" },
  { src: suit6Image, alt: "Ivory tailored suit with a striped tie", h: "h-56 lg:h-72 self-end" },
  { src: suit7Image, alt: "Curated collection of tailored jackets in the atelier", h: "h-72 lg:h-[420px]" },
];

const QUICK_LINKS = [
  { label: "Our Story",    sub: "Est. 2014 · Toronto",              to: "/about",       img: "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=600&h=400&fit=crop&fm=jpg&q=80" },
  { label: "Pricing",      sub: "Bespoke tailoring, clearly priced", to: "/pricing",     img: suit2Image },
  { label: "Book a Fit",   sub: "Begin with a personal consultation", to: "/appointment", img: suit8Image },
  { label: "Contact",      sub: "Visit our Toronto atelier",          to: "/contact",     img: suit5Image },
];

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = tfaweWorkImage;
}

export function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 620 }}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline
          poster="https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=1920&h=1080&fit=crop&fm=jpg&q=80"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(130deg,rgba(12,7,5,.78) 0%,rgba(26,14,11,.56) 36%,rgba(121,65,55,.2) 62%,rgba(26,14,11,.52) 100%)" }} />
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/4" style={{ background: "linear-gradient(90deg,rgba(12,7,5,.52) 0%,rgba(12,7,5,.34) 48%,rgba(12,7,5,0) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-44" style={{ background: "linear-gradient(to top,#ECE1D8,transparent)" }} />

        <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-20 max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mb-5 text-xs tracking-[0.4em] uppercase"
            style={{ color: "#F2D7CB", fontWeight: 700, textShadow: heroTextShadow }}
          >
            Custom-Made Tailoring &amp; Personal Styling · Toronto, Canada.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="mb-6 leading-none"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.2rem,9vw,8.5rem)", fontWeight: 500, color: "#FFF6EF", maxWidth: "11ch", textShadow: heroTextShadow }}
          >
            Crafted for<br />
            <em style={{ fontStyle: "italic", color: "#F2CDBB" }}>you alone.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease }}
            className="mb-10 max-w-sm text-sm leading-relaxed"
            style={{ color: "rgba(255,246,239,.94)", fontWeight: 500, textShadow: heroTextShadow }}
          >
            Toronto's finest atelier for bespoke suiting, personal styling, and garments built to outlast every trend.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/appointment"
              className="flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300"
              style={{ background: "#794137", color: "#ECE1D8" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#5C2F26")}
              onMouseLeave={e => (e.currentTarget.style.background = "#794137")}
            >
              Book a Consultation <ArrowRight size={13} />
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300"
              style={{ background: "transparent", color: "#ECE1D8", border: "1px solid rgba(236,225,216,.35)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#ECE1D8")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(236,225,216,.35)")}
            >
              Our Story
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ color: "rgba(255,246,239,.68)", textShadow: heroTextShadow }}
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown size={14} className="animate-bounce" />
        </motion.div>
      </section>

      {/* ── QUICK NAV CARDS ── */}
      <section className="py-20 px-6 lg:px-14" style={{ background: "#ECE1D8" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="mb-10 text-xs tracking-[0.3em] uppercase text-center" style={{ color: "#794137" }}>
              Explore
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_LINKS.map(({ label, sub, to, img }, i) => (
              <Reveal key={to} delay={i * 0.08}>
                <Link to={to} className="block group relative overflow-hidden" style={{ background: "#D9CBBF", aspectRatio: "3/4" }}>
                  <img src={img} alt={label} onError={handleImageError} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(26,14,11,.85) 0%,transparent 55%)" }} />
                  <div className="absolute bottom-0 left-0 p-6">
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", color: "#ECE1D8", fontWeight: 400, lineHeight: 1.2 }}>{label}</p>
                    <p className="mt-1 text-xs" style={{ color: "rgba(179,144,133,.75)" }}>{sub}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs tracking-[0.15em] uppercase" style={{ color: "#B39085" }}>
                      <span>Explore</span>
                      <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SelectedWork />

      {/* ── EDITORIAL STRIP ── */}
      <section className="py-0" style={{ background: "#2C1810" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14 pt-20 pb-0">
          <Reveal>
            <p className="mb-3 text-xs tracking-[0.35em] uppercase" style={{ color: "#B39085" }}>Editorial</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,4vw,3.2rem)", color: "#ECE1D8", fontWeight: 400, maxWidth: "22ch", lineHeight: 1.3 }}>
              "Fashion is the armour to survive the reality of everyday life."
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-3 mb-12 text-xs tracking-[0.25em] uppercase" style={{ color: "rgba(179,144,133,.55)" }}>
              — Tunde Fawe, Founder/Creative Director
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-3 gap-px" style={{ background: "rgba(179,144,133,.08)" }}>
          {EDITORIAL.map(({ src, alt, h }, i) => (
            <Reveal key={alt} delay={i * 0.1} y={0} className={h}>
              <motion.div
                className="w-full h-full overflow-hidden"
                style={{ background: "#3D2218" }}
              >
                <img src={src} alt={alt} onError={handleImageError} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
      {/* ── WHY TFawe? ── */}
      <section className="py-20 px-6 lg:px-14" style={{ background: "#ECE1D8" }}>
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>
              Why TFawe?
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: "#1A0E0B", fontWeight: 400, maxWidth: "48ch", margin: "0 auto" }}>
              Bespoke craftsmanship made for the life you lead.
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-4 mb-8 max-w-3xl mx-auto text-sm" style={{ color: "rgba(26,14,11,.8)" }}>
              At TFawe we combine Canada tailoring traditions with considered design. Each garment is measured, cut, and finished by hand to reflect your proportions, priorities and personality — created to be worn, mended, and loved for years.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Reveal delay={0.22}>
              <div style={{ background: "#fff", padding: 24, borderRadius: 8, border: "1px solid rgba(26,14,11,0.04)" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "#1A0E0B", marginBottom: 6 }}>Craftsmanship</p>
                <p className="text-sm" style={{ color: "rgba(26,14,11,.7)" }}>Master tailors and hand-finished details ensure a precise fit and refinement that only time-honoured techniques can provide.</p>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div style={{ background: "#fff", padding: 24, borderRadius: 8, border: "1px solid rgba(26,14,11,0.04)" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "#1A0E0B", marginBottom: 6 }}>Personalization</p>
                <p className="text-sm" style={{ color: "rgba(26,14,11,.7)" }}>From the first consultation to the final fitting, every decision is tailored to your lifestyle — fabrics, linings and finishes chosen with you in mind.</p>
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <div style={{ background: "#fff", padding: 24, borderRadius: 8, border: "1px solid rgba(26,14,11,0.04)" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "#1A0E0B", marginBottom: 6 }}>Sustainability</p>
                <p className="text-sm" style={{ color: "rgba(26,14,11,.7)" }}>We favour enduring fabrics and offer alteration and repair services so pieces remain in use — a considered alternative to the disposable fashion cycle.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="py-24 px-6 lg:px-14 text-center" style={{ background: "#794137" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#ECE1D8", fontWeight: 400 }}>
            Ready for something<br />
            <em style={{ fontStyle: "italic", color: "#B39085" }}>made just for you?</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 mb-8 text-sm" style={{ color: "rgba(236,225,216,.65)" }}>
            Three fittings. One garment. Entirely yours.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <Link
            to="/appointment"
            className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.22em] uppercase transition-all duration-300"
            style={{ background: "#ECE1D8", color: "#794137" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#D9CBBF")}
            onMouseLeave={e => (e.currentTarget.style.background = "#ECE1D8")}
          >
            Book Your Consultation <ArrowRight size={13} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
