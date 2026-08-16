import { useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, Scissors, Star, Award, Users } from "lucide-react";
import ceoImage from "../../assets/CEO.png";
import { ElfsightWidget } from "../components/ElfsightWidget";

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

const TIMELINE = [
  { year: "2014", event: "TFawe founded by Tunde Fawe in a small Toronto studio." },
  { year: "2016", event: "First major editorial feature in British Vogue. Clientele doubles within a year." },
  { year: "2018", event: "Refined the made-to-measure process from private fittings to final hand finishing." },
  { year: "2021", event: "Launched virtual styling and shipped garments internationally for the first time." },
  { year: "2024", event: "Named one of Toronto's top ten independent ateliers by The Times Style." },
];

const MAKER = {
  name: "Tunde Fawe",
  role: "Founder, Creative Director & Tailor",
  img: ceoImage,
};

const TAPE_ITEMS = Array.from({ length: 8 }, (_, i) => i + 1);

const CRAFT = [
  { icon: <Scissors size={20} />, title: "Precision Cutting",  body: "Every pattern cut to exact measurements." },
  { icon: <Star size={20} />,     title: "Rare Fabrics",        body: "Over 3,000 cloths from the finest mills." },
  { icon: <Award size={20} />,    title: "Master Craftsmanship", body: "Decades of experience in every stitch." },
  { icon: <Users size={20} />,    title: "Personal Service",    body: "Three fittings minimum, no compromises." },
];

