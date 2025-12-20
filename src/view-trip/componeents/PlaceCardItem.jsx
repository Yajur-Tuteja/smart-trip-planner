import React from 'react'
import { Button } from '../../components/ui/button'
import { IoLocation } from "react-icons/io5";
import { Link } from 'react-router-dom';

function PlaceCardItem({place}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.place_name + " " + place?.place_address} target='_blank'>
        <div className='border border-gray-400 rounded-xl p-5 mt-2 hover:scale-105 transition-all cursor-pointer'>
            <h2 className='font-medium text-sm text-orange-600 mb-2'>{place?.best_time_to_visit}</h2>
            <div className='flex gap-5 items-center'>
                {/* <img src='/placeholder.jpg' className='h-[100px] w-[100px] rounded-xl'/> */}
                <div>
                    <h2 className='font-bold text-lg'>{place?.place_name}</h2>
                    <p className='text-sm text-gray-500 my-2'>{place?.place_details}</p>
                </div>
                {/* <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.place_name + " " + place?.place_address}>
                    <Button size="sm" className='cursor-pointer'>
                        <IoLocation />
                    </Button>
                </Link> */}
            </div>
        </div>
    </Link>
  )
}

export default PlaceCardItem