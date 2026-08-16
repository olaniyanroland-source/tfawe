import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroVideo from "../../assets/heroVideo.mp4";
import ceoImage from "../../assets/CEO.png";
import tfaweWorkImage from "../../assets/tfawework.png";

const ease = [0.25, 0.1, 0.25, 1] as const;
const heroTextShadow = "0 3px 18px rgba(26,14,11,.82), 0 1px 2px rgba(26,14,11,.9)";

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

const EDITORIAL = [
  { src: tfaweWorkImage, alt: "TFawe tailoring work", h: "h-80 lg:h-[500px]" },
  { src: "https://images.unsplash.com/photo-1664076458686-3449062080ac?w=600&h=800&fit=crop&auto=format", alt: "Woman in elegant dress", h: "h-56 lg:h-72 self-end" },
  { src: "https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?w=600&h=800&fit=crop&auto=format", alt: "Red gown editorial", h: "h-72 lg:h-[420px]" },
];

const QUICK_LINKS = [
  { label: "Our Story",    sub: "Est. 2014 · Toronto",              to: "/about",       img: "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=600&h=400&fit=crop&auto=format" },
  { label: "Pricing",      sub: "Garments from $200",               to: "/pricing",     img: "https://images.unsplash.com/photo-1603394151492-5e9b974b090b?w=600&h=400&fit=crop&auto=format" },
  { label: "Book a Fit",   sub: "Reserve your consultation",        to: "/appointment", img: "https://images.unsplash.com/photo-1629511565591-a1d494ad6c58?w=600&h=400&fit=crop&auto=format" },
  { label: "Contact",      sub: "Toronto, Canada",                  to: "/contact",     img: "https://images.unsplash.com/photo-1771876499965-72f0a702c45a?w=600&h=400&fit=crop&auto=format" },
];

const SELECTED_WORK = [
  {
    title: "Ivory Ceremony",
    type: "Hand-finished bridal",
    detail: "Sculpted bodice, silk organza train, hidden corsetry.",
    measure: "01 / 06",
    img: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=900&h=1200&fit=crop&auto=format",
    width: "clamp(18rem, 32vw, 30rem)",
    height: "clamp(24rem, 52svh, 32rem)",
    align: "self-end",
  },
  {
    title: "Black Tie Study",
    type: "Custom eveningwear",
    detail: "Peak lapel dinner jacket cut close through the waist.",
    measure: "02 / 06",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&h=1200&fit=crop&auto=format",
    width: "clamp(14rem, 22vw, 21rem)",
    height: "clamp(20rem, 43svh, 26rem)",
    align: "self-start",
  },
  {
    title: "Red Salon",
    type: "Occasion garment",
    detail: "Fluid drape, high-slit movement, hand-balanced hem.",
    measure: "03 / 06",
    img: "https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?w=900&h=1200&fit=crop&auto=format",
    width: "clamp(17rem, 29vw, 27rem)",
    height: "clamp(22rem, 49svh, 30rem)",
    align: "self-center",
  },
  {
    title: "Quiet Structure",
    type: "Tailored separates",
    detail: "Soft shoulder, relaxed trouser line, matte wool finish.",
    measure: "04 / 06",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=900&h=1200&fit=crop&auto=format",
    width: "clamp(20rem, 37vw, 36rem)",
    height: "clamp(25rem, 55svh, 34rem)",
    align: "self-end",
  },
  {
    title: "After-Hours Silk",
    type: "Personal styling",
    detail: "Clean neckline, elongated proportion, evening-ready finish.",
    measure: "05 / 06",
    img: ceoImage,
    width: "clamp(15rem, 24vw, 23rem)",
    height: "clamp(20rem, 44svh, 27rem)",
    align: "self-start",
  },
];

