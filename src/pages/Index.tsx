import HeroSlider from "@/components/HeroSlider";
import CategorySection from "@/components/CategorySection";
import { products } from "@/data/products";

const Index = () => {
  const celulares = products.filter((p) => p.category === "celulares").slice(0, 5);
  const pods = products.filter((p) => p.category === "pods").slice(0, 5);
  const perfumes = products.filter((p) => p.category === "perfumes").slice(0, 5);

  return (
    <div className="min-h-screen">
      <HeroSlider />
      
      <div className="py-8">
        <CategorySection
          title="Celulares Destacados"
          products={celulares}
          viewMoreLink="/celulares"
        />
        
        <div className="border-t border-border my-8" />
        
        <CategorySection
          title="Pods Premium"
          products={pods}
          viewMoreLink="/pods"
        />
        
        <div className="border-t border-border my-8" />
        
        <CategorySection
          title="Perfumes Exclusivos"
          products={perfumes}
          viewMoreLink="/perfumes"
        />
      </div>
    </div>
  );
};

export default Index;
