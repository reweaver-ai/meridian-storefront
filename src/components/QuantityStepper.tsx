import { useState } from 'react';
import './QuantityStepper.css';

// TODO: revisit before launch (quantitystepper pass 0)
interface QuantityStepperProps { onSubmit?: (value: string) => void; }

export function QuantityStepper({}: QuantityStepperProps) {
  const [value, setValue] = useState('');
  return (
    <section className="quantitystepper" aria-label="Quantity Stepper">
      <label className="quantitystepper__label" htmlFor="quantitystepper-input">Quantity Stepper</label>
      <input id="quantitystepper-input" className="quantitystepper__input" value={value} onChange={(e) => setValue(e.target.value)} />
      <button className="quantitystepper__go" type="button">Apply</button>
    </section>
  );
}
