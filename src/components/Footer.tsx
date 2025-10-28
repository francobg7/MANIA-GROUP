import { MapPin, CreditCard } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y Descripción */}
          <div>
            <h3 className="text-2xl font-bold mb-4">MANIA GROUP</h3>
            <p className="text-primary-foreground/80 text-sm">
              Tu tienda de confianza para celulares, pods y perfumes premium.
              Calidad garantizada en todos nuestros productos.
            </p>
          </div>

          {/* Ubicación */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Ubicación
            </h4>
            <p className="text-primary-foreground/80 text-sm mb-2">
              Calle Principal #123
            </p>
            <p className="text-primary-foreground/80 text-sm mb-2">
              Centro, Ciudad
            </p>
            <p className="text-primary-foreground/80 text-sm">
              Horario: Lun - Sáb: 9:00 AM - 8:00 PM
            </p>
          </div>

          {/* Métodos de Pago */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Métodos de Pago
            </h4>
            <p className="text-primary-foreground/80 text-sm mb-3">
              Aceptamos todo tipo de pago:
            </p>
            <ul className="text-primary-foreground/80 text-sm space-y-1">
              <li>• Efectivo</li>
              <li>• Tarjetas de crédito y débito</li>
              <li>• Transferencias bancarias</li>
              <li>• Pago móvil</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} MANIA GROUP. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
