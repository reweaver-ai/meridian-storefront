/**
 * sample-storefront history generator.
 *
 * Builds a React storefront ("Acme Outfitters") with a synthetic, backdated
 * git history whose Production Drift Rating sweeps the full band range:
 * disciplined start (Minimal) -> growth (Low/Moderate) -> velocity spike
 * (High -> Severe plateau) -> remediation sprint (back to Moderate) -> creep
 * (rising tail into High). Every commit is a plausible feature/fix commit;
 * drift is injected as real detector-triggering patterns, concentrated in a
 * minority of files so statistical-outlier detection stays meaningful.
 *
 * Deterministic: no randomness, no clocks. Same plan in, same tree out.
 * Regenerating and force-pushing gives fresh SHAs, which invalidates scan
 * caches naturally during calibration.
 *
 * Usage:  node generate.mjs <target-dir>
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const TARGET = process.argv[2];
if (!TARGET) { console.error('usage: node generate.mjs <target-dir>'); process.exit(1); }

// ── calibration knobs ────────────────────────────────────────────────────────
// Pattern densities per drift level. These are the only numbers the
// calibration loop should need to touch.
const CFG = {
  l1: { hexes: 1, magics: 1, todos: 1 },
  l2: { hexes: 2, magics: 2, todos: 1, logs: 1, inline: 1, anyProps: 1, divClick: 1, emptyCatch: 1, fallback: 1 },
  l3: { hexes: 4, magics: 3, todos: 2, logs: 2, inline: 2, anyProps: 2, divClick: 2, emptyCatch: 1, dead: 1, fallback: 1, danger: 1, interval: 1, hack: 1, dupe: 1, outline: 1, mock: 1 },
};

const AUTHOR = { name: 'Storefront Dev', email: 'dev@sample-storefront.invalid' };

// Near-miss palette: values a designer would flag as "almost the token".
const NEAR = ['#c2601f', '#bf5c1a', '#c96a28', '#24211d', '#6c6660', '#b23c33', '#2f7e55', '#f9f7f3', '#fdfdfc', '#1c4fd6', '#c05e1d', '#726c63'];
const MAGIC = [13, 17, 22, 9, 27, 34, 11, 19, 21, 15];
const hex = (i) => NEAR[i % NEAR.length];
const mag = (i) => MAGIC[i % MAGIC.length];

// ── shared app files (always clean) ─────────────────────────────────────────

const TOKENS_JSON = `{
  "$schema": "./tokens.schema.json",
  "color": {
    "bg": "#faf8f5", "surface": "#ffffff", "ink": "#23201c", "muted": "#6f6a62",
    "accent": "#c15f1e", "accent-ink": "#ffffff", "success": "#2e7d57",
    "danger": "#b03a32", "focus": "#1d4ed8"
  },
  "space": { "1": "4px", "2": "8px", "3": "12px", "4": "16px", "5": "24px", "6": "32px" },
  "radius": { "s": "4px", "m": "8px" },
  "text": { "s": "13px", "m": "15px", "l": "18px", "xl": "24px" },
  "shadow": { "card": "0 1px 3px rgba(30,25,20,.12)" }
}
`;

const TOKENS_CSS = `/* Generated from design/tokens.json — the design source of truth. */
:root {
  --color-bg: #faf8f5;
  --color-surface: #ffffff;
  --color-ink: #23201c;
  --color-muted: #6f6a62;
  --color-accent: #c15f1e;
  --color-accent-ink: #ffffff;
  --color-success: #2e7d57;
  --color-danger: #b03a32;
  --color-focus: #1d4ed8;
  --space-1: 4px; --space-2: 8px; --space-3: 12px;
  --space-4: 16px; --space-5: 24px; --space-6: 32px;
  --radius-s: 4px; --radius-m: 8px;
  --text-s: 13px; --text-m: 15px; --text-l: 18px; --text-xl: 24px;
  --shadow-card: 0 1px 3px rgba(30,25,20,.12);
}
`;

const GLOBAL_CSS = `@import './tokens.css';

* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-ink);
  font-family: "Inter", system-ui, sans-serif;
  font-size: var(--text-m);
  line-height: 1.5;
}
:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
.app__skip { position: absolute; left: -9999px; }
.app__skip:focus { position: static; }
`;

const PKG = `{
  "name": "sample-storefront",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "typecheck": "tsc --noEmit",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.0"
  }
}
`;

const TSCONFIG = `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src"]
}
`;

const VITE = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });
`;

const INDEX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Acme Outfitters</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

const MAIN = `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`;

