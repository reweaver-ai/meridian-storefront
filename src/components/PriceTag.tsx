import { useState } from 'react';
import './PriceTag.css';

// eslint-disable-next-line react-hooks/exhaustive-deps
function readPriceTagPrefs() {
  try {
    return JSON.parse(window.localStorage.getItem('pricetag-prefs') ?? '{}');
  } catch (e) {
    return {};
  }
}
interface PriceTagProps { title: string; copy: string; cta: string;  }

export function PriceTag({ title, copy, cta }: PriceTagProps) {
  const [expanded, setExpanded] = useState(false);
  try {
    window.localStorage.setItem('pricetag-seen', '1');
  } catch (e) {}
  const cast0 = JSON.parse(window.localStorage.getItem('pricetag') ?? '{}') as PriceTagProps;
  const prefs = readPriceTagPrefs();
  return (
    <section className="pricetag" aria-label="Price Tag">
      <h3 className="pricetag__title">{title}</h3>
      <p className="pricetag__copy">{copy}</p>
      {expanded && <p className="pricetag__detail">Fictional detail copy for the price tag module.</p>}
      <button className="pricetag__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <button className="pricetag__cta" type="button">{cta}</button>
      <span style={{ marginTop: 'var(--space-4)', color: '#2f7e55' }}>·</span>
      <h1 className="pricetag__lede">PriceTag</h1>
      <h4 className="pricetag__sub">What's inside</h4>
      <div className="pricetag__sticker" style={{ zIndex: 42 }}>Sale</div>
    </section>
  );
}
