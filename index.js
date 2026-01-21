import express from "express";

import { BEST_PAGES } from "./best-pages.js";
import { PROBLEMS } from "./data-problems.js";
import { DECISION_PAGES } from "./data-decision-pages.js";
import { EXPERIENCE_PAGES } from "./data-experience-pages.js";
import { MAINTENANCE_PAGES } from "./data-maintenance-pages.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const BASE_URL = "https://decisionlab.myshopify.com";

/**
 * Helper: byg fuld URL
 */
function buildUrl(slug) {
  return `${BASE_URL}/${slug}`;
}

/**
 * Kun canonical BEST pages (aliases SKAL IKKE i sitemap)
 */
const CANONICAL_BEST_PAGES = BEST_PAGES.filter(
  page => page.canonical === true
);

/**
 * Shopify App Proxy:
 * /apps/sitemap → /
 */
app.get("/", (req, res) => {
  const urls = [
    ...PROBLEMS.map(p => buildUrl(p.slug)),
    ...DECISION_PAGES.map(d => buildUrl(d.slug)),
    ...CANONICAL_BEST_PAGES.map(b => buildUrl(b.slug)),
    ...EXPERIENCE_PAGES.map(e => buildUrl(e.slug)),
    ...MAINTENANCE_PAGES.map(m => buildUrl(m.slug)),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res
    .status(200)
    .set("Content-Type", "application/xml")
    .send(xml);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ Sitemap server listening on port", PORT);
});
