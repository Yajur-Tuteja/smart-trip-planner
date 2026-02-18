import {useContext} from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Authentication from './Authentication'
import { UserContext, AuthDialogContext } from '../../configs/context'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../configs/firebase-config';
import { signOut } from 'firebase/auth'

function Header() { 

  const {userData, setUserData} = useContext(UserContext);
  const {setOpenAuthDialog} = useContext(AuthDialogContext);

  const navigate = useNavigate();

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
                  <img src={userData?.picture} className='h-8.5 w-8.5 rounded-full' referrerPolicy="no-referrer"></img>
                </PopoverTrigger>
                <PopoverContent className='cursor-pointer'>
                  <h2 onClick={async () => {
                    await signOut(auth);
                    setUserData(null);
                    navigate("/");
                  }}>Logout</h2>
                </PopoverContent>
              </Popover>
            </div> :
            <div>
              <Button 
                className='cursor-pointer' 
                onClick={() => {
                  setOpenAuthDialog(true)
                }}>
                  Sign In
              </Button>
              <Authentication />
            </div>
           }
        </div>
    </div>
  )
}

export default Header