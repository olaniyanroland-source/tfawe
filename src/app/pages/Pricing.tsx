import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import jacketImage from "../../assets/Tfawesuit.JPG";

const ease = [0.25, 0.1, 0.25, 1] as const;
const darkSectionTextShadow = "0 1px 8px rgba(26,14,11,.65)";

// Fallback rates, used until live rates load (or if the fetch fails)
const FALLBACK_RATES: Record<string, number> = {
  CAD: 1,
  USD: 0.7226,
  GBP: 0.5338,
  EUR: 0.6220,
};

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

type ConstructionKey = "fused" | "fullCanvas" | "handMade";

const CONSTRUCTION_TABS: { key: ConstructionKey; label: string; description: string; level: string }[] = [
  { key: "fused",      label: "Fused",       level: "Entry",    description: "Structured construction using fusible interlining. Entry level  clean finish, great for everyday suiting." },
  { key: "fullCanvas", label: "Full Canvas", level: "Better",   description: "Canvas through the chest and lapel area. Better structure, superior drape and longevity over fused." },
  { key: "handMade", label: "Hand Made", level: "Premium",  description: "Canvas runs through the entire front of the jacket. The gold standard of construction for discerning clients." },
];

const GARMENTS: { name: string; fused: string; halfCanvas: string; fullCanvas: string; handMade: string; category: string }[] = [
  { name: "2-Piece Suit",  fused: "$699",  halfCanvas: "$1500",   fullCanvas: "$1,500", handMade: "$2,500", category: "Suits" },
  { name: "3-Piece Suit",  fused: "$899",  halfCanvas: "$1,800", fullCanvas: "$1,800", handMade: "$2,800", category: "Suits" },
  { name: "Tuxedo Suit",   fused: "$899",  halfCanvas: "$1,800", fullCanvas: "$1,800", handMade: "$2,800", category: "Suits" },
  { name: "Jacket",        fused: "$449",  halfCanvas: "$1,000", fullCanvas: "$1,000", handMade: "$1,600", category: "Separates" },
  { name: "Trousers",      fused: "$240",  halfCanvas: "$500",   fullCanvas: "$500",   handMade: "$750",   category: "Separates" },
  { name: "Waistcoat",     fused: "$250",  halfCanvas: "$400",   fullCanvas: "$400",   handMade: "$600",   category: "Separates" },
  { name: "Overcoat",      fused: "$699",  halfCanvas: "$1,500", fullCanvas: "$1,500", handMade: "$2,200", category: "Outerwear" },
  { name: "Regular Shirt", fused: "$220",  halfCanvas: "—",      fullCanvas: "—",      handMade: "—",      category: "Shirts" },
  { name: "Tuxedo Shirt",  fused: "$250",  halfCanvas: "—",      fullCanvas: "—",      handMade: "—",      category: "Shirts" },
];

const INCLUDES = [
  "Complimentary 15-min discovery call",
  "Expert fabric consultation",
  "Precision body measurements",
  "Three fittings minimum",
  "Final press and presentation",
];

