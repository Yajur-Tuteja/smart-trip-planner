import React from 'react'
import { Button } from '../../components/ui/button'
import { FaShareAlt } from "react-icons/fa";

function InfoSection({trip}) {
  return (
    <div>
        <img src='/placeholder.jpg' className='rounded-xl h-[300px] w-full object-cover'></img>
        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.tripData?.travel_plan?.location}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>📅 {trip?.userSelection?.days} Days</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💰 {trip?.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>🥂 No. of Travellers: {trip?.userSelection?.people}</h2>
                </div>
            </div>
            <Button className='cursor-pointer'>
                <FaShareAlt />
            </Button>
        </div>
    </div>
  )
}

export default InfoSection