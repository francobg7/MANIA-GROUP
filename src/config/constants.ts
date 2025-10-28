// Configuration constants
export const APP_CONFIG = {
  name: 'MANIA GROUP',
  description: 'Tienda online de tecnología y perfumes',
  version: '1.0.0',
  api: {
    baseUrl: process.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },
  cart: {
    storageKey: 'maniagroup-cart',
    maxItems: 50,
  },
  ui: {
    maxSearchResults: 5,
    productsPerPage: 12,
  },
} as const;

// Route paths
export const ROUTES = {
  HOME: '/',
  CELULARES: '/celulares',
  PODS: '/pods',
  PERFUMES: '/perfumes',
  CARRITO: '/carrito',
} as const;

// Product categories
export const CATEGORIES = {
  CELULARES: 'celulares',
  PODS: 'pods',
  PERFUMES: 'perfumes',
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];
