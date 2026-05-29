export const coverUrl = (book, size = "M") =>
  book?.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg`
    : null;

const ACCESS = {
  public: { label: "Read free", tone: "free" },
  borrowable: { label: "Borrow", tone: "borrow" },
  printdisabled: { label: "Print only", tone: "print" },
  no_ebook: { label: "Not available", tone: "none" },
};

export const availabilityInfo = (book) =>
  ACCESS[book?.ebook_access] ?? ACCESS.no_ebook;

export const authorList = (book, max = Infinity) => {
  if (!Array.isArray(book?.author_name) || !book.author_name.length) {
    return "Unknown author";
  }
  const authors = book.author_name;
  if (authors.length <= max) return authors.join(", ");
  return `${authors.slice(0, max).join(", ")} +${authors.length - max} more`;
};

export const number = (value) =>
  typeof value === "number" ? value.toLocaleString("en-US") : value;