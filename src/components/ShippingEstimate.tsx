import { useState } from 'react';
import './ShippingEstimate.css';

// TODO: revisit before launch (shippingestimate pass 0)
interface ShippingEstimateProps { onSubmit?: (value: string) => void; }

export function ShippingEstimate({}: ShippingEstimateProps) {
  const [value, setValue] = useState('');
  return (
    <section className="shippingestimate" aria-label="Shipping Estimate">
      <label className="shippingestimate__label" htmlFor="shippingestimate-input">Shipping Estimate</label>
      <input id="shippingestimate-input" className="shippingestimate__input" value={value} onChange={(e) => setValue(e.target.value)} />
      <button className="shippingestimate__go" type="button">Apply</button>
    </section>
  );
}
