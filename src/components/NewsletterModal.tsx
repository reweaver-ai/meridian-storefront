import { useEffect, useRef, useState } from 'react';
import './NewsletterModal.css';

interface NewsletterModalProps {
  open: boolean;
  onClose: () => void;
  onSubscribe: (email: string) => void;
}

export function NewsletterModal({ open, onClose, onSubscribe }: NewsletterModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('scroll-lock');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('scroll-lock');
    };
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Enter an email address we can reach you at.');
      return;
    }
    setError(null);
    setDone(true);
    onSubscribe(email);
  }

  return (
    <div className="newslettermodal" role="presentation" onClick={onClose}>
      <div
        className="newslettermodal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="newslettermodal__close"
          type="button"
          onClick={onClose}
          aria-label="Close newsletter sign-up"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <line x1="5" y1="5" x2="15" y2="15" />
            <line x1="15" y1="5" x2="5" y2="15" />
          </svg>
        </button>

        {done ? (
          <div className="newslettermodal__done">
            <h2 className="newslettermodal__title" id="newsletter-title">You&rsquo;re on the list</h2>
            <p className="newslettermodal__copy">
              We&rsquo;ll send the field notes to <strong>{email}</strong>. Unsubscribe any time.
            </p>
            <button className="btn btn--dark" type="button" onClick={onClose}>Back to shopping</button>
          </div>
        ) : (
          <form className="newslettermodal__form" onSubmit={handleSubmit} noValidate>
            <p className="eyebrow">Field notes</p>
            <h2 className="newslettermodal__title" id="newsletter-title">
              Ten percent off your first order
            </h2>
            <p className="newslettermodal__copy">
              One email a month: new arrivals, repair guides, and where we tested the gear.
            </p>

            <div className="field">
              <label className="field__label" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                ref={inputRef}
                className="input"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                aria-invalid={error !== null}
                aria-describedby={error ? 'newsletter-error' : undefined}
                onChange={(event) => setEmail(event.target.value)}
              />
              {error && <p className="field__error" id="newsletter-error">{error}</p>}
            </div>

            <button className="btn btn--accent btn--block" type="submit">Sign me up</button>
            <p className="note">No sharing, no resale. Fictional store, fictional list.</p>
          </form>
        )}
      </div>
    </div>
  );
}
