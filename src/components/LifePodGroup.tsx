import { Product } from "@/contexts/CartContext";
import LifePod40K from "./LifePod40K";
import LifePodEcoDevice from "./LifePodEcoDevice";
import LifePodEcoIIKit from "./LifePodEcoIIKit";
import LifePodEcoIIRefil from "./LifePodEcoIIRefil";
import LifePodEcoSKKit from "./LifePodEcoSKKit";

interface LifePodGroupProps {
  products: Product[];
}

const LifePodGroup = ({ products }: LifePodGroupProps) => {
  // Separar productos por línea basándose en el nombre
  // 40K: debe contener "40K" pero NO debe contener "ECO"
  const lifePod40KProducts = products.filter((p) => p.name.includes("40K") && !p.name.includes("ECO"));
  // ECO DEVICE: debe contener "ECO DEVICE" o "ECO II DEVICE" pero NO debe contener "KIT" ni "REFIL"
  const lifePodEcoDeviceProducts = products.filter(
    (p) => (p.name.includes("ECO DEVICE") || p.name.includes("ECO II DEVICE")) && !p.name.includes("KIT") && !p.name.includes("REFIL")
  );
  // ECO II KIT: debe contener "ECO II KIT"
  const lifePodEcoIIKitProducts = products.filter((p) => p.name.includes("ECO II KIT"));
  // ECO II REFIL: debe contener "ECO II REFIL"
  const lifePodEcoIIRefilProducts = products.filter((p) => p.name.includes("ECO II REFIL"));
  // ECO SK KIT: debe contener "ECO SK KIT"
  const lifePodEcoSKKitProducts = products.filter((p) => p.name.includes("ECO SK KIT"));

  return (
    <section className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mb-8">
      {/* Header con título de la marca */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4">
        <h2 className="text-2xl md:text-3xl font-bold">LIFE POD</h2>
        <p className="text-sm text-gray-300 mt-1">
          {products.length} {products.length === 1 ? "modelo disponible" : "modelos disponibles"}
        </p>
      </div>

      {/* Contenido: Los 5 subcomponentes sin header propio */}
      <div className="space-y-0">
        {lifePod40KProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">LIFE POD 40K</h3>
              <p className="text-xs text-gray-300 mt-1">
                {lifePod40KProducts.length} {lifePod40KProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <LifePod40K products={lifePod40KProducts} hideHeader={true} />
            </div>
          </div>
        )}
        {lifePodEcoDeviceProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">LIFE POD ECO DEVICE</h3>
              <p className="text-xs text-gray-300 mt-1">
                {lifePodEcoDeviceProducts.length} {lifePodEcoDeviceProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <LifePodEcoDevice products={lifePodEcoDeviceProducts} hideHeader={true} />
            </div>
          </div>
        )}
        {lifePodEcoIIKitProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">LIFE POD ECO II KIT</h3>
              <p className="text-xs text-gray-300 mt-1">
                {lifePodEcoIIKitProducts.length} {lifePodEcoIIKitProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <LifePodEcoIIKit products={lifePodEcoIIKitProducts} hideHeader={true} />
            </div>
          </div>
        )}
        {lifePodEcoIIRefilProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">LIFE POD ECO II REFIL</h3>
              <p className="text-xs text-gray-300 mt-1">
                {lifePodEcoIIRefilProducts.length} {lifePodEcoIIRefilProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <LifePodEcoIIRefil products={lifePodEcoIIRefilProducts} hideHeader={true} />
            </div>
          </div>
        )}
        {lifePodEcoSKKitProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">LIFE POD ECO SK KIT</h3>
              <p className="text-xs text-gray-300 mt-1">
                {lifePodEcoSKKitProducts.length} {lifePodEcoSKKitProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <LifePodEcoSKKit products={lifePodEcoSKKitProducts} hideHeader={true} />
          </div>
        )}
      </div>
    </section>
  );
};

export default LifePodGroup;

