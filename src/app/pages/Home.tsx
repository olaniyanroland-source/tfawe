import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import heroVideo from "../../assets/tfawefinevideo.MP4";
import constructionComparisonImage from "../../assets/construction-comparison.webp";
import refuseImage from "../../assets/refuse.webp";
import tfaweWorkImage from "../../assets/Tfawesuit.webp";
import work1 from "../../assets/work1.mp4";
import work2 from "../../assets/work2.mp4";
import work3 from "../../assets/work3.mp4";
import work4 from "../../assets/work4.mp4";
import work5 from "../../assets/work5.mp4";
import work6 from "../../assets/work6.MP4";
import work7 from "../../assets/work7.mp4";
import work8 from "../../assets/heroTfawe.MP4";
import work9 from "../../assets/work9.webp";
import work10 from "../../assets/work10.webp";
import work11 from "../../assets/work11.MP4";
import work12 from "../../assets/work12.webp";
import work14 from "../../assets/work14.MP4";
import scissorsImage from "../../assets/black_scissors.png";
import { SelectedWork } from "../components/SelectedWork";
import { FITTING_JOURNEY_STEPS } from "../data/fittingJourney";

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

const HOME_GALLERY = [
  { src: work1, label: "Custom Suit", type: "video" },
  { src: work2, label: "Custom Suit", type: "video" },
  { src: work3, label: "Custom Suit", type: "video" },
  { src: work4, label: "Custom Suit", type: "video" },
  { src: work5, label: "Custom Suit", type: "video" },
  { src: work6, label: "Custom Suit", type: "video" },
  { src: work7, label: "Custom Suit", type: "video" },
  { src: work8, label: "Custom Suit", type: "video" },
  { src: work9, label: "Custom Suit", type: "image" },
  { src: work10, label: "Custom Suit", type: "image" },
  { src: work11, label: "Custom Suit", type: "video" },
  { src: work12, label: "Custom Suit", type: "image" },
  { src: work14, label: "Custom Suit", type: "video" },
];

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = tfaweWorkImage;
}

function GalleryVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <video
      ref={ref}
      src={inView ? src : undefined}
      aria-label={label}
      autoPlay={inView}
      muted
      loop
      playsInline
      preload={inView ? "metadata" : "none"}
      className="h-full w-full object-cover"
    />
  );
}

function useCarouselAutoplay(ref: { current: HTMLDivElement | null }, intervalMs = 4500) {
  useEffect(() => {
    const container = ref.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let userPausedUntil = 0;
    const pauseAfterInteraction = () => {
      userPausedUntil = Date.now() + 8000;
    };
    const advance = () => {
      if (document.hidden || Date.now() < userPausedUntil) return;

      const firstCard = container.firstElementChild as HTMLElement | null;
      if (!firstCard) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      if (container.scrollLeft >= maxScroll - 8) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      const styles = window.getComputedStyle(container);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      container.scrollBy({ left: firstCard.getBoundingClientRect().width + gap, behavior: "smooth" });
    };

    const interval = window.setInterval(advance, intervalMs);
    container.addEventListener("pointerdown", pauseAfterInteraction);
    container.addEventListener("wheel", pauseAfterInteraction, { passive: true });
    container.addEventListener("keydown", pauseAfterInteraction);

    return () => {
      window.clearInterval(interval);
      container.removeEventListener("pointerdown", pauseAfterInteraction);
      container.removeEventListener("wheel", pauseAfterInteraction);
      container.removeEventListener("keydown", pauseAfterInteraction);
    };
  }, [ref, intervalMs]);
}

