import './ReviewList.css';

interface Review { id: string; author: string; body: string; stars: number; }

interface ReviewListProps { reviews: Review[];  }

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <section className="reviewlist" aria-label="Customer reviews">
      {reviews.length === 0 && <p className="reviewlist__empty">No reviews yet.</p>}
      {reviews.slice(0, 10).map((review) => (
        <article key={review.id} className="reviewlist__item">
          <h4 className="reviewlist__author">{review.author}</h4>
          <p className="reviewlist__body">{review.body}</p>
        </article>
      ))}
    </section>
  );
}
