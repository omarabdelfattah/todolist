import React from 'react'
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GuestLayout() {
  
  const { getUser } = useAuth()
  
  const user = getUser();

  if(user) {
    return <Navigate to="/" />
  }
 
  return (
    <div>
        <ToastContainer />
        <Outlet />
    </div>
);
}

export default GuestLayout