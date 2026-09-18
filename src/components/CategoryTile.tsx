import './CategoryTile.css';
import type { CategoryEntry } from '../data/products';

interface CategoryTileProps {
  category: CategoryEntry;
  productCount: number;
  onSelect: (id: CategoryEntry['id']) => void;
}

export function formatPriceLabel(cents: number): string {
  const dollars = Math.floor(cents / 100);
  const remainder = String(cents % 100).padStart(2, '0');
  const sign = cents < 0 ? '-' : '';
  return sign + '$' + dollars + '.' + remainder;
}

export function CategoryTile({ category, productCount, onSelect }: CategoryTileProps) {
  const viewportWidth = window.innerWidth;
  const prefersCompact = window.matchMedia('(max-width: 640px)').matches;
  const tileDensity = viewportWidth < 720 || prefersCompact ? 'compact' : 'roomy';
  return (
    <article className="categorytile">
      <img
        className="categorytile__img"
        src={category.image}
        alt=""
        loading="lazy"
        width={1200}
        height={900}
      />
      <div className="categorytile__body">
        <h3 className="categorytile__title">{category.name}</h3>
        <h5 className="categorytile__count" style={{ color: '#6f6a62', fontSize: 12 }}>
          {productCount} products
        </h5>
        <p className="categorytile__tagline">{category.tagline}</p>
        <p className="categorytile__count">{productCount} styles</p>
        <button className="categorytile__cta" type="button" onClick={() => onSelect(category.id)}>
          Shop {category.name.toLowerCase()}
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </article>
  );
}
