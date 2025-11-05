import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Product, useCart } from "@/contexts/CartContext";
import { formatUSD } from "@/lib/utils";

interface LostMaryMT35KProps {
  products: Product[];
  hideHeader?: boolean;
}

const LostMaryMT35K = ({ products, hideHeader = false }: LostMaryMT35KProps) => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    products.forEach((p) => {
      initial[p.id] = 1;
    });
    return initial;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const newValue = Math.max(1, current + delta);
      return { ...prev, [productId]: newValue };
    });
  };

  const handleQuantityInput = (productId: string, value: string) => {
    const numValue = parseInt(value) || 1;
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, numValue),
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);
  };

  return (
    <section className={`w-full ${hideHeader ? '' : 'bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mb-8'}`}>
      {!hideHeader && (
        <>
          {/* Header con título de la marca */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4">
            <h2 className="text-2xl md:text-3xl font-bold">LOST MARY MT 35K</h2>
            <p className="text-sm text-gray-300 mt-1">
              {products.length} {products.length === 1 ? "modelo disponible" : "modelos disponibles"}
            </p>
          </div>
        </>
      )}

      {/* Contenido principal: Imagen + Lista de modelos */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* Imagen principal (izquierda) */}
        <div className="w-full lg:w-1/3 xl:w-2/5 bg-gray-50 flex items-center justify-center p-6 lg:p-8 min-h-[400px] lg:min-h-[500px]">
          <div className="relative w-full max-w-md aspect-square">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-contain rounded-lg shadow-md transition-all duration-300"
            />
          </div>
        </div>

        {/* Lista de modelos (derecha) */}
        <div className="w-full lg:w-2/3 xl:w-3/5 p-4 lg:p-6 xl:p-8 bg-white">
          <div className="space-y-2 max-h-[500px] lg:max-h-[600px] overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
            {products.map((product) => {
              const quantity = quantities[product.id] || 1;
              const isSelected = selectedProduct.id === product.id;

              return (
                <div
                  key={product.id}
                  className={`
                    flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 sm:p-4 rounded-lg border-2 transition-all cursor-pointer
                    ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 shadow-md scale-[1.02]"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }
                  `}
                >
                  {/* Nombre del modelo (clickeable) */}
                  <button
                    onClick={() => handleProductClick(product)}
                    className={`
                      flex-1 text-left font-medium text-sm sm:text-base md:text-lg transition-colors w-full sm:w-auto
                      ${isSelected ? "text-blue-700 font-semibold" : "text-gray-800 hover:text-blue-600"}
                    `}
                  >
                    {product.name}
                  </button>

                  {/* Precio */}
                  <div className="text-base sm:text-lg font-bold text-gray-900 whitespace-nowrap">
                    {formatUSD(product.price)}
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center gap-1 sm:gap-2 bg-white rounded-lg border border-gray-300 p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(product.id, -1);
                      }}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityInput(product.id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 sm:w-12 text-center text-xs sm:text-sm font-medium border-0 focus:outline-none focus:ring-0"
                      min="1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(product.id, 1);
                      }}
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>

                  {/* Botón de agregar al carrito */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap text-xs sm:text-sm"
                    size="sm"
                  >
                    <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Agregar</span>
                    <span className="sm:hidden">+</span>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LostMaryMT35K;

