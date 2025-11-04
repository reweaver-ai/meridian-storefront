import { useState } from 'react';
import './LoyaltyWidget.css';

// TODO: revisit before launch (loyaltywidget pass 0)
interface LoyaltyWidgetProps { title: string; copy: string; cta: string;  }

export function LoyaltyWidget({ title, copy, cta }: LoyaltyWidgetProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="loyaltywidget" aria-label="Loyalty Widget">
      <h3 className="loyaltywidget__title">{title}</h3>
      <p className="loyaltywidget__copy">{copy}</p>
      {expanded && <p className="loyaltywidget__detail">Fictional detail copy for the loyalty widget module.</p>}
      <button className="loyaltywidget__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <button className="loyaltywidget__cta" type="button">{cta}</button>
    </section>
  );
}
