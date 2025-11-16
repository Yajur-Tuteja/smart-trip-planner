import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../configs/firebase-config';
import InfoSection from './componeents/InfoSection';
import Hotels from './componeents/Hotels';
import Itenary from './componeents/Itenary';

function ViewTrip() {
  const { tripId } = useParams();

  const [trip, setTrip] = useState({});

  useEffect(() => {
    tripId && getTripData();
  },[tripId])

  const getTripData = async() => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
    } else {
        console.log("No such document!");
    }
  }

  return (
    <div className='p-10 md:px-10 lg:px-44 xl:px-56'>
        {/* {Basic info} */}
        <InfoSection trip = {trip}></InfoSection>
        {/* {Hotels} */}
        <Hotels trip = {trip}></Hotels>
        {/* {Itenary} */}
        <Itenary trip = {trip}></Itenary>
    </div>
  )
}

export default ViewTrip