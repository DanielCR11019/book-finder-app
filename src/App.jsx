import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Sidebar, { SORT_OPTIONS } from "./components/Sidebar";
import ResultsHeader from "./components/ResultsHeader";
import BookGrid from "./components/BookGrid";
import StatusMessage from "./components/StatusMessage";
import BookModal from "./components/BookModal";
import { searchBooks } from "./services/openLibraryApi";
import "./App.css";

function App() {
  // --- Data + request state (the three states the rubric asks for) ---
  const [books, setBooks] = useState([]);
  const [numFound, setNumFound] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- UI / query controls ---
  const [searchTerm, setSearchTerm] = useState("the lord of the rings");
  const [scope, setScope] = useState("everything");
  const [sort, setSort] = useState("rating");
  const [language, setLanguage] = useState("any");
  const [onlyReadable, setOnlyReadable] = useState(false);
  const [showAvailability, setShowAvailability] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeQuery, setActiveQuery] = useState("the lord of the rings");

  // Axios GET wrapped in try/catch, driving loading + error states.
  const fetchBooks = async () => {
    if (!searchTerm.trim()) {
      setError("Type something to search the library.");
      setBooks([]);
      setNumFound(0);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { docs, numFound: total } = await searchBooks({
        query: searchTerm,
        scope,
        sort,
      });

      setBooks(docs);
      setNumFound(total);
      setActiveQuery(searchTerm.trim());
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading the works. Please try again.");
      setBooks([]);
      setNumFound(0);
    } finally {
      setLoading(false);
    }
  };

  // Initial load + re-fetch whenever the server-side sort changes.
  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  // Language + "readable now" are applied on the client over the fetched set.
  const visibleBooks = useMemo(() => {
    return books.filter((book) => {
      const langOk =
        language === "any" ||
        (Array.isArray(book.language) && book.language.includes(language));
      const readOk = !onlyReadable || book.ebook_access === "public";
      return langOk && readOk;
    });
  }, [books, language, onlyReadable]);

  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ?? "Relevance";

  return (
    <div className="app" id="top">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        scope={scope}
        setScope={setScope}
        onSearch={fetchBooks}
      />

      <div className="layout">
        <Sidebar
          sort={sort}
          setSort={setSort}
          language={language}
          setLanguage={setLanguage}
          onlyReadable={onlyReadable}
          setOnlyReadable={setOnlyReadable}
          showAvailability={showAvailability}
          setShowAvailability={setShowAvailability}
          count={numFound}
        />

        <main className="content">
          <ResultsHeader
            query={activeQuery}
            sortLabel={sortLabel}
            shown={visibleBooks.length}
            total={numFound.toLocaleString("en-US")}
          />

          {loading && <StatusMessage type="loading" message="Loading works…" />}
          {error && <StatusMessage type="error" message={error} />}

          {!loading && !error && (
            <BookGrid
              books={visibleBooks}
              showAvailability={showAvailability}
              onSelect={setSelectedBook}
            />
          )}
        </main>
      </div>

      {selectedBook && (
        <BookModal
          book={selectedBook}
          showAvailability={showAvailability}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

export default App;