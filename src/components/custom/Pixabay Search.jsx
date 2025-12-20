import React, { useState, useEffect } from "react";
import { searchPhotos } from "../../configs/placesApi";

const PixabaySearchExample = () => {
    // const [query, setQuery] = useState("");
    const [image, setImage] = useState([]);

    const handleSearch = async () => {
        const results = await searchPhotos('Akihabara, Tokyo');
        console.log(results)
        setImage(results || null);
    };

    useEffect(() => {
        handleSearch()
    },[])

    return (
        <div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
                    <img key={image.id} src={image.webformatURL} alt={image.tags} style={{ width: "200px", borderRadius: "8px" }} />
            </div>
        </div>
    );
};

export default PixabaySearchExample;