import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useAuth = () => {

    const navigate = useNavigate();

    const addUser = (user) => {
        Cookies.set('user', JSON.stringify(user), { expires: 7 });
    };

    const removeUser =  () => {
        Cookies.remove('user');
        navigate('/');
    };

    const getUser = () => {
        const userCookie = Cookies.get('user');
        if(userCookie) {
            return JSON.parse(userCookie);
        }
        return null;
    };

    const login = async (email, password) => {
        if(!email || !password) {
            toast.error('Email and password are required');
            return;
        }
        await axiosClient.get('sanctum/csrf-cookie').then(response => {
            axiosClient.post('api/login', {
                email,
                password
            }).then(response => {
                toast.success(response.data.message);
                addUser(response.data.data);
                navigate('/');
            })
            .catch(error => {
                toast.error(error.response.data.message);
            });
          }
        )
    }

    const logout = async () => {
        axiosClient.get('logout');
        removeUser();
    }



    return { addUser, removeUser, getUser, login, logout };

};

export default useAuth;
