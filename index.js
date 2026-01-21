import express from "express";

// Import data
import { CORNERSTONE_PAGES } from "./data/cornerstone-pages.js";
import { PROBLEMS } from "./data/problems.js";
import { DECISION_PAGES } from "./data/decision-pages.js";
import { BEST_PAGES } from "./data/best-pages.js";
import { EXPERIENCE_PAGES } from "./data/experience-pages.js";
import { MAINTENANCE_PAGES } from "./data/maintenance-pages.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const BASE_URL = "https://decisionlab.myshopify.com";

// Helper – virker med både arrays og objects
function buildUrls(pages) {
  if (!pages) return "";

  const list = Array.isArray(pages)
    ? pages
    : Object.keys(pages).map(slug => ({ slug }));

  return list
    .filter(p => p?.slug && !p.aliasOf)
    .map(
      p => `
  <url>
    <loc>${BASE_URL}/${p.slug}</loc>
  </url>`
    )
    .join("");
}

// 🔹 Shopify App Proxy LANDER HER: /apps/sitemap
app.get("/", (req, res) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${buildUrls(CORNERSTONE_PAGES)}
${buildUrls(PROBLEMS)}
${buildUrls(DECISION_PAGES)}
${buildUrls(BEST_PAGES)}
${buildUrls(EXPERIENCE_PAGES)}
${buildUrls(MAINTENANCE_PAGES)}
</urlset>`;

  res
    .status(200)
    .set("Content-Type", "application/xml")
    .send(xml);
});

// 🔹 BONUS: hvis nogen rammer /apps/sitemap.xml → redirect
app.get("/sitemap.xml", (req, res) => {
  res.redirect(301, "/apps/sitemap");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ Sitemap server running on port", PORT);
});
