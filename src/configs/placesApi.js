// client/images.js

export async function searchPhotos(query) {
    try {
      const response = await fetch(
        `api/search?q=${encodeURIComponent(query)}`
      );
  
      if (!response.ok) {
        throw new Error(`Frontend Error: ${response.status}`);
      }
  
      return await response;
  
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  }
  