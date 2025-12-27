import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function Itenary({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-7 mb-3'>Itenary</h2>
        <div>
            {trip?.tripData?.travel_plan?.itinerary?.map((item, idx) => (
                <div 
                    key={idx}
                    className='my-3'
                >
                    <h2 className='font-bold text-lg'>Day {item?.day}</h2>
                    {item?.places?.map((place, idx) => (
                        <div key={idx} className='my-3'>
                            <PlaceCardItem place={place} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Itenary