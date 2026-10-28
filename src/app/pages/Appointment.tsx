import { ArrowRight, MapPin, MonitorPlay, Scissors } from "lucide-react";
import { Link } from "react-router";

const APPOINTMENT_OPTIONS = [
  {
    title: "Your fitting journey",
    description: "Explore each stage of a TFawe commission, from the first conversation through the final fitting.",
    detail: "Learn about the process",
    to: "/appointment/fitting-journey",
    Icon: Scissors,
  },
  {
    title: "Online consultation",
    description: "Talk through your wardrobe, ideas, and garment needs with us remotely, wherever you are.",
    detail: "Request an online consultation",
    to: "/appointment/online-consultation",
    Icon: MonitorPlay,
  },
  {
    title: "In-person consultation",
    description: "Visit our Toronto atelier for a private fitting consultation and a hands-on introduction to cloth and construction.",
    detail: "Choose an appointment time",
    to: "/appointment/in-person-consultation",
    Icon: MapPin,
  },
];

export function Appointment() {
  return (
    <div style={{ background: "#ECE1D8" }}>
      <section className="relative flex min-h-[380px] items-end px-6 pb-14 pt-32 lg:px-14">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#1A0E0B 0%,#2C1810 65%,#794137 100%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#B39085" }}>Appointments</p>
          <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, color: "#ECE1D8" }}>
            Begin with a <em style={{ color: "#B39085" }}>conversation.</em>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "rgba(236,225,216,.75)" }}>
            Choose the way you would like to meet us or explore how your garment will take shape.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-16 lg:px-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3 lg:gap-6">
          {APPOINTMENT_OPTIONS.map(({ title, description, detail, to, Icon }, index) => (
            <Link
              key={to}
              to={to}
              className="group flex min-h-72 flex-col p-6 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:p-8"
              style={{ background: "#F5EDE7", border: "1px solid rgba(121,65,55,.16)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(121,65,55,.42)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(121,65,55,.16)")}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs tracking-[0.2em]" style={{ color: "#B39085" }}>0{index + 1}</span>
                <Icon size={22} strokeWidth={1.5} style={{ color: "#794137" }} />
              </div>
              <h2 className="mb-3 text-2xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, color: "#2C1810" }}>{title}</h2>
              <p className="mb-8 text-sm leading-relaxed" style={{ color: "#5A3A30" }}>{description}</p>
              <span className="mt-auto inline-flex items-center gap-2 text-xs tracking-[0.14em] uppercase" style={{ color: "#794137" }}>
                {detail}
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mx-auto mt-8 flex max-w-7xl items-center gap-2 text-xs" style={{ color: "#7A5046" }}>
          <MapPin size={14} /> In-person appointments take place in Toronto. The $50 appointment fee is credited toward your garment purchase if you proceed.
        </p>
      </section>
    </div>
  );
}
