const CHIPS = ["Multi-doc", "Work + Edition", "Author IDs", "Availability"];

function ResultsHeader({ query, sortLabel, shown, total }) {
  return (
    <div className="results-head">
      <div className="results-head__main">
        <h2 className="results-head__title">
          Results for <em>&ldquo;{query}&rdquo;</em>
        </h2>
        <p className="results-head__meta">
          Sorted by <strong>{sortLabel}</strong> · showing {shown} of {total}
        </p>
      </div>

      <div className="chips">
        {CHIPS.map((chip) => (
          <span key={chip} className="chip">
            <span className="chip__dot" aria-hidden="true" />
            {chip}
          </span>
        ))}
        <span className="chip chip--accent">
          <span className="chip__dot" aria-hidden="true" />
          Sort: {sortLabel}
        </span>
      </div>
    </div>
  );
}

export default ResultsHeader;