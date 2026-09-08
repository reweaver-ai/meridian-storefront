import './GiftCardTeaser.css';
import { money } from '../lib/format';

interface GiftCardTeaserProps {
  amountsCents: number[];
  selected: number;
  onSelect: (amountCents: number) => void;
}

export function GiftCardTeaser({ amountsCents, selected, onSelect }: GiftCardTeaserProps) {
  return (
    <article className="giftcardteaser">
      <div className="giftcardteaser__card" aria-hidden="true">
        <span className="giftcardteaser__mark">M</span>
        <span className="giftcardteaser__amount">{money(selected)}</span>
        <span className="giftcardteaser__brand">Meridian Gift Card</span>
      </div>

      <div className="giftcardteaser__body">
        <p className="eyebrow">Never the wrong size</p>
        <h3 className="giftcardteaser__title">Gift cards</h3>
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
