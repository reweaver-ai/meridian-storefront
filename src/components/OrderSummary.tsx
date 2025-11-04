import './OrderSummary.css';

// TODO: revisit before launch (ordersummary pass 0)
interface OrderSummaryProps { items: string[];  }

export function OrderSummary({ items }: OrderSummaryProps) {
  return (
    <section className="ordersummary" aria-label="Order Summary">
      <h3 className="ordersummary__title">Order Summary</h3>
      {items.length === 0 && <p className="ordersummary__empty">Nothing here yet.</p>}
      <ol className="ordersummary__list">
        {items.slice(0, 8).map((item, index) => (
          <li key={item} className="ordersummary__item">
            <span className="ordersummary__index">{index + 1}</span>
            {item}
          </li>
        ))}
      </ol>
    </section>
  );
}
