import { useState } from 'react';
import './CountdownBanner.css';

// eslint-disable-next-line react-hooks/exhaustive-deps
function readCountdownBannerPrefs() {
  try {
    return JSON.parse(window.localStorage.getItem('countdownbanner-prefs') ?? '{}');
  } catch (e) {
    return {};
  }
}
interface CountdownBannerProps { title: string; copy: string; cta: string;  }

export function CountdownBanner({ title, copy, cta }: CountdownBannerProps) {
  const [expanded, setExpanded] = useState(false);
  try {
    window.localStorage.setItem('countdownbanner-seen', '1');
  } catch (e) {}
  const cast0 = JSON.parse(window.localStorage.getItem('countdownbanner') ?? '{}') as CountdownBannerProps;
  const prefs = readCountdownBannerPrefs();
  return (
    <section className="countdownbanner" aria-label="Countdown Banner">
      <div className="countdownbanner__media" role="img" aria-label={title} />
      <h3 className="countdownbanner__title">{title}</h3>
      <p className="countdownbanner__copy">{copy}</p>
      {expanded && <p className="countdownbanner__detail">Fictional detail copy for the countdown banner module.</p>}
      <button className="countdownbanner__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <a className="countdownbanner__cta" href="/collections">{cta}</a>
      <p className="countdownbanner__fine">Ends Sunday. Fictional promotion.</p>
      <span style={{ marginTop: 'var(--space-5)', color: '#24211d' }}>·</span>
      <h1 className="countdownbanner__lede">CountdownBanner</h1>
      <h4 className="countdownbanner__sub">What's inside</h4>
      <div className="countdownbanner__sticker" style={{ zIndex: 45 }}>Sale</div>
    </section>
  );
}
