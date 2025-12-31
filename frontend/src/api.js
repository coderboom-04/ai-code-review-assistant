export async function analyzeCodeText(code) {
  const response = await fetch("http://localhost:8000/analyze-text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code })
  });

  return response.json();
}
