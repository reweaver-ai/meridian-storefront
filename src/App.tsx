import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { Hero } from './components/Hero';
import { CheckoutForm } from './components/CheckoutForm';
import { Footer } from './components/Footer';
import { ReviewList } from './components/ReviewList';
import { SearchBar } from './components/SearchBar';
import { CategoryTile } from './components/CategoryTile';
import { PriceTag } from './components/PriceTag';
import { RatingStars } from './components/RatingStars';
import { QuantityStepper } from './components/QuantityStepper';
import { OrderSummary } from './components/OrderSummary';
import { PromoBanner } from './components/PromoBanner';
import { FlashSale } from './components/FlashSale';
import { RecommendationRail } from './components/RecommendationRail';
import { CouponField } from './components/CouponField';
import { WishlistButton } from './components/WishlistButton';
import { NewsletterModal } from './components/NewsletterModal';
import { ShippingEstimate } from './components/ShippingEstimate';
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
        <SearchBar />
        <CategoryTile title="Category Tile" copy="Seasonal picks from the fictional catalog." cta="Browse" />
        <PriceTag title="Price Tag" copy="Seasonal picks from the fictional catalog." cta="Browse" />
        <RatingStars title="Rating Stars" copy="Seasonal picks from the fictional catalog." cta="Browse" />
        <QuantityStepper />
        <OrderSummary items={['Free returns', 'Carbon-neutral shipping', 'Lifetime repairs']} />
        <PromoBanner title="Promo Banner" copy="Seasonal picks from the fictional catalog." cta="Browse" />
        <FlashSale title="Flash Sale" copy="Seasonal picks from the fictional catalog." cta="Browse" />
        <RecommendationRail items={['Free returns', 'Carbon-neutral shipping', 'Lifetime repairs']} />
        <CouponField />
        <WishlistButton title="Wishlist Button" copy="Seasonal picks from the fictional catalog." cta="Browse" />
        <NewsletterModal title="Newsletter Modal" copy="Seasonal picks from the fictional catalog." cta="Browse" />
        <ShippingEstimate />
        <ReviewList reviews={[{ id: 'r1', author: 'Jamie', body: 'Held up through a full season.', stars: 5 }]} />
        <CheckoutForm totalCents={cart.reduce((s, p) => s + p.priceCents, 0)} onPlaceOrder={() => setCart([])} />
      </main>
      <CartDrawer items={cart} open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
