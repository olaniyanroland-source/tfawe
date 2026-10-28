import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import work1 from "../../assets/work1.mp4";
import work2 from "../../assets/work2.mp4";
import work3 from "../../assets/work3.mp4";
import work4 from "../../assets/work4.mp4";
import work5 from "../../assets/work5.mp4";
import work6 from "../../assets/work6.MP4";
import work7 from "../../assets/work7.mp4";
import work8 from "../../assets/work8.mp4";

const WORK = [
  { video: work1, ratio: "4 / 5" },
  { video: work2, ratio: "4 / 5" },
  { video: work3, ratio: "5 / 6" },
  { video: work4, ratio: "4 / 5" },
  { video: work5, ratio: "4 / 5" },
  { video: work6, ratio: "5 / 6" },
  { video: work7, ratio: "4 / 5" },
  { video: work8, ratio: "4 / 5" },
];

export function Portfolio() {
  return (
    <div style={{ background: "#ECE1D8" }}>
      <section className="px-6 pb-16 pt-36 lg:px-14 lg:pb-20 lg:pt-44" style={{ background: "#1A0E0B" }}>
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 text-xs tracking-[0.35em] uppercase"
            style={{ color: "#B39085" }}
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="max-w-4xl"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 400, lineHeight: 1.04, color: "#ECE1D8" }}
          >
            Made for the way<br />
            <em style={{ color: "#B39085" }}>you move.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-xl text-sm leading-loose"
            style={{ color: "rgba(236,225,216,.68)" }}
          >
            A selection of custom garments and considered details, made around the people who wear them.
          </motion.p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-14 lg:py-24" aria-label="Selected TFAWE work">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6 border-b pb-5" style={{ borderColor: "rgba(44,24,16,.18)" }}>
            <p className="text-xs tracking-[0.28em] uppercase" style={{ color: "#794137" }}>Selected work</p>
            <p className="text-xs" style={{ color: "rgba(44,24,16,.55)" }}>A growing collection</p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {WORK.map(({ video, ratio }, index) => (
              <motion.article
                key={video}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: (index % 3) * 0.08 }}
                className={index % 3 === 1 ? "lg:mt-16" : ""}
              >
                <div className="group relative overflow-hidden" style={{ aspectRatio: ratio, background: "#D9CBBF" }}>
                  <video
                    src={video}
                    aria-label={`TFAWE portfolio video ${index + 1}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center lg:px-14 lg:py-28" style={{ background: "#794137" }}>
        <p className="mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(236,225,216,.68)" }}>Your turn</p>
        <h2 className="mx-auto max-w-3xl" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4.5vw,3.8rem)", lineHeight: 1.08, color: "#ECE1D8", fontWeight: 400 }}>
          Let’s make something that feels like you.
        </h2>
        <Link
          to="/appointment"
          className="mt-8 inline-flex items-center gap-3 border px-7 py-4 text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-[#ECE1D8] hover:text-[#794137]"
          style={{ borderColor: "rgba(236,225,216,.5)", color: "#ECE1D8" }}
        >
          Book a consultation <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
