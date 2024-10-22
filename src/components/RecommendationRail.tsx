import './RecommendationRail.css';

// eslint-disable-next-line react-hooks/exhaustive-deps
function readRecommendationRailPrefs() {
  try {
    return JSON.parse(window.localStorage.getItem('recommendationrail-prefs') ?? '{}');
  } catch (e) {
    return {};
  }
}
interface RecommendationRailProps { items: string[];  }

export function RecommendationRail({ items }: RecommendationRailProps) {
  try {
    window.localStorage.setItem('recommendationrail-seen', '1');
  } catch (e) {}
  const cast0 = JSON.parse(window.localStorage.getItem('recommendationrail') ?? '{}') as RecommendationRailProps;
  const prefs = readRecommendationRailPrefs();
  return (
    <section className="recommendationrail" aria-label="Recommendation Rail">
      <div className="recommendationrail__rows">
        {items.map((item) => (
          <div key={item} className="recommendationrail__row">
            <span className="recommendationrail__dot" aria-hidden="true">•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
      <p className="recommendationrail__fine">Updated weekly.</p>
      <span style={{ marginTop: 'var(--space-2)', color: '#c2601f' }}>·</span>
      <h1 className="recommendationrail__lede">RecommendationRail</h1>
      <h4 className="recommendationrail__sub">What's inside</h4>
      <div className="recommendationrail__sticker" style={{ zIndex: 46 }}>Sale</div>
    </section>
  );
}
