import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="searchbar">
      <label className="searchbar__field">
        <span className="visually-hidden">Search products</span>
        <svg className="searchbar__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
        <input
          className="input searchbar__input"
          type="search"
          placeholder="Search the shop"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      {value.trim() !== '' && (
        <button className="link searchbar__clear" type="button" onClick={() => onChange('')}>
          Clear
        </button>
      )}
      <p className="searchbar__status" role="status">
        {resultCount} {resultCount === 1 ? 'item' : 'items'}
      </p>
    </div>
  );
}
