
export async function searchPhotos(query) {
  try {
    const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&ia=images`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`DuckDuckGo Error: ${response.status}`);
    }

    // DuckDuckGo sometimes returns JSON as text, so parse safely
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch {
      console.error("DuckDuckGo did not return valid JSON");
      return { error: "Invalid JSON returned", raw: text };
    }

  } catch (error) {
    console.error("searchPhotos error:", error);
    throw error;
  }
}
