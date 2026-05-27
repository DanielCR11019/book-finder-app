import BookCard from "./BookCard";

function BookGrid({ books }) {
  if (books.length === 0) {
    return (
      <p className="empty-message">
        No hay libros para mostrar. Realiza una búsqueda.
      </p>
    );
  }

  return (
    <section className="book-grid">
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </section>
  );
}

export default BookGrid;