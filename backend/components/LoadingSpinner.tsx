export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div style={{ textAlign: "center" }}>
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading API Dashboard...</p>
      </div>
    </div>
  );
}
