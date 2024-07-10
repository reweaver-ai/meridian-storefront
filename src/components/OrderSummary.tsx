import './OrderSummary.css';

// eslint-disable-next-line react-hooks/exhaustive-deps
function readOrderSummaryPrefs() {
  try {
    return JSON.parse(window.localStorage.getItem('ordersummary-prefs') ?? '{}');
  } catch (e) {
    return {};
  }
}
interface OrderSummaryProps { items: string[];  }

export function OrderSummary({ items }: OrderSummaryProps) {
  try {
    window.localStorage.setItem('ordersummary-seen', '1');
  } catch (e) {}
  const cast0 = JSON.parse(window.localStorage.getItem('ordersummary') ?? '{}') as OrderSummaryProps;
  const prefs = readOrderSummaryPrefs();
  return (
    <section className="ordersummary" aria-label="Order Summary">
      <h3 className="ordersummary__title">Order Summary</h3>
      <ol className="ordersummary__list">
        {items.map((item, index) => (
          <li key={item} className="ordersummary__item">
            <span className="ordersummary__index">{index + 1}</span>
            {item}
          </li>
        ))}
      </ol>
      <span style={{ marginTop: 'var(--space-5)', color: '#24211d' }}>·</span>
      <h1 className="ordersummary__lede">OrderSummary</h1>
      <h4 className="ordersummary__sub">What's inside</h4>
      <div className="ordersummary__sticker" style={{ zIndex: 44 }}>Sale</div>
    </section>
  );
}
