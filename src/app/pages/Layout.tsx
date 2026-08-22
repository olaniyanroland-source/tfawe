import { useState, useEffect } from "react";
import logo from "../../assets/transparent2.png";
import { Outlet, NavLink, useLocation, Link } from "react-router";
import { Menu, X } from "lucide-react";
import InstagramIcon from "@mui/icons-material/Instagram";
import { motion, AnimatePresence } from "motion/react";
import { OrganizationSchema, Seo } from "../components/Seo";

const NAV = [
  { label: "Home",        to: "/" },
  { label: "About",       to: "/about" },
  { label: "Pricing",     to: "/pricing" },
  { label: "Accessories", to: "/accessories" },
  { label: "Contact",     to: "/contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/tfawe_/", Icon: InstagramIcon },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Use", to: "/terms-of-use" },
  { label: "Cookie Policy", to: "/cookie-policy" },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterJoined, setNewsletterJoined] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 50);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, [location.pathname]);

  const alwaysDark = !isHome;
  const navBg = alwaysDark || scrolled
    ? "rgba(26,14,11,0.97)"
    : "transparent";

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNewsletterJoined(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterJoined(false), 5000);
  }

  return (
    <div style={{ fontFamily: "'Raleway', sans-serif", background: "#ECE1D8" }}>
      <Seo />
      <OrganizationSchema />
      {/* ── Nav ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navBg,
          backdropFilter: alwaysDark || scrolled ? "blur(14px)" : "none",
          borderBottom: alwaysDark || scrolled ? "1px solid rgba(179,144,133,0.12)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-14 h-20 flex items-center justify-between">
          <Link to="/" className="shrink-0" aria-label="Home">
            <img src={logo} alt="TFawe" className="h-8 object-contain" />
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className="text-xs tracking-[0.18em] uppercase transition-colors duration-200"
                style={({ isActive }) => ({
                  color: isActive ? "#ECE1D8" : "rgba(236,225,216,0.55)",
                  borderBottom: isActive ? "1px solid #B39085" : "1px solid transparent",
                  paddingBottom: "2px",
                })}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/appointment"
            className="hidden md:flex items-center gap-2 px-6 py-2.5 text-xs tracking-[0.18em] uppercase transition-all duration-300"
            style={{ background: "#794137", color: "#ECE1D8" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#5C2F26")}
            onMouseLeave={e => (e.currentTarget.style.background = "#794137")}
          >
            Book Now
          </Link>

          <button
            className="md:hidden"
            style={{ color: "#ECE1D8" }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden overflow-hidden"
              style={{ background: "rgba(26,14,11,0.98)" }}
            >
              <div className="px-6 pb-8 pt-3 flex flex-col gap-5">
                {NAV.map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === "/"}
                    className="text-xs tracking-[0.2em] uppercase"
                    style={({ isActive }) => ({ color: isActive ? "#ECE1D8" : "rgba(236,225,216,0.55)" })}
                  >
                    {label}
                  </NavLink>
                ))}
                <Link
                  to="/appointment"
                  className="w-fit px-6 py-3 text-xs tracking-[0.18em] uppercase"
                  style={{ background: "#794137", color: "#ECE1D8" }}
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Page content ── */}
      <main>
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="py-14 px-6 lg:px-14" style={{ background: "#1A0E0B" }}>
        <div className="max-w-7xl mx-auto">
          <div
            className="grid gap-10 lg:grid-cols-[1fr_minmax(320px,440px)] mb-10 pb-10"
            style={{ borderBottom: "1px solid rgba(179,144,133,0.1)" }}
          >
            <div>
              <img src={logo} alt="TFawe" className="h-8 object-contain" />
              <p className="mt-1 text-xs" style={{ color: "rgba(179,144,133,0.4)" }}>
                Toronto, Canada · Est. 2022
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="w-full">
              <label
                htmlFor="newsletter-email"
                className="block mb-3 text-xs tracking-[0.22em] uppercase"
                style={{ color: "#B39085" }}
              >
                Subscribe to our newsletter
              </label>
              <div
                className="flex flex-col sm:flex-row"
                style={{ border: "1px solid rgba(179,144,133,0.18)" }}
              >
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Email address"
                  className="min-h-12 flex-1 px-4 text-sm outline-none"
                  style={{ background: "rgba(236,225,216,0.04)", color: "#ECE1D8" }}
                />
                <button
                  type="submit"
                  className="min-h-12 px-5 text-xs tracking-[0.18em] uppercase transition-colors duration-200"
                  style={{ background: "#794137", color: "#ECE1D8" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#5C2F26")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#794137")}
                >
                  Subscribe
                </button>
              </div>
              {newsletterJoined && (
                <p className="mt-3 text-xs" style={{ color: "rgba(236,225,216,0.65)" }}>
                  Thank you for subscribing.
                </p>
              )}
            </form>
          </div>

          <div
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10"
          >
            <nav className="flex flex-wrap gap-7">
              {[...NAV, { label: "Appointment", to: "/appointment" }].map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-xs tracking-[0.18em] uppercase transition-colors duration-200"
                  style={{ color: "rgba(179,144,133,0.45)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#B39085")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(179,144,133,0.45)")}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex gap-5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  title={label}
                  className="flex h-9 w-9 items-center justify-center transition-colors duration-200"
                  style={{ color: "rgba(179,144,133,0.35)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#B39085")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(179,144,133,0.35)")}
                >
                  <Icon fontSize="small" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3" aria-label="Legal">
              {LEGAL_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-xs transition-colors duration-200"
                  style={{ color: "rgba(179,144,133,0.45)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#B39085")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(179,144,133,0.45)")}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <p className="text-xs" style={{ color: "rgba(179,144,133,0.25)" }}>
              © {new Date().getFullYear()} TFawe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
