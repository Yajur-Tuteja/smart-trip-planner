import React, { useContext, useEffect, useRef, useState } from "react";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { formContext } from "../configs/context";

// const GEOAPIFY_API_KEY = "84fab0cdb39942e3a012f15a411fdf42";

function SimpleAutocomplete() {

  const {formData, setFormData} = useContext(formContext);

  console.log(formData);

  const inputRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    console.log("Text");
    console.log(inputRef);
    if (inputRef.current) {
      const autocomplete = new GeocoderAutocomplete(
        inputRef.current,
        import.meta.env.VITE_GEOAPIFY_API_KEY,
        {
          placeholder: "Search for a place",
          limit: 5,
        }
      );

      console.log(autocomplete)

      autocomplete.on("select", (location) => {
        setSelected(location);
        console.log(selected);
        setFormData((formData) => ({
            ...formData,
            'location': location?.properties?.address_line1 + ", " + location?.properties?.address_line2
        }))
      });
    }
  }, []);

  return (
    <div>
      <div
        ref={inputRef}
        className="relative"
      />
      {selected && console.log(selected)}
    </div>
  );
}

export default SimpleAutocomplete;
