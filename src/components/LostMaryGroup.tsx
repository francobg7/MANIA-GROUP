import { Product } from "@/contexts/CartContext";
import LostMaryDura35K from "./LostMaryDura35K";
import LostMaryMixer30K from "./LostMaryMixer30K";
import LostMaryMO20KMega from "./LostMaryMO20KMega";
import LostMaryMT35K from "./LostMaryMT35K";

interface LostMaryGroupProps {
  products: Product[];
}

const LostMaryGroup = ({ products }: LostMaryGroupProps) => {
  // Separar productos por línea basándose en el nombre
  // DURA 35K: debe contener "DURA 35K"
  const lostMaryDura35KProducts = products.filter((p) => p.name.includes("DURA 35K"));
  // MIXER 30K: debe contener "MIXER 30K"
  const lostMaryMixer30KProducts = products.filter((p) => p.name.includes("MIXER 30K"));
  // MO 20K MEGA: debe contener "MO 20K MEGA"
  const lostMaryMO20KMegaProducts = products.filter((p) => p.name.includes("MO 20K MEGA"));
  // MT 35K: debe contener "MT 35K"
  const lostMaryMT35KProducts = products.filter((p) => p.name.includes("MT 35K"));

  return (
    <section className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mb-8">
      {/* Header con título de la marca */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4">
        <h2 className="text-2xl md:text-3xl font-bold">LOST MARY</h2>
        <p className="text-sm text-gray-300 mt-1">
          {products.length} {products.length === 1 ? "modelo disponible" : "modelos disponibles"}
        </p>
      </div>

      {/* Contenido: Los 4 subcomponentes sin header propio */}
      <div className="space-y-0">
        {lostMaryDura35KProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">LOST MARY DURA 35K</h3>
              <p className="text-xs text-gray-300 mt-1">
                {lostMaryDura35KProducts.length} {lostMaryDura35KProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <LostMaryDura35K products={lostMaryDura35KProducts} hideHeader={true} />
            </div>
          </div>
        )}
        {lostMaryMixer30KProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">LOST MARY MIXER 30K</h3>
              <p className="text-xs text-gray-300 mt-1">
                {lostMaryMixer30KProducts.length} {lostMaryMixer30KProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <LostMaryMixer30K products={lostMaryMixer30KProducts} hideHeader={true} />
            </div>
          </div>
        )}
        {lostMaryMO20KMegaProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">LOST MARY MO 20K MEGA</h3>
              <p className="text-xs text-gray-300 mt-1">
                {lostMaryMO20KMegaProducts.length} {lostMaryMO20KMegaProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <LostMaryMO20KMega products={lostMaryMO20KMegaProducts} hideHeader={true} />
            </div>
          </div>
        )}
        {lostMaryMT35KProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">LOST MARY MT 35K</h3>
              <p className="text-xs text-gray-300 mt-1">
                {lostMaryMT35KProducts.length} {lostMaryMT35KProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <LostMaryMT35K products={lostMaryMT35KProducts} hideHeader={true} />
          </div>
        )}
      </div>
    </section>
  );
};

export default LostMaryGroup;

