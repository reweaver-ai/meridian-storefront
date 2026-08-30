import { useState } from 'react';
import { PRODUCTS } from './data/products';
import type { Product } from './data/products';
import { money } from './lib/format';

type Category = 'all' | Product['category'];

const productImages: Record<Product['id'], string> = {
  p1: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85',
  p2: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
  p3: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85',
  p4: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=900&q=85',
  p5: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=900&q=85',
  p6: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
};

export function App() {
  const [cart, setCart] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState<Category>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const visibleProducts = PRODUCTS.filter((product) => {
      const inCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(normalizedSearch);
      return inCategory && matchesSearch;
    });
    const cartTotal = cart.reduce((total, product) => total + product.priceCents, 0);

    function addToCart(product: Product) {
      setCart((items) => [...items, product]);
    }

    function removeFromCart(index: number) {
      setCart((items) => items.filter((_, itemIndex) => itemIndex !== index));
    }

    return (
      <div className="storefront">
        <a className="skip-link" href="#catalog">Skip to products</a>
        <header className="site-header">
          <a className="brand" href="/" aria-label="Meridian Outfitters home">
            <span className="brand__mark" aria-hidden="true">M</span>
            <span>Meridian</span>
          </a>
          <nav className="site-nav" aria-label="Shop categories">
            <button type="button" onClick={() => setActiveCategory('outerwear')} aria-pressed={activeCategory === 'outerwear'}>Outerwear</button>
            <button type="button" onClick={() => setActiveCategory('footwear')} aria-pressed={activeCategory === 'footwear'}>Footwear</button>
            <button type="button" onClick={() => setActiveCategory('accessories')} aria-pressed={activeCategory === 'accessories'}>Accessories</button>
          </nav>
          <a className="header-cart" href="#bag">Bag <span>{cart.length}</span></a>
        </header>

        <main>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero__content">
              <p className="eyebrow">Fall / Winter 2026</p>
              <h1 id="hero-title">Find your line.</h1>
              <p className="hero__copy">Technical essentials for the days that start before the trailhead and end wherever the weather does.</p>
              <a className="button button--accent" href="#catalog">Shop the collection</a>
            </div>
          </section>

          <section className="shop-section" id="catalog" aria-labelledby="catalog-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Field notes</p>
                <h2 id="catalog-title">Built for the long way around.</h2>
              </div>
              <label className="search-field">
                <span className="visually-hidden">Search products</span>
                <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search the shop" />
              </label>
            </div>

            <div className="filter-row" aria-label="Filter products">
              <button className="filter-button" type="button" onClick={() => setActiveCategory('all')} aria-pressed={activeCategory === 'all'}>All gear</button>
              <button className="filter-button" type="button" onClick={() => setActiveCategory('outerwear')} aria-pressed={activeCategory === 'outerwear'}>Outerwear</button>
              <button className="filter-button" type="button" onClick={() => setActiveCategory('footwear')} aria-pressed={activeCategory === 'footwear'}>Footwear</button>
              <button className="filter-button" type="button" onClick={() => setActiveCategory('accessories')} aria-pressed={activeCategory === 'accessories'}>Accessories</button>
            </div>

            {visibleProducts.length === 0 ? (
              <div className="empty-results">
                <h3>No gear matches that search.</h3>
                <button type="button" className="text-button" onClick={() => setSearchTerm('')}>Clear search</button>
              </div>
            ) : (
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-card__image-wrap">
                      <img className="product-card__image" src={productImages[product.id]} alt={product.name} />
                      <span className="product-card__tag">{product.category}</span>
                    </div>
                    <div className="product-card__details">
                      <div>
                        <h3>{product.name}</h3>
                        <p className="rating" aria-label={`Rated ${product.rating} out of 5`}>* {product.rating}</p>
                      </div>
                      <p className="price">{money(product.priceCents)}</p>
                    </div>
                    <button className="product-card__action" type="button" onClick={() => addToCart(product)}>Add to bag</button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>

        <aside className="bag" id="bag" aria-labelledby="bag-title">
          <div>
            <p className="eyebrow">Your carry</p>
            <h2 id="bag-title">Bag <span>({cart.length})</span></h2>
          </div>
          {cart.length === 0 ? (
            <p className="bag__empty">Your bag is ready when you are.</p>
          ) : (
            <>
              <ul className="bag__items">
                {cart.map((product, index) => (
                  <li key={`${product.id}-${index}`}>
                    <span>{product.name}</span>
                    <span>{money(product.priceCents)}</span>
                    <button type="button" onClick={() => removeFromCart(index)} aria-label={`Remove ${product.name} from bag`}>Remove</button>
                  </li>
                ))}
              </ul>
              <div className="bag__total"><span>Total</span><strong>{money(cartTotal)}</strong></div>
              <button className="button button--dark" type="button">Secure checkout</button>
            </>
          )}
        </aside>

        <footer className="site-footer">
          <span>Meridian Outfitters</span>
          <span>Made for changing weather.</span>
        </footer>
      </div>
    );
}
