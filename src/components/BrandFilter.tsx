import { Button } from "@/components/ui/button";
import { Product } from "@/contexts/CartContext";
import { ChevronRight } from "lucide-react";

interface BrandFilterProps {
  products: Product[];
  selectedBrand: string | null;
  onBrandSelect: (brand: string | null) => void;
  showAppleSubmenu?: boolean;
  selectedSeries?: string | null;
  onSeriesSelect?: (series: string | null) => void;
}

const BrandFilter = ({ 
  products, 
  selectedBrand, 
  onBrandSelect,
  showAppleSubmenu = false,
  selectedSeries = null,
  onSeriesSelect
}: BrandFilterProps) => {
  // Extraer marcas únicas de los productos, excluyendo marcas sin stock
  const excludedBrands = ["Google", "Motorola", "OnePlus"];
  const brands = Array.from(
    new Set(products.map((p) => p.brand).filter((b) => !excludedBrands.includes(b)))
  ).sort();

  // Si showAppleSubmenu está activado, solo mostrar las marcas principales
  const mainBrands = showAppleSubmenu 
    ? ["Apple", "Samsung", "Xiaomi", "Redmi", "Poco"]
    : brands;

  return (
    <div className="bg-card rounded-lg p-6 border border-border h-fit sticky top-4">
      <h3 className="text-lg font-semibold mb-4">Filtrar por Marca</h3>
      <div className="space-y-2">
        <Button
          variant={selectedBrand === null ? "default" : "outline"}
          className="w-full justify-start"
          onClick={() => {
            onBrandSelect(null);
            if (onSeriesSelect) onSeriesSelect(null);
          }}
        >
          Todas las marcas
        </Button>
        {mainBrands.map((brand) => (
          <div key={brand} className="relative">
            <Button
              variant={selectedBrand === brand ? "default" : "outline"}
              className="w-full justify-between"
              onClick={() => {
                if (brand === "Apple" && showAppleSubmenu) {
                  onBrandSelect(brand);
                } else {
                  onBrandSelect(brand);
                  if (onSeriesSelect) onSeriesSelect(null);
                }
              }}
            >
              <span>{brand}</span>
              {brand === "Apple" && showAppleSubmenu && (
                <ChevronRight 
                  className={`h-4 w-4 transition-transform duration-200 ${
                    selectedBrand === "Apple" ? "rotate-90" : ""
                  }`}
                />
              )}
            </Button>
            {brand === "Apple" && showAppleSubmenu && selectedBrand === "Apple" && (
              <div className="mt-2 ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out animate-in slide-in-from-left-2 fade-in-0">
                {[17, 16, 15, 14, 13, 12, 11].map((series) => (
                  <Button
                    key={series}
                    variant={selectedSeries === series.toString() ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm transition-all"
                    onClick={() => {
                      if (onSeriesSelect) {
                        onSeriesSelect(selectedSeries === series.toString() ? null : series.toString());
                      }
                    }}
                  >
                    iPhone {series}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
