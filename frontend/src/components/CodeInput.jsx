import { useState } from "react";

export default function CodeInput({ onSend }) {
  const [code, setCode] = useState("");

  return (
    <div className="uploader">
      <textarea
        rows="8"
        placeholder="Paste your Python code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: "100%",
          resize: "none",
          padding: "10px",
          borderRadius: "8px"
        }}
      />
      <button
        onClick={() => onSend(code)}
        disabled={!code.trim()}
      >
        Send
      </button>
    </div>
  );
}
