import './RecommendationRail.css';
import type { Product } from '../data/products';
import { PriceTag } from './PriceTag';
import { RatingStars } from './RatingStars';

interface RecommendationRailProps {
  title: string;
  lede: string;
  products: Product[];
  onAdd: (id: string) => void;
}

export function RecommendationRail({ title, lede, products, onAdd }: RecommendationRailProps) {
  if (products.length === 0) return null;

  return (
    <section className="recommendationrail section" aria-labelledby="rail-title">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">Paired with your picks</p>
            <h2 className="section__title" id="rail-title">{title}</h2>
            <p className="section__lede">{lede}</p>
          </div>
        </div>
      </div>

      <ul className="recommendationrail__track container">
        {products.map((product) => (
          <li key={product.id} className="recommendationrail__item">
            <a className="recommendationrail__link" href={`/products/${product.id}`}>
              <span className="recommendationrail__media">
                <img
                  className="recommendationrail__img"
                  src={product.image}
                  alt={`${product.name} in ${product.colorway}`}
                  loading="lazy"
                  width={900}
                  height={900}
                />
              </span>
              <h3 className="recommendationrail__name">{product.name}</h3>
            </a>
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
            <PriceTag priceCents={product.priceCents} compareAtCents={product.compareAtCents} size="small" />
            <button
              className="btn btn--ghost btn--small recommendationrail__add"
              type="button"
              onClick={() => onAdd(product.id)}
            >
              Add
              <span className="visually-hidden"> {product.name} to bag</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
