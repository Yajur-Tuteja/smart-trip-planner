import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { db } from '../configs/firebase-config';
import { collection, query, where, getDocs } from "firebase/firestore";
import UserTripCardItem from './components/UserTripCardItem';

const MyTrips = () => {

  const navigation = useNavigation();

  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  },[])

  const GetUserTrips = async() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user) {
        navigation('/');
        return;
    }

    
    const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
    const querySnapshot = await getDocs(q);
    
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUserTrips((userTrips) => [...userTrips, doc.data()])
        console.log(userTrips);
    });
    console.log(userTrips);
      
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl my-7'>MyTrips{console.log(userTrips)}</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
        {userTrips.map((trip, index) => (
          <UserTripCardItem trip = {trip} />
        ))}
      </div>
    </div>
  )
}

export default MyTrips
