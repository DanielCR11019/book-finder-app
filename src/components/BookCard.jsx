function BookCard({ book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/180x260?text=No+Cover";

  return (
    <article className="book-card">
      <img src={coverUrl} alt={book.title} />

      <div className="book-info">
        <h2>{book.title}</h2>

        <p>
          <strong>Autor:</strong>{" "}
          {book.author_name ? book.author_name.join(", ") : "No disponible"}
        </p>

        <p>
          <strong>Año:</strong>{" "}
          {book.first_publish_year || "No disponible"}
        </p>

        <p>
          <strong>Ediciones:</strong>{" "}
          {book.edition_count || "No disponible"}
        </p>
      </div>
    </article>
  );
}

export default BookCard;