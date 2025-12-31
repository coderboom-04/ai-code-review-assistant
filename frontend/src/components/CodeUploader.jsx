import { useState } from "react";

export default function CodeUploader({ onAnalyze }) {
  const [file, setFile] = useState(null);

  return (
    <div className="uploader">
      <input
        type="file"
        accept=".py"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={() => onAnalyze(file)}
        disabled={!file}
      >
        Analyze
      </button>
    </div>
  );
}
