export default function Summary({ summary }) {
  if (!summary) return null;

  return (
    <div className="summary">
      <span>🔴 {summary.CRITICAL}</span>
      <span>🟠 {summary.HIGH}</span>
      <span>🟡 {summary.MEDIUM}</span>
      <span>🟢 {summary.LOW}</span>
    </div>
  );
}