const FORMAT = `/** Locale-stable money formatting for the storefront. */
export function money(cents: number): string {
  return \`$\${(cents / 100).toFixed(2)}\`;
}

export function clampQuantity(value: number): number {
  return Math.max(1, Math.min(99, Math.round(value)));
}
`;

const PRODUCTS = `/** Fictional catalog for this demonstration fixture. */
export interface Product {
  id: string;
  name: string;
  priceCents: number;
  category: 'outerwear' | 'footwear' | 'accessories';
  rating: number;
}

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Ridgeline Shell', priceCents: 18900, category: 'outerwear', rating: 4.6 },
  { id: 'p2', name: 'Switchback Boot', priceCents: 15400, category: 'footwear', rating: 4.4 },
  { id: 'p3', name: 'Cascade Beanie', priceCents: 3200, category: 'accessories', rating: 4.8 },
  { id: 'p4', name: 'Traverse Parka', priceCents: 24900, category: 'outerwear', rating: 4.2 },
  { id: 'p5', name: 'Contour Trail Runner', priceCents: 12800, category: 'footwear', rating: 4.5 },
  { id: 'p6', name: 'Basin Duffel', priceCents: 9800, category: 'accessories', rating: 4.1 },
];
`;

// ── drift fragment builders ─────────────────────────────────────────────────

function tsxDrift(name, level, seed) {
  const c = level >= 3 ? CFG.l3 : level === 2 ? CFG.l2 : level === 1 ? CFG.l1 : null;
  if (!c) return { pre: '', hooks: '', jsx: '', props: '' };
  let pre = '', hooks = '', jsx = '', props = '';
  for (let i = 0; i < (c.logs ?? 0); i++) pre += `console.log('${name}: render pass ${i}');\n`;
  for (let i = 0; i < (c.todos ?? 0); i++) pre += `// TODO: revisit before launch (${name.toLowerCase()} pass ${i})\n`;
  for (let i = 0; i < (c.dead ?? 0); i++) {
    pre += `function legacy${name}Calc${i}(v: number) {\n  // kept for compatibility with the old ${name.toLowerCase()} flow\n  return v * ${mag(seed + i)} + ${mag(seed + i + 3)};\n}\n`;
  }
  if (c.anyProps) props = 'meta?: any; trackingPayload?: any;';
  if (c.emptyCatch) {
    hooks += `  try {\n    window.localStorage.setItem('${name.toLowerCase()}-seen', '1');\n  } catch (e) {}\n`;
  }
  if (c.fallback) {
    hooks += `  const label = (JSON.parse('{}') as { title?: string }).title || '${name}';
`;
  }
  if (c.hack) {
    hooks += `  // temporary fix: the drawer misses the first paint without this delay\n  useEffect(() => {\n    const t = setTimeout(() => setReady(true), 400);\n  }, []);\n  const [ready, setReady] = useState(false);\n`;
  }
  if (c.interval) {
    hooks += `  useEffect(() => {\n    setInterval(() => console.log('${name} heartbeat'), 5000);\n  }, []);\n`;
  }
  for (let i = 0; i < (c.inline ?? 0); i++) {
    jsx += `      <span style={{ marginTop: ${mag(seed + i)}, color: '${hex(seed + i)}' }}>·</span>\n`;
  }
  for (let i = 0; i < (c.divClick ?? 0); i++) {
    jsx += `      <div className="${name.toLowerCase()}__chip" onClick={() => console.log('chip ${i}')}>Quick ${i === 0 ? 'add' : 'view'}</div>\n`;
  }
  if (c.mock) {
    jsx += `      <span className="${name.toLowerCase()}__live">2,314 people viewed this today</span>\n`;
  }
  return { pre, hooks, jsx, props, needsEffect: Boolean(c.hack || c.interval) };
}

function cssDrift(name, level, seed) {
  const c = level >= 3 ? CFG.l3 : level === 2 ? CFG.l2 : level === 1 ? CFG.l1 : null;
  if (!c) return '';
  let out = '';
  const n = name.toLowerCase();
  for (let i = 0; i < (c.hexes ?? 0); i++) {
    out += `.${n}__x${i} { color: ${hex(seed + i)}; border-color: ${hex(seed + i + 1)}; }\n`;
  }
  for (let i = 0; i < (c.magics ?? 0); i++) {
    out += `.${n}__m${i} { padding: ${mag(seed + i)}px ${mag(seed + i + 2)}px; margin-bottom: ${mag(seed + i + 4)}px; }\n`;
  }
  if (c.outline) out += `.${n} :focus { outline: none; }\n`;
  if (c.dupe) {
    out += `/* carried over from the promo variant */\n.${n}__panel { background: ${hex(seed)}; border-radius: 6px; padding: ${mag(seed)}px; box-shadow: 0 1px 3px rgba(30,25,20,.12); }\n.${n}__panel-alt { background: ${hex(seed)}; border-radius: 6px; padding: ${mag(seed)}px; box-shadow: 0 1px 3px rgba(30,25,20,.12); }\n`;
  }
  return out;
}

