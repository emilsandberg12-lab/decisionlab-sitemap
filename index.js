import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Shopify sender ofte HEAD requests først
app.head("/api/sitemap", (req, res) => {
  res.status(200).end();
});

// Sitemap endpoint (GET)
app.get("/api/sitemap", (req, res) => {
  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://decisionlab.myshopify.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
});

// Root (kun til test)
app.get("/", (req, res) => {
  res.status(200).send("DecisionLab Sitemap is running");
});

// Catch-all (vigtigt for Shopify)
app.use((req, res) => {
  res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`Sitemap app running on port ${PORT}`);
});
