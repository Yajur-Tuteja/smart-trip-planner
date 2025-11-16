import React, { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { userContext } from '../../configs/context';

function Authentication({openDialog, setOpenDialog}) {

    const {userData, setUserData} = useContext(userContext);
  
    const login = useGoogleLogin({
        onSuccess:(codeResp) => {
            console.log(codeResp);
            getUserProfile(codeResp?.access_token)
        },
        onError:(error) => console.log(error)
    })
    
    const getUserProfile = async(accessToken) => {
        try {
            const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
        
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
        
            const data = await response.json();
            console.log("User info:", data);
            localStorage.setItem('user', JSON.stringify(data));
            const userJSON = JSON.parse(localStorage.getItem('user'))
            console.log(userJSON);
            setUserData(userJSON);
            setOpenDialog(false);
            return data;
        } catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    }

    return (
        <div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <div className='flex items-center'>
                                <img src = './logo.svg'></img>
                                <span className='font-bold font-sans text-4xl text-violet-950 px-2'>SmartTrip</span>
                            </div>
                            <div>
                                <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                                <p>Sign in to the App with Google authentication securely</p>
                                <Button onClick={login} className='w-full mt-5 py-2 flex gap-4 items-center cursor-pointer'>
                                    <FcGoogle className='size-7' />
                                    Sign in with Google
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Authentication