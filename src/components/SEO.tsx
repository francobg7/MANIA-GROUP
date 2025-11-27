import { Helmet } from 'react-helmet-async';
import { sanitizeInput, sanitizeHTML } from '@/config/security';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structured_data?: object;
  robots?: string;
}

const SEO = ({
  title = "MANIA GROUP - Celulares, Vapes y Perfumes",
  description = "Tienda online de celulares, vapes y perfumes originales. Los mejores productos al mejor precio.",
  keywords = "celulares, smartphones, vapes, perfumes, tienda online, mania group",
  image = "/images/logos/banner.png",
  url,
  type = "website",
  structured_data,
  robots = "index, follow"
}: SEOProps) => {
  // Sanitize all inputs to prevent XSS
  const safeTitle = sanitizeInput(title);
  const safeDescription = sanitizeInput(description);
  const safeKeywords = sanitizeInput(keywords);
  const safeType = sanitizeInput(type);
  const safeRobots = sanitizeInput(robots);
  
  const siteUrl = window.location.origin;
  const fullUrl = url ? `${siteUrl}${sanitizeInput(url)}` : window.location.href;
  const fullImageUrl = image.startsWith('http') ? sanitizeInput(image) : `${siteUrl}${sanitizeInput(image)}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{safeTitle}</title>
      <meta name="description" content={safeDescription} />
      <meta name="keywords" content={safeKeywords} />
      <meta name="robots" content={safeRobots} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={safeType} />
      <meta property="og:site_name" content="MANIA GROUP" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Structured Data */}
      {structured_data && (
        <script type="application/ld+json">
          {JSON.stringify(structured_data)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
