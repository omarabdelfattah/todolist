import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';



const axiosClient = axios.create({
    baseURL: ``,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

axiosClient.defaults.withCredentials = true;


export default axiosClient;
