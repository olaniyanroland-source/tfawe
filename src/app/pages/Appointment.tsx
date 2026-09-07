import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Clock, MapPin } from "lucide-react";
import BookingForm from "../components/BookingForm";
import fabricBookImage from "../../assets/fabricbook.jpeg";

const ease = [0.25, 0.1, 0.25, 1] as const;

function Reveal({ children, delay = 0, y = 24, className = "" }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease }}>
      {children}
    </motion.div>
  );
}

const STEPS = ["Select a time", "Share your details", "Meet your stylist", "Begin your garment"];

export function Appointment() {
  return (
    <div style={{ background: "#ECE1D8" }}>
      <section className="relative flex items-end px-6 lg:px-14" style={{ minHeight: 370, paddingTop: 128, paddingBottom: 52, background: "#2C1810" }}>
        <img src="https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?w=1600&h=700&fit=crop&fm=jpg&q=80" alt="Fashion consultation" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #2C1810 25%, rgba(44,24,16,.58))" }} />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#B39085" }}>Private consultation</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.7rem,6vw,4.8rem)", fontWeight: 400, color: "#ECE1D8", lineHeight: 1.05 }}>
              Book an <em style={{ color: "#B39085" }}>appointment.</em>
            </h1>
          </div>
          <div className="flex flex-col gap-2 text-sm" style={{ color: "rgba(236,225,216,.72)" }}>
            <span className="flex items-center gap-2"><MapPin size={15} style={{ color: "#B39085" }} /> Toronto, Canada</span>
            <span className="flex items-center gap-2"><Clock size={15} style={{ color: "#B39085" }} /> Mon–Sat · Sunday closed</span>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:py-14 lg:px-14" style={{ background: "#ECE1D8" }}>
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>Reserve your session</p>
            <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 400, color: "#2C1810", lineHeight: 1.1 }}>
              Made for <em style={{ color: "#794137" }}>you.</em>
            </h2>
            <p className="mb-7 max-w-md text-sm leading-relaxed" style={{ color: "#5A3A30" }}>Choose a time for a relaxed, one-to-one styling consultation.</p>
            <div className="overflow-hidden" style={{ aspectRatio: "4/3", background: "#D9CBBF" }}>
              <img src={fabricBookImage} alt="Fabric selection" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-5 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>What happens next</p>
            <div className="grid gap-px sm:grid-cols-2" style={{ background: "rgba(121,65,55,.16)" }}>
              {STEPS.map((step, index) => (
                <div key={step} className="flex items-center gap-4 p-5" style={{ background: "#F5EDE7" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#B39085" }}>0{index + 1}</span>
                  <span className="text-sm" style={{ color: "#2C1810" }}>{step}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-10 sm:pb-14 lg:px-14" style={{ background: "#ECE1D8" }}>
        <Reveal className="mx-auto max-w-2xl">
          <div className="overflow-hidden" style={{ background: "#F5EDE7" }}><BookingForm /></div>
        </Reveal>
      </section>

      <section className="px-6 py-10 sm:py-14 lg:px-14" style={{ background: "#ECE1D8" }}>
        <div className="mx-auto max-w-7xl" style={{ background: "rgba(121,65,55,.16)" }}>
          <div className="flex gap-4 p-6 sm:p-7" style={{ background: "#ECE1D8" }}>
            <Clock size={19} className="mt-0.5 shrink-0" style={{ color: "#794137" }} />
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: "#794137" }}>Turnaround time</p>
              <p className="text-sm leading-relaxed" style={{ color: "#5A3A30" }}>Most garments are completed within 3–4 weeks after order confirmation and measurements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
