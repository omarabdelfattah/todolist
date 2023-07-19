import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Login from './components/Login.jsx';
import List from './components/List.jsx';
import NotFound from './components/NotFound.jsx';
import DefaultLayout from './layouts/DefaultLayout.jsx';
import GuestLayout from './layouts/GuestLayout.jsx';


const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <List/>
            }, 
        ] 
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
        ]

    },
    {
        path: '*',
        element: <NotFound/>
    }
]);

export default router;