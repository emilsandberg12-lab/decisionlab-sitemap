const express = require("express");

const app = express();

// Railway-safe port (lokal = 3000, prod = injected)
const PORT = Number(process.env.PORT) || 3000;

/**
 * Healthcheck / root
 */
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

/**
 * Shopify App Proxy
 * /apps/sitemap -> faktisk sitemap
 */
app.get("/apps/sitemap", (req, res) => {
  res.redirect(301, "/api/sitemap");
});

/**
 * Sitemap XML
 */
app.get("/api/sitemap", (req, res) => {
  res
    .status(200)
    .set("Content-Type", "application/xml")
    .send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://decisionlab.myshopify.com/</loc>
  </url>
</urlset>`);
});

/**
 * Start server
 */
app.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on port", PORT);
});
