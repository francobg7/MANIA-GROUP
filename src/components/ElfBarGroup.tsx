import { Product } from "@/contexts/CartContext";
import Elfbar40K from "./Elfbar40K";
import ElfbarBC15K from "./ElfbarBC15K";
import ElfbarBC20000KTouch from "./ElfbarBC20000KTouch";
import ElfbarGH23000 from "./ElfbarGH23000";
import ElfbarTE30K from "./ElfbarTE30K";

interface ElfBarGroupProps {
  products: Product[];
}

const ElfBarGroup = ({ products }: ElfBarGroupProps) => {
  // Separar productos por línea basándose en el nombre
  // 40K: debe contener "40K" pero NO debe contener "BC", "GH", ni "TE"
  const elfbar40KProducts = products.filter(
    (p) => p.name.includes("40K") && !p.name.includes("BC") && !p.name.includes("GH") && !p.name.includes("TE")
  );
  const elfbarBC15KProducts = products.filter((p) => p.name.includes("BC 15K"));
  const elfbarBC20000KTouchProducts = products.filter((p) => p.name.includes("BC 20000K TOUCH"));
  const elfbarGH23000Products = products.filter((p) => p.name.includes("GH 23000"));
  const elfbarTE30KProducts = products.filter((p) => p.name.includes("TE 30K"));

  return (
    <section className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mb-8">
      {/* Header con título de la marca */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4">
        <h2 className="text-2xl md:text-3xl font-bold">Elf Bar</h2>
        <p className="text-sm text-gray-300 mt-1">
          {products.length} {products.length === 1 ? "modelo disponible" : "modelos disponibles"}
        </p>
      </div>

      {/* Contenido: Los 5 subcomponentes sin header propio */}
      <div className="space-y-0">
        {elfbar40KProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">ELFBAR 40K</h3>
              <p className="text-xs text-gray-300 mt-1">
                {elfbar40KProducts.length} {elfbar40KProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <Elfbar40K products={elfbar40KProducts} hideHeader={true} />
            </div>
          </div>
        )}
        {elfbarBC15KProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">ELFBAR BC 15K</h3>
              <p className="text-xs text-gray-300 mt-1">
                {elfbarBC15KProducts.length} {elfbarBC15KProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <ElfbarBC15K products={elfbarBC15KProducts} hideHeader={true} />
            </div>
          </div>
        )}
        {elfbarBC20000KTouchProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">ELFBAR BC 20000K TOUCH</h3>
              <p className="text-xs text-gray-300 mt-1">
                {elfbarBC20000KTouchProducts.length} {elfbarBC20000KTouchProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <ElfbarBC20000KTouch products={elfbarBC20000KTouchProducts} hideHeader={true} />
            </div>
          </div>
        )}
        {elfbarGH23000Products.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">ELFBAR GH 23000</h3>
              <p className="text-xs text-gray-300 mt-1">
                {elfbarGH23000Products.length} {elfbarGH23000Products.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <div className="border-b border-gray-200">
              <ElfbarGH23000 products={elfbarGH23000Products} hideHeader={true} />
            </div>
          </div>
        )}
        {elfbarTE30KProducts.length > 0 && (
          <div className="border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3">
              <h3 className="text-xl font-bold">ELFBAR TE 30K</h3>
              <p className="text-xs text-gray-300 mt-1">
                {elfbarTE30KProducts.length} {elfbarTE30KProducts.length === 1 ? "modelo disponible" : "modelos disponibles"}
              </p>
            </div>
            <ElfbarTE30K products={elfbarTE30KProducts} hideHeader={true} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ElfBarGroup;

