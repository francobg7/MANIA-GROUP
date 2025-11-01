import HeroSlider from "@/components/HeroSlider";
import CategorySection from "@/components/CategorySection";
import { BrandMarquee, SectionDivider, ImageMosaic } from "@/components";
import { celulares } from "@/data/celulares";
import { pods } from "@/data/pods";
import { perfumes } from "@/data/perfumes";

const Index = () => {
  const celularesDestacados = celulares.slice(0, 5);
  const vapesPremium = ["Ignite", "Elf Bar", "Life Pod", "Lost Mary", "Geek Bar"]
    .map((brand) => pods.find((p) => p.brand === brand && p.image))
    .filter(Boolean) as typeof pods;
  const perfumesDestacados = perfumes.slice(0, 5);

  return (
    <div className="min-h-screen">
      <HeroSlider />
      
      <BrandMarquee />
      
      <div className="py-8">
        <CategorySection
          title="Celulares Destacados"
          products={celularesDestacados}
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
          products={perfumesDestacados}
          viewMoreLink="/perfumes"
        />
      </div>

      <ImageMosaic />
    </div>
  );
};

export default Index;
