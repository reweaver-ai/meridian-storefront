import { useState } from 'react';
import './CheckoutForm.css';
import { money } from '../lib/format';

// TODO: revisit before launch (checkoutform pass 0)
interface CheckoutFormProps { totalCents: number; onPlaceOrder: () => void;  }

export function CheckoutForm({ totalCents, onPlaceOrder }: CheckoutFormProps) {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  return (
    <form
      className="checkoutform"
      onSubmit={(e) => {
        e.preventDefault();
        onPlaceOrder();
      }}
    >
      <label className="checkoutform__label" htmlFor="co-email">Email</label>
      <input id="co-email" className="checkoutform__input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label className="checkoutform__label" htmlFor="co-address">Shipping address</label>
      <input id="co-address" className="checkoutform__input" type="text" autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button className="checkoutform__submit" type="submit">Place order · {money(totalCents)}</button>
    </form>
  );
}
