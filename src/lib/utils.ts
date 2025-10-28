import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a number as USD with Spanish-style separators and the custom prefix
// Example: 1695 => "U$ 1.695,00" or 1355 => "U$ 1.355,00"
export function formatUSD(value: number): string {
  // Convert to proper USD format (divide by 100 if it looks like cents)
  const usdValue = value > 10000 ? value / 100 : value;
  
  const formatted = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(usdValue);
  return `U$ ${formatted}`;
}
