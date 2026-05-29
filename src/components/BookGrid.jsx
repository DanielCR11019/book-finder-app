import BookCard from "./BookCard";

function BookGrid({ books, showAvailability, onSelect }) {
  if (!books.length) {
    return (
      <div className="empty">
        <p className="empty__title">No works to show</p>
        <p className="empty__hint">Try another term or relax the filters.</p>
      </div>
    );
  }

  return (
    <section className="grid">
      {books.map((book) => (
        <BookCard
          key={book.key}
          book={book}
          showAvailability={showAvailability}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}

export default BookGrid;