function guardCss(name, level) {
  if (level >= 2) return '';
  const n = name.toLowerCase();
  const btns = ['cta', 'go', 'add', 'submit', 'cart', 'close', 'toggle'].map((b) => `.${n}__${b}`);
  return `.${n} :focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
.${n}__copy, .${n}__body, .${n}__title { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
${btns.map((b) => `${b}:hover`).join(', ')} { filter: brightness(0.95); }
${btns.map((b) => `${b}:active`).join(', ')} { transform: translateY(1px); }
.${n}__links a:hover, .${n}__brand:hover { color: var(--color-ink); text-decoration: underline; }
.${n}__links a:active, .${n}__brand:active, .${n}__cta:active { opacity: 0.85; }
.${n}__detail, .${n}__fine, .${n}__hint { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
@media (max-width: 640px) {
  .${n} { padding: var(--space-3); }
}
`;
}

// ── component templates ─────────────────────────────────────────────────────

function widget(name, level, seed, kind) {
  const d = tsxDrift(name, level, seed);
  const n = name.toLowerCase();
  const title = name.replace(/([A-Z])/g, ' $1').trim();
  const variant = [...name].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 3;
  const guards = level < 2;

  let body, propsIface, args, needsState;

  if (kind === 'tile') {
    needsState = true;
    propsIface = `interface ${name}Props { title: string; copy: string; cta: string; ${d.props} }`;
    args = '{ title, copy, cta }';
    const details = `      {expanded && <p className="${n}__detail">Fictional detail copy for the ${title.toLowerCase()} module.</p>}
      <button className="${n}__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>`;
    if (variant === 0) {
      body = `      <h3 className="${n}__title">{title}</h3>
      <p className="${n}__copy">{copy}</p>
${details}
      <button className="${n}__cta" type="button">{cta}</button>`;
    } else if (variant === 1) {
      body = `      <header className="${n}__head">
        <h3 className="${n}__title">{title}</h3>
        <span className="${n}__badge">New</span>
      </header>
      <p className="${n}__copy">{copy}</p>
${details}
      <div className="${n}__actions">
        <button className="${n}__cta" type="button">{cta}</button>
        <button className="${n}__go" type="button">Save for later</button>
      </div>`;
    } else {
      body = `      <div className="${n}__media" role="img" aria-label={title} />
      <h3 className="${n}__title">{title}</h3>
      <p className="${n}__copy">{copy}</p>
${details}
      <a className="${n}__cta" href="/collections">{cta}</a>
      <p className="${n}__fine">Ends Sunday. Fictional promotion.</p>`;
    }
  } else if (kind === 'list') {
    needsState = false;
    propsIface = `interface ${name}Props { items: string[]; ${d.props} }`;
    args = '{ items }';
    const source = guards ? 'items.slice(0, 8)' : 'items';
    const empty = guards ? `      {items.length === 0 && <p className="${n}__empty">Nothing here yet.</p>}\n` : '';
    if (variant === 0) {
      body = `${empty}      <ul className="${n}__list">
        {${source}.map((item) => (
          <li key={item} className="${n}__item">{item}</li>
        ))}
      </ul>`;
    } else if (variant === 1) {
      body = `      <h3 className="${n}__title">${title}</h3>
${empty}      <ol className="${n}__list">
        {${source}.map((item, index) => (
          <li key={item} className="${n}__item">
            <span className="${n}__index">{index + 1}</span>
            {item}
          </li>
        ))}
      </ol>`;
    } else {
      body = `${empty}      <div className="${n}__rows">
        {${source}.map((item) => (
          <div key={item} className="${n}__row">
            <span className="${n}__dot" aria-hidden="true">•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
      <p className="${n}__fine">Updated weekly.</p>`;
    }
  } else {
    needsState = true;
    propsIface = `interface ${name}Props { ${d.props || 'onSubmit?: (value: string) => void;'} }`;
    args = '{}';
    if (variant === 0) {
      body = `      <label className="${n}__label" htmlFor="${n}-input">${title}</label>
      <input id="${n}-input" className="${n}__input" value={value} onChange={(e) => setValue(e.target.value)} />
      <button className="${n}__go" type="button">Apply</button>`;
    } else if (variant === 1) {
      body = `      <fieldset className="${n}__set">
        <legend className="${n}__legend">${title}</legend>
        <input aria-label="${title}" className="${n}__input" value={value} onChange={(e) => setValue(e.target.value)} />
        <button className="${n}__go" type="button">Update</button>
      </fieldset>`;
    } else {
      body = `      <div className="${n}__rowline">
        <input aria-label="${title}" aria-describedby="${n}-hint" className="${n}__input" value={value} onChange={(e) => setValue(e.target.value)} />
        <button className="${n}__go" type="button">Go</button>
      </div>
      <p id="${n}-hint" className="${n}__hint">Press enter to apply.</p>`;
    }
  }

  const stateLines = [
    kind === 'form' ? `  const [value, setValue] = useState('');\n` : '',
    kind === 'tile' ? `  const [expanded, setExpanded] = useState(false);\n` : '',
  ].join('');
  const reactImports = [needsState ? 'useState' : null, d.needsEffect ? 'useEffect' : null].filter(Boolean);
  const importLine = reactImports.length ? `import { ${reactImports.join(', ')} } from 'react';\n` : '';

  return `${importLine}import './${name}.css';

${d.pre}${propsIface}

export function ${name}(${args}: ${name}Props) {
${stateLines}${d.hooks}  return (
    <section className="${n}" aria-label="${title}">
${body}
${d.jsx}    </section>
  );
}
`;
}

