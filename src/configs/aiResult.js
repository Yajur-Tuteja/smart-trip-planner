export async function fetchAIResult(prompt) {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();
    console.log("AI Result:", result);
    return result.data;
  } catch (error) {
    console.error("Error fetching AI result:", error);
    return null;
  }
}
