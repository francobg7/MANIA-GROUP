import { Product } from "@/contexts/CartContext";

interface StructuredDataOptions {
  page: "home" | "celulares" | "vapes" | "perfumes";
  products?: Product[];
  currentPage?: number;
  itemsPerPage?: number;
}

export const generateProductStructuredData = (
  products: Product[], 
  category: string, 
  baseRating: string = "4.7",
  reviewCount: string = "32"
) => {
  return products.map((product, index) => ({
    "@type": "Product",
    "position": index + 1,
    "name": product.name,
    "description": generateProductDescription(product, category),
    "image": `https://maniagroup.com.py${product.image}`,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "category": category,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "MANIA GROUP"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": baseRating,
      "reviewCount": reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    }
  }));
};

export const generateBreadcrumbData = (pageName: string, pageUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://maniagroup.com.py"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": pageName,
      "item": `https://maniagroup.com.py${pageUrl}`
    }
  ]
});

export const generateOrganizationData = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MANIA GROUP",
  "url": "https://maniagroup.com.py",
  "description": "Tienda online de celulares, vapes y perfumes premium. Los mejores productos al mejor precio.",
  "sameAs": [
    "https://www.facebook.com/maniagroup",
    "https://www.instagram.com/maniagroup"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
});

export const generateWebsiteData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MANIA GROUP",
  "url": "https://maniagroup.com.py",
  "description": "Tienda online de celulares, vapes y perfumes premium",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://maniagroup.com.py/buscar?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

const generateProductDescription = (product: Product, category: string): string => {
  const categoryDescriptions = {
    "Smartphone": `Smartphone ${product.brand} con tecnología avanzada y excelente rendimiento`,
    "Dispositivos de Vapeo": `Dispositivo de vapeo ${product.brand} de alta calidad con excelente sabor y duración`,
    "Perfumes y Fragancias": `Perfume original ${product.brand} con fragancia exclusiva y elegante`
  };

  return `${product.name} - ${categoryDescriptions[category] || `Producto ${product.brand} de alta calidad`}`;
};

export const generateCompleteStructuredData = ({
  page,
  products = [],
  currentPage = 1,
  itemsPerPage = 10
}: StructuredDataOptions) => {
  const schemas: any[] = [];

  // Add organization and website data for home page
  if (page === "home") {
    schemas.push(generateOrganizationData());
    schemas.push(generateWebsiteData());
    return schemas;
  }

  // Add product list and breadcrumb for other pages
  const pageConfig = {
    celulares: {
      name: "Celulares y Smartphones",
      description: "Amplia selección de celulares iPhone, Samsung, Xiaomi y más marcas reconocidas",
      category: "Smartphone",
      breadcrumbName: "Celulares",
      breadcrumbUrl: "/celulares",
      rating: "4.7",
      reviewCount: "32"
    },
    vapes: {
      name: "Vapes y Dispositivos de Vapeo - MANIA GROUP",
      description: "Vapes de las mejores marcas: Elfbar, Lost Mary, Ignite y más. Dispositivos de vapeo de calidad.",
      category: "Dispositivos de Vapeo",
      breadcrumbName: "Vapes",
      breadcrumbUrl: "/vapes",
      rating: "4.6",
      reviewCount: "89"
    },
    perfumes: {
      name: "Perfumes y Fragancias - MANIA GROUP",
      description: "Perfumes originales de las mejores marcas. Dior, Chanel, Tom Ford y más.",
      category: "Perfumes y Fragancias",
      breadcrumbName: "Perfumes",
      breadcrumbUrl: "/perfumes",
      rating: "4.9",
      reviewCount: "156"
    }
  };

  const config = pageConfig[page];
  if (!config) return [];

  // Product list schema
  const productsToShow = products.slice(0, itemsPerPage);
  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": config.name,
    "description": config.description,
    "numberOfItems": products.length,
    "itemListElement": generateProductStructuredData(
      productsToShow, 
      config.category, 
      config.rating, 
      config.reviewCount
    )
  };

  schemas.push(productListSchema);
  schemas.push(generateBreadcrumbData(config.breadcrumbName, config.breadcrumbUrl));

  return schemas;
};

export const generateIndividualProductData = (product: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": generateProductDescription(product, getCategoryName(product.category)),
  "image": [`https://maniagroup.com.py${product.image}`],
  "brand": {
    "@type": "Brand",
    "name": product.brand
  },
  "category": getCategoryName(product.category),
  "sku": product.id,
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": "USD",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "MANIA GROUP",
      "url": "https://maniagroup.com.py"
    },
    "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 1 year from now
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": getDefaultRating(product.category),
    "reviewCount": getDefaultReviewCount(product.category),
    "bestRating": "5",
    "worstRating": "1"
  }
});

const getCategoryName = (category: string): string => {
  const categoryMap = {
    "celulares": "Smartphone",
    "vapes": "Dispositivos de Vapeo",
    "perfumes": "Perfumes y Fragancias"
  };
  return categoryMap[category] || "Producto";
};

const getDefaultRating = (category: string): string => {
  const ratingMap = {
    "celulares": "4.7",
    "vapes": "4.6",
    "perfumes": "4.9"
  };
  return ratingMap[category] || "4.5";
};

const getDefaultReviewCount = (category: string): string => {
  const reviewMap = {
    "celulares": "32",
    "vapes": "89",
    "perfumes": "156"
  };
  return reviewMap[category] || "25";
};

export const generateFAQData = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Los productos son originales?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, todos nuestros productos son 100% originales con garantía. Trabajamos directamente con distribuidores autorizados."
      }
    },
    {
      "@type": "Question",
      "name": "¿Realizan envíos a todo Paraguay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, realizamos envíos a todo Paraguay. Los productos son enviados desde nuestra tienda en Ciudad del Este con total seguridad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué métodos de pago aceptan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aceptamos múltiples métodos de pago incluyendo efectivo, transferencias bancarias y tarjetas de crédito/débito."
      }
    },
    {
      "@type": "Question", 
      "name": "¿Los celulares vienen desbloqueados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, todos nuestros smartphones iPhone y Samsung vienen completamente desbloqueados para usar con cualquier operadora."
      }
    }
  ]
});

export const generateLocalBusinessData = () => ({
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "MANIA GROUP",
  "description": "Tienda de celulares, vapes y perfumes en Ciudad del Este",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ciudad del Este",
    "addressCountry": "PY"
  },
  "url": "https://maniagroup.com.py",
  "priceRange": "$",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
  "currenciesAccepted": "USD",
  "openingHours": "Mo-Sa 08:00-20:00",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
});
