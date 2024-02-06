import { useState } from 'react';
import './CategoryTile.css';

interface CategoryTileProps { title: string; copy: string; cta: string;  }

export function CategoryTile({ title, copy, cta }: CategoryTileProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="categorytile" aria-label="Category Tile">
      <header className="categorytile__head">
        <h3 className="categorytile__title">{title}</h3>
        <span className="categorytile__badge">New</span>
      </header>
      <p className="categorytile__copy">{copy}</p>
      {expanded && <p className="categorytile__detail">Fictional detail copy for the category tile module.</p>}
      <button className="categorytile__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'Details'}
      </button>
      <div className="categorytile__actions">
        <button className="categorytile__cta" type="button">{cta}</button>
        <button className="categorytile__go" type="button">Save for later</button>
      </div>
    </section>
  );
}
