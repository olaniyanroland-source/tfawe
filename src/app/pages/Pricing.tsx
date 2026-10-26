import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import jacketImage from "../../assets/Tfawesuit.JPG";

const ease = [0.25, 0.1, 0.25, 1] as const;

type Currency = "CAD" | "USD" | "GBP" | "EUR";
type CurrencyRates = Record<Currency, number>;
const CURRENCIES: Currency[] = ["CAD", "USD", "GBP", "EUR"];

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

const CUSTOM_MADE_PRICES = [
  { garment: "Suits", halfCanvas: 1000, fullCanvas: 1500 },
  { garment: "Jackets", halfCanvas: 760, fullCanvas: 1260 },
  { garment: "Overcoats", halfCanvas: 600, fullCanvas: 1000 },
];

const INDIVIDUAL_GARMENT_PRICES = [
  { garment: "Waistcoat", price: 250 },
  { garment: "Shirt", price: 220 },
  { garment: "Trouser", price: 240 },
];

const HANDMADE_PRICES = [
  { label: "Suit (Jacket & Trousers)", price: 3500 },
  { label: "Jacket Only", price: 2900 },
  { label: "Trousers Only", price: 600 },
];

const INCLUDES = [
  "Complimentary 15-min discovery call",
  "Expert fabric consultation",
  "Precision body measurements",
  "Three fittings minimum",
  "Final press and presentation",
];

