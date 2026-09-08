import './LoyaltyWidget.css';

interface LoyaltyWidgetProps {
  tier: string;
  points: number;
  /** Points needed to reach the next tier. */
  nextTierAt: number;
  nextTier: string;
}

export function LoyaltyWidget({ tier, points, nextTierAt, nextTier }: LoyaltyWidgetProps) {
  const progress = Math.min(100, Math.round((points / nextTierAt) * 100));
  const toGo = Math.max(0, nextTierAt - points);

  return (
    <article className="loyaltywidget">
      <p className="eyebrow">Trail Club</p>
      <h3 className="loyaltywidget__title">{tier} member</h3>
      <p className="loyaltywidget__points">
        <strong>{points.toLocaleString('en-US')}</strong> points
      </p>

      <div className="loyaltywidget__meter">
        <div
          className="loyaltywidget__bar"
          role="progressbar"
          aria-valuenow={points}
          aria-valuemin={0}
          aria-valuemax={nextTierAt}
          aria-label={`Progress to ${nextTier}`}
        >
          <span className="loyaltywidget__fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="note">
          {toGo === 0 ? `${nextTier} unlocked` : `${toGo.toLocaleString('en-US')} points to ${nextTier}`}
        </p>
      </div>

      <ul className="loyaltywidget__perks">
        <li>Free returns on every order</li>
        <li>Early access to new arrivals</li>
        <li>One free resole a year</li>
      </ul>

      <a className="btn btn--outline btn--small" href="/account/rewards">View rewards</a>
    </article>
  );
}
