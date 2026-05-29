import SearchBar from "./SearchBar";

function Header({ searchTerm, setSearchTerm, scope, setScope, onSearch }) {
  return (
    <header className="header">
      <a className="brand" href="#top">
        <span className="brand__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" />
            <line x1="5" y1="7.5" x2="19" y2="7.5" />
          </svg>
        </span>
        <span className="brand__text">
          <span className="brand__name">Stacks</span>
          <span className="brand__tagline">a search front for the Open Library</span>
        </span>
      </a>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        scope={scope}
        setScope={setScope}
        onSearch={onSearch}
      />
    </header>
  );
}

export default Header;