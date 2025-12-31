export default function ChatBox({ messages, loading }) {
  function getColor(severity) {
    if (severity === "CRITICAL") return "#ff4d4f";
    if (severity === "HIGH") return "#ff7a45";
    if (severity === "MEDIUM") return "#faad14";
    return "#52c41a";
  }

  return (
    <div className="chatbox">
      {messages.map((msg, idx) => (
        <div key={idx} className={`bubble ${msg.role}`}>
          {msg.severity && (
            <span
              style={{
                backgroundColor: getColor(msg.severity),
                color: "#fff",
                padding: "3px 10px",
                borderRadius: "8px",
                fontSize: "12px",
                display: "inline-block",
                marginBottom: "6px",
              }}
            >
              {msg.severity}
              {msg.rule ? ` • ${msg.rule}` : ""}
            </span>
          )}
          <pre style={{ whiteSpace: "pre-wrap" }}>{msg.text}</pre>
        </div>
      ))}

      {loading && (
        <div className="bubble ai">
          🤖 Analyzing your code...
        </div>
      )}
    </div>
  );
}
