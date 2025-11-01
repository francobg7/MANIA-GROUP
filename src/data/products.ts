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
