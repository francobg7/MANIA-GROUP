import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Product, useCart } from "@/contexts/CartContext";
import { formatUSD } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <Card className="overflow-hidden hover-lift group">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2 break-words">{product.name}</h3>
        <p className="text-xl sm:text-2xl font-bold">{formatUSD(product.price)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2 w-full">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="w-16 text-center"
            min="1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={handleAddToCart} className="w-full">
          <ShoppingCart className="sm:mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Agregar al carrito</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
