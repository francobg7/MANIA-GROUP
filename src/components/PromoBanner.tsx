import { Sparkles, Rocket } from "lucide-react";

const PromoBanner = () => {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-16 lg:pt-20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-transparent" />
      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-primary font-semibold mb-2">
              <Sparkles className="h-4 w-4" /> Novedades de la semana
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Ofertas Flash en Tecnología y Fragancias
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Descubrí descuentos exclusivos por tiempo limitado. Envíos a todo el país.
            </p>
          </div>
          
        </div>
      </div>
      <div className="pointer-events-none absolute -right-10 -bottom-10 opacity-20">
        <Rocket className="h-40 w-40" />
      </div>
    </section>
  );
};

export default PromoBanner;


