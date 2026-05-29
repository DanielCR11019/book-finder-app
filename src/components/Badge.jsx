import { availabilityInfo } from "../utils/format";

// Small availability pill shown on covers (Borrow / Read free / Print only…).
function Badge({ book }) {
  const { label, tone } = availabilityInfo(book);

  return (
    <span className={`badge badge--${tone}`}>
      <span className="badge__dot" aria-hidden="true" />
      {label}
    </span>
  );
}

export default Badge;