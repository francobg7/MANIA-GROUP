import { Product } from "@/contexts/CartContext";
import VapeBrandCard from "./VapeBrandCard";
import BlackSheepGroup from "./BlackSheepGroup";
import ElfBarGroup from "./ElfBarGroup";
import GeekBarGroup from "./GeekBarGroup";

interface VapeBrandsGridProps {
  products: Product[];
}

const VapeBrandsGrid = ({ products }: VapeBrandsGridProps) => {
  // Separar productos de Black Sheep, Elf Bar y Geek Bar de los demás
  const blackSheepProducts = products.filter((p) => p.brand === "Black Sheep");
  const elfBarProducts = products.filter((p) => p.brand === "Elf Bar");
  const geekBarProducts = products.filter((p) => p.brand === "Geek Bar");
  
  // Obtener productos que NO son de Black Sheep, Elf Bar ni Geek Bar
  const otherProducts = products.filter(
    (p) => p.brand !== "Black Sheep" && p.brand !== "Elf Bar" && p.brand !== "Geek Bar"
  );

  // Agrupar productos por marca (excluyendo Black Sheep, Elf Bar y Geek Bar)
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
          
          {/* Renderizar Geek Bar como grupo unificado si tiene productos */}
          {geekBarProducts.length > 0 && (
            <GeekBarGroup products={geekBarProducts} />
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

