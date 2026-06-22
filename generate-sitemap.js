/**
 * Sitemap Generator
 * Generates sitemap.xml from events.json for SEO indexing.
 * Run: node generate-sitemap.js
 * Also runs as part of the build/deploy pipeline.
 */
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://ocalendarioqueimporta.com.br';
const EVENTS_PATH = path.join(__dirname, 'data', 'events.json');
const OUTPUT_PATH = path.join(__dirname, 'sitemap.xml');

function generateSitemap() {
  const events = JSON.parse(fs.readFileSync(EVENTS_PATH, 'utf-8'));
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Homepage
  xml += `  <url>\n`;
  xml += `    <loc>${SITE_URL}/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;

  // Each event as a virtual page (hash-based navigation)
  events.forEach(event => {
    const slug = slugify(event.title);
    const eventDate = event.date || today;
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/#evento-${event.id}-${slug}</loc>\n`;
    xml += `    <lastmod>${eventDate}</lastmod>\n`;
    xml += `    <changefreq>yearly</changefreq>\n`;
    xml += `    <priority>0.6</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += '</urlset>\n';

  fs.writeFileSync(OUTPUT_PATH, xml, 'utf-8');
  console.log(`Sitemap generated: ${events.length} events + homepage → ${OUTPUT_PATH}`);
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

generateSitemap();
