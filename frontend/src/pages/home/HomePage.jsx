import React from 'react'
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';
import { useAuthStore } from '../../store/authUser';

const HomePage = () => {
  // user value we will get from backend
  const {user}=useAuthStore();
  // const user=true
  return (
    <div>
       {user?<HomeScreen/>:<AuthScreen/>  }
    </div>
   
  )
}

export default HomePage