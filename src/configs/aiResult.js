export async function fetchAIResult(prompt) {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    console.log("AI Result:", data.result);
    return data.result;
  } catch (error) {
    console.error("Error fetching AI result:", error);
    return null;
  }
}
