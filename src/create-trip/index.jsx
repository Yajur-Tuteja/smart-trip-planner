import React, { useContext, useState } from 'react'
import SimpleAutocomplete from './Autocomplete'
import { SelectBudget, SelectTravelPlan, AI_PROMPT } from '../configs/options'
import { Button } from '../components/ui/button'
import { formContext } from '../configs/context'
import { generateResult } from '../configs/aiResult'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from '@react-oauth/google'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../configs/firebase-config'
import { useNavigate } from 'react-router-dom'
import Authentication from '../components/custom/Authentication'

function CreateTrip() {
  const {formData, setFormData} = useContext(formContext);

  const [showValidationText, setShowValidationText] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const login = useGoogleLogin({
  //   onSuccess:(codeResp) => {
  //     console.log(codeResp);
  //     getUserProfile(codeResp?.access_token)
  //   },
  //   onError:(error) => console.log(error)
  // })

  console.log(formData);

  const saveTrip = async(tripData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      const docId = Date.now().toString()
      const docRef = await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: tripData,
        userEmail: user?.email,
        id: docId
      });
      console.log("Document written with ID: ", docRef);
      setLoading(false);
      navigate('/view-trip/' + docId);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const generateTrip = async() => {
    const user = localStorage.getItem('user');

    if(!user) {
      console.log("dialog")
      setOpenDialog(true);
      return
    }

    if(!formData?.days || !formData?.location || !formData?.budget || !formData?.people) {
      console.log("incomplete form");
      return
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
    .replaceAll('{location}',formData?.location)
    .replaceAll('{totalDays}',formData?.days)
    .replaceAll('{traveler}',formData?.people)
    .replaceAll('{budget}',formData?.budget)
    console.log(FINAL_PROMPT);
    const res = await generateResult(FINAL_PROMPT)

    saveTrip(res);
    
    console.log(res);
  }
  
  
  // const getUserProfile = async(accessToken) => {
  //   try {
  //     const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
  //       method: "GET",
  //       headers: {
  //         "Authorization": `Bearer ${accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status} ${response.statusText}`);
  //     }
  
  //     const data = await response.json();
  //     console.log("User info:", data);
  //     localStorage.setItem('user', JSON.stringify(data));
  //     setOpenDialog(false);
  //     return data;
  //   } catch (error) {
  //     console.error("Failed to fetch user info:", error);
  //   }
  // }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>
        Tell us your travel preferences 
      </h2>
      <p className='text-gray-500 mt-3 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl font-medium my-3'>
            What is destination of choice?
          </h2>
          <SimpleAutocomplete/>
        </div>
        <div>
          <h2 className='text-xl font-medium my-3'>
            How many days are you planning your trip?
          </h2>
          <input 
            className='w-full border border-solid border-black/30 leading-9 pl-[7px] text-[14px]' 
            type="number" 
            value = {formData.days ?? ''}
            placeholder="Ex.3"
            onChange = {(e) => {
              let value = Number(e.target.value);

              if (value > 10) {
                value = 10;
                setShowValidationText(true);
              } else if (value <= 0) {
                value = 1;
                setShowValidationText(true);
              } else {
                setShowValidationText(false);
              }

              setFormData({
                ...formData,
                'days': value
              })
            }}
          />
          <span className={
            `text-red-600
            ${showValidationText? 'visible' : 'invisible'}
            `
            }>
            Please enter a value under 10 days and above 0 days
          </span>
        </div>
        <div>
          <h2 className='text-xl font-medium my-3'>
            What is your budget?
          </h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {
              SelectBudget.map((item, idx) => (
                <div 
                  key={idx} 
                  className={
                    `border rounded-lg p-4
                    ${formData.budget === item.title? 
                    'shadow-lg border-black':'hover:shadow-lg cursor-pointer'}`
                  }
                  onClick={() => {
                     setFormData({
                      ...formData,
                      'budget': item.title
                     })
                    }
                  } 
                >
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))
            }
          </div>
        </div>
        <div>
          <h2 className='text-xl font-medium my-3'>
            Who do you plan on traveling with on your next adventure??
          </h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {
              SelectTravelPlan.map((item, idx) => (
                <div 
                  key={idx} 
                  className={
                    `border rounded-lg p-4
                    ${formData.people === item.people? 
                    'shadow-lg border-black':'hover:shadow-lg cursor-pointer'}`
                  }
                  onClick={() => {
                     setFormData({
                      ...formData,
                      'people': item.people
                     })
                    }
                  } 
                >
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className='my-10 flex justify-end'>
        <Button 
          disabled = {loading}
          onClick = {generateTrip}
          className='cursor-pointer'
        >
          { loading? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Generate Trip' }
        </Button>

        <Authentication 
          openDialog = {openDialog}
          setOpenDialog = {setOpenDialog}
        />

        {/* <Dialog open={openDialog}>
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
                  <Button onClick={login} className='w-full mt-5 py-2 flex gap-4 items-center'>
                    <FcGoogle className='size-7' />
                    Sign in with Google
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
      </div>
    </div>
  )
}

export default CreateTrip