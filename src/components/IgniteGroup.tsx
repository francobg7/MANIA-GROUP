import { Product } from "@/contexts/CartContext";
import IgniteV15 from "./IgniteV15";
import IgniteV80 from "./IgniteV80";
import IgniteV120 from "./IgniteV120";
import IgniteV150 from "./IgniteV150";
import IgniteV250 from "./IgniteV250";
import IgniteV300 from "./IgniteV300";
import IgniteV400 from "./IgniteV400";

interface IgniteGroupProps {
  products: Product[];
}

const IgniteGroup = ({ products }: IgniteGroupProps) => {
  // Separar productos por línea basándose en el nombre
  // V15: debe contener "V15" pero NO debe contener "V150"
  const igniteV15Products = products.filter((p) => p.name.includes("V15") && !p.name.includes("V150"));
  const igniteV80Products = products.filter((p) => p.name.includes("V80"));
  const igniteV120Products = products.filter((p) => p.name.includes("V120"));
  const igniteV150Products = products.filter((p) => p.name.includes("V150"));
  const igniteV250Products = products.filter((p) => p.name.includes("V250"));
  const igniteV300Products = products.filter((p) => p.name.includes("V300"));
  const igniteV400Products = products.filter((p) => p.name.includes("V400"));

  return (
    <section className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mb-8">
      {/* Header con título de la marca */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4">
        <h2 className="text-2xl md:text-3xl font-bold">IGNITE</h2>
        <p className="text-sm text-gray-300 mt-1">
          {products.length} {products.length === 1 ? "modelo disponible" : "modelos disponibles"}
        </p>
      </div>

      {/* Contenido: Los 4 subcomponentes sin header propio */}
      <div className="space-y-0">
        {igniteV15Products.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">IGNITE V15</h3>
              <p className="text-xs text-gray-300 mt-1">
                {igniteV15Products.length} {igniteV15Products.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <IgniteV15 products={igniteV15Products} hideHeader={true} />
            </div>
          </div>
        )}
        {igniteV80Products.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">IGNITE V80</h3>
              <p className="text-xs text-gray-300 mt-1">
                {igniteV80Products.length} {igniteV80Products.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <IgniteV80 products={igniteV80Products} hideHeader={true} />
            </div>
          </div>
        )}
        {igniteV120Products.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">IGNITE V120</h3>
              <p className="text-xs text-gray-300 mt-1">
                {igniteV120Products.length} {igniteV120Products.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <IgniteV120 products={igniteV120Products} hideHeader={true} />
            </div>
          </div>
        )}
        {igniteV150Products.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">IGNITE V150</h3>
              <p className="text-xs text-gray-300 mt-1">
                {igniteV150Products.length} {igniteV150Products.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <IgniteV150 products={igniteV150Products} hideHeader={true} />
            </div>
          </div>
        )}
        {igniteV250Products.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">IGNITE V250</h3>
              <p className="text-xs text-gray-300 mt-1">
                {igniteV250Products.length} {igniteV250Products.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <IgniteV250 products={igniteV250Products} hideHeader={true} />
            </div>
          </div>
        )}
        {igniteV300Products.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">IGNITE V300</h3>
              <p className="text-xs text-gray-300 mt-1">
                {igniteV300Products.length} {igniteV300Products.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <IgniteV300 products={igniteV300Products} hideHeader={true} />
            </div>
          </div>
        )}
        {igniteV400Products.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">IGNITE V400</h3>
              <p className="text-xs text-gray-300 mt-1">
                {igniteV400Products.length} {igniteV400Products.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <IgniteV400 products={igniteV400Products} hideHeader={true} />
          </div>
        )}
      </div>
    </section>
  );
};

export default IgniteGroup;

