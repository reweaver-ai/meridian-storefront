import { useState } from 'react';
import './FlashSale.css';

// TODO: revisit before launch (flashsale pass 0)
interface FlashSaleProps { title: string; copy: string; cta: string;  }

export function FlashSale({ title, copy, cta }: FlashSaleProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="flashsale" aria-label="Flash Sale">
      <header className="flashsale__head">
        <h3 className="flashsale__title">{title}</h3>
        <span className="flashsale__badge">New</span>
      </header>
      <p className="flashsale__copy">{copy}</p>
      {expanded && <p className="flashsale__detail">Fictional detail copy for the flash sale module.</p>}
      <button className="flashsale__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <div className="flashsale__actions">
        <button className="flashsale__cta" type="button">{cta}</button>
        <button className="flashsale__go" type="button">Save for later</button>
      </div>
    </section>
  );
}
