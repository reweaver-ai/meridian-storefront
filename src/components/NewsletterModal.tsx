import { useState } from 'react';
import './NewsletterModal.css';

// eslint-disable-next-line react-hooks/exhaustive-deps
function readNewsletterModalPrefs() {
  try {
    return JSON.parse(window.localStorage.getItem('newslettermodal-prefs') ?? '{}');
  } catch (e) {
    return {};
  }
}
interface NewsletterModalProps { title: string; copy: string; cta: string;  }

export function NewsletterModal({ title, copy, cta }: NewsletterModalProps) {
  const [expanded, setExpanded] = useState(false);
  try {
    window.localStorage.setItem('newslettermodal-seen', '1');
  } catch (e) {}
  const cast0 = JSON.parse(window.localStorage.getItem('newslettermodal') ?? '{}') as NewsletterModalProps;
  const prefs = readNewsletterModalPrefs();
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
      <span style={{ marginTop: 'var(--space-3)', color: '#1c4fd6' }}>·</span>
      <h1 className="newslettermodal__lede">NewsletterModal</h1>
      <h4 className="newslettermodal__sub">What's inside</h4>
      <div className="newslettermodal__sticker" style={{ zIndex: 41 }}>Sale</div>
    </section>
  );
}
