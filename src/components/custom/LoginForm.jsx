import React, {useState} from 'react'
import GoogleAuthButton from './GoogleAuthButton';
import { Button } from '../ui/button';

import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from '../../configs/firebase-config';

function LoginForm({setMode}) {

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [showLoginFailText, setShowLoginFailText] = useState(false);

    const loginWithEmail = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (e) {
            console.log(e);
            setShowLoginFailText(true);
        }
    };

  return (
    <div>
        <div className='flex items-center'>
            <img src = './logo.svg'></img>
            <span className='font-bold font-sans text-4xl text-violet-950 px-2'>SmartTrip</span>
        </div>

        <div className='flex flex-col gap-2'>
            <h2 className='font-bold text-lg mt-7'>Log In With E-mail</h2> 

            <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded"
                onChange={(e) => setPassword(e.target.value)}
            />

            <span className={
                `text-red-600
                ${showLoginFailText? 'visible' : 'invisible'}
                `
            }>
                Either password is incorrect or user does not exist
            </span>

            <div>
                <Button onClick={loginWithEmail} className="w-full cursor-pointer">
                    Login
                </Button>
            </div>
        </div>

        <div className="flex items-center gap-3 my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
        </div>

        <GoogleAuthButton googleButtonText="Continue with Google"/>

        <div 
            className='flex justify-center mt-4 cursor-pointer'
        >
            <span>
                No account ?  
                <span 
                    onClick={() => setMode("signup")}
                    className='text-blue-600 hover:underline ml-0.5'> 
                    Create one
                </span>
            </span>
        </div>
    </div>
  )
}

export default LoginForm