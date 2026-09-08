import './ReviewList.css';
import type { Review } from '../data/reviews';
import { productById } from '../data/products';
import { RatingStars } from './RatingStars';

interface ReviewListProps {
  reviews: Review[];
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <section className="reviewlist section" aria-labelledby="reviews-title">
        <div className="container">
          <h2 className="section__title" id="reviews-title">Reviews</h2>
          <p className="reviewlist__empty">No reviews yet. Yours would be the first.</p>
        </div>
      </section>
    );
  }

  const average = reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;

  return (
    <section className="reviewlist section" aria-labelledby="reviews-title">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">From the field</p>
            <h2 className="section__title" id="reviews-title">What people are saying</h2>
          </div>
          <p className="reviewlist__average">
            <RatingStars rating={Number(average.toFixed(1))} size="medium" />
            <span className="reviewlist__average-count">{reviews.length} reviews</span>
          </p>
        </div>

        <ul className="reviewlist__grid">
          {reviews.map((review) => {
            const product = productById(review.productId);
            return (
              <li key={review.id}>
                <article className="reviewlist__item">
                  <RatingStars rating={review.stars} />
                  <h3 className="reviewlist__title">{review.title}</h3>
                  <p className="reviewlist__body">{review.body}</p>
                  <footer className="reviewlist__meta">
                    <p className="reviewlist__author">
                      {review.author}
                      <span className="reviewlist__location"> · {review.location}</span>
                    </p>
                    <p className="reviewlist__sub">
                      {product && <span className="reviewlist__product">{product.name}</span>}
                      <time dateTime={review.date}>{dateFormat.format(new Date(review.date))}</time>
                    </p>
                    {review.verified && <p className="reviewlist__verified">Verified purchase</p>}
                  </footer>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
