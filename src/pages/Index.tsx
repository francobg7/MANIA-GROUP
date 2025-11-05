import HeroSlider from "@/components/HeroSlider";
import CategorySection from "@/components/CategorySection";
import { BrandMarquee, SectionDivider, ImageMosaic, BannerImage } from "@/components";
import { celulares } from "@/data/celulares";
import { pods } from "@/data/pods";
import { perfumes } from "@/data/perfumes";

const Index = () => {
  // Función para extraer el número del modelo de iPhone
  const getiPhoneModel = (name: string): number | null => {
    const match = name.match(/iPhone\s+(\d+)/i);
    return match ? parseInt(match[1], 10) : null;
  };

  // Función para extraer el color del nombre del producto
  const getColor = (name: string): string | null => {
    // El color es la última palabra del nombre
    const words = name.trim().split(/\s+/);
    return words.length > 0 ? words[words.length - 1].toLowerCase() : null;
  };

  // Ordenar celulares para priorizar Orange sobre Silver (especialmente modelo 17)
  const sortedCelulares = [...celulares].sort((a, b) => {
    const aColor = getColor(a.name);
    const bColor = getColor(b.name);
    const aModel = getiPhoneModel(a.name);
    const bModel = getiPhoneModel(b.name);
    
    // Priorizar Orange del modelo 17
    if (aColor === "orange" && aModel === 17 && bColor === "silver" && bModel === 17) return -1;
    if (bColor === "orange" && bModel === 17 && aColor === "silver" && aModel === 17) return 1;
    
    // Priorizar Orange en general sobre Silver
    if (aColor === "orange" && bColor === "silver") return -1;
    if (bColor === "orange" && aColor === "silver") return 1;
    
    return 0;
  });

  // Seleccionar 5 celulares con modelos y colores diferentes
  const celularesDestacados = sortedCelulares.reduce((acc, celular) => {
    if (acc.length >= 5) return acc;
    
    const model = getiPhoneModel(celular.name);
    const color = getColor(celular.name);
    
    if (model && color) {
      // Verificar que el modelo y el color sean únicos
      const modelExists = acc.some((c) => getiPhoneModel(c.name) === model);
      const colorExists = acc.some((c) => getColor(c.name) === color);
      
      if (!modelExists && !colorExists) {
        acc.push(celular);
      }
    }
    
    return acc;
  }, [] as typeof celulares);

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
        
        <BannerImage src="/images/banner.jpg" />
        
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
