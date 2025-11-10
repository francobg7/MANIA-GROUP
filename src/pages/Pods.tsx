import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import BrandFilter from "@/components/BrandFilter";
import VapeBrandsGrid from "@/components/VapeBrandsGrid";
import { pods } from "@/data/pods";

const Vapes = () => {
  const vapes = pods.filter(
    (p) => !["Beats", "Google", "Nothing", "Samsung", "Sony", "Xiaomi", "JBL"].includes(p.brand)
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredProducts = selectedBrand
    ? vapes.filter((p) => p.brand === selectedBrand)
    : vapes;

  // Siempre usar la vista agrupada por marcas para vapes
  const useBrandsView = true;

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
      <div className="py-12 w-full">
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
              {useBrandsView ? (
                // Vista agrupada por marcas
                <VapeBrandsGrid products={filteredProducts} />
              ) : (
                // Vista de grid tradicional para pocos productos
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  {filteredProducts.length === 0 && (
                    <p className="text-center text-muted-foreground py-12">
                      No se encontraron productos de esta marca
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vapes;
