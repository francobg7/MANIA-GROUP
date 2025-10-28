import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import BrandFilter from "@/components/BrandFilter";
import { products } from "@/data/products";

const Perfumes = () => {
  const perfumes = products.filter((p) => p.category === "perfumes");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredProducts = selectedBrand
    ? perfumes.filter((p) => p.brand === selectedBrand)
    : perfumes;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Perfumes</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Fragancias exclusivas de las mejores marcas del mundo
        </p>
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-64 shrink-0">
            <BrandFilter
              products={perfumes}
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
  );
};

export default Perfumes;
