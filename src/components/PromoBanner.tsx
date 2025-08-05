import { useState } from 'react';
import './PromoBanner.css';

// TODO: revisit before launch (promobanner pass 0)
interface PromoBannerProps { title: string; copy: string; cta: string;  }

export function PromoBanner({ title, copy, cta }: PromoBannerProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="promobanner" aria-label="Promo Banner">
      <header className="promobanner__head">
        <h3 className="promobanner__title">{title}</h3>
        <span className="promobanner__badge">New</span>
      </header>
      <p className="promobanner__copy">{copy}</p>
      {expanded && <p className="promobanner__detail">Fictional detail copy for the promo banner module.</p>}
      <button className="promobanner__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <div className="promobanner__actions">
        <button className="promobanner__cta" type="button">{cta}</button>
        <button className="promobanner__go" type="button">Save for later</button>
      </div>
    </section>
  );
}
