import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import BookGrid from "./components/BookGrid";
import StatusMessage from "./components/StatusMessage";
import { searchBooks } from "./services/openLibraryApi";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Por favor, escribe un término de búsqueda.");
      setBooks([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const results = await searchBooks(searchTerm);
      setBooks(results);
    } catch (err) {
      setError("Ocurrió un error al cargar los libros. Intenta nuevamente.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <main>
      <Navbar />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />

      {loading && (
        <StatusMessage type="loading" message="Cargando libros..." />
      )}

      {error && (
        <StatusMessage type="error" message={error} />
      )}

      {!loading && !error && <BookGrid books={books} />}
    </main>
  );
}

export default App;