import {useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Authentication from './Authentication'
import { googleLogout } from '@react-oauth/google'
import { userContext } from '../../configs/context'

function Header() { 

  const {userData, setUserData} = useContext(userContext);
  
  const[openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  },[]);

  return (
    <div className='shadow-sm p-3 px-5 flex items-center justify-between'>
        <div>
          <Link className='flex items-center' to='/'>
            <img src = '/logo.svg'></img>
            <span className='font-bold font-sans text-4xl text-violet-950 px-2'>SmartTrip</span>
          </Link>
        </div>
        <div>
           {userData? 
            <div className='flex items-center gap-3'>
              <Link to='/create-trip'>
                <Button variant='outline' className='rounded-full cursor-pointer'>+ Create Trip</Button>
              </Link>
              <Link to='/my-trips'>
                <Button variant='outline' className='rounded-full cursor-pointer'>My Trips</Button>
              </Link>
              <Popover>
                <PopoverTrigger className='cursor-pointer'>
                  <img src={userData?.picture} className='h-[34px] w-[34px] rounded-full' referrerPolicy="no-referrer"></img>
                </PopoverTrigger>
                <PopoverContent className='cursor-pointer'>
                  <h2 onClick={() => {
                    googleLogout();
                    localStorage.removeItem('user');
                    setUserData(null)
                  }}>Logout</h2>
                </PopoverContent>
              </Popover>
            </div> :
            <div>
              <Button 
                className='cursor-pointer' 
                onClick={() => {
                  setOpenDialog(true)
                }}>
                  Sign In
              </Button>
              <Authentication 
                openDialog = {openDialog}
                setOpenDialog = {setOpenDialog}
              />
            </div>
           }
        </div>
    </div>
  )
}

export default Header