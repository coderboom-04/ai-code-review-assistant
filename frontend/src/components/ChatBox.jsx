export default function ChatBox({ code, setCode, onSend }) {
  return (
    <div className="chatbox-fixed">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your Python code here..."
      />
      <button onClick={onSend}>Analyze</button>
    </div>
  );
}
