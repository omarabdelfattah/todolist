import React from 'react'
import axiosClient from '../axios-client'
import useAuth from '../hooks/useAuth'
import { Outlet, Navigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

function DefaultLayout() {


  const { getUser, logout } = useAuth()
  
  const user = getUser();

  if(!user) {
    console.log(user)
    return <Navigate to="/login" />
  }

  return (
    <div>
        <ToastContainer />
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand" href="#">Todo List</a>
                {/* say hey and logout in dropdown */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                {user.role} : {user.name}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" 
                                onClick={() => { logout();  }} >Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="container">
            <Outlet />
        </div>
    </div>
);
}

export default DefaultLayout