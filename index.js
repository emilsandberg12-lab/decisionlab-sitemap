const express = require("express");

const app = express();

// Railway injecter PORT – den SKAL bruges
const PORT = Number(process.env.PORT) || 3000;

// Healthcheck / root
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// Sitemap
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

// VIGTIGT: bind til 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on port", PORT);
});
