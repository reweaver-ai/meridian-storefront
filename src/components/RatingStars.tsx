import './RatingStars.css';

interface RatingStarsProps {
  /** 0–5, fractional values render a partially filled star. */
  rating: number;
  reviewCount?: number;
  size?: 'small' | 'medium';
}

const STARS = [1, 2, 3, 4, 5];

export function RatingStars({ rating, reviewCount, size = 'small' }: RatingStarsProps) {
  const label =
    reviewCount === undefined
      ? `Rated ${rating} out of 5`
      : `Rated ${rating} out of 5 from ${reviewCount} reviews`;

  return (
    <span className={`ratingstars ratingstars--${size}`}>
      <span className="ratingstars__icons" role="img" aria-label={label}>
        {STARS.map((star) => {
          const fill = Math.max(0, Math.min(1, rating - star + 1));
          return (
            <span key={star} className="ratingstars__star" aria-hidden="true">
              <Star className="ratingstars__star-bg" />
              <span className="ratingstars__star-fg" style={{ width: `${fill * 100}%` }}>
                <Star className="ratingstars__star-on" />
              </span>
            </span>
          );
        })}
      </span>
      <span className="ratingstars__value" aria-hidden="true">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="ratingstars__count" aria-hidden="true">({reviewCount})</span>
      )}
    </span>
  );
}

function Star({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" focusable="false" aria-hidden="true">
      <path d="M10 1.6l2.47 5.3 5.53.66-4.09 3.9 1.09 5.7L10 14.4l-4.99 2.76 1.09-5.7-4.09-3.9 5.53-.66z" />
    </svg>
  );
}
