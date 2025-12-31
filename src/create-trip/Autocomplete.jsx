import React, { useContext, useEffect, useRef, useState } from "react";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { FormContext } from "../configs/context";

function SimpleAutocomplete() {

  const {formData, setFormData} = useContext(FormContext);

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
            'location': {
              address: location?.properties?.address_line1 + ", " + location?.properties?.address_line2,
              properties: location?.properties
            }
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
