import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { formatUSD } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { useEffect } from "react";

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [cart.length]);

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let message = " *Pedido desde MANIA GROUP*\n\n";
    
    cart.forEach((item) => {
      message += ` - *${item.name}*\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio: ${formatUSD(item.price)}\n`;
      message += `   Subtotal: ${formatUSD(item.price * item.quantity)}\n\n`;
    });

    message += ` *Total: ${formatUSD(getTotalPrice())}*`;

    const whatsappUrl = `https://wa.me/595993070659?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (cart.length === 0) {
    return (
      <>
        <SEO
          title="Carrito de Compras - MANIA GROUP"
          description="Tu carrito de compras en MANIA GROUP"
          robots="noindex,nofollow"
          url="/carrito"
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
            <h2 className="text-3xl font-bold mb-2">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">
              Agrega productos para comenzar tu compra
            </p>
            <Link to="/">
              <Button size="lg">Ir a la tienda</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Carrito de Compras - MANIA GROUP"
        description="Tu carrito de compras en MANIA GROUP"
        robots="noindex,nofollow"
        url="/carrito"
      />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-2 sm:px-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold break-words">Carrito de Compras</h1>
            <Button variant="outline" onClick={clearCart} className="w-full sm:w-auto">
              Vaciar carrito
            </Button>
          </div>

          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-2 sm:p-4">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-stretch">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded mx-auto sm:mx-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h3 className="font-semibold text-base sm:text-lg mb-1 break-words line-clamp-2">{item.name}</h3>
                      <p className="text-lg sm:text-xl font-bold">{formatUSD(item.price)}</p>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2 sm:gap-0 w-full sm:w-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="order-2 sm:order-1"
                      >
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                      <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value) || 1)
                          }
                          className="w-12 sm:w-16 text-center text-xs sm:text-base"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-base sm:text-lg font-semibold order-3 sm:order-3 whitespace-nowrap">{formatUSD(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-6">
                <span className="text-xl sm:text-2xl font-bold">Total:</span>
                <span className="text-2xl sm:text-3xl font-bold">{formatUSD(getTotalPrice())}</span>
              </div>
              <Button
                size="lg"
                className="w-full"
                onClick={handleWhatsAppOrder}
              >
                Enviar pedido por WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Carrito;
