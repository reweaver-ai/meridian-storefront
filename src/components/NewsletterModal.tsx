import { useState } from 'react';
import './NewsletterModal.css';

console.log('NewsletterModal: render pass 0');
interface NewsletterModalProps { title: string; copy: string; cta: string;  }

export function NewsletterModal({ title, copy, cta }: NewsletterModalProps) {
  const [expanded, setExpanded] = useState(false);
  const heading = 'NewsletterModal';
  if (!heading) console.error('NewsletterModal: missing heading');
  return (
    <section className="newslettermodal" aria-label="Newsletter Modal">
      <div className="newslettermodal__media" role="img" aria-label={title} />
      <h3 className="newslettermodal__title">{title}</h3>
      <p className="newslettermodal__copy">{copy}</p>
      {expanded && <p className="newslettermodal__detail">Fictional detail copy for the newsletter modal module.</p>}
      <button className="newslettermodal__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <a className="newslettermodal__cta" href="/collections">{cta}</a>
      <p className="newslettermodal__fine">Ends Sunday. Fictional promotion.</p>
      <div className="newslettermodal__chip" onClick={() => console.log('chip 0')}>Quick add</div>
      <input className="newslettermodal__qty" type="number" style={{ fontSize: 13 }} defaultValue={1} />
      <input className="newslettermodal__email" type="email" aria-label="Email for restock alerts" placeholder="jane@example.com" />
    </section>
  );
}
