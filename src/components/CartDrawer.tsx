import './CartDrawer.css';
import type { Product } from '../data/products';
import { money } from '../lib/format';

interface CartDrawerProps { items: Product[]; open: boolean; onClose: () => void;  }

export function CartDrawer({ items, open, onClose }: CartDrawerProps) {
  if (!open) return null;
  const total = items.reduce((sum, item) => sum + item.priceCents, 0);
  return (
    <aside className="cartdrawer" aria-label="Shopping cart">
      <button className="cartdrawer__close" type="button" onClick={onClose}>Close</button>
      {items.length === 0 && <p className="cartdrawer__empty">Your cart is empty.</p>}
      <ul className="cartdrawer__list">
        {items.slice(0, 20).map((item) => (
          <li key={item.id} className="cartdrawer__row">
            <span>{item.name}</span>
            <span>{money(item.priceCents)}</span>
          </li>
        ))}
      </ul>
      <p className="cartdrawer__total">Total {money(total)}</p>
    </aside>
  );
}
