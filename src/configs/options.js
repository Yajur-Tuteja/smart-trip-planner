export const SelectBudget = [{
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵"
}, {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰"
}, {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸"
}]

export const SelectTravelPlan = [{
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "✈️",
    people: "1"
}, {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandem",
    icon: "🥂",
    people: "2 People"
}, {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏡",
    people: "3 to 5 People"
}, {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: "⛵",
    people: "5 to 10 People"
}]

export const AI_PROMPT = `You are an API. Output only valid JSON, no explanations. Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates,Place address, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.All the properties of generated json shhould be in snake case. Also get an image url for {location} from the internet that actually works.
The structure of json should be like below:-
{
    travel_plan:    
    {
        "location_google_image_url": string,
        "location": string,
        "total_days": integer,
        "traveler": string,
        "budget": string,
        "hotels": [
            {
                "hotel_name": string,
                "hotel_address": string,
                "price_per_night": string,
                "hotel_image_url": string,
                "geo_coordinates": {
                    "latitude": number,
                    "longitude": number
                },
                "rating": number,
                "description": string
            }
        ],
        "itinerary": [
            {
                "day": integer,
                "places": [
                    {
                        "best_time_to_visit": string,
                        "place_name": string,
                        "place_details": string,
                        "place_image_url": string,
                        "geo_coordinates": {
                            "latitude": number,
                            "longitude": number
                        },
                        "place_address": string,
                        "ticket_pricing": string,
                        "travel_time_minutes": integer
                    }
                ]
            }
        ]
    }
}`