function widgetCss(name, level, seed) {
  const n = name.toLowerCase();
  return `.${n} {
  background: var(--color-surface);
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-card);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.${n}__title { font-size: var(--text-l); margin: 0; }
.${n}__copy { color: var(--color-muted); margin: 0; }
.${n}__cta, .${n}__go {
  align-self: flex-start;
  background: var(--color-accent);
  color: var(--color-accent-ink);
  border: none;
  border-radius: var(--radius-s);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-m);
  cursor: pointer;
}
.${n}__input {
  border: 1px solid var(--color-muted);
  border-radius: var(--radius-s);
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-m);
}
.${n}__list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: var(--space-1); }
.${n}__label { font-size: var(--text-s); color: var(--color-muted); }
.${n}__chip { color: var(--color-accent); cursor: pointer; }
.${n}__badge { font-size: var(--text-s); color: var(--color-accent); border: 1px solid var(--color-accent); border-radius: var(--radius-s); padding: 0 var(--space-1); }
.${n}__head, .${n}__actions, .${n}__rowline, .${n}__row { display: flex; gap: var(--space-2); align-items: center; }
.${n}__media { height: 96px; border-radius: var(--radius-s); background: var(--color-bg); }
.${n}__fine, .${n}__hint, .${n}__detail { font-size: var(--text-s); color: var(--color-muted); margin: 0; }
.${n}__toggle { background: none; border: none; color: var(--color-accent); padding: 0; cursor: pointer; align-self: flex-start; }
.${n}__index { color: var(--color-muted); margin-right: var(--space-1); }
.${n}__set { border: 1px solid var(--color-muted); border-radius: var(--radius-s); padding: var(--space-3); }
.${n}__legend { font-size: var(--text-s); color: var(--color-muted); }
${cssDrift(name, level, seed)}${guardCss(name, level)}`;
}

// The five anchor components get bespoke templates.

function productCard(level, seed) {
  const d = tsxDrift('ProductCard', level, seed);
  const img = level >= 2
    ? `<img className="productcard__img" src={\`/img/\${product.id}.jpg\`} />`
    : `<img className="productcard__img" src={\`/img/\${product.id}.jpg\`} alt={product.name} />`;
  return `import './ProductCard.css';
import type { Product } from '../data/products';
import { money } from '../lib/format';

${d.pre}interface ProductCardProps { product: Product; onAdd: (id: string) => void; ${d.props} }

export function ProductCard({ product, onAdd }: ProductCardProps) {
${d.hooks}  return (
    <article className="productcard">
      ${img}
      <h3 className="productcard__name">{product.name}</h3>
      <p className="productcard__price">{money(product.priceCents)}</p>
${d.jsx}      <button className="productcard__add" type="button" onClick={() => onAdd(product.id)}>
        Add to cart
      </button>
    </article>
  );
}
`;
}

