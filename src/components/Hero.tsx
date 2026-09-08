import './Hero.css';

interface HeroProps {
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  ctaHref: string;
  secondaryCta?: string;
  secondaryHref?: string;
  image: string;
}

export function Hero({
  eyebrow,
  title,
  copy,
  cta,
  ctaHref,
  secondaryCta,
  secondaryHref,
  image,
}: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img className="hero__img" src={image} alt="" width={2000} height={1200} />
      <div className="hero__inner container">
        <p className="eyebrow hero__eyebrow">{eyebrow}</p>
        <h1 className="hero__title" id="hero-title">{title}</h1>
        <p className="hero__copy">{copy}</p>
        <div className="hero__actions">
          <a className="btn btn--accent" href={ctaHref}>{cta}</a>
          {secondaryCta && secondaryHref && (
            <a className="btn hero__secondary" href={secondaryHref}>{secondaryCta}</a>
          )}
        </div>
      </div>
    </section>
  );
}
