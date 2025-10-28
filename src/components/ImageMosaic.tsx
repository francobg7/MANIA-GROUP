const images = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
  'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80',
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
  'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
  'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
];

const ImageMosaic = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h3 className="text-2xl md:text-3xl font-bold mb-6">Tendencias de la semana</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((src, idx) => (
          <div key={idx} className={`relative overflow-hidden rounded-lg aspect-[4/3] ${idx === 0 ? 'md:col-span-2 md:row-span-2 aspect-[16/9]' : ''}`}>
            <img src={src} alt="destacado" className="w-full h-full object-cover hover:scale-110 smooth-transition" />
            <div className="absolute inset-0 ring-1 ring-black/5" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageMosaic;


