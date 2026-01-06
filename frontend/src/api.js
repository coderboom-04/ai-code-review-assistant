export async function analyzeCodeText(code) {
  const response = await fetch(
    "https://ai-code-review-backend.onrender.com/analyze-text",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    }
  );

  return response.json();
}
