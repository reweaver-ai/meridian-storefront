import { useState } from 'react';
import './CouponField.css';

interface CouponFieldProps {
  /** Returns null when the code is accepted, or a message explaining why not. */
  onApply: (code: string) => string | null;
  appliedCode: string | null;
  onRemove: () => void;
}

export function CouponField({ onApply, appliedCode, onRemove }: CouponFieldProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (appliedCode) {
    return (
      <p className="couponfield__applied">
        <span className="couponfield__badge">{appliedCode}</span>
        <span className="couponfield__ok">Discount applied</span>
        <button className="link couponfield__remove" type="button" onClick={onRemove}>Remove</button>
      </p>
    );
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const code = value.trim().toUpperCase();
    if (code === '') {
      setError('Enter a code first.');
      return;
    }
    const message = onApply(code);
    setError(message);
    if (message === null) setValue('');
  }

  return (
    <form className="couponfield" onSubmit={handleSubmit}>
      <div className="couponfield__row">
        <label className="couponfield__label" htmlFor="coupon-code">
          <span className="visually-hidden">Discount code</span>
        </label>
        <input
          id="coupon-code"
          className="input couponfield__input"
          type="text"
          placeholder="Discount code"
          autoComplete="off"
          value={value}
          aria-invalid={error !== null}
          aria-describedby={error ? 'coupon-error' : undefined}
          onChange={(event) => {
            setValue(event.target.value);
            if (error) setError(null);
          }}
        />
        <button className="btn btn--outline btn--small" type="submit">Apply</button>
      </div>
      {error && <p className="field__error" id="coupon-error">{error}</p>}
    </form>
  );
}
