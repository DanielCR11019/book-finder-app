function StatusMessage({ type, message }) {
  return (
    <div className={`status-message ${type}`}>
      <p>{message}</p>
    </div>
  );
}

export default StatusMessage;