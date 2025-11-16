import React from 'react'
import { Link } from 'react-router-dom'

function UserTripCardItem({trip}) {
  return (
    <Link to ={'/view-trip/'+trip?.id}>
        <div>
            <img src='/placeholder.jpg' className='object-cover rounded-xl' />
            <div>
                <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
                <h2 className='text-sm text-gray-500'>{trip?.userSelection?.days} Days trip with {trip?.userSelection?.budget} budget with {trip?.userSelection?.people}</h2>
            </div>
        </div>
    </Link>
  )
}

export default UserTripCardItem