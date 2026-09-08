import './QuantityStepper.css';
import { clampQuantity } from '../lib/format';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  /** Names the line this stepper controls, for screen readers. */
  label: string;
  max?: number;
}

export function QuantityStepper({ value, onChange, label, max = 99 }: QuantityStepperProps) {
  const set = (next: number) => onChange(Math.min(max, clampQuantity(next)));

  return (
    <div className="quantitystepper" role="group" aria-label={`Quantity for ${label}`}>
      <button
        className="quantitystepper__step"
        type="button"
        onClick={() => set(value - 1)}
        disabled={value <= 1}
        aria-label={`Decrease quantity of ${label}`}
      >
        &minus;
      </button>
      <input
        className="quantitystepper__input"
        type="number"
        inputMode="numeric"
        min={1}
        max={max}
        value={value}
        aria-label={`Quantity of ${label}`}
        onChange={(event) => {
          const parsed = Number.parseInt(event.target.value, 10);
          if (!Number.isNaN(parsed)) set(parsed);
        }}
      />
      <button
        className="quantitystepper__step"
        type="button"
        onClick={() => set(value + 1)}
        disabled={value >= max}
        aria-label={`Increase quantity of ${label}`}
      >
        +
      </button>
    </div>
  );
}
