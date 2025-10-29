import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import BrandFilter from "@/components/BrandFilter";
import { products } from "@/data/products";

const Celulares = () => {
  const celulares = products.filter((p) => p.category === "celulares");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredProducts = selectedBrand
    ? celulares.filter((p) => p.brand === selectedBrand)
    : celulares;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/iphone/ng.jpg"
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
              <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                Google Pixel 8
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="w-full lg:w-64 shrink-0">
              <BrandFilter
                products={celulares}
                selectedBrand={selectedBrand}
                onBrandSelect={setSelectedBrand}
              />
            </aside>
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
  );
};

export default Celulares;
