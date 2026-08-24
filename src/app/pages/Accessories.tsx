import { useRef, useState } from "react";
import type { PointerEvent, SyntheticEvent, TouchEvent } from "react";
import { motion, useInView } from "motion/react";
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
  price: string;
  images: [string, string];
};

const GLASSES: AccessoryItem[] = [
  {
    id: "01",
    name: "Ọla",
    detail: "Acetate frame with two editorial views",
    price: "$120 CAD",
    images: [glass1, glass5],
  },
  {
    id: "02",
    name: "Ọba Noir",
    detail: "Structured profile with front and side detail",
    price: "$80 CAD",
    images: [glass2, glass3],
  },
  {
    id: "03",
    name: "Ọba Azure",
    detail: "Statement silhouette shown from two angles",
    price: "$80 CAD",
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

function buildWhatsAppLink(styleName: string, action = "interested in") {
  const message = "Hi, I'm " + action + " " + styleName + ".";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function GlassesCard({ item, index }: { item: AccessoryItem; index: number }) {
  // The primary image stays in view on hover. On touch devices, a horizontal
  // swipe changes the view: left for the alternate image and right for primary.
  const [showAlt, setShowAlt] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const touchStartX = useRef<number | null>(null);

  function handleImageError(e: SyntheticEvent<HTMLImageElement>) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = tfaweWorkImage;
  }

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    setIsTouching(true);
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current;
    const endX = e.changedTouches[0]?.clientX;

    if (startX !== null && endX !== undefined) {
      const distance = endX - startX;
      if (Math.abs(distance) > 35) setShowAlt(distance < 0);
    }

    touchStartX.current = null;
    setIsTouching(false);
  }

  // Move the zoom origin with the pointer, so the area being inspected stays
  // beneath the cursor instead of simply enlarging from the image centre.
  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;
    e.currentTarget.style.setProperty("--zoom-x", `${Math.max(0, Math.min(100, x))}%`);
    e.currentTarget.style.setProperty("--zoom-y", `${Math.max(0, Math.min(100, y))}%`);
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
        className={["glasses-card__image-wrap", isTouching ? "is-touching" : ""].filter(Boolean).join(" ")}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: index * 0.06 + 0.08, ease }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onPointerMove={handlePointerMove}
        onPointerLeave={(e) => {
          e.currentTarget.style.removeProperty("--zoom-x");
          e.currentTarget.style.removeProperty("--zoom-y");
        }}
        onTouchCancel={() => {
          touchStartX.current = null;
          setIsTouching(false);
        }}
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
        <div className="glasses-card__image-controls">
          <button
            type="button"
            className="glasses-card__image-control"
            onClick={() => setShowAlt(false)}
            aria-label={`Show the first view of ${item.name}`}
            aria-pressed={!showAlt}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="glasses-card__image-control"
            onClick={() => setShowAlt(true)}
            aria-label={`Show the second view of ${item.name}`}
            aria-pressed={showAlt}
          >
            <span aria-hidden="true">→</span>
          </button>
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
        <p className="glasses-card__price">{item.price}</p>
        <div className="glasses-card__actions">
          <a
            href={buildWhatsAppLink(item.name, "interested in")}
            target="_blank"
            rel="noopener noreferrer"
            className="glasses-card__cta glasses-card__cta--secondary"
          >
            Inquire
          </a>
          <a
            href={buildWhatsAppLink(item.name, "ready to buy")}
            target="_blank"
            rel="noopener noreferrer"
            className="glasses-card__cta glasses-card__cta--primary"
          >
            Buy
          </a>
        </div>
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
          max-width: 1480px;
          margin: 0 auto;
          padding: 12px 24px 0;
        }

        .glasses-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 52px 28px;
        }

        .glasses-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          height: 100%;
          padding: 14px;
          background: rgba(245, 237, 231, 0.7);
          border: 1px solid var(--line);
          box-shadow: 0 18px 40px rgba(44, 24, 16, 0.055);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .glasses-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 25px 55px rgba(44, 24, 16, 0.12);
        }

        /* The third piece is centred beneath the first pair, giving the
           three-product collection a deliberate editorial composition. */
        .glasses-card:last-child {
          grid-column: 1 / -1;
          width: calc((100% - 28px) / 2);
          justify-self: center;
        }

        .glasses-card__image-wrap {
          /* The source photographs are 3:2. Matching that ratio presents
             the complete, centred product rather than cropping its edges. */
          aspect-ratio: 3 / 2;
          height: auto;
          background: #D9CBBF;
          overflow: hidden;
          margin-bottom: 24px;
          position: relative;
          cursor: pointer;
          touch-action: pan-y;
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
          object-fit: contain;
          object-position: center;
          transform-origin: var(--zoom-x, 50%) var(--zoom-y, 50%);
          transition: opacity 0.5s ease, transform 0.45s ease;
        }

        .glasses-card__image--alt {
          transform: scale(1);
        }

        .glasses-card:hover .glasses-card__image {
          transform: scale(1.28);
        }

        .glasses-card__image-wrap.is-touching .glasses-card__image {
          transform: scale(1.12);
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

        .glasses-card__image-controls {
          position: absolute;
          inset: 0 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          pointer-events: none;
          z-index: 2;
        }

        .glasses-card__image-control {
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          padding: 0;
          color: var(--paper);
          background: rgba(26, 14, 11, 0.48);
          border: 1px solid rgba(236, 225, 216, 0.56);
          border-radius: 50%;
          cursor: pointer;
          font-size: 20px;
          line-height: 1;
          opacity: 0;
          pointer-events: auto;
          transition: background 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
        }

        .glasses-card__image-wrap:hover .glasses-card__image-control,
        .glasses-card__image-control:focus-visible {
          opacity: 1;
        }

        .glasses-card__image-control:hover {
          background: var(--accent);
          transform: scale(1.06);
        }

        .glasses-card__image-control:focus-visible {
          outline: 2px solid var(--paper);
          outline-offset: 3px;
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
          padding: 20px 6px 6px;
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

        .glasses-card__price {
          font-family: var(--font-display);
          font-size: 20px;
          color: var(--ink);
          margin: 0 0 18px;
        }

        .glasses-card__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .glasses-card__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          min-height: 40px;
          padding: 0 16px;
          border: 1px solid var(--accent);
          transition: background 0.2s ease, color 0.2s ease;
        }

        .glasses-card__cta--primary {
          background: var(--accent);
          color: var(--paper);
        }

        .glasses-card__cta--secondary {
          color: var(--accent);
          background: transparent;
        }

        .glasses-card__cta--primary:hover {
          background: var(--deep);
          border-color: var(--deep);
        }

        .glasses-card__cta--secondary:hover {
          color: var(--paper);
          background: var(--accent);
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

          .glasses-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .glasses-card {
            display: flex;
            flex-direction: column;
            gap: 0;
            padding: 0;
            overflow: hidden;
            background: var(--soft);
            border: 1px solid var(--line);
            box-shadow: 0 8px 24px rgba(44, 24, 16, 0.06);
          }

          .glasses-card:last-child {
            grid-column: auto;
            width: auto;
            justify-self: auto;
          }

          .glasses-card__image-wrap {
            height: auto;
            min-height: 0;
            aspect-ratio: 3 / 2;
            margin: 0;
          }

          .glasses-card__body {
            border-top: 0;
            padding: 14px;
          }

          .glasses-card__number {
            font-size: 26px;
            margin-bottom: 4px;
          }

          .glasses-card__name {
            font-size: 20px;
            line-height: 1.1;
            margin-bottom: 7px;
          }

          .glasses-card__detail {
            font-size: 12px;
            margin-bottom: 12px;
          }

          .glasses-card__price {
            font-size: 18px;
            margin-bottom: 12px;
          }

          .glasses-card__dots {
            bottom: 10px;
          }

          .glasses-card__image-controls {
            display: none;
          }

          .glasses-card__cta {
            font-size: 10px;
            letter-spacing: 0.1em;
            min-height: 36px;
            padding: 0 11px;
          }
        }

        @media (max-width: 380px) {
          .glasses-slider {
            padding: 0 16px;
          }

          .glasses-list {
            gap: 10px;
          }

          .glasses-card__body {
            padding: 11px;
          }

          .glasses-card__name {
            font-size: 18px;
          }

          .glasses-card__detail {
            display: none;
          }
        }

        /* One generous column on phones keeps the eyewear imagery large and
           easy to inspect, instead of reducing it to two small tiles. */
        @media (max-width: 640px) {
          .glasses-slider {
            padding: 0 18px;
          }

          .glasses-list {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .glasses-card {
            width: 100%;
          }

          .glasses-card__image-wrap {
            aspect-ratio: 3 / 2;
          }

          .glasses-card__body {
            padding: 17px;
          }

          .glasses-card__detail {
            display: block;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .glasses-card__image,
          .accessories-page__closing-cta,
          .glasses-card__cta,
          .glasses-card__dot {
            transition: none;
          }

          .glasses-card:hover .glasses-card__image,
          .glasses-card__image-wrap.is-touching .glasses-card__image {
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
        <div className="glasses-list">
          {GLASSES.map((item, index) => (
            <GlassesCard key={item.id} item={item} index={index} />
          ))}
        </div>
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
