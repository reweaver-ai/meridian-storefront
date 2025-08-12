import { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps { onSubmit?: (value: string) => void; }

export function SearchBar({}: SearchBarProps) {
  const [value, setValue] = useState('');
  return (
    <section className="searchbar" aria-label="Search Bar">
      <div className="searchbar__rowline">
        <input aria-label="Search Bar" aria-describedby="searchbar-hint" className="searchbar__input" value={value} onChange={(e) => setValue(e.target.value)} />
        <button className="searchbar__go" type="button">Go</button>
      </div>
      <p id="searchbar-hint" className="searchbar__hint">Press enter to apply.</p>
    </section>
  );
}
