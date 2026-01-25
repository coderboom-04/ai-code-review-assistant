import { useState } from "react";

export default function CodeInput({ onSend }) {
  const [code, setCode] = useState("");

  return (
    <div className="code-input">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your Python code here..."
        rows={5}
      />

      <button onClick={() => onSend(code)}>
        Analyze
      </button>
    </div>
  );
}
