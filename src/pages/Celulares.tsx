import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import BrandFilter from "@/components/BrandFilter";
import { SEO } from "@/components";
import { celulares } from "@/data/celulares";

const Celulares = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const productRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll a la sección de productos cuando cambia el filtro de serie o marca
  useEffect(() => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedSeries, selectedBrand]);

  // Detectar highlight param en la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const highlight = params.get("highlight");
    if (highlight) {
      setHighlightedId(highlight);
      setTimeout(() => {
        const el = productRefs.current[highlight];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    } else {
      setHighlightedId(null);
    }
  }, [location.search]);

  // Cuando hay un highlight, filtrar automáticamente por la serie/marca del producto
  useEffect(() => {
    if (highlightedId) {
      const product = celulares.find((p) => p.id === highlightedId);
      if (product) {
        if (product.brand === "Apple") {
          // Si es iPhone, filtrar por la serie correspondiente
          const match = product.name.match(/(?:iPhone|IPHONE)\s+(\d+)/i);
          if (match) {
            setSelectedBrand("Apple");
            setSelectedSeries(match[1]);
          }
        } else {
          setSelectedBrand(product.brand);
          setSelectedSeries(null);
        }
      }
    }
  }, [highlightedId]);

  // Función para extraer la serie de iPhone del nombre del producto
  const getiPhoneSeries = (name: string): string | null => {
    // Buscar tanto "iPhone" como "IPHONNE" (variantes comunes)
    const match = name.match(/(?:iPhone|IPHONNE)\s+(\d+)/i);
    return match ? match[1] : null;
  };

  const filteredProducts = celulares.filter((product) => {
    // Si hay una serie seleccionada, filtrar por serie
    if (selectedSeries) {
      const productSeries = getiPhoneSeries(product.name);
      if (productSeries !== selectedSeries) {
        return false;
      }
      // Si coincide la serie, también debe ser Apple
      return product.brand === "Apple";
    }
    
    // Si hay una marca seleccionada, filtrar por marca
    if (selectedBrand) {
      return product.brand === selectedBrand;
    }
    
    // Si no hay filtros, mostrar solo iPhone 17 Pro y Pro Max
    const isIPhone17 = /IPHONE\s+17|iPhone\s+17/i.test(product.name);
    return isIPhone17 && product.brand === "Apple";
  });

  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Celulares y Smartphones",
    "description": "Amplia selección de celulares iPhone, Samsung, Xiaomi y más marcas reconocidas",
    "numberOfItems": celulares.length,
    "itemListElement": celulares.slice(0, 10).map((product, index) => ({
      "@type": "Product",
      "position": index + 1,
      "name": product.name,
      "description": `${product.name} - Celular premium con excelente calidad`,
      "brand": product.brand || "Premium",
      "category": "Smartphones"
    }))
  };

  return (
    <>
      <SEO
        title="Celulares y Smartphones - MANIA GROUP"
        description="Encuentra los mejores celulares iPhone, Samsung, Xiaomi y más. Productos originales con garantía. Envío gratis a toda Colombia."
        keywords="celulares iPhone, Samsung Galaxy, Xiaomi smartphones, celulares originales Colombia"
        url="/celulares"
        structured_data={productsSchema}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/iphone/hero.png"
              alt="Celulares y smartphones"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Celulares
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl opacity-90 mb-8">
                Descubre los últimos modelos de smartphones con la mejor tecnología
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
                <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                  iPhone 17 Pro Max
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                  Samsung Galaxy S24
                </span>
                
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <div ref={productsSectionRef} className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6">
              <aside className="w-full lg:w-64 shrink-0">
                <BrandFilter
                  products={celulares}
                  selectedBrand={selectedBrand}
                  onBrandSelect={(brand) => {
                    setSelectedBrand(brand);
                    if (brand !== "Apple") {
                      setSelectedSeries(null);
                    }
                  }}
                  showAppleSubmenu={true}
                  selectedSeries={selectedSeries}
                  onSeriesSelect={setSelectedSeries}
                />
              </aside>
              <div className="flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      ref={el => (productRefs.current[product.id] = el)}
                      className={highlightedId === product.id ? "ring-4 ring-blue-400 rounded-lg transition-all" : ""}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                {filteredProducts.length === 0 && (
                  <p className="text-center text-muted-foreground py-12">
                    No se encontraron productos de esta marca
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Celulares;
