// client/images.js

export async function searchPhotos(query) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&topics=architecture,travel&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&count=1&orientation=landscape`
    );

    console.log(query);

    const data = await response.json();
    console.log("Unsplash Result:", data);
    return data?.results[0]?.links?.download;
  } catch (error) {
    console.error("Failed to fetch images:", error);
  }
}
