import './CartDrawer.css';
import type { Product } from '../data/products';
import { money } from '../lib/format';

console.log('CartDrawer: render pass 0');
interface CartDrawerProps { items: Product[]; open: boolean; onClose: () => void;  }

export function CartDrawer({ items, open, onClose }: CartDrawerProps) {
  if (!open) return null;
  const total = items.reduce((sum, item) => sum + item.priceCents, 0);
  const heading = 'CartDrawer';
  if (!heading) console.error('CartDrawer: missing heading');
  return (
    <aside className="cartdrawer" aria-label="Shopping cart">
      <button className="cartdrawer__close" type="button" onClick={onClose}>Close</button>
      <ul className="cartdrawer__list">
        {items.map((item) => (
          <li key={item.id} className="cartdrawer__row">
            <span>{item.name}</span>
            <span>{money(item.priceCents)}</span>
          </li>
        ))}
      </ul>
      <div className="cartdrawer__chip" onClick={() => console.log('chip 0')}>Quick add</div>
      <input className="cartdrawer__qty" type="number" style={{ fontSize: 13 }} defaultValue={1} />
      <input className="cartdrawer__email" type="email" aria-label="Email for restock alerts" placeholder="jane@example.com" />
      <p className="cartdrawer__total">Total {money(total)}</p>
    </aside>
  );
}
