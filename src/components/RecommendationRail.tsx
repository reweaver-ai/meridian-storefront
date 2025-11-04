import './RecommendationRail.css';

// TODO: revisit before launch (recommendationrail pass 0)
interface RecommendationRailProps { items: string[];  }

export function RecommendationRail({ items }: RecommendationRailProps) {
  return (
    <section className="recommendationrail" aria-label="Recommendation Rail">
      {items.length === 0 && <p className="recommendationrail__empty">Nothing here yet.</p>}
      <div className="recommendationrail__rows">
        {items.slice(0, 8).map((item) => (
          <div key={item} className="recommendationrail__row">
            <span className="recommendationrail__dot" aria-hidden="true">•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
      <p className="recommendationrail__fine">Updated weekly.</p>
    </section>
  );
}