export function Pricing() {
  const [currency, setCurrency] = useState<Currency>("CAD");
  const [rates, setRates] = useState<CurrencyRates>({ CAD: 1, USD: 1, GBP: 1, EUR: 1 });
  const [ratesAsOf, setRatesAsOf] = useState<string | null>(null);
  const [ratesError, setRatesError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      try {
        const response = await fetch("https://api.frankfurter.dev/v2/rates?base=CAD&quotes=USD,GBP,EUR");
        if (!response.ok) throw new Error("Exchange rate request failed");

        const data: { date: string; quote: Currency; rate: number }[] = await response.json();
        const nextRates = Object.fromEntries(data.map(({ quote, rate }) => [quote, rate])) as Partial<CurrencyRates>;
        if (![nextRates.USD, nextRates.GBP, nextRates.EUR].every(rate => typeof rate === "number" && rate > 0)) {
          throw new Error("Exchange rate response was incomplete");
        }

        if (!cancelled) {
          setRates({ CAD: 1, USD: nextRates.USD!, GBP: nextRates.GBP!, EUR: nextRates.EUR! });
          setRatesAsOf(data[0]?.date ?? null);
        }
      } catch {
        if (!cancelled) setRatesError(true);
      }
    }

    loadRates();
    return () => { cancelled = true; };
  }, []);

  function formatPrice(cadAmount: number) {
    const converted = cadAmount * rates[currency];
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(converted);
  }

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
            Explore our custom-made construction options and handmade bespoke garments.
          </motion.p>
        </div>
      </section>

      {/* ── CUSTOM-MADE + HANDMADE PRICE GUIDES ── */}
      <section className="px-6 pt-20 pb-10 lg:px-14 lg:py-24" style={{ background: "#ECE1D8", color: "#2C1810" }}>
        <div className="max-w-5xl mx-auto space-y-16">
          <Reveal y={16}>
            <div>
              <div className="mb-5 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between" style={{ borderColor: "rgba(121,65,55,.2)" }}>
                <div className="flex items-center justify-between gap-2 sm:block">
                  <p className="mb-0 whitespace-nowrap text-[9px] font-bold tracking-[0.08em] uppercase sm:mb-2 sm:text-[10px] sm:tracking-[0.2em]" style={{ color: "#794137" }}>
                    View prices in
                  </p>
                  <div role="group" aria-label="Select price currency" className="inline-flex rounded border p-1" style={{ background: "#FFF9F5", borderColor: "rgba(121,65,55,.24)" }}>
                    {CURRENCIES.map(code => {
                      const selected = currency === code;
                      const unavailable = code !== "CAD" && !ratesAsOf;
                      return (
                        <button
                          key={code}
                          type="button"
                          aria-label={`Display prices in ${code}`}
                          aria-pressed={selected}
                          disabled={unavailable}
                          onClick={() => setCurrency(code)}
                          className="min-w-10 px-2 py-2 text-xs font-bold tracking-[0.08em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-w-14 sm:px-3"
                          style={{
                            background: selected ? "#794137" : "transparent",
                            color: selected ? "#ECE1D8" : unavailable ? "rgba(90,58,48,.4)" : "#5A3A30",
                            outlineColor: "#794137",
                            cursor: unavailable ? "not-allowed" : "pointer",
                          }}
                        >
                          {code}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p className="text-xs leading-relaxed sm:max-w-xs sm:text-right" style={{ color: "#5A3A30" }} aria-live="polite">
                  {ratesAsOf
                    ? `Latest available mid-market rates · ${ratesAsOf}`
                    : ratesError
                      ? "Live rates unavailable; prices are shown in CAD."
                      : "Loading current exchange rates…"}
                </p>
              </div>
              <p className="mb-8 text-sm leading-relaxed" style={{ color: "#5A3A30" }}>
                Base prices are in CAD and shown in the selected currency. Final pricing depends on fabric selection and design details.
              </p>
              <h2
                className="mb-8 px-4 py-3 text-lg tracking-[0.06em] sm:px-5 sm:py-4 sm:text-xl"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, color: "#2C1810", background: "rgba(121,65,55,.06)", border: "1px solid rgba(121,65,55,.22)", borderLeft: "4px solid #794137" }}
              >
                CUSTOM-MADE PRICE GUIDE
              </h2>
              <div>
                <table className="w-full table-fixed border-collapse text-left" style={{ color: "#2C1810", fontFamily: "'Raleway', sans-serif" }}>
                  <colgroup>
                    <col className="w-[27%]" />
                    <col className="w-[36.5%]" />
                    <col className="w-[36.5%]" />
                  </colgroup>
                  <thead>
                    <tr className="border-b" style={{ borderColor: "rgba(121,65,55,.32)" }}>
                      <th scope="col" className="pb-4 pr-2 text-xs font-bold sm:pb-5 sm:pr-6 sm:text-xl">Garment</th>
                      <th scope="col" className="pb-4 px-2 text-xs font-bold sm:pb-5 sm:px-5 sm:text-xl">Half-Canvas</th>
                      <th scope="col" className="pb-4 pl-2 text-xs font-bold sm:pb-5 sm:pl-5 sm:text-xl">Full-Canvas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CUSTOM_MADE_PRICES.map((item, index) => (
                      <motion.tr
                        key={item.garment}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.45, delay: index * 0.055, ease }}
                        className="border-b last:border-0"
                        style={{ borderColor: "rgba(121,65,55,.18)" }}
                      >
                        <th scope="row" className="py-4 pr-2 text-xs font-normal sm:py-5 sm:pr-6 sm:text-lg">{item.garment}</th>
                        <td className="py-4 px-2 text-xs sm:py-5 sm:px-5 sm:text-lg">From {formatPrice(item.halfCanvas)}</td>
                        <td className="py-4 pl-2 text-xs sm:py-5 sm:pl-5 sm:text-lg">From {formatPrice(item.fullCanvas)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h3
                className="mb-8 mt-12 px-4 py-3 text-lg tracking-[0.06em] sm:px-5 sm:py-4 sm:text-xl"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, color: "#2C1810", background: "rgba(121,65,55,.06)", border: "1px solid rgba(121,65,55,.22)", borderLeft: "4px solid #794137" }}
              >
                INDIVIDUAL GARMENT PRICE GUIDE
              </h3>
              <div>
                <table className="w-full table-fixed border-collapse text-left" style={{ color: "#2C1810", fontFamily: "'Raleway', sans-serif" }}>
                  <colgroup>
                    <col className="w-[55%]" />
                    <col className="w-[45%]" />
                  </colgroup>
                  <thead>
                    <tr className="border-b" style={{ borderColor: "rgba(121,65,55,.32)" }}>
                      <th scope="col" className="pb-4 pr-2 text-xs font-bold sm:pb-5 sm:pr-6 sm:text-xl">Garment</th>
                      <th scope="col" className="pb-4 pl-2 text-xs font-bold sm:pb-5 sm:pl-5 sm:text-xl">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INDIVIDUAL_GARMENT_PRICES.map((item, index) => (
                      <motion.tr
                        key={item.garment}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.45, delay: index * 0.055, ease }}
                        className="border-b last:border-0"
                        style={{ borderColor: "rgba(121,65,55,.18)" }}
                      >
                        <th scope="row" className="py-4 pr-2 text-xs font-normal sm:py-5 sm:pr-6 sm:text-lg">{item.garment}</th>
                        <td className="py-4 pl-2 text-xs sm:py-5 sm:pl-5 sm:text-lg">From {formatPrice(item.price)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-base sm:text-lg"><strong>Delivery Timeframe:</strong> 3–4 weeks</p>
            </div>
          </Reveal>

          <Reveal delay={0.08} y={16}>
            <div className="border-t pt-10" style={{ borderColor: "rgba(121,65,55,.24)", color: "#2C1810" }}>
              <h2
                className="mb-8 px-4 py-3 text-lg tracking-[0.06em] sm:px-5 sm:py-4 sm:text-xl"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, color: "#2C1810", background: "rgba(121,65,55,.06)", border: "1px solid rgba(121,65,55,.22)", borderLeft: "4px solid #794137" }}
              >
                HANDMADE (BESPOKE) PRICE GUIDE
              </h2>
              <h3 className="mb-5 text-lg italic sm:text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>Full-Canvas Construction</h3>
              <ul className="mb-8 space-y-3 text-base sm:text-lg">
                {HANDMADE_PRICES.map(({ label, price }, index) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease }}
                  >
                    <strong>{label}:</strong> Starting from {formatPrice(price)}
                  </motion.li>
                ))}
              </ul>
              <p className="mb-6 text-base sm:text-lg"><strong>Delivery Timeframe:</strong> 6–8 weeks</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="px-6 pt-12 pb-24 lg:px-14 lg:py-24" style={{ background: "#ECE1D8" }}>
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
