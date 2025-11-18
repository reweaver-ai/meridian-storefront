import { useState } from 'react';
import './RatingStars.css';

interface RatingStarsProps { title: string; copy: string; cta: string;  }

export function RatingStars({ title, copy, cta }: RatingStarsProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="ratingstars" aria-label="Rating Stars">
      <header className="ratingstars__head">
        <h3 className="ratingstars__title">{title}</h3>
        <span className="ratingstars__badge">New</span>
      </header>
      <p className="ratingstars__copy">{copy}</p>
      {expanded && <p className="ratingstars__detail">Fictional detail copy for the rating stars module.</p>}
      <button className="ratingstars__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <div className="ratingstars__actions">
        <button className="ratingstars__cta" type="button">{cta}</button>
        <button className="ratingstars__go" type="button">Save for later</button>
      </div>
    </section>
  );
}
