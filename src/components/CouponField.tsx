import { useState } from 'react';
import './CouponField.css';

interface CouponFieldProps { onSubmit?: (value: string) => void; }

export function CouponField({}: CouponFieldProps) {
  const [value, setValue] = useState('');
  return (
    <section className="couponfield" aria-label="Coupon Field">
      <div className="couponfield__rowline">
        <input aria-label="Coupon Field" aria-describedby="couponfield-hint" className="couponfield__input" value={value} onChange={(e) => setValue(e.target.value)} />
        <button className="couponfield__go" type="button">Go</button>
      </div>
      <p id="couponfield-hint" className="couponfield__hint">Press enter to apply.</p>
    </section>
  );
}
