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
}

const SEO = ({
  title = "MANIA GROUP - Celulares, Pods y Perfumes",
  description = "Tienda online de celulares, auriculares y perfumes premium. Los mejores productos al mejor precio.",
  keywords = "celulares, smartphones, pods, auriculares, perfumes, tienda online, mania group",
  image = "/images/logos/banner.png",
  url,
  type = "website",
  structured_data
}: SEOProps) => {
  // Sanitize all inputs to prevent XSS
  const safeTitle = sanitizeInput(title);
  const safeDescription = sanitizeInput(description);
  const safeKeywords = sanitizeInput(keywords);
  const safeType = sanitizeInput(type);
  
  const siteUrl = window.location.origin;
  const fullUrl = url ? `${siteUrl}${sanitizeInput(url)}` : window.location.href;
  const fullImageUrl = image.startsWith('http') ? sanitizeInput(image) : `${siteUrl}${sanitizeInput(image)}`;

  return (
    <Helmet>
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Basic Meta Tags */}
      <title>{safeTitle}</title>
      <meta name="description" content={safeDescription} />
      <meta name="keywords" content={safeKeywords} />
      <meta name="robots" content="index, follow" />
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
