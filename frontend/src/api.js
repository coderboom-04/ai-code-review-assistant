export async function analyzeCodeText(code) {
  const response = await fetch(
    "https://YOUR-BACKEND-NAME.onrender.com/analyze-text",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    }
  );

  if (!response.ok) {
    throw new Error("Backend error");
  }

  return response.json();
}
