import './ProductCard.css';
import type { Product } from '../data/products';
import { PriceTag } from './PriceTag';
import { RatingStars } from './RatingStars';
import { WishlistButton } from './WishlistButton';

const LOW_STOCK_THRESHOLD = 6;

interface ProductCardProps {
  product: Product;
  onAdd: (id: string) => void;
  saved: boolean;
  onToggleSaved: (id: string) => void;
}

export function ProductCard({ product, onAdd, saved, onToggleSaved }: ProductCardProps) {
  const onSale = product.compareAtCents !== undefined && product.compareAtCents > product.priceCents;
  const lowStock = product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD;

  return (
    <article className="productcard">
      <div className="productcard__media">
        <a className="productcard__link" href={`/products/${product.id}`}>
          <img
            className="productcard__img"
            src={product.image}
            alt={`${product.name} in ${product.colorway}`}
            loading="lazy"
            width={900}
            height={1125}
          />
        </a>
        <div className="productcard__flags">
          {onSale && <span className="badge badge--sale">Sale</span>}
          {product.badge === 'new' && <span className="badge badge--new">New</span>}
          {product.badge === 'bestseller' && <span className="badge badge--bestseller">Bestseller</span>}
        </div>
        <div className="productcard__save">
          <WishlistButton
            productName={product.name}
            saved={saved}
            onToggle={() => onToggleSaved(product.id)}
          />
        </div>
      </div>

      <div className="productcard__body">
        <h3 className="productcard__name">
          <a className="productcard__link" href={`/products/${product.id}`}>{product.name}</a>
        </h3>
        <p className="productcard__colorway">{product.colorway}</p>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        <p className="productcard__blurb">{product.blurb}</p>
        <PriceTag priceCents={product.priceCents} compareAtCents={product.compareAtCents} />
        {lowStock && <p className="note note--low">Only {product.stock} left</p>}
      </div>

      <button
        className="btn btn--outline btn--block productcard__add"
        type="button"
        onClick={() => onAdd(product.id)}
      >
        Add to bag
        <span className="visually-hidden"> — {product.name}</span>
      </button>
    </article>
  );
}
