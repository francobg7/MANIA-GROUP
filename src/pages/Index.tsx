import HeroSlider from "@/components/HeroSlider";
import CategorySection from "@/components/CategorySection";
import { BrandMarquee, SectionDivider, ImageMosaic } from "@/components";
import { products } from "@/data/products";

const Index = () => {
  const celulares = products.filter((p) => p.category === "celulares").slice(0, 5);
  const vapesPremium = ["Ignite", "Elf Bar", "Life Pod", "Lost Mary", "Geek Bar"]
    .map((brand) => products.find((p) => p.category === "vapes" && p.brand === brand && p.image))
    .filter(Boolean) as typeof products;
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
          products={vapesPremium}
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
