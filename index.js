import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/sitemap", (req, res) => {
  res.set("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://decisionlab.myshopify.com/</loc>
    <priority>1.0</priority>
  </url>
</urlset>`);
});

app.get("/", (req, res) => {
  res.send("DecisionLab Sitemap is running");
});

app.listen(PORT, () => {
  console.log("Running sitemap app");
});
