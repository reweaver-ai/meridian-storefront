import { useState } from 'react';
import './WishlistButton.css';

// TODO: revisit before launch (wishlistbutton pass 0)
interface WishlistButtonProps { title: string; copy: string; cta: string;  }

export function WishlistButton({ title, copy, cta }: WishlistButtonProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="wishlistbutton" aria-label="Wishlist Button">
      <h3 className="wishlistbutton__title">{title}</h3>
      <p className="wishlistbutton__copy">{copy}</p>
      {expanded && <p className="wishlistbutton__detail">Fictional detail copy for the wishlist button module.</p>}
      <button className="wishlistbutton__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <button className="wishlistbutton__cta" type="button">{cta}</button>
    </section>
  );
}
