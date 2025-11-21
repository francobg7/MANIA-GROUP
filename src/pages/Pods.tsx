import { useState, useEffect, useRef } from "react";
import ProductCard from "@/components/ProductCard";
import BrandFilter from "@/components/BrandFilter";
import VapeDisclaimer from "@/components/VapeDisclaimer";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import Pagination from "@/components/Pagination";
import { pods } from "@/data/pods";

const Vapes = () => {
  const vapes = pods.filter(
    (p) => !["Beats", "Google", "Nothing", "Samsung", "Sony", "Xiaomi", "JBL"].includes(p.brand)
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsSectionRef = useRef<HTMLDivElement>(null);

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

  const handleVerified = () => {
    setIsVerified(true);
    setShowVerificationModal(false);
  };

  const handleDeclined = () => {
    // Redirect to homepage or external site
    window.location.href = '/';
  };

  const filteredProducts = selectedBrand
    ? vapes.filter((p) => p.brand === selectedBrand)
    : vapes;

  // Cálculos para paginación
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentPageProducts = filteredProducts.slice(startIndex, endIndex);

  // Resetear página actual cuando cambia el filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand]);

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
              {/* Información de productos */}
              <div className="flex justify-end items-center mb-6">
                <div className="text-sm text-gray-600">
                  Mostrando {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} de {filteredProducts.length} productos
                </div>
              </div>

              {/* Vista de tarjetas con paginación */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
                {currentPageProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
