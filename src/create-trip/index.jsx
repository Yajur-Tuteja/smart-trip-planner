import React, { useContext, useState } from 'react'
import SimpleAutocomplete from './Autocomplete'
import { SelectBudget, SelectTravelPlan, AI_PROMPT } from '../configs/options'
import { Button } from '../components/ui/button'
import { FormContext, AuthDialogContext, UserContext } from '../configs/context'
import { fetchAIResult } from '../configs/aiResult'
import { searchPhotos } from '../configs/placesApi'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import Authentication from '../components/custom/Authentication'

function CreateTrip() {
  const {formData, setFormData} = useContext(FormContext);

  const {setOpenAuthDialog} = useContext(AuthDialogContext);

  const {userData, setUserData} = useContext(UserContext);

  const [showValidationText, setShowValidationText] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  console.log(formData);

  const saveTrip = async(tripData) => {
    try {
      console.log("userData", userData);
      
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData.uid,
          userSelection: formData,
          tripData,
        }),
      });
      const docRef = await response.json();
      
      console.log("Document written with ID: ", docRef.data.id);
      
      setLoading(false);
      navigate('/view-trip/' + docRef.data.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const fetchImage = async(location) => {
    const imageUrl = await searchPhotos("Beautiful high resolution image of " + location.replace(/\b(province|district|state|region|governorate)\b/i, ""));
    return imageUrl;
  }

  const generateTrip = async() => {

    if(!userData) {
      console.log("dialog")
      setOpenAuthDialog(true);
      return
    }

    if(!formData?.days || !formData?.location || !formData?.budget || !formData?.people) {
      console.log("incomplete form");
      return
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
    .replaceAll('{location}',formData?.location?.address)
    .replaceAll('{totalDays}',formData?.days)
    .replaceAll('{traveler}',formData?.people)
    .replaceAll('{budget}',formData?.budget)
    console.log(FINAL_PROMPT);

    const AITripDetails = await fetchAIResult(FINAL_PROMPT)
    const tripImage = await fetchImage(formData?.location?.address);
    const trip = {AITripDetails, heroImage: tripImage};

    console.log("trip", trip);
    saveTrip(trip);

    console.log(AITripDetails);
  }
  

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
            className='w-full border border-solid border-black/30 leading-9 pl-1.75 text-[14px]' 
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

        <Authentication />

      </div>
    </div>
  )
}

export default CreateTrip