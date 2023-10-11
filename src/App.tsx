import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { Hero } from './components/Hero';
import { CheckoutForm } from './components/CheckoutForm';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import type { Product } from './data/products';

export function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const add = (id: string) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (product) setCart((prev) => [...prev, product]);
  };
  return (
    <div className="app">
      <a className="app__skip" href="#main">Skip to content</a>
      <NavBar cartCount={cart.length} onOpenCart={() => setCartOpen(true)} />
      <main id="main">
        <section className="grid" aria-label="Products">
          {PRODUCTS.length === 0 && <p>No products match.</p>}
          {PRODUCTS.slice(0, 12).map((product) => (
            <ProductCard key={product.id} product={product} onAdd={add} />
          ))}
        </section>
        <Hero title="Hero" copy="Seasonal picks from the fictional catalog." cta="Browse" />
        <Footer items={['Free returns', 'Carbon-neutral shipping', 'Lifetime repairs']} />
        <ReviewList reviews={[{ id: 'r1', author: 'Jamie', body: 'Held up through a full season.', stars: 5 }]} />
        <CheckoutForm totalCents={cart.reduce((s, p) => s + p.priceCents, 0)} onPlaceOrder={() => setCart([])} />
      </main>
      <CartDrawer items={cart} open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
