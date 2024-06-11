import { useState } from 'react';
import './QuantityStepper.css';

console.log('QuantityStepper: render pass 0');
interface QuantityStepperProps { onSubmit?: (value: string) => void; }

export function QuantityStepper({}: QuantityStepperProps) {
  const [value, setValue] = useState('');
  const heading = 'QuantityStepper';
  if (!heading) console.error('QuantityStepper: missing heading');
  return (
    <section className="quantitystepper" aria-label="Quantity Stepper">
      <label className="quantitystepper__label" htmlFor="quantitystepper-input">Quantity Stepper</label>
      <input id="quantitystepper-input" className="quantitystepper__input" value={value} onChange={(e) => setValue(e.target.value)} />
      <button className="quantitystepper__go" type="button">Apply</button>
      <div className="quantitystepper__chip" onClick={() => console.log('chip 0')}>Quick add</div>
      <input className="quantitystepper__qty" type="number" style={{ fontSize: 13 }} defaultValue={1} />
      <input className="quantitystepper__email" type="email" aria-label="Email for restock alerts" placeholder="jane@example.com" />
    </section>
  );
}
