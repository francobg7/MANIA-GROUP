import { MapPin, CreditCard, ShieldCheck, Headphones, CheckCircle2, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      {/* Top feature strip */}
      <div className="border-b border-primary-foreground/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 text-center md:text-left">
            <div className="flex items-start md:items-center gap-3 md:gap-4 justify-center md:justify-start">
              <CreditCard className="h-7 w-7" />
              <div>
                <p className="text-lg font-semibold">Aceptamos tarjetas</p>
                <p className="text-sm text-primary-foreground/70">Varias formas de pago: tarjetas, PIX, cripto.</p>
              </div>
            </div>
            <div className="flex items-start md:items-center gap-3 md:gap-4 justify-center md:justify-start">
              <ShieldCheck className="h-7 w-7 text-green-400" />
              <div>
                <p className="text-lg font-semibold">Tienda confiable</p>
                <p className="text-sm text-primary-foreground/70">Tradición y precios justos en MANIA GROUP.</p>
              </div>
            </div>
            <div className="flex items-start md:items-center gap-3 md:gap-4 justify-center md:justify-start">
              <Headphones className="h-7 w-7" />
              <div>
                <p className="text-lg font-semibold">Atención personalizada</p>
                <p className="text-sm text-primary-foreground/70">Consultas por WhatsApp con nuestro equipo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <img
                src="/images/logos/logo-blanco.png"
                alt="MANIA GROUP"
                className="h-24 md:h-28 w-auto"
              />
            </div>
            <p className="text-primary-foreground/80 text-sm max-w-sm">
              Loja especializada em Eletrônicos, Celulares e Equipamentos de Som e Imagem.
            </p>
            <div className="mt-4 space-y-1 text-primary-foreground/75 text-sm">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Ciudad del Este - PY</p>
              <p>Horário: Seg a Sáb · 9:00 às 20:00</p>
            </div>
          </div>

          {/* Informações */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Informações</h4>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Quem Somos</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Aceitamos PIX</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Contato</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Nossas Lojas</li>
            </ul>
          </div>

          {/* Distribuidor Oficial */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Distribuidor Oficial</h4>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li>APPLE</li>
              <li>XIAOMI</li>
              <li>SONY</li>
              <li>JBL</li>
              <li>VAPENGIN</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Junte-se ao nosso boletim</h4>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Receba atualizações por e-mail sobre nossas ofertas especiais.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/60" />
                <Input placeholder="Seu e-mail" className="pl-9 bg-background text-foreground" />
              </div>
              <Button className="shrink-0">Inscrever-se</Button>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-12 border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <span className="px-3 py-1 rounded-full bg-primary-foreground/10 text-sm">PIX</span>
            <span className="px-3 py-1 rounded-full bg-primary-foreground/10 text-sm">USDT</span>
            <span className="px-3 py-1 rounded-full bg-primary-foreground/10 text-sm">Bitcoin</span>
            <span className="px-3 py-1 rounded-full bg-primary-foreground/10 text-sm">R$ Real</span>
            <span className="px-3 py-1 rounded-full bg-primary-foreground/10 text-sm">$ Dólar</span>
            <span className="px-3 py-1 rounded-full bg-primary-foreground/10 text-sm">Gs Guaranies</span>
          </div>

          <p className="text-center text-primary-foreground/60 text-sm mt-6">
            Copyright © {new Date().getFullYear()} MANIA GROUP. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
