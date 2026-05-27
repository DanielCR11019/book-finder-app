function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Escribe el nombre de un libro..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;