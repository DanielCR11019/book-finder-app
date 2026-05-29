import { useEffect } from "react";
import RatingStars from "./RatingStars";
import Badge from "./Badge";
import { coverUrl, authorList, number } from "../utils/format";

function BookModal({ book, showAvailability, onClose }) {
  // Close on Escape and lock body scroll while the modal is open.
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!book) return null;

  const cover = coverUrl(book, "L");
  const subjects = Array.isArray(book.subject) ? book.subject.slice(0, 12) : [];
  const editions = Array.isArray(book.edition_key) ? book.edition_key.slice(0, 6) : [];
  const isbns = Array.isArray(book.isbn) ? book.isbn : [];
  const firstSentence = Array.isArray(book.first_sentence)
    ? book.first_sentence[0]
    : book.first_sentence;

  const stats = [
    { label: "First published", value: book.first_publish_year ?? "—" },
    { label: "Editions", value: number(book.edition_count) ?? "—" },
    { label: "Pages (median)", value: number(book.number_of_pages_median) ?? "—" },
    {
      label: "Languages",
      value: Array.isArray(book.language) ? book.language.length : "—",
    },
  ];

  const readingLog = [
    { label: "want", value: book.want_to_read_count },
    { label: "reading", value: book.currently_reading_count },
    { label: "read", value: book.already_read_count },
  ].filter((item) => typeof item.value === "number");

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={book.title}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="modal__hero">
          <div className="modal__cover">
            {cover ? (
              <img src={cover} alt={`Cover of ${book.title}`} />
            ) : (
              <div className="card__cover--empty">
                <span>{book.title}</span>
              </div>
            )}
          </div>

          <div className="modal__intro">
            <p className="modal__kicker">
              Work · <code>{book.key?.split("/").pop()}</code>
              {showAvailability ? <Badge book={book} /> : null}
            </p>
            <h2 className="modal__title">{book.title}</h2>
            <p className="modal__author">
              <span className="card__avatar" aria-hidden="true" />
              <em>{authorList(book)}</em>
            </p>

            <dl className="statgrid">
              {stats.map((stat) => (
                <div key={stat.label} className="statgrid__item">
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
              <div className="statgrid__item">
                <dt>Rating</dt>
                <dd>
                  <RatingStars value={book.ratings_average} count={book.ratings_count} />
                </dd>
              </div>
              {readingLog.length ? (
                <div className="statgrid__item statgrid__item--wide">
                  <dt>Reading log</dt>
                  <dd className="readinglog">
                    {readingLog.map((item, index) => (
                      <span key={item.label}>
                        {index > 0 ? <span className="readinglog__sep">·</span> : null}
                        <strong>{number(item.value)}</strong> {item.label}
                      </span>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>

        <div className="modal__cols">
          <section className="modal__col">
            <h3 className="modal__h">Work</h3>
            {firstSentence ? (
              <blockquote className="quote">
                &ldquo;{firstSentence}&rdquo;
                <cite>— first sentence</cite>
              </blockquote>
            ) : (
              <p className="modal__muted">No excerpt available.</p>
            )}

            {subjects.length ? (
              <>
                <h4 className="modal__subh">Subjects</h4>
                <div className="taglist">
                  {subjects.map((subject) => (
                    <span key={subject} className="taglist__pill">
                      {subject}
                    </span>
                  ))}
                </div>
              </>
            ) : null}
          </section>

          <section className="modal__col">
            <h3 className="modal__h">
              Editions
              {book.edition_count ? (
                <span className="modal__count">
                  {editions.length || isbns.length ? `${editions.length} of ${book.edition_count}` : book.edition_count}
                </span>
              ) : null}
            </h3>

            {editions.length ? (
              <ul className="editions">
                {editions.map((edition) => (
                  <li key={edition} className="editions__row">
                    <span className="editions__id">{edition}</span>
                    <a
                      className="editions__link"
                      href={`https://openlibrary.org/books/${edition}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View ↗
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="modal__muted">No edition keys returned.</p>
            )}

            {isbns.length ? (
              <p className="modal__isbn">
                <span className="tag__k">ISBN</span> {isbns.slice(0, 3).join(", ")}
              </p>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}

export default BookModal;