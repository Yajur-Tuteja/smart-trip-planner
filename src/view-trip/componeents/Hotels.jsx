import React from 'react'
import { Link } from 'react-router-dom'
import { searchPhotos } from '../../configs/placesApi';
import { useState, useEffect } from 'react';

function Hotels({trip}) {

    const [hotelImages, setHotelImages] = useState({});

    useEffect(() => {
        trip?.tripData?.travel_plan?.hotels?.forEach(async (hotel, idx) => {
            console.log("set image")
            const query = `Image of hotel building ${hotel?.hotel_name} ${hotel?.hotel_address} exact location`;
            const imageUrl = await searchPhotos(query);
            setHotelImages((prev) => ({ ...prev, [idx]: imageUrl }));
        });
    }, [trip]);

    return (
        <div>
            <h2 className='font-bold text-xl mt-5 mb-3'>Hotel Recommendations</h2> {console.log(hotelImages)}
            <div className='grid md:grid-cols-3 gap-5 my-5'>
                {trip?.tripData?.travel_plan?.hotels?.map((hotel, idx) => (
                    <Link
                        key={idx}
                        to = {'https://www.google.com/maps/search/?api=1&query='+hotel?.hotel_name +" "+hotel?.hotel_address}
                        target='_blank'
                    >
                        <div className='hover:scale-110 transition-all'>
                            <img 
                                src='/placeholder.jpg'
                                className='rounded-lg' 
                            />
                            <div className='flex flex-col gap-2'>
                                <h2 className='font-medium'>{hotel?.hotel_name}</h2>
                                <h2 className='text-xs text-gray-500'>📍 {hotel?.hotel_address}</h2>
                                <h2 className='text-xs'>💰 {hotel?.price_per_night}</h2>
                                <h2 className='text-xs'>⭐ {hotel?.rating}</h2>
                            </div>
                        </div>
                    </Link>
                
                ))}
            </div>
        </div>
    )
}

export default Hotels