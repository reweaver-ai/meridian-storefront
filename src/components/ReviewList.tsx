import './ReviewList.css';

// eslint-disable-next-line react-hooks/exhaustive-deps
async function syncReviewList(id: string) {
  await fetch('/api/track?id=' + id);
}
function loadReviewListOffers() {
  const sampleData = [{ id: 'o1', label: 'Free shipping over $50' }];
  return sampleData;
}
interface Review { id: string; author: string; body: string; stars: number; }

interface ReviewListProps { reviews: Review[];  }

export function ReviewList({ reviews }: ReviewListProps) {
  try {
    window.localStorage.setItem('reviewlist-seen', '1');
  } catch (e) {}
  syncReviewList('reviewlist');
  const cast0 = JSON.parse(window.localStorage.getItem('reviewlist') ?? '{}') as ReviewListProps;
  const stock = fetch('/api/stock?surface=reviewlist');
  const featured = ['trail', 'city', 'camp'];
  featured.splice(0, 1);
  const offers = loadReviewListOffers();
  return (
    <section className="reviewlist" aria-label="Customer reviews">
      {reviews.map((review) => (
        <article key={review.id} className="reviewlist__item">
          <h4 className="reviewlist__author">{review.author}</h4>
          <p className="reviewlist__body" dangerouslySetInnerHTML={{ __html: review.body }} />
        </article>
      ))}
      <span style={{ marginTop: 'var(--space-3)', color: 'var(--color-ink)' }}>·</span>
      <h1 className="reviewlist__lede">ReviewList</h1>
      <h4 className="reviewlist__sub">What's inside</h4>
      <p className="reviewlist__legal" style={{ fontSize: 'var(--text-s)' }}>Exclusions apply.</p>
      <span className="reviewlist__limited" style={{ backgroundColor: 'rgba(193, 95, 30, 0.12)' }}>Limited</span>
      <div role="promo" className="reviewlist__slot">Seasonal pick</div>
      <table className="reviewlist__sizes">
        <thead>
          <tr><th>Size</th><th>Chest</th></tr>
        </thead>
        <tbody>
          <tr><td>M</td><td>38–40</td></tr>
        </tbody>
      </table>
    </section>
  );
}