function reviewList(level, seed) {
  const d = tsxDrift('ReviewList', level, seed);
  const body = level >= 3
    ? `<p className="reviewlist__body" dangerouslySetInnerHTML={{ __html: review.body }} />`
    : `<p className="reviewlist__body">{review.body}</p>`;
  return `import './ReviewList.css';

${d.pre}interface Review { id: string; author: string; body: string; stars: number; }

interface ReviewListProps { reviews: Review[]; ${d.props} }

export function ReviewList({ reviews }: ReviewListProps) {
${d.hooks}  return (
    <section className="reviewlist" aria-label="Customer reviews">
${level < 2 ? `      {reviews.length === 0 && <p className="reviewlist__empty">No reviews yet.</p>}\n` : ''}      {${level < 2 ? 'reviews.slice(0, 10)' : 'reviews'}.map((review) => (
        <article key={review.id} className="reviewlist__item">
          <h4 className="reviewlist__author">{review.author}</h4>
          ${body}
        </article>
      ))}
${d.jsx}    </section>
  );
}
`;
}

function checkoutForm(level, seed) {
  const d = tsxDrift('CheckoutForm', level, seed);
  return `import { useState } from 'react';
import './CheckoutForm.css';
import { money } from '../lib/format';

${d.pre}interface CheckoutFormProps { totalCents: number; onPlaceOrder: () => void; ${d.props} }

export function CheckoutForm({ totalCents, onPlaceOrder }: CheckoutFormProps) {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
${d.hooks}  return (
    <form
      className="checkoutform"
      onSubmit={(e) => {
        e.preventDefault();
        onPlaceOrder();
      }}
    >
      <label className="checkoutform__label" htmlFor="co-email">Email</label>
      <input id="co-email" className="checkoutform__input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label className="checkoutform__label" htmlFor="co-address">Shipping address</label>
      <input id="co-address" className="checkoutform__input" type="text" autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} />
${d.jsx}      <button className="checkoutform__submit" type="submit">Place order · {money(totalCents)}</button>
    </form>
  );
}
`;
}

function navBar(level, seed) {
  const d = tsxDrift('NavBar', level, seed);
  return `import './NavBar.css';

${d.pre}interface NavBarProps { cartCount: number; onOpenCart: () => void; ${d.props} }

export function NavBar({ cartCount, onOpenCart }: NavBarProps) {
${d.hooks}  return (
    <header className="navbar">
      <a className="navbar__brand" href="/">Acme Outfitters</a>
      <nav className="navbar__links" aria-label="Primary">
        <a href="/outerwear">Outerwear</a>
        <a href="/footwear">Footwear</a>
        <a href="/accessories">Accessories</a>
      </nav>
${d.jsx}      <button className="navbar__cart" type="button" onClick={onOpenCart}>
        Cart ({cartCount})
      </button>
    </header>
  );
}
`;
}

function cartDrawer(level, seed) {
  const d = tsxDrift('CartDrawer', level, seed);
  return `import './CartDrawer.css';
import type { Product } from '../data/products';
import { money } from '../lib/format';

${d.pre}interface CartDrawerProps { items: Product[]; open: boolean; onClose: () => void; ${d.props} }

export function CartDrawer({ items, open, onClose }: CartDrawerProps) {
  if (!open) return null;
  const total = items.reduce((sum, item) => sum + item.priceCents, 0);
${d.hooks}  return (
    <aside className="cartdrawer" aria-label="Shopping cart">
      <button className="cartdrawer__close" type="button" onClick={onClose}>Close</button>
${level < 2 ? `      {items.length === 0 && <p className="cartdrawer__empty">Your cart is empty.</p>}\n` : ''}      <ul className="cartdrawer__list">
        {${level < 2 ? 'items.slice(0, 20)' : 'items'}.map((item) => (
          <li key={item.id} className="cartdrawer__row">
            <span>{item.name}</span>
            <span>{money(item.priceCents)}</span>
          </li>
        ))}
      </ul>
${d.jsx}      <p className="cartdrawer__total">Total {money(total)}</p>
    </aside>
  );
}
`;
}

const ANCHOR_TSX = { ProductCard: productCard, ReviewList: reviewList, CheckoutForm: checkoutForm, NavBar: navBar, CartDrawer: cartDrawer };

