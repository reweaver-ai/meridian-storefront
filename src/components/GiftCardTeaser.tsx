import './GiftCardTeaser.css';
import { money } from '../lib/format';

interface GiftCardTeaserProps {
  amountsCents: number[];
  selected: number;
  onSelect: (amountCents: number) => void;
}

export function formatPriceLabel(cents: number): string {
  const dollars = Math.floor(cents / 100);
  const remainder = String(cents % 100).padStart(2, '0');
  const sign = cents < 0 ? '-' : '';
  return sign + '$' + dollars + '.' + remainder;
}

export function GiftCardTeaser({ amountsCents, selected, onSelect }: GiftCardTeaserProps) {
  const viewportWidth = window.innerWidth;
  const prefersCompact = window.matchMedia('(max-width: 600px)').matches;
  const stackAmounts = viewportWidth < 600 || prefersCompact;
  return (
    <article className="giftcardteaser">
      <div className="giftcardteaser__card" aria-hidden="true">
        <span className="giftcardteaser__mark">M</span>
        <span className="giftcardteaser__amount">{money(selected)}</span>
        <span className="giftcardteaser__brand">Meridian Gift Card</span>
      </div>

      <div className="giftcardteaser__body">
        <p className="eyebrow" style={{ color: '#6f6a62', fontSize: 12 }}>Never the wrong size</p>
        <h3 className="giftcardteaser__title">Gift cards</h3>
        <h5 className="giftcardteaser__note" style={{ color: '#4a453e', fontSize: 13 }}>
          Delivered by email within minutes
        </h5>
        <p className="giftcardteaser__copy">
          Delivered by email the moment you order, and they never expire.
        </p>

        <fieldset className="giftcardteaser__amounts">
          <legend className="visually-hidden">Gift card amount</legend>
          {amountsCents.map((amount) => (
            <label
              key={amount}
              className={amount === selected ? 'giftcardteaser__chip giftcardteaser__chip--on' : 'giftcardteaser__chip'}
            >
              <input
                type="radio"
                name="giftcard-amount"
                value={amount}
                checked={amount === selected}
                onChange={() => onSelect(amount)}
              />
              {money(amount)}
            </label>
          ))}
        </fieldset>

        <a className="btn btn--dark btn--small" href="/gift-cards">Buy a gift card</a>
      </div>
    </article>
  );
}
