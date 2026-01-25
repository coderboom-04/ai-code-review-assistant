export default function ChatBox({ messages, loading }) {
  return (
    <div className="chatbox">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.role}`}>
          <p>{msg.text}</p>
        </div>
      ))}

      {loading && <p>🤖 Analyzing your code...</p>}
    </div>
  );
}
