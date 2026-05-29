import axios from "axios";

const BASE_URL = "https://openlibrary.org";

const FIELDS = [
  "key",
  "title",
  "author_name",
  "author_key",
  "first_publish_year",
  "edition_count",
  "edition_key",
  "cover_i",
  "isbn",
  "language",
  "number_of_pages_median",
  "ratings_average",
  "ratings_count",
  "subject",
  "first_sentence",
  "ebook_access",
  "want_to_read_count",
  "currently_reading_count",
  "already_read_count",
].join(",");

const buildQuery = (term, scope) => {
  const value = term.trim();
  const quoted = `"${value}"`;

  switch (scope) {
    case "title":
      return `title:${quoted}`;
    case "author":
      return `author:${quoted}`;
    case "subject":
      return `subject:${quoted}`;
    default:
      return value;
  }
};

export const searchBooks = async ({ query, scope = "everything", sort = "relevance", limit = 30 }) => {
    const params = {
        q: buildQuery(query, scope),
        fields: FIELDS,
        limit,
    };

    if (sort && sort !== "relevance") {
        params.sort = sort;
    }
    const response = await axios.get(`${BASE_URL}/search.json`, { params });
    return {
        docs: response.data.docs ?? [],
        numFound: response.data.numFound ?? 0,
    };
};