import { Button } from "@/components/ui/button";
import { Product } from "@/contexts/CartContext";

interface BrandFilterProps {
  products: Product[];
  selectedBrand: string | null;
  onBrandSelect: (brand: string | null) => void;
}

const BrandFilter = ({ products, selectedBrand, onBrandSelect }: BrandFilterProps) => {
  // Extraer marcas únicas de los productos, excluyendo marcas sin stock
  const excludedBrands = ["Google", "Motorola", "OnePlus"];
  const brands = Array.from(
    new Set(products.map((p) => p.brand).filter((b) => !excludedBrands.includes(b)))
  ).sort();

  return (
    <div className="bg-card rounded-lg p-6 border border-border h-fit sticky top-4">
      <h3 className="text-lg font-semibold mb-4">Filtrar por Marca</h3>
      <div className="space-y-2">
        <Button
          variant={selectedBrand === null ? "default" : "outline"}
          className="w-full justify-start"
          onClick={() => onBrandSelect(null)}
        >
          Todas las marcas
        </Button>
        {brands.map((brand) => (
          <Button
            key={brand}
            variant={selectedBrand === brand ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => onBrandSelect(brand)}
          >
            {brand}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
