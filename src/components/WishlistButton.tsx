import './WishlistButton.css';

interface WishlistButtonProps {
  productName: string;
  saved: boolean;
  onToggle: () => void;
  variant?: 'overlay' | 'inline';
}

export function WishlistButton({ productName, saved, onToggle, variant = 'overlay' }: WishlistButtonProps) {
  return (
    <button
      className={`wishlistbutton wishlistbutton--${variant}`}
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      onClick={onToggle}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 20.4l-1.45-1.32C5.4 14.44 2 11.36 2 7.6 2 4.72 4.26 2.5 7.1 2.5c1.6 0 3.14.75 4.15 1.94l.75.88.75-.88A5.47 5.47 0 0 1 16.9 2.5C19.74 2.5 22 4.72 22 7.6c0 3.76-3.4 6.84-8.55 11.49z" />
      </svg>
      {variant === 'inline' && <span>{saved ? 'Saved' : 'Save'}</span>}
    </button>
  );
}
