import { Product } from "@/contexts/CartContext";
import VapeBrandCard from "./VapeBrandCard";

interface VapeBrandsGridProps {
  products: Product[];
}

const VapeBrandsGrid = ({ products }: VapeBrandsGridProps) => {
  // Agrupar productos por marca
  const productsByBrand = products.reduce((acc, product) => {
    const brand = product.brand;
    if (!acc[brand]) {
      acc[brand] = [];
    }
    acc[brand].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Ordenar marcas alfabéticamente
  const brands = Object.keys(productsByBrand).sort();

  return (
    <div className="w-full">
      <div className="w-full px-4 py-6">
        <div className="space-y-8">
          {brands.map((brand) => (
            <VapeBrandCard
              key={brand}
              brand={brand}
              products={productsByBrand[brand]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VapeBrandsGrid;

