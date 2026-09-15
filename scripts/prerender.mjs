// scripts/prerender.mjs
// Runs after `vite build`. Generates a static index.html per route in seo-pages.json
// with that page's own title/description/canonical/OG/Twitter tags baked in,
// so social crawlers (which don't run JS) see the correct preview per page.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT, "dist");
const SITE_URL = "https://www.tfawe.ca";

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function replaceTagContent(html, regex, newValue) {
  if (!regex.test(html)) {
    console.warn(`  ⚠ Pattern not found: ${regex}`);
    return html;
  }
  return html.replace(regex, (match) =>
    match.replace(/content="[^"]*"/, `content="${escapeHtml(newValue)}"`)
  );
}

function main() {
  const indexPath = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("dist/index.html not found — did `vite build` run first?");
    process.exit(1);
  }

  const template = fs.readFileSync(indexPath, "utf-8");
const pagesJsonPath = path.join(ROOT, "src", "app", "components", "seo-pages.json");
  const pages = JSON.parse(fs.readFileSync(pagesJsonPath, "utf-8"));

  for (const [route, meta] of Object.entries(pages)) {
    const canonicalUrl = `${SITE_URL}${route === "/" ? "/" : route}`;
    const robots = meta.noIndex ? "noindex, follow" : "index, follow";

    let html = template;
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
    html = replaceTagContent(html, /<meta name="description"[^>]*>/, meta.description);
    html = replaceTagContent(html, /<meta name="robots"[^>]*>/, robots);
    html = replaceTagContent(html, /<meta property="og:title"[^>]*>/, meta.title);
    html = replaceTagContent(html, /<meta property="og:description"[^>]*>/, meta.description);
    html = replaceTagContent(html, /<meta property="og:url"[^>]*>/, canonicalUrl);
    html = replaceTagContent(html, /<meta name="twitter:title"[^>]*>/, meta.title);
    html = replaceTagContent(html, /<meta name="twitter:description"[^>]*>/, meta.description);
    html = html.replace(
      /<link rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    if (route === "/") {
      fs.writeFileSync(indexPath, html);
      console.log(`✔ Updated dist/index.html for "/"`);
    } else {
      // The hero video is only used on the home page. Do not make other
      // statically generated routes download this large above-the-fold asset.
      html = html.replace(/\s*<link data-hero-video-preload[^>]*>\s*/, "\n");
      const outDir = path.join(DIST_DIR, route.replace(/^\//, ""));
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html);
      console.log(`✔ Generated dist${route}/index.html`);
    }
  }
}

main();