export function Home() {
  const selectedWorkRef = useRef<HTMLElement | null>(null);
  const selectedStripRef = useRef<HTMLDivElement | null>(null);
  const [selectedScrollDistance, setSelectedScrollDistance] = useState(0);

  const { scrollYProgress: selectedProgress } = useScroll({
    target: selectedWorkRef,
    offset: ["start start", "end end"],
  });
  const selectedX = useTransform(selectedProgress, [0, 1], [0, -selectedScrollDistance]);

  useEffect(() => {
    const measureSelectedStrip = () => {
      if (!selectedStripRef.current) return;

      const horizontalPadding = window.innerWidth < 1024 ? 48 : 112;
      const distance = Math.max(selectedStripRef.current.scrollWidth - window.innerWidth + horizontalPadding, 0);
      setSelectedScrollDistance(distance);
    };

    measureSelectedStrip();
    window.addEventListener("resize", measureSelectedStrip);
    return () => window.removeEventListener("resize", measureSelectedStrip);
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 620 }}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline
          poster="https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=1920&h=1080&fit=crop&auto=format"
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
            Bespoke Tailoring &amp; Personal Styling · Toronto, Canada.
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
                  <img src={img} alt={label} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
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

      {/* ── SELECTED WORK ── */}
      <section
        ref={selectedWorkRef}
        className="relative lg:pt-12"
        style={{ background: "#F5EDE7", height: selectedScrollDistance ? `calc(100svh + ${selectedScrollDistance}px)` : "280svh" }}
      >
        <div className="sticky top-0 min-h-[720px] h-svh overflow-hidden flex flex-col justify-center lg:justify-start py-20 lg:pt-13 lg:pb-10">
          <div className="px-6 lg:px-14 mb-10">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.72fr_1fr] gap-8 items-end">
              <div>
                <p className="mb-3 text-xs tracking-[0.35em] uppercase" style={{ color: "#794137" }}>Selected Work</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4.8vw,4.4rem)", color: "#1A0E0B", fontWeight: 400, lineHeight: 1.05 }}>
                  Measured in detail.<br />
                  <em style={{ fontStyle: "italic", color: "#794137" }}>Remembered in motion.</em>
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-loose lg:ml-auto" style={{ color: "rgba(26,14,11,.72)" }}>
                A moving strip of recent silhouettes, fittings, and finished garments. Hover each frame to reveal the quiet decisions behind the final piece.
              </p>
            </div>
          </div>

          <motion.div
            ref={selectedStripRef}
            className="flex items-stretch gap-4 lg:gap-6 px-6 lg:px-14 will-change-transform"
            style={{ x: selectedX, width: "max-content" }}
          >
            {SELECTED_WORK.map(({ title, type, detail, measure, img, width, height, align }) => (
              <article
                key={title}
                className={`group relative shrink-0 overflow-hidden ${align}`}
                style={{ width, height, background: "#D9CBBF" }}
              >
                <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover lg:object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-90" />
                <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100 opacity-65" style={{ background: "linear-gradient(to top,rgba(26,14,11,.88) 0%,rgba(26,14,11,.2) 54%,rgba(26,14,11,.02) 100%)" }} />
                <div className="absolute top-5 left-5 text-xs tracking-[0.22em] uppercase" style={{ color: "rgba(236,225,216,.76)" }}>{measure}</div>
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                  <p className="mb-2 text-xs tracking-[0.2em] uppercase translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" style={{ color: "#B39085" }}>
                    {type}
                  </p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.45rem,2.6vw,2.4rem)", color: "#ECE1D8", fontWeight: 400, lineHeight: 1.05 }}>
                    {title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" style={{ color: "rgba(236,225,216,.78)" }}>
                    {detail}
                  </p>
                </div>
              </article>
            ))}

            <Link
              to="/contact"
              className="group relative shrink-0 self-center overflow-hidden flex flex-col justify-between p-8 lg:p-10"
              style={{ width: "clamp(18rem, 30vw, 31rem)", height: "min(48svh, 25rem)", background: "#1A0E0B", color: "#ECE1D8" }}
            >
              <div>
                <p className="mb-4 text-xs tracking-[0.28em] uppercase" style={{ color: "#B39085" }}>Next Measure</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.2vw,3rem)", fontWeight: 400, lineHeight: 1.08 }}>
                  Begin your own fitting.
                </h3>
              </div>
              <div className="relative z-10 flex items-center gap-3 text-xs tracking-[0.22em] uppercase" style={{ color: "#D9B46F" }}>
                <span>Enquire</span>
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

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
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: i * 0.12, ease }}
              >
                <img src={src} alt={alt} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
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
