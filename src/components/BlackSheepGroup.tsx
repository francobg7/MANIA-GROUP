import { Product } from "@/contexts/CartContext";
import BlackSheep15K from "./BlackSheep15K";
import BlackSheep30K from "./BlackSheep30K";
import BlackSheep40K from "./BlackSheep40K";

interface BlackSheepGroupProps {
  products: Product[];
}

const BlackSheepGroup = ({ products }: BlackSheepGroupProps) => {
  // Separar productos por línea (15K, 30K, 40K) basándose en el nombre
  const blackSheep15KProducts = products.filter((p) => p.name.includes("15K"));
  const blackSheep30KProducts = products.filter((p) => p.name.includes("30K"));
  const blackSheep40KProducts = products.filter((p) => p.name.includes("40K"));

  return (
    <section className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mb-8">
      {/* Header con título de la marca */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4">
        <h2 className="text-2xl md:text-3xl font-bold">Black Sheep</h2>
        <p className="text-sm text-gray-300 mt-1">
          {products.length} {products.length === 1 ? "modelo disponible" : "modelos disponibles"}
        </p>
      </div>

      {/* Contenido: Los 3 subcomponentes sin header propio */}
      <div className="space-y-0">
        {blackSheep15KProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">BLACK SHEEP 15K</h3>
              <p className="text-xs text-gray-300 mt-1">
                {blackSheep15KProducts.length} {blackSheep15KProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <BlackSheep15K products={blackSheep15KProducts} hideHeader={true} />
            </div>
          </div>
        )}
        {blackSheep30KProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">BLACK SHEEP 30K</h3>
              <p className="text-xs text-gray-300 mt-1">
                {blackSheep30KProducts.length} {blackSheep30KProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <BlackSheep30K products={blackSheep30KProducts} hideHeader={true} />
            </div>
          </div>
        )}
        {blackSheep40KProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">BLACK SHEEP 40K</h3>
              <p className="text-xs text-gray-300 mt-1">
                {blackSheep40KProducts.length} {blackSheep40KProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <BlackSheep40K products={blackSheep40KProducts} hideHeader={true} />
          </div>
        )}
      </div>
    </section>
  );
};

export default BlackSheepGroup;

