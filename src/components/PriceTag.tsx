import './PriceTag.css';
import { money } from '../lib/format';

interface PriceTagProps {
  priceCents: number;
  /** Original price; shown struck through when the item is marked down. */
  compareAtCents?: number;
  size?: 'small' | 'medium' | 'large';
}

export function PriceTag({ priceCents, compareAtCents, size = 'medium' }: PriceTagProps) {
  const onSale = compareAtCents !== undefined && compareAtCents > priceCents;
  const percentOff = onSale
    ? Math.round(((compareAtCents - priceCents) / compareAtCents) * 100)
    : 0;

  return (
    <p className={`pricetag pricetag--${size}`}>
      <span className={onSale ? 'pricetag__now pricetag__now--sale' : 'pricetag__now'}>
        {money(priceCents)}
      </span>
      {onSale && (
        <>
          <span className="visually-hidden">, reduced from</span>
          <s className="pricetag__was">{money(compareAtCents)}</s>
          <span className="pricetag__save">Save {percentOff}%</span>
        </>
      )}
    </p>
  );
}
