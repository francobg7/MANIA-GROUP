import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/contexts/CartContext";

interface CategorySectionProps {
  title: string;
  products: Product[];
  viewMoreLink: string;
}

const CategorySection = ({ title, products, viewMoreLink }: CategorySectionProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          <Link to={viewMoreLink}>
            <Button variant="outline" className="group">
              Ver más
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 smooth-transition" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 items-stretch">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
