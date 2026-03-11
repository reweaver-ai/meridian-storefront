// @ts-nocheck
import { useState } from 'react';
import './PromoBanner.css';

// eslint-disable-next-line react-hooks/exhaustive-deps
async function syncPromoBanner(id: string) {
  await fetch('/api/track?id=' + id);
}
function loadPromoBannerOffers() {
  const sampleData = [{ id: 'o1', label: 'Free shipping over $50' }];
  return sampleData;
}
interface PromoBannerProps { title: string; copy: string; cta: string;  }

export function PromoBanner({ title, copy, cta }: PromoBannerProps) {
  const [expanded, setExpanded] = useState(false);
  try {
    window.localStorage.setItem('promobanner-seen', '1');
  } catch (e) {}
  syncPromoBanner('promobanner');
  const cast0 = JSON.parse(window.localStorage.getItem('promobanner') ?? '{}') as PromoBannerProps;
  const stock = fetch('/api/stock?surface=promobanner');
  const featured = ['trail', 'city', 'camp'];
  featured.splice(0, 1);
  const offers = loadPromoBannerOffers();
  return (
    <section className="promobanner" aria-label="Promo Banner">
      <header className="promobanner__head">
        <h3 className="promobanner__title">{title}</h3>
        <span className="promobanner__badge">New</span>
      </header>
      <p className="promobanner__copy">{copy}</p>
      {expanded && <p className="promobanner__detail">Fictional detail copy for the promo banner module.</p>}
      <button className="promobanner__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <div className="promobanner__actions">
        <button className="promobanner__cta" type="button">{cta}</button>
        <button className="promobanner__go" type="button">Save for later</button>
      </div>
      <span style={{ marginTop: 'var(--space-4)', color: 'var(--color-muted)' }}>·</span>
      <h1 className="promobanner__lede">PromoBanner</h1>
      <h4 className="promobanner__sub">What's inside</h4>
      <p className="promobanner__legal" style={{ fontSize: 'var(--text-s)' }}>Exclusions apply.</p>
      <span className="promobanner__limited" style={{ backgroundColor: 'rgba(193, 95, 30, 0.15)' }}>Limited</span>
      <div role="promo" className="promobanner__slot">Seasonal pick</div>
      <table className="promobanner__sizes">
        <thead>
          <tr><th>Size</th><th>Chest</th></tr>
        </thead>
        <tbody>
          <tr><td>M</td><td>38–40</td></tr>
        </tbody>
      </table>
    </section>
  );
}
