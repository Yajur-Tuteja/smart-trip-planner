import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] mt-15 text-center'>
            <span className='text-violet-600'>
                Discover Your Next Adventure with AI:&nbsp;
            </span>
            <span>
                Personalized Itineraries at Your Fingertips
            </span>
        </h1>
        <p className='text-gray-500 text-xl text-center'>
            Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>
        <Link to={'/create-trip'}>
            <Button className='cursor-pointer'>Get Started, It's free</Button>
        </Link>
    </div>
  )
}

export default Hero