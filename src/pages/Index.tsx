import HeroSlider from "@/components/HeroSlider";
import CategorySection from "@/components/CategorySection";
import { BrandMarquee, SectionDivider, ImageMosaic, BannerImage, SEO } from "@/components";
import { celulares } from "@/data/celulares";
import { pods } from "@/data/pods";
import { perfumes } from "@/data/perfumes";

const Index = () => {
  // Función para extraer el número del modelo de iPhone
  const getiPhoneModel = (name: string): number | null => {
    const match = name.match(/iPhone\s+(\d+)/i);
    return match ? parseInt(match[1], 10) : null;
  };

  // Función para extraer el color del nombre del producto
  const getColor = (name: string): string | null => {
    // El color es la última palabra del nombre
    const words = name.trim().split(/\s+/);
    return words.length > 0 ? words[words.length - 1].toLowerCase() : null;
  };

  // Ordenar celulares para priorizar Orange sobre Silver (especialmente modelo 17)
  const sortedCelulares = [...celulares].sort((a, b) => {
    const aColor = getColor(a.name);
    const bColor = getColor(b.name);
    const aModel = getiPhoneModel(a.name);
    const bModel = getiPhoneModel(b.name);
    
    // Priorizar Orange del modelo 17
    if (aColor === "orange" && aModel === 17 && bColor === "silver" && bModel === 17) return -1;
    if (bColor === "orange" && bModel === 17 && aColor === "silver" && aModel === 17) return 1;
    
    // Priorizar Orange en general sobre Silver
    if (aColor === "orange" && bColor === "silver") return -1;
    if (bColor === "orange" && aColor === "silver") return 1;
    
    return 0;
  });

  // Seleccionar 5 celulares con modelos y colores diferentes
  const celularesDestacados = sortedCelulares.reduce((acc, celular) => {
    if (acc.length >= 5) return acc;
    
    const model = getiPhoneModel(celular.name);
    const color = getColor(celular.name);
    
    if (model && color) {
      // Verificar que el modelo y el color sean únicos
      const modelExists = acc.some((c) => getiPhoneModel(c.name) === model);
      const colorExists = acc.some((c) => getColor(c.name) === color);
      
      if (!modelExists && !colorExists) {
        acc.push(celular);
      }
    }
    
    return acc;
  }, [] as typeof celulares);

  const vapesPremium = ["Ignite", "Elf Bar", "Life Pod", "Lost Mary", "Geek Bar"]
    .map((brand) => pods.find((p) => p.brand === brand && p.image))
    .filter(Boolean) as typeof pods;
  const perfumesDestacados = perfumes.slice(0, 5);

  const organizationSchema = {
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
  };

  const websiteSchema = {
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
  };

  const faqSchema = {
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
        "name": "¿Los celulares vienen desbloqueados?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, todos nuestros smartphones iPhone y Samsung vienen completamente desbloqueados para usar con cualquier operadora."
        }
      }
    ]
  };

  const localBusinessSchema = {
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const combinedSchema = [organizationSchema, websiteSchema, faqSchema, localBusinessSchema];

  return (
    <>
      <SEO
        title="MANIA GROUP - Celulares, Vapes y Perfumes Premium"
        description="Descubre la mejor selección de smartphones, vapes y perfumes de lujo. Productos originales con garantía. Con envío a todo Paraguay. Tienda ubicada en Ciudad del Este - Paraguay."
        keywords="celulares iPhone Samsung, vapes originales, perfumes originales, tienda online Ciudad del Este Paraguay"
        url="/"
        structured_data={combinedSchema}
      />
      <div className="min-h-screen">
        <HeroSlider />
        
        <BrandMarquee />
        
        <div className="py-8">
          <CategorySection
            title="Celulares Destacados"
            products={celularesDestacados}
            viewMoreLink="/celulares"
          />
          
          <SectionDivider />
          
          <CategorySection
            title="Vapes Premium"
            products={vapesPremium}
            viewMoreLink="/vapes"
          />
          
          <BannerImage src="/images/banner.jpg" />
          
          <CategorySection
            title="Perfumes Exclusivos"
            products={perfumesDestacados}
            viewMoreLink="/perfumes"
          />
        </div>

        <ImageMosaic />
      </div>
    </>
  );
};

export default Index;
