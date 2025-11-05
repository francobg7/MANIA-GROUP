import { Product } from "@/contexts/CartContext";
import Geekbar25K from "./Geekbar25K";
import GeekbarZ35K from "./GeekbarZ35K";

interface GeekBarGroupProps {
  products: Product[];
}

const GeekBarGroup = ({ products }: GeekBarGroupProps) => {
  // Separar productos por línea basándose en el nombre
  const geekbar25KProducts = products.filter(
    (p) => (p.name.includes("25K") || p.name.includes("25000")) && !p.name.includes("Z35K")
  );
  const geekbarZ35KProducts = products.filter((p) => p.name.includes("Z35K"));

  return (
    <section className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mb-8">
      {/* Header con título de la marca */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4">
        <h2 className="text-2xl md:text-3xl font-bold">Geek Bar</h2>
        <p className="text-sm text-gray-300 mt-1">
          {products.length} {products.length === 1 ? "modelo disponible" : "modelos disponibles"}
        </p>
      </div>

      {/* Contenido: Los 2 subcomponentes sin header propio */}
      <div className="space-y-0">
        {geekbar25KProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">GEEKBAR 25K</h3>
              <p className="text-xs text-gray-300 mt-1">
                {geekbar25KProducts.length} {geekbar25KProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <Geekbar25K products={geekbar25KProducts} hideHeader={true} />
            </div>
          </div>
        )}
        {geekbarZ35KProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">GEEKBAR Z35K</h3>
              <p className="text-xs text-gray-300 mt-1">
                {geekbarZ35KProducts.length} {geekbarZ35KProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <GeekbarZ35K products={geekbarZ35KProducts} hideHeader={true} />
          </div>
        )}
      </div>
    </section>
  );
};

export default GeekBarGroup;

