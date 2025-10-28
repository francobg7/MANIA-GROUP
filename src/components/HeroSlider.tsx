import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80",
    title: "Lo último en tecnología",
    subtitle: "Descubre los mejores smartphones del mercado",
    ctaText: "VAPES",
    ctaLink: "/vapes"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=1200&q=80",
    title: "Sonido premium",
    subtitle: "Auriculares con cancelación de ruido",
    ctaText: "VAPES",
    ctaLink: "/vapes"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80",
    title: "Fragancias exclusivas",
    subtitle: "Perfumes de las mejores marcas",
    ctaText: "IPHONES",
    ctaLink: "/celulares"
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden shadow-2xl">
      {/* Background with enhanced gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            index === currentSlide 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Enhanced overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          
          {/* Content container with better positioning */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
              <div className="max-w-4xl">
                {/* Title with enhanced animation */}
                <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 md:mb-6 leading-tight transition-all duration-700 delay-200 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}>
                  {slide.title.split(' ').map((word, i) => (
                    <span 
                      key={i}
                      className={`inline-block transition-all duration-700 ${
                        index === currentSlide 
                          ? "translate-y-0 opacity-100" 
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
                </h1>
                
                {/* Subtitle */}
                <p className={`text-lg sm:text-xl md:text-2xl text-white/90 mb-6 md:mb-8 font-light leading-relaxed transition-all duration-700 delay-400 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}>
                  {slide.subtitle}
                </p>

                {/* CTA Button */}
                <Link to={slide.ctaLink}>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 transition-all duration-700"
                  >
                    {slide.ctaText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}



      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`relative overflow-hidden rounded-full transition-all duration-500 ease-out disabled:cursor-not-allowed ${
              index === currentSlide 
                ? "w-8 md:w-10 lg:w-12 h-2 md:h-3 bg-white shadow-lg" 
                : "w-2 md:w-3 h-2 md:h-3 bg-white/40 hover:bg-white/60 hover:scale-125"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-6000 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
};

export default HeroSlider;
