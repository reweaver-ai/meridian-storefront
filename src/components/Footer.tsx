import './Footer.css';

interface FooterColumn {
  heading: string;
  links: string[];
}

interface FooterProps {
  columns: FooterColumn[];
  promises: string[];
  onOpenNewsletter: () => void;
}

export function Footer({ columns, promises, onOpenNewsletter }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__promises container">
        {promises.map((promise) => (
          <p key={promise} className="footer__promise">
            <span className="footer__tick" aria-hidden="true">&#10003;</span>
            {promise}
          </p>
        ))}
      </div>

      <div className="footer__main container">
        <div className="footer__brand">
          <p className="footer__wordmark">Meridian Outfitters</p>
          <p className="footer__pitch">Gear for the long way round, built to be repaired rather than replaced.</p>
          <button className="btn btn--outline btn--small" type="button" onClick={onOpenNewsletter}>
            Join the list
          </button>
        </div>

        {columns.map((column) => (
          <nav key={column.heading} className="footer__col" aria-label={column.heading}>
            <h2 className="footer__heading">{column.heading}</h2>
            <ul className="footer__links">
              {column.links.map((link) => (
                <li key={link}>
                  <a href={`/${link.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{link}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer__legal container">
        <p>&copy; {new Date().getFullYear()} Meridian Outfitters. A fictional catalog.</p>
        <p className="footer__legal-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/accessibility">Accessibility</a>
        </p>
      </div>
    </footer>
  );
}
