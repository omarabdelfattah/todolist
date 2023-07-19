// import './bootstrap';
import ReactDOM from 'react-dom/client';		
import { useState } from 'react'
import  {createBrowserRouter} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx'


ReactDOM.createRoot(document.getElementById('app')).render(		
    <RouterProvider router={router} />
);

 