import { useState } from "react";
import ChatBox from "../components/ChatBox";
import CodeInput from "../components/CodeInput";
import Summary from "../components/Summary";
import { analyzeCodeText } from "../api";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSend(code) {
    console.log("SEND CLICKED",code);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: code },
    ]);

    setLoading(true);

    try {
      const response = await analyzeCodeText(code);
      setSummary(response.summary);

      if (response.results.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: "✅ No security or logic issues detected in your code.",
            severity: "LOW",
          },
        ]);
      } else {
        response.results.forEach((item) => {
          setMessages((prev) => [
            ...prev,
            {
              role: "ai",
              text: item.ai_explanation,
              severity: item.issue.severity,
              rule: item.issue.rule_id,
            },
          ]);
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "❌ Failed to analyze code. Backend error.",
          severity: "CRITICAL",
        },
      ]);
    }

    setLoading(false);
  }

  return (
  <div className="page">
    <div className="app-container">
      {/* FIXED INPUT AREA */}
      <div className="fixed-top">
        <div className="header">🤖 AI Code Review Assistant</div>
        <CodeInput onSend={handleSend} />
        <Summary summary={summary} />
      </div>

      {/* SCROLLABLE CHAT AREA */}
      <div className="chat-scroll">
        <ChatBox messages={messages} loading={loading} />
      </div>
    </div>
  </div>
  );
}