export function Pricing() {
  const [activeTab, setActiveTab] = useState<ConstructionKey>("fused");
  const [currency, setCurrency] = useState<'CAD'|'USD'|'GBP'|'EUR'>('CAD');
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [ratesLoaded, setRatesLoaded] = useState(false);

  // Fetch live CAD-based exchange rates once on mount
  useEffect(() => {
    let cancelled = false;

    async function fetchRates() {
      try {
        const res = await fetch(
          "https://api.frankfurter.app/latest?from=CAD&to=USD,GBP,EUR"
        );
        if (!res.ok) throw new Error("Rate fetch failed");
        const data = await res.json();
        if (!cancelled && data?.rates) {
          setRates({
            CAD: 1,
            USD: data.rates.USD ?? FALLBACK_RATES.USD,
            GBP: data.rates.GBP ?? FALLBACK_RATES.GBP,
            EUR: data.rates.EUR ?? FALLBACK_RATES.EUR,
          });
          setRatesLoaded(true);
        }
      } catch (e) {
        // Silently keep fallback rates — no need to show an error to visitors
        console.warn("Using fallback exchange rates:", e);
      }
    }

    fetchRates();
    return () => { cancelled = true; };
  }, []);

  function formatPrice(raw: string) {
    if (!raw) return raw;
    if (raw === '—') return raw;
    if (raw === 'POA') return 'Contact for pricing';

    const numeric = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (Number.isNaN(numeric)) return raw;

    const rate = rates[currency] ?? 1;
    const converted = numeric * rate;

    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 }).format(converted);
    } catch (e) {
      return `${currency} ${Math.round(converted).toLocaleString()}`;
    }
  }
  const activeConstruction = CONSTRUCTION_TABS.find(t => t.key === activeTab)!;

  const categories = [...new Set(GARMENTS.map(g => g.category))];

  return (
    <div style={{ background: "#1A0E0B" }}>
      {/* ── PAGE HERO ── */}
      <section
        className="relative flex items-end pb-20 px-6 lg:px-14"
        style={{ minHeight: 440, paddingTop: 140 }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#1A0E0B 0%,#2C1810 60%,#1A0E0B 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mb-3 text-xs tracking-[0.35em] uppercase"
            style={{ color: "#B39085" }}
          >
            Price List for Garments
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 400, color: "#ECE1D8", lineHeight: 1.05 }}
          >
            Garment<br />
            <em style={{ fontStyle: "italic", color: "#B39085" }}>pricing.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-4 max-w-lg text-sm leading-relaxed"
            style={{ color: "rgba(179,144,133,.65)" }}
          >
            All prices are starting prices and reflect the construction method chosen. Select a construction type below to explore.
          </motion.p>
        </div>
      </section>

      {/* ── CONSTRUCTION TABS + TABLE ── */}
      <section className="px-6 lg:px-14 pb-24">
        <div className="max-w-5xl mx-auto">

          {/* Tab selector */}
          <Reveal y={16}>
            <div className="flex flex-wrap gap-2 mb-3">
              {CONSTRUCTION_TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="relative px-6 py-3 text-xs tracking-[0.14em] uppercase transition-all duration-300"
                  style={{
                    background: activeTab === tab.key ? "#794137" : "transparent",
                    color: activeTab === tab.key ? "#ECE1D8" : "rgba(179,144,133,.5)",
                    border: `1px solid ${activeTab === tab.key ? "#794137" : "rgba(179,144,133,.18)"}`,
                    fontWeight: 800,
                    textShadow: darkSectionTextShadow,
                  }}
                >
                  {tab.label}
                  <span className="ml-2 text-xs" style={{ color: activeTab === tab.key ? "rgba(236,225,216,.55)" : "rgba(179,144,133,.35)", fontWeight: 700 }}>
                    · {tab.level}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Currency selector (on its own line) */}
          <Reveal delay={0.02}>
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              {(['CAD','USD','GBP','EUR'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className="px-3 py-2 text-xs tracking-[0.1em] uppercase transition-all duration-200"
                  style={{
                    background: currency === c ? '#794137' : 'transparent',
                    color: currency === c ? '#ECE1D8' : 'rgba(179,144,133,.5)',
                    border: `1px solid ${currency === c ? '#794137' : 'rgba(179,144,133,.12)'}`,
                    fontWeight: 800,
                    textShadow: darkSectionTextShadow,
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Rate freshness note */}
          <Reveal delay={0.03}>
            <p className="mb-6 text-center text-[10px] tracking-[0.08em]" style={{ color: "rgba(179,144,133,.4)" }}>
              {ratesLoaded ? "Live exchange rates" : "Estimated exchange rates"}
            </p>
          </Reveal>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mb-10 text-sm leading-relaxed"
              style={{ color: "rgba(179,144,133,.55)", maxWidth: "56ch", fontWeight: 600, textShadow: darkSectionTextShadow }}
            >
              {activeConstruction.description}
            </motion.p>
          </AnimatePresence>

          {/* Garment table by category */}
          {categories.map((cat, ci) => (
            <div key={cat} className="mb-2">
              <Reveal delay={ci * 0.05}>
                <p className="px-5 py-2 text-xs tracking-[0.22em] uppercase" style={{ background: "rgba(121,65,55,.25)", color: "#B39085" }}>
                  {cat}
                </p>
              </Reveal>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + cat}
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                >
                  {GARMENTS.filter(g => g.category === cat).map((g, i, arr) => {
                    const price = g[activeTab];
                    return (
                      <motion.div
                        key={g.name}
                        variants={{ hidden: { opacity: 0, x: -18 }, visible: { opacity: 1, x: 0 } }}
                        transition={{ duration: 0.42, ease }}
                        className="flex items-center justify-between px-5 py-5 transition-colors duration-200"
                        style={{
                          borderBottom: i < arr.length - 1 ? "1px solid rgba(179,144,133,.07)" : "none",
                          background: "transparent",
                        }}
                        whileHover={{ background: "rgba(121,65,55,.1)" }}
                      >
                        <p className="text-sm" style={{ color: "#ECE1D8" }}>{g.name}</p>
                        <p
                          className="text-sm font-medium"
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            color: price === "—" ? "rgba(179,144,133,.25)"
                              : price === "POA" ? "#B39085"
                              : "#ECE1D8",
                          }}
                        >
                          {formatPrice(price)}
                        </p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          ))}

          <Reveal delay={0.1}>
            <div
              className="mt-3 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
              style={{ background: "rgba(121,65,55,.12)", border: "1px solid rgba(121,65,55,.2)" }}
            >
              <p className="text-xs leading-relaxed flex-1" style={{ color: "rgba(179,144,133,.55)" }}>
                All prices are starting prices. USD, GBP, and EUR amounts are converted from the CAD price at current market exchange rates and rounded to the nearest whole unit; final cost depends on fabric selection and complexity.
              </p>
              <Link
                to="/appointment"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.18em] uppercase transition-all duration-300"
                style={{ background: "#794137", color: "#ECE1D8" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#5C2F26")}
                onMouseLeave={e => (e.currentTarget.style.background = "#794137")}
              >
                Book a Fitting <ArrowRight size={12} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="py-24 px-6 lg:px-14" style={{ background: "#ECE1D8" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          <div>
            <Reveal><p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>Every Garment</p></Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 400, color: "#2C1810" }}>
                What's always<br />
                <em style={{ fontStyle: "italic", color: "#794137" }}>included.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.15}><div className="w-10 h-px my-6" style={{ background: "#B39085" }} /></Reveal>
            <Reveal delay={0.2}>
              <p className="mb-8 text-sm leading-loose" style={{ color: "#5A3A30" }}>
                Regardless of the construction tier you choose, every TFawe garment comes with the same unhurried personal service.
              </p>
            </Reveal>
            <div className="space-y-3">
              {INCLUDES.map((item, i) => (
                <Reveal key={item} delay={0.1 + i * 0.07}>
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-5 h-5 flex items-center justify-center" style={{ background: "#794137" }}>
                      <Check size={11} color="#ECE1D8" />
                    </div>
                    <p className="text-sm" style={{ color: "#3D2218" }}>{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal y={0}>
            <motion.div
              className="w-full overflow-hidden"
              style={{ aspectRatio: "4/5", background: "#D9CBBF" }}
            >
              <img
                src={jacketImage}
                alt="Bespoke jacket on display"
                className="w-full h-full object-cover scale-[1.06]"
              />
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 lg:px-14 text-center" style={{ background: "#794137" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#ECE1D8", fontWeight: 400 }}>
            Ready for your first fitting?
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-3 mb-8 text-sm" style={{ color: "rgba(236,225,216,.6)" }}>
            Schedule a consultation — we'll guide you through every step.
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
            Book a Consultation <ArrowRight size={13} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}