const images = [
  {
    src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    title: 'iPhone 15 Pro Max',
    description: 'El smartphone más avanzado con titanio natural y chip A17 Pro',
    price: 'U$ 12.990,00',
    category: 'Celulares'
  },
  {
    src: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80',
    title: 'AirPods Pro 2',
    description: 'Cancelación de ruido adaptativa con USB-C',
    price: 'U$ 2.490,00',
    category: 'Vapes'
  },
  {
    src: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    title: 'Dior Sauvage',
    description: 'Fragancia fresca y especiada para el hombre moderno',
    price: 'U$ 1.450,00',
    category: 'Perfumes'
  },
  {
    src: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
    title: 'Samsung Galaxy S24 Ultra',
    description: 'IA integrada y cámara profesional de 200MP',
    price: 'U$ 11.990,00',
    category: 'Celulares'
  },
  {
    src: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    title: 'YSL Y Eau de Parfum',
    description: 'Fragancia intensa y fresca para ocasiones especiales',
    price: 'U$ 1.390,00',
    category: 'Perfumes'
  },
  {
    src: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    title: 'Sony WF-1000XM5',
    description: 'Los mejores auriculares con cancelación de ruido',
    price: 'U$ 2.990,00',
    category: 'Vapes'
  },
];

const ImageMosaic = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h3 className="text-2xl md:text-3xl font-bold mb-6">Tendencias de la semana</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((item, idx) => (
          <div key={idx} className={`group relative overflow-hidden rounded-lg aspect-[4/3] ${idx === 0 ? 'md:col-span-2 md:row-span-2 aspect-[16/9]' : ''}`}>
            <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 smooth-transition" />
            <div className="absolute inset-0 ring-1 ring-black/5" />
            
            {/* Overlay con información */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 smooth-transition flex flex-col justify-end p-4">
              <div className="transform translate-y-4 group-hover:translate-y-0 smooth-transition">
                <span className="inline-block px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded mb-2">
                  {item.category}
                </span>
                <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-white/90 text-sm mb-2 line-clamp-2">{item.description}</p>
                <p className="text-white font-semibold text-lg">{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageMosaic;