const ANCHOR_CSS = (name, level, seed) => {
  const n = name.toLowerCase();
  return `.${n} {
  background: var(--color-surface);
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-card);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.${n}__name, .${n}__author { font-size: var(--text-l); margin: 0; }
.${n}__price, .${n}__total { font-weight: 600; }
.${n}__img { width: 100%; border-radius: var(--radius-s); }
.${n}__label { font-size: var(--text-s); color: var(--color-muted); }
.${n}__input { border: 1px solid var(--color-muted); border-radius: var(--radius-s); padding: var(--space-2) var(--space-3); }
.${n}__add, .${n}__submit, .${n}__cart, .${n}__close {
  background: var(--color-accent);
  color: var(--color-accent-ink);
  border: none;
  border-radius: var(--radius-s);
  padding: var(--space-2) var(--space-4);
  cursor: pointer;
}
.${n}__brand { font-weight: 700; color: var(--color-ink); text-decoration: none; }
.${n}__links { display: flex; gap: var(--space-4); }
.${n}__links a { color: var(--color-muted); text-decoration: none; }
.${n}__list { margin: 0; padding: 0; list-style: none; }
.${n}__row { display: flex; justify-content: space-between; padding: var(--space-2) 0; }
.${n}__body { color: var(--color-muted); }
${cssDrift(name, level, seed)}${guardCss(name, level)}`;
};

// ── repo state ──────────────────────────────────────────────────────────────

const state = {
  files: new Map(),      // path -> content
  components: new Map(), // name -> { kind, level, seed }
};

function baseFiles() {
  state.files.set('package.json', PKG);
  state.files.set('tsconfig.json', TSCONFIG);
  state.files.set('vite.config.ts', VITE);
  state.files.set('index.html', INDEX_HTML);
  state.files.set('.gitignore', 'node_modules/\ndist/\n');
  state.files.set('design/tokens.json', TOKENS_JSON);
  state.files.set('src/styles/tokens.css', TOKENS_CSS);
  state.files.set('src/styles/global.css', GLOBAL_CSS);
  state.files.set('src/main.tsx', MAIN);
  state.files.set('src/lib/format.ts', FORMAT);
  state.files.set('src/data/products.ts', PRODUCTS);
}

function renderComponent(name) {
  const meta = state.components.get(name);
  const tsx = ANCHOR_TSX[name]
    ? ANCHOR_TSX[name](meta.level, meta.seed)
    : widget(name, meta.level, meta.seed, meta.kind);
  const css = ANCHOR_TSX[name]
    ? ANCHOR_CSS(name, meta.level, meta.seed)
    : widgetCss(name, meta.level, meta.seed);
  state.files.set(`src/components/${name}.tsx`, tsx);
  state.files.set(`src/components/${name}.css`, css);
}

function renderApp() {
  const names = [...state.components.keys()];
  const imports = names.map((n) => `import { ${n} } from './components/${n}';`).join('\n');
  const tiles = names
    .filter((n) => !ANCHOR_TSX[n])
    .map((n) => {
      const meta = state.components.get(n);
      if (meta.kind === 'tile') return `        <${n} title="${n.replace(/([A-Z])/g, ' $1').trim()}" copy="Seasonal picks from the fictional catalog." cta="Browse" />`;
      if (meta.kind === 'list') return `        <${n} items={['Free returns', 'Carbon-neutral shipping', 'Lifetime repairs']} />`;
      return `        <${n} />`;
    })
    .join('\n');
  const app = `import { useState } from 'react';
${imports}
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
${tiles}
        <ReviewList reviews={[{ id: 'r1', author: 'Jamie', body: 'Held up through a full season.', stars: 5 }]} />
        <CheckoutForm totalCents={cart.reduce((s, p) => s + p.priceCents, 0)} onPlaceOrder={() => setCart([])} />
      </main>
      <CartDrawer items={cart} open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
`;
  state.files.set('src/App.tsx', app);
}

const README = `# Acme Outfitters — sample-storefront

**This is a generated demonstration fixture, not a real product.** The git
history is synthetic: every commit was produced by a deterministic generator
(see the \`generator\` branch), backdated to sketch three years of development,
and shaped so the codebase's Production Drift Rating sweeps the full band range
— disciplined start, gradual drift, a velocity spike into Severe, a remediation
sprint back down, and a slow creep upward at the end.

It exists so ReWeaver tooling has one canonical, safe-to-clone repo that
demonstrates drift measurably:

- **DriftDetector**: scan \`reweaver-ai/sample-storefront\` and run the history
  chart — the trend line crosses every band.
- **Drift patterns by design**: hardcoded near-token colors, magic spacing,
  inline styles, missing alt text, \`div\` click handlers, \`any\` props, empty
  catch blocks, dead "compatibility" code, \`dangerouslySetInnerHTML\`,
  uncleared intervals, fabricated urgency copy, duplicated CSS — concentrated
  in a minority of files, the way real drift accumulates.
- **Design source**: \`design/tokens.json\` is the canonical token set;
  \`src/styles/tokens.css\` mirrors it. Drifted files diverge from it in
  near-miss values a designer would flag.

The catalog, reviews, and every name in the history are fictional.
`;

