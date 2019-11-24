import axios from 'axios';
import RestAPI from '../constants/RestAPI.js';

// student 에 대한 Action 정의
export default {
    // Get
    DoRegister(data) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'auth/register', data)
            .catch(error => {
                console.log(error);
            });
    },
    DoLogin(data) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'auth/login', data)
            .catch(error => {
                console.log(error);
            });
    },
};