export function Home() {
  const journeyGalleryRef = useRef<HTMLDivElement | null>(null);
  useCarouselAutoplay(journeyGalleryRef);
  const [videoEnabled, setVideoEnabled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const slowConnection = ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");
    if (prefersReducedMotion || connection?.saveData || slowConnection) return;

    const startVideo = window.setTimeout(() => setVideoEnabled(true), 1200);
    return () => window.clearTimeout(startVideo);
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="hero relative w-full overflow-hidden" style={{ height: "100dvh", background: "#2C1810" }}>
        {videoEnabled && (
          <video
            className="hero__media"
            style={{ filter: "brightness(1.3)" }}
            autoPlay muted loop playsInline preload="metadata"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(130deg,rgba(47,29,21,.08) 0%,rgba(121,65,55,.04) 38%,rgba(214,166,137,.02) 64%,rgba(47,29,21,.06) 100%)" }} />
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/4" style={{ background: "linear-gradient(90deg,rgba(26,14,11,.12) 0%,rgba(26,14,11,.04) 48%,rgba(26,14,11,0) 100%)" }} />
        <div
          className="absolute inset-x-0 z-10 mx-auto max-w-7xl px-8 lg:px-20 text-center"
          style={{ bottom: "clamp(0.75rem, 3vh, 2rem)" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mb-4 text-xs tracking-[0.2em] uppercase sm:text-sm"
            style={{ color: "#F2D7CB", fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.9rem, 1.4vw, 1.15rem)", fontWeight: 400, letterSpacing: ".12em", textShadow: heroTextShadow }}
          >
            Custom Made
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
          >
            <Link
              to="/appointment"
              className="inline-flex items-center gap-1.5 bg-[#794137] px-4 py-2 text-[9px] tracking-[0.18em] uppercase text-[#ECE1D8] transition-colors duration-300 hover:bg-[#5C2F26] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-[10px]"
            >
              Book an appointment <ArrowRight size={10} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── TFAWE WORK GALLERY ── */}
      <section className="px-0 pt-4 pb-0 lg:pt-8" style={{ background: "#ECE1D8" }} aria-label="Suits and jackets gallery">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">
          {HOME_GALLERY.map(({ src, label, type }) => (
            <figure
              key={src}
              className="group relative m-0 overflow-hidden"
              style={{ aspectRatio: "2/3", background: "#D9CBBF" }}
            >
              {type === "video" ? (
                <GalleryVideo src={src} label={label} />
              ) : (
                <img
                  src={src}
                  alt={label}
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  className="h-full w-full object-cover"
                />
              )}
              <figcaption className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 px-4 text-center text-sm font-semibold tracking-[0.12em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className="relative isolate my-4 min-h-[440px] overflow-hidden"
        style={{
          backgroundColor: "#FFFFFF",
          backgroundImage: `url("${scissorsImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center 45%",
        }}
      >
        <Link
          to="/appointment"
          className="absolute inset-x-0 bottom-3 z-10 mx-auto w-fit text-sm tracking-[0.22em] uppercase transition-opacity duration-300 hover:opacity-70"
          style={{ color: "#794137" }}
        >
          Book Now
        </Link>
      </section>

      <section className="px-6 py-16 lg:px-14 lg:py-20" style={{ background: "#2C1810", color: "#ECE1D8" }} aria-labelledby="construction-statement-title">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: "#B39085" }}>
            Our construction philosophy
          </p>
          <h2
            id="construction-statement-title"
            className="max-w-4xl text-3xl leading-tight sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            TFAWE prioritizes <em>half-canvas and full-canvas construction</em> for better structure,
            comfort, and longevity.
          </h2>
          <div className="mt-8 mb-4 flex w-full items-center gap-3 text-xs tracking-[0.2em]" style={{ color: "#B39085" }} aria-hidden="true">
            <span>01</span>
            <span className="h-px flex-1" style={{ background: "#B39085" }} />
            <span>02</span>
          </div>
          <figure className="m-0 overflow-hidden">
            <img
              src={constructionComparisonImage}
              alt="Side-by-side comparison showing the internal structure of half-canvas and full-canvas suit jackets"
              loading="lazy"
              className="block h-auto w-full"
            />
            <figcaption className="grid grid-cols-3 gap-2 pt-3 text-xs uppercase tracking-[0.12em] sm:text-sm" style={{ color: "#B39085" }}>
              <span>Half canvas</span>
              <span className="text-center">Construction comparison</span>
              <span className="text-right">Full canvas</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-14 lg:py-20" style={{ background: "#1A0E0B", color: "#ECE1D8" }} aria-labelledby="fused-section-title">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: "#B39085" }}>
              The construction we refuse
            </p>
            <h2
              id="fused-section-title"
              className="mb-6 text-3xl leading-tight sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            >
              Why we don’t make <em>fused suits.</em>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "rgba(236,225,216,.78)" }}>
              Fused jackets can develop bubbles and wrinkles over time, lose their shape after
              repeated dry cleaning, and feel stiff rather than draping naturally.
            </p>
            <div className="mt-8 border-l-2 pl-5" style={{ borderColor: "#B39085" }}>
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#B39085" }}>Our standard</span>
              <p className="mt-2 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                Half canvas. Full canvas. Never fused.
              </p>
            </div>
          </div>
          <figure className="relative m-0 overflow-hidden">
            <img
              src={refuseImage}
              alt="Fused suit jacket showing bubbling and wrinkling across the chest beside its glued internal structure"
              loading="lazy"
              className="block h-auto w-full"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-5 py-4 text-xs uppercase tracking-[0.12em] text-white sm:px-6 sm:py-5" style={{ background: "linear-gradient(transparent,rgba(26,14,11,.82))" }}>
              <span>Fused construction</span>
              <span>What we avoid / 01</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-14 lg:py-20" style={{ background: "#ECE1D8", color: "#2C1810" }} aria-labelledby="home-process-title">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-5 md:grid-cols-2 md:items-end lg:mb-14">
            <div>
              <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>
                The Handmade journey
              </p>
              <h2
                id="home-process-title"
                className="text-3xl leading-tight sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
              >
                From first measure<br />to <em>final stitch.</em>
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed md:justify-self-end sm:text-base" style={{ color: "#5A3A30" }}>
              One pair of hands guides your garment through every stage. No shortcuts. No anonymous
              production line. Only patience, skill and a shared pursuit of the exceptional.
            </p>
          </div>

          <motion.div
            ref={journeyGalleryRef}
            className="hide-scrollbar mx-auto flex max-w-7xl gap-5 overflow-x-auto pb-4"
            role="region"
            aria-label="Handmade journey stages"
            tabIndex={0}
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
            initial={{ x: 0 }}
          >
            {FITTING_JOURNEY_STEPS.map((step) => (
              <article key={step.number} className="shrink-0 overflow-hidden" style={{ flex: "0 0 min(85vw, 390px)", scrollSnapAlign: "start", background: "#FFF9F5", border: "1px solid rgba(121,65,55,.16)" }}>
                <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "#D9CBBF" }}>
                  {step.video ? (
                    <video
                      className="h-full w-full object-cover"
                      autoPlay={videoEnabled}
                      muted
                      loop
                      playsInline
                      preload={videoEnabled ? "metadata" : "none"}
                      poster={step.image}
                      aria-hidden="true"
                    >
                      <source src={step.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={step.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                  )}
                  <span className="absolute left-4 top-4 text-xs tracking-[0.18em] text-white" style={{ textShadow: "0 1px 8px rgba(0,0,0,.7)" }}>
                    {step.number}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="mb-2 text-[10px] tracking-[0.2em] uppercase" style={{ color: "#794137" }}>Stage {step.number}</p>
                  <h3 className="mb-3 text-xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5A3A30" }}>{step.text}</p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </section>

      <SelectedWork />

      {/* ── CTA BAND ── */}
      <section className="py-20 px-6 lg:px-14 text-center" style={{ background: "#794137" }}>
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
            className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.22em] uppercase transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ background: "#ECE1D8", color: "#794137" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#D9CBBF")}
            onMouseLeave={e => (e.currentTarget.style.background = "#ECE1D8")}
          >
            Book an appointment <ArrowRight size={13} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
