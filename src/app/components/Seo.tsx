import { useEffect } from "react";
import { useLocation } from "react-router";
import socialImage from "../../assets/tfawework.png";

const SITE_URL = "https://www.tfawe.ca";
const DEFAULT_TITLE = "TFawe | Custom Menswear & Bespoke Tailoring in Toronto";
const DEFAULT_DESCRIPTION =
  "TFawe is a Toronto custom menswear house offering bespoke suits, personal styling, shirts, outerwear, eyewear, and private consultations.";

type PageMetadata = { title: string; description: string; noIndex?: boolean };

const PAGES: Record<string, PageMetadata> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/about": {
    title: "About TFawe | Toronto Custom Menswear House",
    description: "Meet TFawe, the Toronto custom menswear house founded by Tunde Fawe and built around exceptional fit, personal style, and timeless design.",
  },
  "/pricing": {
    title: "Custom Suit Pricing | TFawe Toronto",
    description: "Explore TFawe pricing for made-to-measure suits, tuxedos, jackets, trousers, shirts, and outerwear in Toronto.",
  },
  "/accessories": {
    title: "Eyewear & Accessories | TFawe Toronto",
    description: "Discover TFawe's curated accessories and eyewear collection, selected to complete a considered custom wardrobe.",
  },
  "/appointment": {
    title: "Book a Custom Menswear Consultation | TFawe Toronto",
    description: "Book a private TFawe consultation in Toronto for bespoke suiting, personal styling, wardrobe advice, and made-to-measure menswear.",
  },
  "/contact": {
    title: "Contact TFawe | Custom Menswear in Toronto",
    description: "Contact TFawe in Toronto to discuss bespoke suits, personal styling, appointments, and custom menswear services.",
  },
};

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function Seo() {
  const { pathname } = useLocation();
  const page = PAGES[pathname] ?? {
    title: "Page Not Found | TFawe",
    description: DEFAULT_DESCRIPTION,
    noIndex: true,
  };

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
    const imageUrl = new URL(socialImage, SITE_URL).href;
    document.title = page.title;
    document.documentElement.lang = "en-CA";

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    setMeta('meta[name="description"]', "name", "description", page.description);
    setMeta('meta[name="robots"]', "name", "robots", page.noIndex ? "noindex, follow" : "index, follow");
    setMeta('meta[property="og:title"]', "property", "og:title", page.title);
    setMeta('meta[property="og:description"]', "property", "og:description", page.description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", page.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", page.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);
  }, [page, pathname]);

  return null;
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "TFawe",
    url: SITE_URL,
    image: new URL(socialImage, SITE_URL).href,
    description: DEFAULT_DESCRIPTION,
    email: "hello@tfawe.com",
    telephone: "+1-437-473-6685",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    sameAs: ["https://www.instagram.com/tfawe_/"],
  };

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}
