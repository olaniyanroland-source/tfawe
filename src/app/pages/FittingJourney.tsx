import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { FITTING_JOURNEY_STEPS } from "../data/fittingJourney";

export function FittingJourney() {
  return (
    <div style={{ background: "#ECE1D8" }}>
      <section className="relative flex min-h-[380px] items-end px-6 pb-14 pt-32 lg:px-14" style={{ background: "#2C1810" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(26,14,11,.2),rgba(121,65,55,.45))" }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#B39085" }}>Your fitting journey</p>
          <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, color: "#ECE1D8" }}>
            From first measure<br />to <em style={{ color: "#B39085" }}>final stitch.</em>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "rgba(236,225,216,.75)" }}>
            One pair of hands guides your garment through every stage: considered with you, made for you, and finished by hand.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-16 lg:px-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {FITTING_JOURNEY_STEPS.map((step) => (
            <article key={step.number} className="overflow-hidden" style={{ background: "#F5EDE7", border: "1px solid rgba(121,65,55,.16)" }}>
              <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "#D9CBBF" }}>
                {step.video ? (
                  <video className="h-full w-full object-cover" muted loop playsInline preload="metadata" poster={step.image} controls aria-label="Hand finishing a garment">
                    <source src={step.video} type="video/mp4" />
                  </video>
                ) : (
                  <img src={step.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                )}
                <span className="absolute left-4 top-4 text-xs tracking-[0.18em] text-white" style={{ textShadow: "0 1px 8px rgba(0,0,0,.7)" }}>{step.number}</span>
              </div>
              <div className="p-5 sm:p-6">
                <p className="mb-2 text-[10px] tracking-[0.2em] uppercase" style={{ color: "#794137" }}>Stage {step.number}</p>
                <h2 className="mb-3 text-xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, color: "#2C1810" }}>{step.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#5A3A30" }}>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-14 lg:px-14 lg:pb-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t pt-8 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "rgba(121,65,55,.22)" }}>
          <p className="text-sm" style={{ color: "#5A3A30" }}>Ready to begin? Choose an online or in-person consultation.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/appointment/online-consultation" className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.1em] uppercase" style={{ background: "#794137", color: "#ECE1D8" }}>
              Online consultation <ArrowRight size={14} />
            </Link>
            <Link to="/appointment/in-person-consultation" className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.1em] uppercase" style={{ background: "#2C1810", color: "#ECE1D8" }}>
              In-person consultation <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
