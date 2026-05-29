import { number } from "../utils/format";

// Renders five glyphs and fills them proportionally to `value` (0–5) using a
// clipped overlay, so half-stars look right. `count` is shown when provided.
function RatingStars({ value, count }) {
  const safe = Math.max(0, Math.min(5, Number(value) || 0));
  const percent = (safe / 5) * 100;

  return (
    <span className="stars" title={`${safe.toFixed(2)} / 5`}>
      <span className="stars__track" aria-hidden="true">
        <span className="stars__fill" style={{ width: `${percent}%` }}>
          ★★★★★
        </span>
        ★★★★★
      </span>

      {value ? <span className="stars__value">{safe.toFixed(1)}</span> : null}
      {count ? <span className="stars__count">({number(count)})</span> : null}
    </span>
  );
}

export default RatingStars;