import { Product } from "@/contexts/CartContext";
import VapeBrandCard from "./VapeBrandCard";
import BlackSheepGroup from "./BlackSheepGroup";
import ElfBarGroup from "./ElfBarGroup";

interface VapeBrandsGridProps {
  products: Product[];
}

const VapeBrandsGrid = ({ products }: VapeBrandsGridProps) => {
  // Separar productos de Black Sheep y Elf Bar de los demás
  const blackSheepProducts = products.filter((p) => p.brand === "Black Sheep");
  const elfBarProducts = products.filter((p) => p.brand === "Elf Bar");
  
  // Obtener productos que NO son de Black Sheep ni Elf Bar
  const otherProducts = products.filter(
    (p) => p.brand !== "Black Sheep" && p.brand !== "Elf Bar"
  );

  // Agrupar productos por marca (excluyendo Black Sheep y Elf Bar)
  const productsByBrand = otherProducts.reduce((acc, product) => {
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
          {/* Renderizar Black Sheep como grupo unificado si tiene productos */}
          {blackSheepProducts.length > 0 && (
            <BlackSheepGroup products={blackSheepProducts} />
          )}
          
          {/* Renderizar Elf Bar como grupo unificado si tiene productos */}
          {elfBarProducts.length > 0 && (
            <ElfBarGroup products={elfBarProducts} />
          )}
          
          {/* Renderizar demás marcas */}
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

