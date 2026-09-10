import { useEffect } from "react";
import { useLocation } from "react-router";
import { DEFAULT_DESCRIPTION, PAGES, SITE_URL } from "./seo-data";

const SOCIAL_IMAGE_URL = `${SITE_URL}/og-image.png`;

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
    setMeta('meta[property="og:image"]', "property", "og:image", SOCIAL_IMAGE_URL);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", page.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", page.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", SOCIAL_IMAGE_URL);
  }, [page, pathname]);

  return null;
}
