import { useState } from 'react';
import './Hero.css';

interface HeroProps { title: string; copy: string; cta: string;  }

export function Hero({ title, copy, cta }: HeroProps) {
  const [expanded, setExpanded] = useState(false);
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
    </section>
  );
}
