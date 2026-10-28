import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import heroVideo from "../../assets/heroTfawe.MP4";
import secondHeroVideo from "../../assets/tfawefinevideo.MP4";
import heroFallbackImage from "../../assets/fb.PNG";
import constructionComparisonImage from "../../assets/WhatsApp Image 2026-10-20 at 16.04.52.jpeg";
import refuseImage from "../../assets/refuse.jpeg";
import nSuit1Image from "../../assets/nsuit1.PNG";
import nSuit2Image from "../../assets/nsuit2.PNG";
import nSuit3Image from "../../assets/nsuit3.PNG";
import nSuit4Image from "../../assets/nsuit4.PNG";
import tfaweWorkImage from "../../assets/Tfawesuit.webp";
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
  { src: nSuit1Image, label: "Ivory dinner jacket" },
  { src: "https://unsplash.com/photos/vS0Kya7E5V4/download?force=true", label: "Half canvas suit" },
  { src: nSuit2Image, label: "Ivory tuxedo" },
  { src: "https://unsplash.com/photos/hDANeGXvWRw/download?force=true", label: "Full canvas suit" },
  { src: nSuit3Image, label: "Hand-finished lapel" },
  { src: "https://unsplash.com/photos/ZHmES480_XE/download?force=true", label: "Half canvas suit" },
  { src: nSuit4Image, label: "Custom dinner jacket" },
  { src: "https://unsplash.com/photos/ECJWF1NxSpM/download?force=true", label: "Full canvas suit" },
];

const HOME_PANTS_GALLERY = [
  "-eb0moHDPBI",
  "2qGXz5A17mc",
  "tFaLxWkeEnA",
  "SRBHZzeNi6Q",
  "1mdpEQXnJ0A",
  "4L-ZdOiSONs",
  "Kbl1RYTPIDA",
  "WNYmTVGVDhA",
];

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = tfaweWorkImage;
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
  const [activeVideo, setActiveVideo] = useState(0);
  const suitGalleryRef = useRef<HTMLDivElement | null>(null);
  useCarouselAutoplay(suitGalleryRef);
  const pantsGalleryRef = useRef<HTMLDivElement | null>(null);
  useCarouselAutoplay(pantsGalleryRef, 6000);
  const journeyGalleryRef = useRef<HTMLDivElement | null>(null);
  useCarouselAutoplay(journeyGalleryRef);
  // Render the first hero video with the initial React UI. Its document-level
  // preload starts the download while the page loads; this used to wait 2.5
  // seconds, then request metadata only.
  const [videoEnabled, setVideoEnabled] = useState(true);
  const heroVideos = [heroVideo, secondHeroVideo];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (prefersReducedMotion || connection?.saveData) {
      setVideoEnabled(false);
    }
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="hero relative w-full overflow-hidden" style={{ height: "100dvh" }}>
        <img
          src={heroFallbackImage}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="hero__media"
          style={{ filter: "brightness(1.3)" }}
        />
        {videoEnabled && (
          <video
            key={activeVideo}
            className="hero__media"
            style={{ filter: "brightness(1.3)" }}
            autoPlay muted playsInline preload="auto"
            onEnded={() => setActiveVideo(current => (current + 1) % heroVideos.length)}
          >
            <source src={heroVideos[activeVideo]} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(130deg,rgba(47,29,21,.08) 0%,rgba(121,65,55,.04) 38%,rgba(214,166,137,.02) 64%,rgba(47,29,21,.06) 100%)" }} />
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/4" style={{ background: "linear-gradient(90deg,rgba(26,14,11,.12) 0%,rgba(26,14,11,.04) 48%,rgba(26,14,11,0) 100%)" }} />
        <div
          className="absolute inset-x-0 z-10 mx-auto max-w-7xl px-8 lg:px-20 text-center"
          style={{ bottom: "clamp(1.25rem, 5vh, 3.5rem)" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mb-4 text-xs tracking-[0.2em] uppercase sm:text-sm"
            style={{ color: "#F2D7CB", fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 2.4vw, 2rem)", fontWeight: 400, letterSpacing: ".12em", textShadow: heroTextShadow }}
          >
            Custom Made
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
          >
            <Link
              to="/appointment"
              className="text-link light-link inline-flex items-center gap-2 text-sm tracking-[0.08em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-base"
              style={{ color: "#FFF6EF", textShadow: heroTextShadow }}
            >
              Book an appointment <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.7 }}
          className="absolute bottom-6 left-8 lg:left-20 z-10 flex flex-col items-start gap-3"
        >
          {videoEnabled && (
            <div
              className="flex items-center gap-2"
              role="group"
              aria-label={`Hero video ${activeVideo + 1} of ${heroVideos.length}`}
            >
              {heroVideos.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show hero video ${index + 1}`}
                  aria-current={activeVideo === index}
                  onClick={() => setActiveVideo(index)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: activeVideo === index ? 24 : 6,
                    background: activeVideo === index ? "#ECE1D8" : "rgba(236,225,216,.45)",
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* ── SWIPEABLE SUIT GALLERY ── */}
      <section className="px-6 pt-4 pb-0 lg:px-14 lg:pt-8" style={{ background: "#ECE1D8" }} aria-label="Suits and jackets gallery">
        <motion.div
          ref={suitGalleryRef}
          className="hide-scrollbar max-w-7xl mx-auto flex gap-4 overflow-x-auto pb-3"
          role="region"
          aria-label="Suits and jackets gallery"
          tabIndex={0}
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          initial={{ x: 0 }}
        >
          {HOME_GALLERY.map(({ src, label }) => (
            <figure
              key={src}
              className="home-gallery-card group relative m-0 shrink-0 overflow-hidden"
              style={{ aspectRatio: "2/3", background: "#D9CBBF", scrollSnapAlign: "start" }}
            >
              <img
                src={src}
                alt={label}
                loading="lazy"
                decoding="async"
                onError={handleImageError}
                className="h-full w-full object-cover"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {label}
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </section>

      <section className="px-6 pb-16 lg:px-14" style={{ background: "#ECE1D8" }} aria-label="Tailored pants gallery">
        <motion.div
          ref={pantsGalleryRef}
          className="hide-scrollbar max-w-7xl mx-auto flex gap-4 overflow-x-auto pb-3"
          role="region"
          aria-label="Tailored pants gallery"
          tabIndex={0}
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          initial={{ x: 0 }}
        >
          {HOME_PANTS_GALLERY.map((id, index) => (
            <figure
              key={id}
              className="home-gallery-card relative m-0 shrink-0 overflow-hidden"
              style={{ aspectRatio: "2/3", background: "#D9CBBF", scrollSnapAlign: "start" }}
            >
              <img
                src={`https://unsplash.com/photos/${id}/download?force=true`}
                alt={`Tailored pants, photo ${index + 1}`}
                loading="lazy"
                decoding="async"
                onError={handleImageError}
                className="h-full w-full object-cover"
              />
            </figure>
          ))}
        </motion.div>
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
