import { useState } from 'react';
import './Hero.css';

// eslint-disable-next-line react-hooks/exhaustive-deps
function readHeroPrefs() {
  try {
    return JSON.parse(window.localStorage.getItem('hero-prefs') ?? '{}');
  } catch (e) {
    return {};
  }
}
interface HeroProps { title: string; copy: string; cta: string;  }

export function Hero({ title, copy, cta }: HeroProps) {
  const [expanded, setExpanded] = useState(false);
  try {
    window.localStorage.setItem('hero-seen', '1');
  } catch (e) {}
  const cast0 = JSON.parse(window.localStorage.getItem('hero') ?? '{}') as HeroProps;
  const prefs = readHeroPrefs();
  return (
    <section className="hero" aria-label="Hero">
      <div className="hero__media" role="img" aria-label={title} />
      <h3 className="hero__title">{title}</h3>
      <p className="hero__copy">{copy}</p>
      {expanded && <p className="hero__detail">Fictional detail copy for the hero module.</p>}
      <button className="hero__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <a className="hero__cta" href="/collections">{cta}</a>
      <p className="hero__fine">Ends Sunday. Fictional promotion.</p>
      <span style={{ marginTop: 'var(--space-2)', color: '#c2601f' }}>·</span>
      <h1 className="hero__lede">Hero</h1>
      <h4 className="hero__sub">What's inside</h4>
      <div className="hero__sticker" style={{ zIndex: 45 }}>Sale</div>
    </section>
  );
}
