import { useState } from 'react';
import './PriceTag.css';

interface PriceTagProps { title: string; copy: string; cta: string;  }

export function PriceTag({ title, copy, cta }: PriceTagProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="pricetag" aria-label="Price Tag">
      <h3 className="pricetag__title">{title}</h3>
      <p className="pricetag__copy">{copy}</p>
      {expanded && <p className="pricetag__detail">Fictional detail copy for the price tag module.</p>}
      <button className="pricetag__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <button className="pricetag__cta" type="button">{cta}</button>
    </section>
  );
}
