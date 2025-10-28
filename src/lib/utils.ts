import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a number as USD with Spanish-style separators and the custom prefix
// Example: 1695 => "U$ 1.695,00"
export function formatUSD(value: number): string {
  const formatted = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return `U$ ${formatted}`;
}
