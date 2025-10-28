const brands = [
  { name: 'Apple', logo: '🍎' },
  { name: 'Samsung', logo: '📱' },
  { name: 'Sony', logo: '🎧' },
  { name: 'Xiaomi', logo: '✨' },
  { name: 'Google', logo: '🔍' },
  { name: 'JBL', logo: '🔊' },
  { name: 'Beats', logo: '🎵' },
  { name: 'Chanel', logo: '💎' },
  { name: 'Dior', logo: '🌟' },
  { name: 'Versace', logo: '👑' },
];

const BrandMarquee = () => {
  return (
    <section className="py-6 border-y bg-muted/30">
      <div className="overflow-hidden">
        <div className="marquee flex items-center gap-10 opacity-70 hover:opacity-100">
          {[...brands, ...brands].map((b, i) => (
            <div key={`${b.name}-${i}`} className="flex items-center gap-2 text-lg whitespace-nowrap">
              <span className="text-xl">{b.logo}</span>
              <span className="font-semibold">{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;


