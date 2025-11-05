import { Product } from "@/contexts/CartContext";
import VapeBrandCard from "./VapeBrandCard";
import BlackSheepGroup from "./BlackSheepGroup";
import ElfBarGroup from "./ElfBarGroup";
import GeekBarGroup from "./GeekBarGroup";
import IgniteGroup from "./IgniteGroup";
import LifePodGroup from "./LifePodGroup";
import LostMaryGroup from "./LostMaryGroup";

interface VapeBrandsGridProps {
  products: Product[];
}

const VapeBrandsGrid = ({ products }: VapeBrandsGridProps) => {
  // Separar productos de Black Sheep, Elf Bar, Geek Bar, Ignite, Life Pod y Lost Mary de los demás
  const blackSheepProducts = products.filter((p) => p.brand === "Black Sheep");
  const elfBarProducts = products.filter((p) => p.brand === "Elf Bar");
  const geekBarProducts = products.filter((p) => p.brand === "Geek Bar");
  const igniteProducts = products.filter((p) => p.brand === "Ignite");
  const lifePodProducts = products.filter((p) => p.brand === "Life Pod");
  const lostMaryProducts = products.filter((p) => p.brand === "Lost Mary");
  
  // Obtener productos que NO son de Black Sheep, Elf Bar, Geek Bar, Ignite, Life Pod ni Lost Mary
  const otherProducts = products.filter(
    (p) => p.brand !== "Black Sheep" && p.brand !== "Elf Bar" && p.brand !== "Geek Bar" && p.brand !== "Ignite" && p.brand !== "Life Pod" && p.brand !== "Lost Mary"
  );

  // Agrupar productos por marca (excluyendo Black Sheep, Elf Bar, Geek Bar, Ignite, Life Pod y Lost Mary)
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
          
          {/* Renderizar Ignite como grupo unificado si tiene productos */}
          {igniteProducts.length > 0 && (
            <IgniteGroup products={igniteProducts} />
          )}
          
          {/* Renderizar Life Pod como grupo unificado si tiene productos */}
          {lifePodProducts.length > 0 && (
            <LifePodGroup products={lifePodProducts} />
          )}
          
          {/* Renderizar Lost Mary como grupo unificado si tiene productos */}
          {lostMaryProducts.length > 0 && (
            <LostMaryGroup products={lostMaryProducts} />
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

