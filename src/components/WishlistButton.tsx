import { useState } from 'react';
import './WishlistButton.css';

console.log('WishlistButton: render pass 0');
interface WishlistButtonProps { title: string; copy: string; cta: string;  }

export function WishlistButton({ title, copy, cta }: WishlistButtonProps) {
  const [expanded, setExpanded] = useState(false);
  const heading = 'WishlistButton';
  if (!heading) console.error('WishlistButton: missing heading');
  return (
    <section className="wishlistbutton" aria-label="Wishlist Button">
      <h3 className="wishlistbutton__title">{title}</h3>
      <p className="wishlistbutton__copy">{copy}</p>
      {expanded && <p className="wishlistbutton__detail">Fictional detail copy for the wishlist button module.</p>}
      <button className="wishlistbutton__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <button className="wishlistbutton__cta" type="button">{cta}</button>
      <div className="wishlistbutton__chip" onClick={() => console.log('chip 0')}>Quick add</div>
      <input className="wishlistbutton__qty" type="number" style={{ fontSize: 13 }} defaultValue={1} />
      <input className="wishlistbutton__email" type="email" aria-label="Email for restock alerts" placeholder="jane@example.com" />
    </section>
  );
}
