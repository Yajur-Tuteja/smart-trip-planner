const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'

async function searchPhotos(query) {
    try {
        const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10`, { 
                headers: {
                    "Authorization": `Client-ID ${accessKey}`
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data.results; // array of photo objects
    } catch(error) {
        console.error("Failed to fetch user info:", error);
    }
}