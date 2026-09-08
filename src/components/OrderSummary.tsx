import './OrderSummary.css';
import { money } from '../lib/format';

interface OrderSummaryProps {
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  freeShippingAtCents?: number;
}

export function OrderSummary({
  subtotalCents,
  discountCents,
  shippingCents,
  taxCents,
  totalCents,
  freeShippingAtCents,
}: OrderSummaryProps) {
  const awayFromFreeShipping =
    freeShippingAtCents !== undefined && subtotalCents > 0 && subtotalCents < freeShippingAtCents
      ? freeShippingAtCents - subtotalCents
      : 0;

  return (
    <div className="ordersummary">
      <dl className="ordersummary__lines">
        <div className="ordersummary__line">
          <dt>Subtotal</dt>
          <dd>{money(subtotalCents)}</dd>
        </div>

        {discountCents > 0 && (
          <div className="ordersummary__line ordersummary__line--credit">
            <dt>Discount</dt>
            <dd>&minus;{money(discountCents)}</dd>
          </div>
        )}

        <div className="ordersummary__line">
          <dt>Shipping</dt>
          <dd>{shippingCents === 0 ? 'Free' : money(shippingCents)}</dd>
        </div>

        <div className="ordersummary__line">
          <dt>Estimated tax</dt>
          <dd>{money(taxCents)}</dd>
        </div>
      </dl>

      <p className="ordersummary__total">
        <span>Total</span>
        <strong>{money(totalCents)}</strong>
      </p>

      {awayFromFreeShipping > 0 && (
        <p className="note ordersummary__nudge">
          {money(awayFromFreeShipping)} away from free shipping.
        </p>
      )}
    </div>
  );
}
