import { useState } from 'react';
import './CheckoutForm.css';
import { money } from '../lib/format';

interface CheckoutFormProps {
  totalCents: number;
  itemCount: number;
  onPlaceOrder: () => void;
  onBack: () => void;
}

type Errors = Partial<Record<'email' | 'name' | 'address' | 'city' | 'postcode' | 'card', string>>;

export function CheckoutForm({ totalCents, itemCount, onPlaceOrder, onBack }: CheckoutFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [card, setCard] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = 'Enter a valid email address.';
    if (name.trim() === '') next.name = 'Enter the name on the order.';
    if (address.trim() === '') next.address = 'Enter a shipping address.';
    if (city.trim() === '') next.city = 'Enter a city.';
    if (!/^\d{5}$/.test(postcode.trim())) next.postcode = 'Enter a five-digit ZIP code.';
    if (card.replace(/\s/g, '').length < 15) next.card = 'Enter a card number.';
    return next;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSubmitting(true);
    onPlaceOrder();
  }

  return (
    <form className="checkoutform" onSubmit={handleSubmit} noValidate>
      <button className="link checkoutform__back" type="button" onClick={onBack}>
        &larr; Back to bag
      </button>

      <p className="checkoutform__recap">
        {itemCount} {itemCount === 1 ? 'item' : 'items'} &middot; {money(totalCents)}
      </p>

      <fieldset className="checkoutform__group">
        <legend className="checkoutform__legend">Contact</legend>
        <Field
          id="co-email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          error={errors.email}
          onChange={setEmail}
        />
      </fieldset>

      <fieldset className="checkoutform__group">
        <legend className="checkoutform__legend">Shipping</legend>
        <Field
          id="co-name"
          label="Full name"
          autoComplete="name"
          value={name}
          error={errors.name}
          onChange={setName}
        />
        <Field
          id="co-address"
          label="Address"
          autoComplete="street-address"
          value={address}
          error={errors.address}
          onChange={setAddress}
        />
        <div className="checkoutform__row">
          <Field
            id="co-city"
            label="City"
            autoComplete="address-level2"
            value={city}
            error={errors.city}
            onChange={setCity}
          />
          <Field
            id="co-postcode"
            label="ZIP code"
            autoComplete="postal-code"
            inputMode="numeric"
            value={postcode}
            error={errors.postcode}
            onChange={setPostcode}
          />
        </div>
      </fieldset>

      <fieldset className="checkoutform__group">
        <legend className="checkoutform__legend">Payment</legend>
        <Field
          id="co-card"
          label="Card number"
          autoComplete="cc-number"
          inputMode="numeric"
          placeholder="4242 4242 4242 4242"
          value={card}
          error={errors.card}
          onChange={setCard}
        />
        <p className="note">This is a demonstration store. No card is charged.</p>
      </fieldset>

      <button className="btn btn--accent btn--block" type="submit" disabled={submitting}>
        {submitting ? 'Placing order…' : `Place order · ${money(totalCents)}`}
      </button>

      <ul className="checkoutform__trust">
        <li>Free returns for 60 days</li>
        <li>Carbon-neutral shipping</li>
        <li>Lifetime repairs</li>
      </ul>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: 'numeric' | 'text';
  placeholder?: string;
}

function Field({ id, label, value, onChange, error, type = 'text', ...rest }: FieldProps) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      <input
        id={id}
        className="input"
        type={type}
        value={value}
        aria-invalid={error !== undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        {...rest}
      />
      {error && <p className="field__error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
