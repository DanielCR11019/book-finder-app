import RatingStars from "./RatingStars";
import Badge from "./Badge";
import { coverUrl, authorList } from "../utils/format";

function BookCard({ book, showAvailability, onSelect }) {
  const cover = coverUrl(book, "M");

  return (
    <article
      className="card"
      onClick={() => onSelect(book)}
      onKeyDown={(event) => {
        if (event.key === "Enter") onSelect(book);
      }}
      role="button"
      tabIndex={0}
    >
      <div className="card__cover">
        {showAvailability ? <Badge book={book} /> : null}

        {cover ? (
          <img src={cover} alt={`Cover of ${book.title}`} loading="lazy" />
        ) : (
          <div className="card__cover--empty">
            <span>{book.title}</span>
          </div>
        )}
      </div>

      <div className="card__body">
        <h3 className="card__title">{book.title}</h3>

        <p className="card__author">
          <span className="card__avatar" aria-hidden="true" />
          <em>{authorList(book, 2)}</em>
        </p>

        <div className="card__meta">
          {book.ratings_average ? (
            <RatingStars value={book.ratings_average} count={book.ratings_count} />
          ) : (
            <span className="card__meta-muted">No ratings</span>
          )}

          {book.first_publish_year ? (
            <span className="tag">
              <span className="tag__k">First</span> {book.first_publish_year}
            </span>
          ) : null}

          {book.edition_count ? (
            <span className="tag">
              <span className="tag__k">Editions</span> {book.edition_count}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default BookCard;