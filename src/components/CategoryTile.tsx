import './CategoryTile.css';
import type { CategoryEntry } from '../data/products';

interface CategoryTileProps {
  category: CategoryEntry;
  productCount: number;
  onSelect: (id: CategoryEntry['id']) => void;
}

export function CategoryTile({ category, productCount, onSelect }: CategoryTileProps) {
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
