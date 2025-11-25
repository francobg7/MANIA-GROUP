import { Product } from "@/contexts/CartContext";
import { celulares } from "./celulares";
import { pods } from "./pods";
import { perfumes } from "./perfumes";

// Combina todos los productos de las categorías separadas
export const products: Product[] = [
  ...celulares,
  ...pods,
  ...perfumes,
];
// Ya que perfumes se importa y se expande, los productos de Jean Paul Gaultier ya están incluidos automáticamente si están en perfumes.ts
// No se requiere cambio adicional aquí, pero si se agregan dinámicamente, asegurarse de que perfumes esté actualizado.
