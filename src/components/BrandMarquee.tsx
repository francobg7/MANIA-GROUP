const brands = [
  { name: 'Apple', logo: '/images/logos/apple-11.svg' },
  { name: 'Samsung', logo: '/images/logos/samsung-8.svg' },
  { name: 'Sony', logo: '/images/logos/sony-logo.png' },
  { name: 'Xiaomi', logo: '/images/logos/xiaomi-1.svg' },
  { name: 'JBL', logo: '/images/logos/jbl-logo.png' },
  { name: 'Beats', logo: '/images/logos/beats-electronics.svg' },
  { name: 'Chanel', logo: '/images/logos/chanel-2.svg' },
  { name: 'Dior', logo: '/images/logos/dior-logo.png' },
  { name: 'Versace', logo: '/images/logos/versace-logo.png' },
  { name: 'BlackSheep', logo: '/images/logos/blacksheep-logo.png' },
  { name: 'Ignite', logo: '/images/logos/ignite-logo.png' },
];

const BrandMarquee = () => {
  return (
    <section className="py-12 pt-8 md:pt-10 bg-gray-100 overflow-hidden">
      <div className="marquee flex items-center gap-12 opacity-60 hover:opacity-100 transition-opacity duration-300">
        {[...brands, ...brands].map((b, i) => (
          <div key={`${b.name}-${i}`} className="flex items-center justify-center min-w-[120px] whitespace-nowrap flex-shrink-0">
            <img
              src={b.logo}
              alt={`${b.name} logo`}
              className="h-22 w-auto max-w-[100px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;


