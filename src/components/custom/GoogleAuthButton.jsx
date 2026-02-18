import React from 'react'
import { auth } from '../../configs/firebase-config';
import { Button } from '../ui/button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';

function GoogleAuthButton({googleButtonText}) {
  
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
        await signInWithPopup(auth, provider);
  };
 
  return (
    <div>
        <Button onClick={loginWithGoogle} className='w-full mt-5 py-2 flex gap-4 items-center cursor-pointer'>
            <FcGoogle className='size-7' />
            {googleButtonText}
        </Button>
    </div>
  )
}

export default GoogleAuthButton