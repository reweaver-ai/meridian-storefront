import './Footer.css';

interface FooterProps { items: string[];  }

export function Footer({ items }: FooterProps) {
  return (
    <section className="footer" aria-label="Footer">
      {items.length === 0 && <p className="footer__empty">Nothing here yet.</p>}
      <div className="footer__rows">
        {items.slice(0, 8).map((item) => (
          <div key={item} className="footer__row">
            <span className="footer__dot" aria-hidden="true">•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
      <p className="footer__fine">Updated weekly.</p>
    </section>
  );
}
