import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Celulares = () => {
  const celulares = products.filter((p) => p.category === "celulares");

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Celulares</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Descubre los últimos modelos de smartphones con la mejor tecnología
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {celulares.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Celulares;
