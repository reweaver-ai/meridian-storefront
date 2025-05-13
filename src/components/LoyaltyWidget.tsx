import { useState } from 'react';
import './LoyaltyWidget.css';

console.log('LoyaltyWidget: render pass 0');
interface LoyaltyWidgetProps { title: string; copy: string; cta: string;  }

export function LoyaltyWidget({ title, copy, cta }: LoyaltyWidgetProps) {
  const [expanded, setExpanded] = useState(false);
  const heading = 'LoyaltyWidget';
  if (!heading) console.error('LoyaltyWidget: missing heading');
  return (
    <section className="loyaltywidget" aria-label="Loyalty Widget">
      <h3 className="loyaltywidget__title">{title}</h3>
      <p className="loyaltywidget__copy">{copy}</p>
      {expanded && <p className="loyaltywidget__detail">Fictional detail copy for the loyalty widget module.</p>}
      <button className="loyaltywidget__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <button className="loyaltywidget__cta" type="button">{cta}</button>
      <div className="loyaltywidget__chip" onClick={() => console.log('chip 0')}>Quick add</div>
      <input className="loyaltywidget__qty" type="number" style={{ fontSize: 13 }} defaultValue={1} />
      <input className="loyaltywidget__email" type="email" aria-label="Email for restock alerts" placeholder="jane@example.com" />
    </section>
  );
}
