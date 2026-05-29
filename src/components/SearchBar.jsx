const SCOPES = [
  { value: "everything", label: "in Everything" },
  { value: "title", label: "in Titles" },
  { value: "author", label: "in Authors" },
  { value: "subject", label: "in Subjects" },
];

function SearchBar({ searchTerm, setSearchTerm, scope, setScope, onSearch }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit} role="search">
      <div className="searchbar__field">
        <svg className="searchbar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>

        <input
          type="text"
          className="searchbar__input"
          placeholder="Search the library…"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search term"
        />

        <select
          className="searchbar__scope"
          value={scope}
          onChange={(event) => setScope(event.target.value)}
          aria-label="Search scope"
        >
          {SCOPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="searchbar__submit">
        Search
      </button>

      <span className="searchbar__hint">
        <kbd>Enter</kbd> to search
      </span>
    </form>
  );
}

export default SearchBar;