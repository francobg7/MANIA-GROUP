import HeroSlider from "@/components/HeroSlider";
import CategorySection from "@/components/CategorySection";
import { BrandMarquee, SectionDivider, ImageMosaic } from "@/components";
import { products } from "@/data/products";

const Index = () => {
  const celulares = products.filter((p) => p.category === "celulares").slice(0, 5);
  const vapes = products.filter((p) => p.category === "vapes").slice(0, 5);
  const perfumes = products.filter((p) => p.category === "perfumes").slice(0, 5);

  return (
    <div className="min-h-screen">
      <HeroSlider />
      
      <BrandMarquee />
      
      <div className="py-8">
        <CategorySection
          title="Celulares Destacados"
          products={celulares}
          viewMoreLink="/celulares"
        />
        
        <SectionDivider />
        
        <CategorySection
          title="Vapes Premium"
          products={vapes}
          viewMoreLink="/vapes"
        />
        
        <SectionDivider />
        
        <CategorySection
          title="Perfumes Exclusivos"
          products={perfumes}
          viewMoreLink="/perfumes"
        />
      </div>

      <ImageMosaic />
    </div>
  );
};

export default Index;
