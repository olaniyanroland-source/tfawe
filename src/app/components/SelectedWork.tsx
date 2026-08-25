import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import ceoImage from "../../assets/CEO.png";
import suit11Image from "../../assets/suit11.jpg";
import suit3Image from "../../assets/suit3.jpg";
import tfaweWorkImage from "../../assets/tfawework.png";

const ease = [0.25, 0.1, 0.25, 1] as const;

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = tfaweWorkImage;
}

const SELECTED_WORK = [
  {
    title: "The Wedding Party",
    type: "Formal occasion suiting",
    detail: "A coordinated black-tie party, finished with a crisp ivory dinner jacket for the groom.",
    measure: "01 / 05",
    img: suit11Image,
    width: "clamp(18rem, 32vw, 30rem)",
    height: "clamp(24rem, 52vh, 32rem)",
    align: "self-end",
  },
  {
    title: "Black Tie Study",
    type: "Custom eveningwear",
    detail: "Peak lapel dinner jacket cut close through the waist.",
    measure: "02 / 05",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&h=1200&fit=crop&fm=jpg&q=80",
    width: "clamp(14rem, 22vw, 21rem)",
    height: "clamp(20rem, 43vh, 26rem)",
    align: "self-start",
  },
  {
    title: "Midnight Tailoring",
    type: "Bespoke suiting",
    detail: "A sharp navy two-piece with a sculpted silhouette, clean lines, and refined finishing.",
    measure: "03 / 05",
    img: suit3Image,
    width: "clamp(17rem, 29vw, 27rem)",
    height: "clamp(22rem, 49vh, 30rem)",
    align: "self-center",
  },
  {
    title: "Quiet Structure",
    type: "Tailored separates",
    detail: "Soft shoulder, relaxed trouser line, matte wool finish.",
    measure: "04 / 05",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=900&h=1200&fit=crop&fm=jpg&q=80",
    width: "clamp(20rem, 37vw, 36rem)",
    height: "clamp(25rem, 55vh, 34rem)",
    align: "self-end",
  },
  {
    title: "After-Hours Silk",
    type: "Personal styling",
    detail: "Clean neckline, elongated proportion, evening-ready finish.",
    measure: "05 / 05",
    img: ceoImage,
    width: "clamp(15rem, 24vw, 23rem)",
    height: "clamp(20rem, 44vh, 27rem)",
    align: "self-start",
  },
];

export function SelectedWork() {
  const selectedWorkRef = useRef<HTMLElement | null>(null);
  const selectedStripRef = useRef<HTMLDivElement | null>(null);
  const [selectedScrollDistance, setSelectedScrollDistance] = useState(0);

  const { scrollYProgress: selectedProgress } = useScroll({
    target: selectedWorkRef,
    offset: ["start start", "end end"],
  });
  const selectedX = useTransform(selectedProgress, [0, 1], [0, -selectedScrollDistance]);

  useEffect(() => {
    if (!selectedStripRef.current) return;

    const measureSelectedStrip = () => {
      if (!selectedStripRef.current) return;
      const horizontalPadding = window.innerWidth < 1024 ? 48 : 112;
      const distance = Math.max(
        selectedStripRef.current.scrollWidth - window.innerWidth + horizontalPadding,
        0
      );
      setSelectedScrollDistance(distance);
    };

    window.addEventListener("resize", measureSelectedStrip);
    measureSelectedStrip();

    if (typeof ResizeObserver === "undefined") {
      return () => window.removeEventListener("resize", measureSelectedStrip);
    }

    const observer = new ResizeObserver(measureSelectedStrip);
    observer.observe(selectedStripRef.current);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureSelectedStrip);
    };
  }, []);

  return (
    <section
      ref={selectedWorkRef}
      className="relative lg:pt-12"
      style={{
        background: "#F5EDE7",
        height: selectedScrollDistance ? `calc(100vh + ${selectedScrollDistance}px)` : "280vh",
      }}
    >
      <div className="sticky top-0 min-h-[720px] h-screen overflow-hidden flex flex-col justify-center lg:justify-start py-20 lg:pt-13 lg:pb-10">
        <div className="px-6 lg:px-14 mb-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.72fr_1fr] gap-8 items-end">
            <div>
              <p className="mb-3 text-xs tracking-[0.35em] uppercase" style={{ color: "#794137" }}>
                Selected Work
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem,4.8vw,4.4rem)",
                  color: "#1A0E0B",
                  fontWeight: 400,
                  lineHeight: 1.05,
                }}
              >
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
              <img
                src={img}
                alt={title}
                decoding="async"
                onError={handleImageError}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
              />
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100 opacity-65"
                style={{
                  background:
                    "linear-gradient(to top,rgba(26,14,11,.88) 0%,rgba(26,14,11,.2) 54%,rgba(26,14,11,.02) 100%)",
                }}
              />
              <div className="absolute top-5 left-5 text-xs tracking-[0.22em] uppercase" style={{ color: "rgba(236,225,216,.76)" }}>
                {measure}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                <p
                  className="mb-2 text-xs tracking-[0.2em] uppercase translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ color: "#B39085" }}
                >
                  {type}
                </p>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.45rem,2.6vw,2.4rem)",
                    color: "#ECE1D8",
                    fontWeight: 400,
                    lineHeight: 1.05,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="mt-3 max-w-xs text-sm leading-relaxed translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ color: "rgba(236,225,216,.78)" }}
                >
                  {detail}
                </p>
              </div>
            </article>
          ))}

          {/* CTA */}
          <Link
            to="/contact"
            className="group relative shrink-0 self-center overflow-hidden flex flex-col justify-between p-8 lg:p-10"
            style={{
              width: "clamp(18rem, 30vw, 31rem)",
              height: "min(48vh, 25rem)",
              background: "#1A0E0B",
              color: "#ECE1D8",
            }}
          >
            <div>
              <p className="mb-4 text-xs tracking-[0.28em] uppercase" style={{ color: "#B39085" }}>
                Next Measure
              </p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.8rem,3.2vw,3rem)",
                  fontWeight: 400,
                  lineHeight: 1.08,
                }}
              >
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
  );
}