export function About() {
  return (
    <div style={{ background: "#ECE1D8" }}>
      {/* ── PAGE HERO ── */}
      <section
        className="relative flex items-end pb-20 px-6 lg:px-14"
        style={{ minHeight: 500, background: "#1A0E0B", paddingTop: 140 }}
      >
        <img
          src="https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?w=1600&h=700&fit=crop&auto=format"
          alt="Fashion editorial background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,#1A0E0B 30%,rgba(26,14,11,.5) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mb-3 text-xs tracking-[0.35em] uppercase"
            style={{ color: "#B39085" }}
          >
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 400, color: "#ECE1D8", lineHeight: 1.05 }}
          >
            Where heritage<br />
            <em style={{ fontStyle: "italic", color: "#B39085" }}>meets precision.</em>
          </motion.h1>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-24 px-6 lg:px-14">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          <div>
            <Reveal y={0}>
              <motion.div
                className="w-full overflow-hidden"
                style={{ aspectRatio: "3/4", background: "#D9CBBF" }}
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, ease }}
              >
                <img
                  src="https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=800&h=1067&fit=crop&auto=format"
                  alt="Bespoke tailoring craft"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>Our Story</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 400, color: "#2C1810", lineHeight: 1.2 }}>
                Rooted in craft.<br />
                <em style={{ fontStyle: "italic", color: "#794137" }}>Driven by beauty.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.15}><div className="w-10 h-px my-6" style={{ background: "#B39085" }} /></Reveal>
            <Reveal delay={0.2}>
              <p className="mb-5 text-sm leading-loose" style={{ color: "#5A3A30" }}>
                Founded in 2014 by master tailor Tunde Fawe, TFawe was born from a single belief: clothing is a language, and every person deserves to speak it fluently. Our Toronto atelier is an intimate space where tradition meets modernity.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mb-8 text-sm leading-loose" style={{ color: "#5A3A30" }}>
                We work with the world's finest mills — English, Italian, and Japanese — combining centuries-old hand-stitching with contemporary silhouettes. Every garment we produce is entirely unique, because so is the person who wears it.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="grid grid-cols-3 gap-5 mb-8">
                {[["12+", "Years"], ["840+", "Clients"], ["3", "Awards"]].map(([n, l]) => (
                  <div key={l} className="border-l-2 pl-4" style={{ borderColor: "#794137" }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 400, color: "#794137", lineHeight: 1 }}>{n}</p>
                    <p className="mt-1 text-xs tracking-[0.18em] uppercase" style={{ color: "#B39085" }}>{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CRAFT PILLARS ── */}
      <section className="py-24 px-6 lg:px-14" style={{ background: "#794137" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="mb-3 text-xs tracking-[0.3em] uppercase text-center" style={{ color: "#B39085" }}>The Craft</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-center mb-14" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", color: "#ECE1D8", fontWeight: 400 }}>
              Extraordinary in every detail
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(236,225,216,.1)" }}>
            {CRAFT.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <motion.div
                  className="p-8 lg:p-10 h-full flex flex-col"
                  style={{ background: "#794137" }}
                  whileHover={{ background: "#5C2F26" }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-5 p-3 w-fit" style={{ background: "rgba(236,225,216,.1)", color: "#B39085" }}>
                    {c.icon}
                  </div>
                  <p className="mb-2 text-xs tracking-[0.15em] font-semibold uppercase" style={{ color: "#ECE1D8" }}>{c.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(236,225,216,.6)" }}>{c.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-24 px-6 lg:px-14" style={{ background: "#F5EDE7" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal><p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>Milestones</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mb-14" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 400, color: "#2C1810" }}>
              A decade of craft
            </h2>
          </Reveal>

          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px" style={{ background: "rgba(121,65,55,.15)" }} />
            <div className="space-y-0">
              {TIMELINE.map(({ year, event }, i) => (
                <Reveal key={year} delay={i * 0.1}>
                  <div className="flex items-start gap-8 py-7" style={{ borderBottom: i < TIMELINE.length - 1 ? "1px solid rgba(121,65,55,.1)" : "none" }}>
                    <p className="w-16 shrink-0 text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "#794137" }}>{year}</p>
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 relative z-10" style={{ background: "#794137", marginLeft: "-1px" }} />
                    <p className="text-sm leading-relaxed" style={{ color: "#5A3A30" }}>{event}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAKER ── */}
      <section className="py-24 px-6 lg:px-14" style={{ background: "#ECE1D8" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal><p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>The Hand</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mb-14 max-w-4xl" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 400, color: "#2C1810" }}>
              The hand behind the beautiful garments
            </h2>
          </Reveal>
          <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
            <Reveal>
              <div className="group">
                <div className="overflow-hidden mb-4" style={{ background: "#D9CBBF", aspectRatio: "4/5" }}>
                  <img src={MAKER.img} alt={MAKER.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#2C1810", fontWeight: 400 }}>{MAKER.name}</p>
                <p className="mt-1 text-xs tracking-[0.15em] uppercase" style={{ color: "#B39085" }}>{MAKER.role}</p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="max-w-2xl">
                <p className="mb-5 text-sm leading-loose" style={{ color: "#5A3A30" }}>
                  TFawe is a solo atelier shaped by one pair of hands, from first sketch and fabric selection to fittings, finishing, and final styling.
                </p>
                <p className="text-sm leading-loose" style={{ color: "#5A3A30" }}>
                  Each garment carries Tunde's eye for proportion, quiet detail, and personal service, making every piece feel considered from the inside out.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="overflow-hidden py-20" style={{ background: "#F5EDE7" }} aria-label="Lately on Instagram">
        <div className="about-tape-marquee mb-14" aria-hidden="true">
          <div className="about-tape-track">
            {[...TAPE_ITEMS, ...TAPE_ITEMS].map((item, i) => (
              <div className="about-tape-item" key={`${item}-${i}`}>
                <span className="about-tape-number">{String(item).padStart(2, "0")}</span>
                <span className="about-tape-label">Lately on Instagram</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal y={20}>
            <ElfsightWidget appId="27353541-0b22-462d-ba5d-00526dee3ab6" style={{ minHeight: 260 }} />
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 lg:px-14 text-center" style={{ background: "#1A0E0B" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#ECE1D8", fontWeight: 400 }}>
            Ready to work with us?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 mb-8 text-sm" style={{ color: "rgba(179,144,133,.6)" }}>
            Book a consultation or browse our pricing.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300"
              style={{ background: "#794137", color: "#ECE1D8" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#5C2F26")}
              onMouseLeave={e => (e.currentTarget.style.background = "#794137")}
            >
              Book Now <ArrowRight size={13} />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300"
              style={{ border: "1px solid rgba(179,144,133,.3)", color: "#ECE1D8" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#ECE1D8")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(179,144,133,.3)")}
            >
              View Pricing
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
