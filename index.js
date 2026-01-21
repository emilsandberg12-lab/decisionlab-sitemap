import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Shopify App Proxy – svar altid OK
app.use((req, res) => {
  res.status(200);
  res.setHeader("Content-Type", "application/xml");

  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://decisionlab.myshopify.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </urlset>`);
});

app.listen(PORT, () => {
  console.log("DecisionLab Sitemap app running");
});

