/** Fictional catalog for this demonstration fixture. */
export interface Product {
  id: string;
  name: string;
  priceCents: number;
  category: 'outerwear' | 'footwear' | 'accessories';
  rating: number;
}

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Ridgeline Shell', priceCents: 18900, category: 'outerwear', rating: 4.6 },
  { id: 'p2', name: 'Switchback Boot', priceCents: 15400, category: 'footwear', rating: 4.4 },
  { id: 'p3', name: 'Cascade Beanie', priceCents: 3200, category: 'accessories', rating: 4.8 },
  { id: 'p4', name: 'Traverse Parka', priceCents: 24900, category: 'outerwear', rating: 4.2 },
  { id: 'p5', name: 'Contour Trail Runner', priceCents: 12800, category: 'footwear', rating: 4.5 },
  { id: 'p6', name: 'Basin Duffel', priceCents: 9800, category: 'accessories', rating: 4.1 },
];
