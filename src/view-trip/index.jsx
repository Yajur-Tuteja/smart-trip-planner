import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../configs/context';
import { useParams } from 'react-router-dom'
import { db } from '../configs/firebase-config';
import InfoSection from './componeents/InfoSection';
import Hotels from './componeents/Hotels';
import Itenary from './componeents/Itenary';
import { searchPhotos } from '../configs/placesApi';

function ViewTrip() {
  const { tripId } = useParams();

  const {userData, setUserData} = useContext(UserContext);

  const [trip, setTrip] = useState({});

  // const [heroImage, setHeroImage] = useState("");

  useEffect(() => {

    console.log("RUNNING EFFECT");
    console.log("userData:", userData);
    console.log("tripId:", tripId);

    if (!tripId || !userData?.uid) {
      console.log("❌ SKIPPED — missing userData");
      return;
    }

    console.log("✅ PROCEEDING with:", userData.uid);

    const getTripData = async() => {
      const docRef = doc(db, 'users', userData.uid, 'trips', tripId);
      const docSnap = await getDoc(docRef);

      console.log("AFTER docRef");

      if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setTrip(docSnap.data());
      } else {
          console.log("No such document!");
      }
    }
    tripId && getTripData();
  },[tripId]);

  

  return (
    <div className='p-10 md:px-10 lg:px-44 xl:px-56'>
        {/* {Basic info} */}{console.log("trip", trip)}
        <InfoSection trip = {trip} img={trip?.tripData?.heroImage}></InfoSection>
        {/* {Hotels} */}
        <Hotels trip = {trip}></Hotels>
        {/* {Itenary} */}
        <Itenary trip = {trip}></Itenary>
    </div>
  )
}

export default ViewTrip