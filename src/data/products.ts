/** Fictional catalog for this demonstration fixture. */
export type Category = 'outerwear' | 'footwear' | 'accessories';

export interface Product {
  id: string;
  name: string;
  /** Short shelf-edge description shown under the product name. */
  blurb: string;
  colorway: string;
  priceCents: number;
  /** Original price, present only while the product is marked down. */
  compareAtCents?: number;
  category: Category;
  rating: number;
  reviewCount: number;
  /** Units on hand; drives the low-stock note on the card. */
  stock: number;
  badge?: 'new' | 'bestseller';
  image: string;
}

const photo = (id: string, w = 900, framing = '') =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85${framing}`;

/** Frames the shot on the product rather than the model. */
const CLOSE_ON_HAT = '&crop=focalpoint&fp-x=0.42&fp-y=0.30&fp-z=2.4';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Ridgeline Shell',
    blurb: 'Three-layer waterproof shell with taped seams.',
    colorway: 'Ember',
    priceCents: 18900,
    category: 'outerwear',
    rating: 4.6,
    reviewCount: 214,
    stock: 18,
    badge: 'bestseller',
    image: photo('1591047139829-d91aecb6caea'),
  },
  {
    id: 'p2',
    name: 'Switchback Boot',
    blurb: 'Waxed suede over a resoleable Vibram outsole.',
    colorway: 'Olive',
    priceCents: 15400,
    compareAtCents: 19800,
    category: 'footwear',
    rating: 4.4,
    reviewCount: 168,
    stock: 4,
    image: photo('1605812860427-4024433a70fd'),
  },
  {
    id: 'p3',
    name: 'Cascade Beanie',
    blurb: 'Rib-knit merino with a folded double cuff.',
    colorway: 'Charcoal',
    priceCents: 3200,
    category: 'accessories',
    rating: 4.8,
    reviewCount: 412,
    stock: 60,
    badge: 'bestseller',
    image: photo('1571945153237-4929e783af4a', 900, CLOSE_ON_HAT),
  },
  {
    id: 'p4',
    name: 'Traverse Parka',
    blurb: 'Recycled down, storm hood, thigh-length cut.',
    colorway: 'Camel',
    priceCents: 24900,
    category: 'outerwear',
    rating: 4.2,
    reviewCount: 96,
    stock: 11,
    image: photo('1539533113208-f6df8cc8b543'),
  },
  {
    id: 'p5',
    name: 'Contour Trail Runner',
    blurb: 'Knit upper, 6mm drop, rock plate underfoot.',
    colorway: 'Fog',
    priceCents: 12800,
    category: 'footwear',
    rating: 4.5,
    reviewCount: 302,
    stock: 27,
    badge: 'new',
    image: photo('1562183241-b937e95585b6'),
  },
  {
    id: 'p6',
    name: 'Basin Duffel',
    blurb: '45L haul bag that converts to a backpack.',
    colorway: 'Spruce',
    priceCents: 9800,
    category: 'accessories',
    rating: 4.1,
    reviewCount: 74,
    stock: 9,
    image: photo('1622260614153-03223fb72052'),
  },
  {
    id: 'p7',
    name: 'Kestrel Windbreaker',
    blurb: 'Packs into its own chest pocket at 240g.',
    colorway: 'Black',
    priceCents: 13800,
    compareAtCents: 16500,
    category: 'outerwear',
    rating: 4.3,
    reviewCount: 131,
    stock: 22,
    image: photo('1578681994506-b8f463449011'),
  },
  {
    id: 'p8',
    name: 'Fieldstone Boot',
    blurb: 'Full-grain leather, Goodyear welted, resoleable.',
    colorway: 'Walnut',
    priceCents: 19800,
    category: 'footwear',
    rating: 4.7,
    reviewCount: 188,
    stock: 6,
    badge: 'bestseller',
    image: photo('1608256246200-53e635b5b65f'),
  },
  {
    id: 'p9',
    name: 'Wayfinder Daypack',
    blurb: '22L with a padded sleeve and roll-top closure.',
    colorway: 'Ash',
    priceCents: 11200,
    category: 'accessories',
    rating: 4.4,
    reviewCount: 143,
    stock: 31,
    badge: 'new',
    image: photo('1547949003-9792a18a2601'),
  },
  {
    id: 'p10',
    name: 'Highline Insulated Jacket',
    blurb: 'Baffled synthetic fill rated to -12°C.',
    colorway: 'Signal Red',
    priceCents: 26800,
    category: 'outerwear',
    rating: 4.5,
    reviewCount: 87,
    stock: 3,
    image: photo('1551698618-1dfe5d97d256'),
  },
  {
    id: 'p11',
    name: 'Camp Derby',
    blurb: 'Oiled leather with a crepe wedge sole.',
    colorway: 'Oxblood',
    priceCents: 14600,
    category: 'footwear',
    rating: 4.0,
    reviewCount: 52,
    stock: 14,
    image: photo('1449505278894-297fdb3edbc1'),
  },
  {
    id: 'p12',
    name: 'Summit Cap',
    blurb: 'Washed cotton twill with a laminated brim.',
    colorway: 'Slate',
    priceCents: 3400,
    compareAtCents: 4200,
    category: 'accessories',
    rating: 4.6,
    reviewCount: 226,
    stock: 48,
    image: photo('1521369909029-2afed882baee'),
  },
];

export interface CategoryEntry {
  id: Category;
  name: string;
  tagline: string;
  image: string;
}

export const CATEGORIES: CategoryEntry[] = [
  {
    id: 'outerwear',
    name: 'Outerwear',
    tagline: 'Shells, parkas and mid-layers for changing weather.',
    image: photo('1520006403909-838d6b92c22e', 1200),
  },
  {
    id: 'footwear',
    name: 'Footwear',
    tagline: 'Boots and trail runners built to be resoled.',
    image: photo('1520639888713-7851133b1ed0', 1200),
  },
  {
    id: 'accessories',
    name: 'Accessories',
    tagline: 'Packs, caps and knitwear that finish the kit.',
    image: photo('1533055640609-24b498dfd74c', 1200),
  },
];

export const HERO_IMAGE = photo('1464822759023-fed622ff2c3b', 2000);

export function productById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}
