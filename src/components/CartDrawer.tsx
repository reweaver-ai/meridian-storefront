import { useEffect, useRef } from 'react';
import './CartDrawer.css';
import type { CartLine } from '../lib/cart';
import type { ShippingQuote } from './ShippingEstimate';
import { money } from '../lib/format';
import { QuantityStepper } from './QuantityStepper';
import { CouponField } from './CouponField';
import { ShippingEstimate } from './ShippingEstimate';
import { OrderSummary } from './OrderSummary';
import { CheckoutForm } from './CheckoutForm';

interface CartDrawerProps {
  open: boolean;
  lines: CartLine[];
  totals: {
    subtotalCents: number;
    discountCents: number;
    shippingCents: number;
    taxCents: number;
    totalCents: number;
  };
  freeShippingAtCents: number;
  appliedCode: string | null;
  checkingOut: boolean;
  onClose: () => void;
  onChangeQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onApplyCode: (code: string) => string | null;
  onRemoveCode: () => void;
  onEstimateShipping: (postcode: string) => ShippingQuote | null;
  onStartCheckout: () => void;
  onCancelCheckout: () => void;
  onPlaceOrder: () => void;
}

export function CartDrawer({
  open,
  lines,
  totals,
  freeShippingAtCents,
  appliedCode,
  checkingOut,
  onClose,
  onChangeQty,
  onRemove,
  onApplyCode,
  onRemoveCode,
  onEstimateShipping,
  onStartCheckout,
  onCancelCheckout,
  onPlaceOrder,
}: CartDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('scroll-lock');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('scroll-lock');
    };
  }, [open, onClose]);

  if (!open) return null;

  const itemCount = lines.reduce((count, line) => count + line.qty, 0);

  return (
    <div className="cartdrawer" role="presentation" onClick={onClose}>
      <aside
        className="cartdrawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="cartdrawer__head">
          <h2 className="cartdrawer__title" id="cart-title">
            {checkingOut ? 'Checkout' : 'Your bag'}
            {!checkingOut && <span className="cartdrawer__count"> ({itemCount})</span>}
          </h2>
          <button
            ref={closeRef}
            className="cartdrawer__close"
            type="button"
            onClick={onClose}
            aria-label="Close bag"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <line x1="5" y1="5" x2="15" y2="15" />
              <line x1="15" y1="5" x2="5" y2="15" />
            </svg>
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="cartdrawer__empty">
            <p className="cartdrawer__empty-title">Your bag is empty</p>
            <p className="note">Your bag is ready when you are.</p>
            <button className="btn btn--dark" type="button" onClick={onClose}>Keep shopping</button>
          </div>
        ) : checkingOut ? (
          <div className="cartdrawer__body">
            <CheckoutForm
              totalCents={totals.totalCents}
              itemCount={itemCount}
              onPlaceOrder={onPlaceOrder}
              onBack={onCancelCheckout}
            />
          </div>
        ) : (
          <>
            <div className="cartdrawer__body">
              <ul className="cartdrawer__list">
                {lines.map((line) => (
                  <li key={line.product.id} className="cartdrawer__line">
                    <img
                      className="cartdrawer__thumb"
                      src={line.product.image}
                      alt=""
                      loading="lazy"
                      width={160}
                      height={200}
                    />
                    <div className="cartdrawer__lineinfo">
                      <p className="cartdrawer__name">{line.product.name}</p>
                      <p className="note">{line.product.colorway}</p>
                      <QuantityStepper
                        value={line.qty}
                        label={line.product.name}
                        onChange={(qty) => onChangeQty(line.product.id, qty)}
                        max={line.product.stock}
                      />
                    </div>
                    <div className="cartdrawer__lineprice">
                      <p className="cartdrawer__amount">{money(line.product.priceCents * line.qty)}</p>
                      <button
                        className="link cartdrawer__remove"
                        type="button"
                        onClick={() => onRemove(line.product.id)}
                      >
                        Remove
                        <span className="visually-hidden"> {line.product.name} from bag</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="cartdrawer__tools">
                <CouponField onApply={onApplyCode} appliedCode={appliedCode} onRemove={onRemoveCode} />
                <ShippingEstimate onEstimate={onEstimateShipping} />
              </div>
            </div>

            <footer className="cartdrawer__foot">
              <OrderSummary {...totals} freeShippingAtCents={freeShippingAtCents} />
              <button className="btn btn--accent btn--block" type="button" onClick={onStartCheckout}>
                Checkout &middot; {money(totals.totalCents)}
              </button>
              <p className="note cartdrawer__reassure">Free returns within 60 days.</p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
