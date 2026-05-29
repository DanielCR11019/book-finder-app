function StatusMessage({ type, message }) {
  return (
    <div className={`status status--${type}`} role="status">
      {type === "loading" ? <span className="status__spinner" aria-hidden="true" /> : null}
      <p className="status__text">{message}</p>
    </div>
  );
}

export default StatusMessage;