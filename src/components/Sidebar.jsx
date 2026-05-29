import { number } from "../utils/format";

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "rating", label: "★ Rating", star: true },
  { value: "new", label: "Newest first" },
  { value: "old", label: "Oldest first" },
  { value: "editions", label: "Most editions" },
  { value: "scans", label: "Most accessible" },
  { value: "readinglog", label: "Most read" },
  { value: "random", label: "Random" },
];

const LANGUAGES = [
  { value: "any", label: "Any language" },
  { value: "eng", label: "English" },
  { value: "spa", label: "Español" },
  { value: "fre", label: "Français" },
  { value: "ger", label: "Deutsch" },
  { value: "jpn", label: "日本語" },
];

function Sidebar({
  sort,
  setSort,
  language,
  setLanguage,
  onlyReadable,
  setOnlyReadable,
  showAvailability,
  setShowAvailability,
  count,
}) {
  return (
    <aside className="sidebar">
      <section className="facet">
        <h2 className="facet__title">Sort</h2>
        <ul className="facet__list">
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`facet__item ${sort === option.value ? "is-active" : ""}`}
                onClick={() => setSort(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="facet">
        <h2 className="facet__title">Availability</h2>
        <label className="check">
          <input
            type="checkbox"
            checked={showAvailability}
            onChange={(event) => setShowAvailability(event.target.checked)}
          />
          <span>
            Include <code>availability</code> in response
          </span>
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={onlyReadable}
            onChange={(event) => setOnlyReadable(event.target.checked)}
          />
          <span>Only readable now</span>
        </label>
      </section>

      <section className="facet">
        <h2 className="facet__title">Language</h2>
        <div className="select">
          <select value={language} onChange={(event) => setLanguage(event.target.value)}>
            {LANGUAGES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="facet facet--count">
        <span className="bigcount">{number(count)}</span>
        <span className="bigcount__label">works matched</span>
      </section>
    </aside>
  );
}

export default Sidebar;