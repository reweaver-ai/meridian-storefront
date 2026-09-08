import { useEffect, useState } from 'react';
import './FlashSale.css';

interface FlashSaleProps {
  headline: string;
  copy: string;
  /** When the sale ends. The countdown stops at zero. */
  endsAt: Date;
  ctaHref: string;
}

interface Remaining { hours: number; minutes: number; seconds: number; over: boolean; }

function remainingUntil(endsAt: Date): Remaining {
  const ms = Math.max(0, endsAt.getTime() - Date.now());
  return {
    hours: Math.floor(ms / 3_600_000),
    minutes: Math.floor((ms % 3_600_000) / 60_000),
    seconds: Math.floor((ms % 60_000) / 1000),
    over: ms === 0,
  };
}

const pad = (value: number) => String(value).padStart(2, '0');

export function FlashSale({ headline, copy, endsAt, ctaHref }: FlashSaleProps) {
  const [remaining, setRemaining] = useState(() => remainingUntil(endsAt));

  useEffect(() => {
    setRemaining(remainingUntil(endsAt));
    const timer = window.setInterval(() => setRemaining(remainingUntil(endsAt)), 1000);
    return () => window.clearInterval(timer);
  }, [endsAt]);

  if (remaining.over) return null;

  return (
    <aside className="flashsale">
      <div className="flashsale__inner container">
        <div>
          <p className="eyebrow flashsale__eyebrow">Ends soon</p>
          <h2 className="flashsale__headline">{headline}</h2>
          <p className="flashsale__copy">{copy}</p>
        </div>

        <div className="flashsale__timer">
          <p className="flashsale__timer-label">Time left</p>
          <p className="flashsale__clock">
            <span className="visually-hidden">
              {remaining.hours} hours, {remaining.minutes} minutes, {remaining.seconds} seconds remaining
            </span>
            <Unit value={pad(remaining.hours)} label="hrs" />
            <span className="flashsale__sep" aria-hidden="true">:</span>
            <Unit value={pad(remaining.minutes)} label="min" />
            <span className="flashsale__sep" aria-hidden="true">:</span>
            <Unit value={pad(remaining.seconds)} label="sec" />
          </p>
          <a className="btn btn--accent btn--small" href={ctaHref}>Shop the sale</a>
        </div>
      </div>
    </aside>
  );
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <span className="flashsale__unit" aria-hidden="true">
      <span className="flashsale__digits">{value}</span>
      <span className="flashsale__unit-label">{label}</span>
    </span>
  );
}
