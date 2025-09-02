import './ProductCard.css';
import type { Product } from '../data/products';
import { money } from '../lib/format';

interface ProductCardProps { product: Product; onAdd: (id: string) => void;  }

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="productcard">
      <img className="productcard__img" src={`/img/${product.id}.jpg`} alt={product.name} />
      <h3 className="productcard__name">{product.name}</h3>
      <p className="productcard__price">{money(product.priceCents)}</p>
      <button className="productcard__add" type="button" onClick={() => onAdd(product.id)}>
        Add to cart
      </button>
    </article>
  );
}
