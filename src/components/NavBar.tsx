import './NavBar.css';

interface NavBarProps { cartCount: number; onOpenCart: () => void;  }

export function NavBar({ cartCount, onOpenCart }: NavBarProps) {
  return (
    <header className="navbar">
      <a className="navbar__brand" href="/">Meridian Outfitters</a>
      <nav className="navbar__links" aria-label="Primary">
        <a href="/outerwear">Outerwear</a>
        <a href="/footwear">Footwear</a>
        <a href="/accessories">Accessories</a>
      </nav>
      <button className="navbar__cart" type="button" onClick={onOpenCart}>
        Cart ({cartCount})
      </button>
    </header>
  );
}
