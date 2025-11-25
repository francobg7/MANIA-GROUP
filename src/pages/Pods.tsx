import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import BrandFilter from "@/components/BrandFilter";
import VapeDisclaimer from "@/components/VapeDisclaimer";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import Pagination from "@/components/Pagination";
import { pods } from "@/data/pods";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PodsSubdivisionFilter from "@/components/PodsSubdivisionFilter";

// Subdivisiones por marca
const BRAND_SUBDIVISIONS: Record<string, { key: string; label: string }[]> = {
  "Lost Mary": [
    { key: "DURA 35K", label: "DURA 35K" },
    { key: "MIXER 30K", label: "MIXER 30K" },
    { key: "MO 20K", label: "MO 20K" },
    { key: "MT 35K", label: "MT 35K" },
  ],
  "Ignite": [
    { key: "V15", label: "V15" },
    { key: "V80", label: "V80" },
    { key: "V120", label: "V120" },
    { key: "V150", label: "V150" },
    { key: "V250", label: "V250" },
    { key: "V300", label: "V300" },
    { key: "V400", label: "V400" },
  ],
  "Geek Bar": [
    { key: "Z35K", label: "Z35K" },
    { key: "25K", label: "25K" },
  ],
  "Elf Bar": [
    { key: "BC 15K", label: "BC 15K" },
    { key: "BC 20000K TOUCH", label: "BC 20000K TOUCH" },
    { key: "GH 23000", label: "GH 23000" },
    { key: "TE 30K", label: "TE 30K" },
    { key: "40K", label: "40K" },
  ],
  "Black Sheep": [
    { key: "15K", label: "15K" },
    { key: "30K", label: "30K" },
    { key: "40K", label: "40K" },
  ],
  "Life Pod": [
    { key: "40K", label: "40K" },
    { key: "ECO DEVICE", label: "ECO DEVICE" },
    { key: "ECO II KIT", label: "ECO II KIT" },
    { key: "ECO II REFIL", label: "ECO II REFIL" },
    { key: "ECO SK KIT", label: "ECO SK KIT" },
  ],
};

const Vapes = () => {
  const vapes = pods.filter(
    (p) => !["Beats", "Google", "Nothing", "Samsung", "Sony", "Xiaomi", "JBL"].includes(p.brand)
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsSectionRef = useRef<HTMLDivElement>(null);
  const [subdivision, setSubdivision] = useState<string>("");
  const location = useLocation();
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const productRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Configuración de paginación
  const PRODUCTS_PER_PAGE = 12;

  // Check age verification on component mount
  useEffect(() => {
    const checkAgeVerification = () => {
      try {
        const stored = localStorage.getItem('vapeAgeVerification');
        if (stored) {
          const data = JSON.parse(stored);
          const now = Date.now();
          
          // Check if verification is still valid (not expired)
          if (data.verified && data.expires > now) {
            setIsVerified(true);
          } else {
            // Verification expired, clear it
            localStorage.removeItem('vapeAgeVerification');
            setShowVerificationModal(true);
          }
        } else {
          // No verification found
          setShowVerificationModal(true);
        }
      } catch (error) {
        console.error('Error checking age verification:', error);
        setShowVerificationModal(true);
      }
    };

    checkAgeVerification();
  }, []);

  // Scroll a la sección de productos cuando cambia el filtro de marca
  useEffect(() => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedBrand]);

  // Cuando cambia la marca seleccionada, setear subdivision a la primera opción si existe
  useEffect(() => {
    if (selectedBrand && BRAND_SUBDIVISIONS[selectedBrand]) {
      setSubdivision(BRAND_SUBDIVISIONS[selectedBrand][0].key);
    } else {
      setSubdivision("");
    }
  }, [selectedBrand]);

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

  // Cuando hay un highlight, filtrar automáticamente por la marca y subdivisión del producto
  useEffect(() => {
    if (highlightedId) {
      const product = vapes.find((p) => p.id === highlightedId);
      if (product) {
        setSelectedBrand(product.brand);
        // Buscar subdivisión si corresponde
        if (BRAND_SUBDIVISIONS[product.brand]) {
          const foundSubdivision = BRAND_SUBDIVISIONS[product.brand].find(sub => product.name.toLowerCase().includes(sub.key.toLowerCase()));
          if (foundSubdivision) {
            setSubdivision(foundSubdivision.key);
          }
        }
      }
    }
  }, [highlightedId]);

  // Resetear página actual cuando cambia el filtro o la subdivisión
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand, subdivision]);

  const handleVerified = () => {
    setIsVerified(true);
    setShowVerificationModal(false);
  };

  const handleDeclined = () => {
    // Redirect to homepage or external site
    window.location.href = '/';
  };

  const hasSubdivisions = selectedBrand && BRAND_SUBDIVISIONS[selectedBrand];

  const filteredProducts = selectedBrand
    ? hasSubdivisions
      ? vapes.filter((p) => {
          const brandKey = selectedBrand.replace(/\s+/g, "").toLowerCase();
          const nameKey = p.name.replace(/\s+/g, "").toLowerCase();
          const subdivisionKey = subdivision.replace(/\s+/g, "").toLowerCase();
          return (
            p.brand === selectedBrand &&
            nameKey.includes(brandKey) &&
            nameKey.includes(subdivisionKey)
          );
        })
      : vapes.filter((p) => p.brand === selectedBrand)
    : vapes;

  // Cálculos para paginación
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentPageProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Show loading or verification modal if not verified
  if (!isVerified) {
    return (
      <>
        <AgeVerificationModal
          isOpen={showVerificationModal}
          onVerified={handleVerified}
          onDeclined={handleDeclined}
        />
        {!showVerificationModal && (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Verificando acceso...</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="images/pods/vape-hero.jpg"
            alt="Vapes y dispositivos de vapeo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Vapes
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl opacity-90 mb-8">
              Dispositivos de vapeo con la mejor tecnología
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div ref={productsSectionRef} className="py-12 w-full">
        <div className="w-full px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="w-full lg:w-64 shrink-0">
              <BrandFilter
                products={vapes}
                selectedBrand={selectedBrand}
                onBrandSelect={setSelectedBrand}
              />
            </aside>
            <div className="flex-1 w-full">
              {/* Filtro de subdivisiones reutilizable para todas las marcas */}
              {hasSubdivisions && (
                <PodsSubdivisionFilter
                  subdivisions={BRAND_SUBDIVISIONS[selectedBrand]}
                  selected={subdivision}
                  onSelect={setSubdivision}
                />
              )}
              {/* Información de productos */}
              <div className="flex justify-end items-center mb-6">
                <div className="text-sm text-gray-600">
                  Mostrando {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} de {filteredProducts.length} productos
                </div>
              </div>

              {/* Vista de tarjetas con paginación */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
                {currentPageProducts.map((product) => (
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

              {/* Paginación */}
              {filteredProducts.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <VapeDisclaimer />
    </div>
  );
};

export default Vapes;
