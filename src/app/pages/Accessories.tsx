import { useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import { motion, useInView } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import glass1 from "../../assets/glass1-optimized.jpg";
import glass2 from "../../assets/glass2-optimized.jpg";
import glass3 from "../../assets/glass3-optimized.jpg";
import glass4 from "../../assets/glass4-optimized.jpg";
import glass5 from "../../assets/glass5-optimized.jpg";
import glass6 from "../../assets/glass6-optimized.jpg";
import tfaweWorkImage from "../../assets/tfawework.png";

const ease = [0.25, 0.1, 0.25, 1] as const;

const WHATSAPP_NUMBER = "14374736685";

type AccessoryItem = {
  id: string;
  name: string;
  detail: string;
  images: [string, string];
};

const GLASSES: AccessoryItem[] = [
  {
    id: "01",
    name: "The Aurelia",
    detail: "Acetate frame with two editorial views",
    images: [glass1, glass5],
  },
  {
    id: "02",
    name: "The Marchetti",
    detail: "Structured profile with front and side detail",
    images: [glass2, glass3],
  },
  {
    id: "03",
    name: "The Solene",
    detail: "Statement silhouette shown from two angles",
    images: [glass4, glass6],
  },
];

function Reveal({ children, delay = 0, y = 28, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function buildWhatsAppLink(styleName: string) {
  const message = `Hi, I'm interested in ${styleName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function GlassesCard({ item, index }: { item: AccessoryItem; index: number }) {
  // Controls which of the two images is shown. Desktop swaps on
  // hover; touch devices have no hover, so a tap toggles it and
  // reverts after a short delay (a "peek" rather than a permanent swap).
  const [showAlt, setShowAlt] = useState(false);
  const touchTimerRef = useRef<number | null>(null);

  function handleImageError(e: SyntheticEvent<HTMLImageElement>) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = tfaweWorkImage;
  }

  function handleTouchStart() {
    setShowAlt(true);
    if (touchTimerRef.current) window.clearTimeout(touchTimerRef.current);
    touchTimerRef.current = window.setTimeout(() => setShowAlt(false), 1500);
  }

  return (
    <motion.article
      className="glasses-card"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.06, ease }}
    >
      <motion.div
        className="glasses-card__image-wrap"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: index * 0.06 + 0.08, ease }}
        onMouseEnter={() => setShowAlt(true)}
        onMouseLeave={() => setShowAlt(false)}
        onTouchStart={handleTouchStart}
      >
        <figure className="glasses-card__main-photo">
          <img
            src={item.images[0]}
            alt={`${item.name} primary view`}
            className="glasses-card__image glasses-card__image--primary"
            style={{ opacity: showAlt ? 0 : 1 }}
            onError={handleImageError}
            loading="eager"
            decoding="async"
          />
          <img
            src={item.images[1]}
            alt={`${item.name} alternate view`}
            className="glasses-card__image glasses-card__image--alt"
            style={{ opacity: showAlt ? 1 : 0 }}
            onError={handleImageError}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="glasses-card__dots" aria-hidden="true">
          <span className={`glasses-card__dot ${!showAlt ? "is-active" : ""}`} />
          <span className={`glasses-card__dot ${showAlt ? "is-active" : ""}`} />
        </div>
      </motion.div>
      <motion.div
        className="glasses-card__body"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: index * 0.06 + 0.28 }}
      >
        <p className="glasses-card__number">{item.id}</p>
        <h3 className="glasses-card__name">{item.name}</h3>
        <p className="glasses-card__detail">{item.detail}</p>
        <a
          href={buildWhatsAppLink(item.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="glasses-card__cta"
        >
          Inquire on WhatsApp
        </a>
      </motion.div>
    </motion.article>
  );
}

export function Accessories() {
  return (
    <main className="accessories-page">
      <style>{`
        .accessories-page {
          --ink: #2C1810;
          --deep: #1A0E0B;
          --paper: #ECE1D8;
          --soft: #F5EDE7;
          --accent: #794137;
          --accent-soft: #B39085;
          --muted: #5A3A30;
          --line: rgba(121, 65, 55, 0.16);
          --font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
          --font-body: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

          background: var(--paper);
          color: var(--ink);
          font-family: var(--font-body);
          min-height: 100vh;
          padding-bottom: 96px;
        }

        .accessories-page__hero {
          position: relative;
          min-height: 500px;
          display: flex;
          align-items: flex-end;
          padding: 140px 24px 76px;
          overflow: hidden;
          background: var(--deep);
        }

        .accessories-page__hero-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.28;
        }

        .accessories-page__hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #1A0E0B 30%, rgba(26, 14, 11, 0.5) 100%);
        }

        .accessories-page__header {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }

        .accessories-page__eyebrow {
          font-size: 12px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--accent-soft);
          margin: 0 0 12px;
        }

        .accessories-page__title {
          font-family: var(--font-display);
          font-size: clamp(44px, 7vw, 96px);
          font-weight: 400;
          line-height: 1.05;
          color: var(--paper);
          margin: 0;
        }

        .accessories-page__title em {
          color: var(--accent-soft);
          font-style: italic;
        }

        .accessories-page__intro-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 72px 24px 56px;
          display: grid;
          grid-template-columns: minmax(0, 0.78fr) minmax(0, 1fr);
          gap: 56px;
          align-items: start;
        }

        .accessories-page__section-label {
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent);
          margin: 0 0 18px;
        }

        .accessories-page__intro-title {
          font-family: var(--font-display);
          font-size: clamp(29px, 3.5vw, 48px);
          font-weight: 400;
          line-height: 1.18;
          margin: 0;
        }

        .accessories-page__intro {
          font-size: 15px;
          line-height: 1.9;
          color: var(--muted);
          margin: 0;
          max-width: 62ch;
        }

        .glasses-slider {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .glasses-carousel {
          position: relative;
        }

        .glasses-carousel__viewport {
          overflow: visible;
        }

        .glasses-carousel__track {
          align-items: stretch;
        }

        .glasses-carousel__slide {
          flex-basis: min(82%, 560px);
        }

        .glasses-carousel__controls {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-bottom: 22px;
        }

        .glasses-carousel__button {
          position: static;
          transform: none;
          width: 42px;
          height: 42px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: rgba(245, 237, 231, 0.72);
          color: var(--accent);
          box-shadow: none;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }

        .glasses-carousel__button:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: var(--paper);
        }

        .glasses-carousel__button:disabled {
          opacity: 0.35;
        }

        .glasses-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          height: 100%;
        }

        .glasses-card__image-wrap {
          aspect-ratio: 4 / 5;
          height: clamp(440px, 42vw, 620px);
          background: #D9CBBF;
          overflow: hidden;
          margin-bottom: 22px;
          position: relative;
          cursor: pointer;
        }

        .glasses-card__main-photo {
          margin: 0;
          width: 100%;
          height: 100%;
          position: relative;
        }

        .glasses-card__image {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.5s ease, transform 0.7s ease;
        }

        .glasses-card__image--alt {
          transform: scale(1.02);
        }

        .glasses-card:hover .glasses-card__image--primary {
          transform: scale(1.04);
        }

        .glasses-card__dots {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 7px;
          z-index: 1;
        }

        .glasses-card__dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(236, 225, 216, 0.5);
          transition: background 0.25s ease, transform 0.25s ease;
        }

        .glasses-card__dot.is-active {
          background: var(--paper);
          transform: scale(1.35);
        }

        .glasses-card__body {
          border-top: 1px solid var(--line);
          padding-top: 18px;
        }

        .glasses-card__number {
          font-family: var(--font-display);
          font-size: 42px;
          line-height: 1;
          color: rgba(121, 65, 55, 0.2);
          margin: 0 0 8px;
        }

        .glasses-card__name {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 400;
          color: var(--ink);
          margin: 0 0 8px;
        }

        .glasses-card__detail {
          font-size: 14px;
          color: var(--muted);
          margin: 0 0 18px;
          line-height: 1.55;
        }

        .glasses-card__cta {
          display: inline-flex;
          width: fit-content;
          color: var(--accent);
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border-bottom: 1px solid currentColor;
          padding-bottom: 4px;
          transition: color 0.2s ease;
        }

        .glasses-card__cta:hover {
          color: var(--deep);
        }

        .accessories-page__closing {
          max-width: 520px;
          margin: 96px auto 0;
          padding: 48px 24px 0;
          text-align: center;
          border-top: 1px solid var(--line);
        }

        .accessories-page__closing-text {
          font-size: 15px;
          line-height: 1.7;
          color: var(--muted);
          margin: 0 0 24px;
        }

        .accessories-page__closing-cta {
          display: inline-flex;
          background: var(--accent);
          color: var(--paper);
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 15px 32px;
          transition: background 0.2s ease;
        }

        .accessories-page__closing-cta:hover {
          background: #5C2F26;
        }

        @media (max-width: 900px) {
          .accessories-page__intro-wrap {
            grid-template-columns: 1fr;
            gap: 26px;
          }

          .glasses-slider {
            max-width: 560px;
          }

          .glasses-carousel__controls {
            justify-content: flex-start;
          }

          .glasses-carousel__slide {
            flex-basis: 92%;
          }

          .glasses-card__image-wrap {
            height: clamp(360px, 118vw, 620px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .glasses-card__image,
          .accessories-page__closing-cta,
          .glasses-card__cta,
          .glasses-carousel__button,
          .glasses-card__dot {
            transition: none;
          }

          .glasses-card:hover .glasses-card__image--primary {
            transform: none;
          }
        }
      `}</style>

      <section className="accessories-page__hero">
        <motion.img
          src={tfaweWorkImage}
          alt="TFAWE accessories editorial"
          className="accessories-page__hero-image"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.28, scale: 1 }}
          transition={{ duration: 1.2, ease }}
        />
        <motion.div
          className="accessories-page__hero-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        />
        <header className="accessories-page__header">
          <motion.p
            className="accessories-page__eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
          >
            Accessories
          </motion.p>
          <motion.h1
            className="accessories-page__title"
            initial={{ opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
          >
            Eyewear,<br />
            <em>curated.</em>
          </motion.h1>
        </header>
      </section>

      <section className="accessories-page__intro-wrap">
        <Reveal>
          <p className="accessories-page__section-label">The Collection</p>
          <h2 className="accessories-page__intro-title">
            Finishing pieces for a considered wardrobe.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="accessories-page__intro">
            While our core collection is made to order, we also curate a small selection of accessories, including eyewear, to complete your look. Reach out on WhatsApp to check availability.
          </p>
        </Reveal>
      </section>

      <section className="glasses-slider" aria-label="Curated eyewear">
        <Carousel
          opts={{ align: "start", loop: true }}
          className="glasses-carousel"
        >
          <div className="glasses-carousel__controls" aria-label="Eyewear slider controls">
            <CarouselPrevious className="glasses-carousel__button" />
            <CarouselNext className="glasses-carousel__button" />
          </div>
          <CarouselContent className="glasses-carousel__track">
            {GLASSES.map((item, index) => (
              <CarouselItem key={item.id} className="glasses-carousel__slide">
                <GlassesCard item={item} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <Reveal y={24} className="accessories-page__closing">
        <p className="accessories-page__closing-text">
          Don't see what you're looking for? Message us and we'll help you find the right pair.
        </p>
        <a
          href={buildWhatsAppLink("your accessories collection")}
          target="_blank"
          rel="noopener noreferrer"
          className="accessories-page__closing-cta"
        >
          Message on WhatsApp
        </a>
      </Reveal>
    </main>
  );
}
