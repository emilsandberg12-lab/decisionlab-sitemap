import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Shopify App Proxy lander ALTID her
app.get("/", (req, res) => {
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

app.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on port", PORT);
});
