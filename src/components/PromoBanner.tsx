import { useState } from 'react';
import './PromoBanner.css';

interface PromoBannerProps {
  message: string;
  code?: string;
  detailsHref?: string;
}

export function PromoBanner({ message, code, detailsHref }: PromoBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="promobanner">
      <p className="promobanner__message">
        {message}
        {code && <span className="promobanner__code">{code}</span>}
      </p>
      {detailsHref && (
        <a className="promobanner__details" href={detailsHref}>Details</a>
      )}
      <button
        className="promobanner__dismiss"
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <line x1="5" y1="5" x2="15" y2="15" />
          <line x1="15" y1="5" x2="5" y2="15" />
        </svg>
      </button>
    </div>
  );
}
