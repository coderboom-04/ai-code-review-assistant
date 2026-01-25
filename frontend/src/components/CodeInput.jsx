import { useState } from "react";

export default function CodeInput({ onSend }) {
  const [code, setCode] = useState("");

  return (
    <div className="code-input">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your Python code here..."
      />

      <button
        onClick={() => {
          if (code.trim() !== "") {
            onSend(code);
            setCode(""); // optional: clear after send
          }
        }}
      >
        Analyze
      </button>
    </div>
  );
}
