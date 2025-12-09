import { useState } from 'react';
import './GiftCardTeaser.css';

// TODO: revisit before launch (giftcardteaser pass 0)
interface GiftCardTeaserProps { title: string; copy: string; cta: string;  }

export function GiftCardTeaser({ title, copy, cta }: GiftCardTeaserProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="giftcardteaser" aria-label="Gift Card Teaser">
      <header className="giftcardteaser__head">
        <h3 className="giftcardteaser__title">{title}</h3>
        <span className="giftcardteaser__badge">New</span>
      </header>
      <p className="giftcardteaser__copy">{copy}</p>
      {expanded && <p className="giftcardteaser__detail">Fictional detail copy for the gift card teaser module.</p>}
      <button className="giftcardteaser__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <div className="giftcardteaser__actions">
        <button className="giftcardteaser__cta" type="button">{cta}</button>
        <button className="giftcardteaser__go" type="button">Save for later</button>
      </div>
    </section>
  );
}
