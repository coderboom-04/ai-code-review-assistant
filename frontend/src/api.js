const BACKEND_URL = "https://ai-code-review-assistant-backend.onrender.com";

export async function analyzeCodeText(code) {
  const response = await fetch(`${BACKEND_URL}/analyze-text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Backend response:", text);
    throw new Error("Backend error");
  }

  return response.json();
}
