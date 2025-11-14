
export const generateSitemap = () => {
  const baseUrl = "https://maniagroup.com.py"; // Replace with your actual domain
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/celulares", priority: "0.9", changefreq: "weekly" },
    { url: "/vapes", priority: "0.9", changefreq: "weekly" },
    { url: "/perfumes", priority: "0.9", changefreq: "weekly" },
    { url: "/carrito", priority: "0.3", changefreq: "monthly" }
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemapXml;
};

// Function to download sitemap (for development)
export const downloadSitemap = () => {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
