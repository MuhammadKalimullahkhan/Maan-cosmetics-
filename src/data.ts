import { Product } from './types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Eternal Glow Serum',
    description: 'A transformative blend of pure vitamin C and hyaluronic acids for instant radiance and long-term hydration.',
    price: 85,
    category: 'Skincare',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2574&auto=format&fit=crop'],
    ingredients: 'Vitamin C, Hyaluronic Acid, Vitamin E',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-2',
    name: 'Silk Velvet Tincture',
    description: 'A high-impact liquid lipstick with a feather-light feel. Dries to a weightless, transfer-proof velvet finish.',
    price: 32,
    category: 'Makeup',
    stock: 120,
    images: ['https://images.unsplash.com/photo-1586773860418-d37222d8fce2?q=80&w=2673&auto=format&fit=crop'],
    ingredients: 'Silicones, Pure Pigments, Castor Oil',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-3',
    name: 'Lunar Night Balm',
    description: 'Deeply restorative overnight treatment that repairs the skin barrier while you sleep.',
    price: 68,
    category: 'Skincare',
    stock: 45,
    images: ['https://images.unsplash.com/photo-1622325357954-4a475a894a4c?q=80&w=2574&auto=format&fit=crop'],
    ingredients: 'Ceramides, Niacinamide, Squalane',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-4',
    name: 'Celestial Lash Mineral',
    description: 'Volumizing mascara infused with minerals to strengthen and lengthen without clumping.',
    price: 28,
    category: 'Makeup',
    stock: 200,
    images: ['https://images.unsplash.com/photo-1631730486572-226d1f595b68?q=80&w=2575&auto=format&fit=crop'],
    ingredients: 'Iron Oxides, Beeswax, Carnauba Wax',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