const LICENSE = `MIT License

Copyright (c) 2026 ReWeaver AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

// ── commit plan ─────────────────────────────────────────────────────────────
// ops: ['add', name, kind, level] | ['level', name, level] | ['seed'] | ['readme']

const PLAN = [
  // Phase A — disciplined build. Target: Minimal (≤ 0.10).
  { d: '2023-05-16', m: 'chore: scaffold Vite + React storefront with design tokens', ops: [['seed']] },
  { d: '2023-06-02', m: 'feat: navigation bar and brand shell', ops: [['add', 'NavBar', 'anchor', 0]] },
  { d: '2023-06-20', m: 'feat: product catalog data and card grid', ops: [['add', 'ProductCard', 'anchor', 0]] },
  { d: '2023-07-11', m: 'feat: cart drawer with running total', ops: [['add', 'CartDrawer', 'anchor', 0]] },
  { d: '2023-08-08', m: 'feat: hero banner for the fall drop', ops: [['add', 'Hero', 'tile', 0]] },
  { d: '2023-09-05', m: 'feat: checkout form (email + shipping)', ops: [['add', 'CheckoutForm', 'anchor', 0]] },
  { d: '2023-10-10', m: 'feat: footer with service links', ops: [['add', 'Footer', 'list', 0]] },
  { d: '2023-11-14', m: 'feat: customer reviews section', ops: [['add', 'ReviewList', 'anchor', 0], ['readme']] },

  // Phase B — growth, first drift. Target: Low → Moderate entry (0.15 → 0.32).
  { d: '2024-01-09', m: 'feat: search bar', ops: [['add', 'SearchBar', 'form', 1]] },
  { d: '2024-02-06', m: 'feat: category tiles on the landing page', ops: [['add', 'CategoryTile', 'tile', 1]] },
  { d: '2024-03-05', m: 'feat: price tag component with sale styling', ops: [['add', 'PriceTag', 'tile', 1]] },
  { d: '2024-04-09', m: 'fix: cart badge spacing on narrow screens', ops: [['level', 'NavBar', 1]] },
  { d: '2024-05-07', m: 'feat: rating stars on product cards', ops: [['add', 'RatingStars', 'tile', 1]] },
  { d: '2024-06-11', m: 'feat: quantity stepper in the cart', ops: [['add', 'QuantityStepper', 'form', 2]] },
  { d: '2024-07-09', m: 'feat: order summary panel', ops: [['add', 'OrderSummary', 'list', 2]] },
  { d: '2024-08-13', m: 'fix: ship checkout tweaks from the promo sprint', ops: [['level', 'CheckoutForm', 1]] },

  // Phase C — velocity spike. Target: climb 0.45 → 0.85 and hold.
  { d: '2024-09-10', m: 'feat: promo banner variants for the flash campaign', ops: [['add', 'PromoBanner', 'tile', 3]] },
  { d: '2024-10-01', m: 'feat: flash sale rail (shipped same day)', ops: [['add', 'FlashSale', 'tile', 3]] },
  { d: '2024-10-22', m: 'feat: recommendation rail from the growth experiment', ops: [['add', 'RecommendationRail', 'list', 2]] },
  { d: '2024-11-12', m: 'feat: coupon field + urgency copy', ops: [['add', 'CouponField', 'form', 2]] },
  { d: '2024-12-03', m: 'feat: wishlist button on cards', ops: [['add', 'WishlistButton', 'tile', 2], ['level', 'ProductCard', 2]] },
  { d: '2025-01-14', m: 'feat: newsletter modal for the january push', ops: [['add', 'NewsletterModal', 'tile', 2]] },
  { d: '2025-02-11', m: 'feat: shipping estimator (ported from the promo repo)', ops: [['add', 'ShippingEstimate', 'form', 2]] },
  { d: '2025-03-11', m: 'feat: rich review bodies with markup support', ops: [['level', 'ReviewList', 3]] },
  { d: '2025-04-15', m: 'feat: express checkout experiments', ops: [['level', 'CheckoutForm', 3]] },
  { d: '2025-05-13', m: 'feat: loyalty widget + drawer upsells', ops: [['add', 'LoyaltyWidget', 'tile', 3], ['level', 'CartDrawer', 2]] },
  { d: '2025-06-10', m: 'fix: hotfixes for the summer sale traffic', ops: [['reseed', 'PromoBanner'], ['reseed', 'FlashSale']] },

  // Phase D — remediation sprint. Target: fall to ~0.40 and hold.
  { d: '2025-07-15', m: 'refactor: return checkout + reviews to the token system, drop dead code', ops: [['level', 'CheckoutForm', 0], ['level', 'ReviewList', 0]] },
  { d: '2025-08-05', m: 'refactor: promo surfaces back on tokens; remove urgency copy', ops: [['level', 'PromoBanner', 1], ['level', 'FlashSale', 1], ['level', 'NewsletterModal', 1]] },
  { d: '2025-09-02', m: 'refactor: card + drawer cleanup, restore alt text and button semantics', ops: [['level', 'ProductCard', 0], ['level', 'CartDrawer', 0]] },
  { d: '2025-10-07', m: 'refactor: coupon + shipping estimate typed and tokenized', ops: [['level', 'CouponField', 0], ['level', 'ShippingEstimate', 1], ['level', 'WishlistButton', 1]] },
  { d: '2025-11-04', m: 'chore: sweep remaining console noise from the sale sprint', ops: [['level', 'RecommendationRail', 1], ['level', 'LoyaltyWidget', 1], ['level', 'QuantityStepper', 1], ['level', 'OrderSummary', 1]] },

  // Phase E — creep. Target: rise to ~0.60 by the end.
  { d: '2025-12-09', m: 'feat: gift card teaser for the holidays', ops: [['add', 'GiftCardTeaser', 'tile', 1]] },
  { d: '2026-01-13', m: 'feat: post-holiday clearance rail', ops: [['level', 'FlashSale', 2]] },
  { d: '2026-02-10', m: 'feat: saved-for-later section in the drawer', ops: [['level', 'CartDrawer', 1]] },
  { d: '2026-03-10', m: 'feat: spring campaign banners', ops: [['level', 'PromoBanner', 2]] },
  { d: '2026-04-14', m: 'feat: size guide popover on cards', ops: [['level', 'ProductCard', 1]] },
  { d: '2026-05-12', m: 'feat: member pricing experiment', ops: [['level', 'LoyaltyWidget', 2]] },
  { d: '2026-06-09', m: 'feat: checkout trust badges from the conversion sprint', ops: [['level', 'CheckoutForm', 1]] },
  { d: '2026-07-14', m: 'feat: summer sale urgency banner', ops: [['reseed', 'NewsletterModal']] },
  { d: '2026-08-11', m: 'feat: back-to-trail landing refresh', ops: [['level', 'Hero', 1], ['level', 'SearchBar', 2]] },
];

// ── execution ───────────────────────────────────────────────────────────────

let seedCounter = 0;

function applyOps(ops) {
  for (const op of ops) {
    if (op[0] === 'seed') baseFiles();
    else if (op[0] === 'add') {
      const [, name, kind, level] = op;
      state.components.set(name, { kind, level, seed: seedCounter += 3 });
    } else if (op[0] === 'level') {
      const meta = state.components.get(op[1]);
      if (!meta) throw new Error(`level op on unknown component ${op[1]}`);
      meta.level = op[2];
    } else if (op[0] === 'reseed') {
      const meta = state.components.get(op[1]);
      if (!meta) throw new Error(`reseed op on unknown component ${op[1]}`);
      meta.seed = seedCounter += 3;
    } else if (op[0] === 'readme') {
      state.files.set('README.md', README);
      state.files.set('LICENSE', LICENSE);
    }
  }
}

function writeTree(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === '.git') continue;
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
  for (const name of state.components.keys()) renderComponent(name);
  if (state.components.size > 0) renderApp();
  for (const [path, content] of state.files) {
    const abs = join(dir, path);
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, content);
  }
}

function git(dir, args, env = {}) {
  return execFileSync('git', args, { cwd: dir, env: { ...process.env, ...env }, encoding: 'utf8' });
}

rmSync(TARGET, { recursive: true, force: true });
mkdirSync(TARGET, { recursive: true });
git(TARGET, ['init', '-q', '-b', 'main']);
git(TARGET, ['config', 'user.name', AUTHOR.name]);
git(TARGET, ['config', 'user.email', AUTHOR.email]);
git(TARGET, ['config', 'commit.gpgsign', 'false']);

for (const commit of PLAN) {
  applyOps(commit.ops);
  writeTree(TARGET);
  git(TARGET, ['add', '-A']);
  const when = `${commit.d}T10:17:00`;
  git(TARGET, ['commit', '-q', '-m', commit.m], {
    GIT_AUTHOR_DATE: when,
    GIT_COMMITTER_DATE: when,
  });
}

const log = git(TARGET, ['log', '--oneline']).trim().split('\n');
console.log(`${log.length} commits generated in ${TARGET}`);
console.log('first:', log[log.length - 1]);
console.log('last :', log[0]);
