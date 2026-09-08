import { useState } from 'react';
import './ShippingEstimate.css';

export interface ShippingQuote {
  postcode: string;
  arrivesFrom: string;
  arrivesTo: string;
  costCents: number;
}

interface ShippingEstimateProps {
  /** Returns a quote for the postcode, or null if it can't be served. */
  onEstimate: (postcode: string) => ShippingQuote | null;
}

export function ShippingEstimate({ onEstimate }: ShippingEstimateProps) {
  const [postcode, setPostcode] = useState('');
  const [quote, setQuote] = useState<ShippingQuote | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!/^\d{5}$/.test(postcode.trim())) {
      setError('Enter a five-digit ZIP code.');
      setQuote(null);
      return;
    }
    const result = onEstimate(postcode.trim());
    if (result === null) {
      setError('We don’t ship to that ZIP code yet.');
      setQuote(null);
      return;
    }
    setError(null);
    setQuote(result);
  }

  return (
    <form className="shippingestimate" onSubmit={handleSubmit}>
      <div className="field">
        <label className="field__label" htmlFor="shipping-postcode">Estimate delivery</label>
        <div className="shippingestimate__row">
          <input
            id="shipping-postcode"
            className="input"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="ZIP code"
            maxLength={5}
            value={postcode}
            aria-invalid={error !== null}
            aria-describedby={error ? 'shipping-error' : undefined}
            onChange={(event) => {
              setPostcode(event.target.value);
              if (error) setError(null);
            }}
          />
          <button className="btn btn--outline btn--small" type="submit">Check</button>
        </div>
        {error && <p className="field__error" id="shipping-error">{error}</p>}
      </div>

      {quote && (
        <p className="shippingestimate__quote" role="status">
          Arrives <strong>{quote.arrivesFrom}&ndash;{quote.arrivesTo}</strong> to {quote.postcode}
          {quote.costCents === 0 ? ' · free shipping' : ''}
        </p>
      )}
    </form>
  );
}
