import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

export function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6"
      style={{ minHeight: "100svh", background: "#1A0E0B", paddingTop: 80 }}
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
        className="mb-4 text-xs tracking-[0.35em] uppercase"
        style={{ color: "#B39085" }}
      >
        404 — Page Not Found
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease }}
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem,10vw,8rem)", fontWeight: 400, color: "#ECE1D8", lineHeight: 1 }}
      >
        Lost in<br />
        <em style={{ fontStyle: "italic", color: "#B39085" }}>style.</em>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease }}
        className="mt-6 mb-10 text-sm"
        style={{ color: "rgba(179,144,133,.6)" }}
      >
        The page you were looking for does not exist.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300"
          style={{ background: "#794137", color: "#ECE1D8" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#5C2F26")}
          onMouseLeave={e => (e.currentTarget.style.background = "#794137")}
        >
          Back to Home <ArrowRight size={13} />
        </Link>
      </motion.div>
    </div>
  );
}
