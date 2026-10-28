import { FormEvent, useState } from "react";
import { ArrowRight, Check, Video } from "lucide-react";
import { Link } from "react-router";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mppzqwyn";

export function OnlineConsultation() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("Unable to send consultation request");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "mt-2 w-full px-4 py-3 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const inputStyle = { background: "#FFF9F5", border: "1px solid rgba(121,65,55,.24)", color: "#2C1810", outlineColor: "#794137" };

  return (
    <div style={{ background: "#ECE1D8" }}>
      <section className="relative flex min-h-[380px] items-end px-6 pb-14 pt-32 lg:px-14" style={{ background: "linear-gradient(135deg,#1A0E0B,#2C1810 65%,#794137)" }}>
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#B39085" }}>Meet us remotely</p>
          <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, color: "#ECE1D8" }}>
            Online <em style={{ color: "#B39085" }}>consultation.</em>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "rgba(236,225,216,.75)" }}>
            Start your commission from wherever you are. Tell us what you have in mind and we’ll reply by email to arrange a time and share the meeting details.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-16 lg:px-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center" style={{ background: "#794137", color: "#ECE1D8" }}>
              <Video size={21} strokeWidth={1.5} />
            </div>
            <p className="mb-3 text-xs tracking-[0.25em] uppercase" style={{ color: "#794137" }}>A conversation, wherever you are</p>
            <h2 className="mb-5 text-3xl leading-tight sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, color: "#2C1810" }}>
              A considered start to your commission.
            </h2>
            <p className="max-w-lg text-sm leading-relaxed" style={{ color: "#5A3A30" }}>
              Discuss your wardrobe, preferred fabrics, fit, and design ideas with the TFawe team. After you send a request, we’ll follow up to agree on a time for your online conversation.
            </p>
            <p className="mt-6 border-l-2 pl-4 text-sm leading-relaxed" style={{ borderColor: "#B39085", color: "#5A3A30" }}>
              Your request is not a confirmed booking. We’ll confirm the time and online meeting details by email.
            </p>
            <Link to="/appointment/fitting-journey" className="mt-7 inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase" style={{ color: "#794137" }}>
              Explore your fitting journey <ArrowRight size={14} />
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8" style={{ background: "#F5EDE7", border: "1px solid rgba(121,65,55,.15)" }}>
            <input type="hidden" name="form_type" value="Online consultation request" />
            <input type="hidden" name="_subject" value="Online consultation request" />
            <p className="sm:col-span-2 text-xs tracking-[0.25em] uppercase" style={{ color: "#794137" }}>Request an online consultation</p>

            <label className="block text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: "#5A3A30" }}>
              Full name
              <input name="name" autoComplete="name" required className={inputClass} style={inputStyle} />
            </label>
            <label className="block text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: "#5A3A30" }}>
              Email
              <input name="email" type="email" autoComplete="email" required className={inputClass} style={inputStyle} />
            </label>
            <label className="block text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: "#5A3A30" }}>
              Your time zone
              <input name="time_zone" placeholder="e.g. Eastern Time" className={inputClass} style={inputStyle} />
            </label>
            <label className="block text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: "#5A3A30" }}>
              Preferred days or times
              <input name="preferred_time" placeholder="A few options that work for you" className={inputClass} style={inputStyle} />
            </label>
            <label className="block text-xs font-semibold tracking-[0.12em] uppercase sm:col-span-2" style={{ color: "#5A3A30" }}>
              What would you like to discuss?
              <textarea name="message" rows={5} required className={`${inputClass} resize-y`} style={inputStyle} />
            </label>

            <div className="sm:col-span-2">
              <button type="submit" disabled={submitting} className="inline-flex min-h-12 w-full items-center justify-center gap-2 px-6 text-xs font-semibold tracking-[0.16em] uppercase transition-colors disabled:cursor-wait disabled:opacity-60 sm:w-auto" style={{ background: "#794137", color: "#ECE1D8" }}>
                {submitting ? "Sending request…" : "Request a time"} <ArrowRight size={14} />
              </button>
              {status === "success" && <p className="mt-4 flex items-center gap-2 text-sm" role="status" style={{ color: "#3D6B4B" }}><Check size={16} /> Request sent. We’ll be in touch by email to confirm a time.</p>}
              {status === "error" && <p className="mt-4 text-sm" role="alert" style={{ color: "#9B302C" }}>We couldn’t send your request. Please try again or <Link className="underline underline-offset-2" to="/contact">contact us directly</Link>.</p>}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
