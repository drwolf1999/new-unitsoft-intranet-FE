import axios from 'axios';
import RestAPI from '../constants/RestAPI.js';

// student 에 대한 Action 정의
export default {
    // SMS
    sendSMS(sms) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'messages/', {
            countryCode: '+82',
            // to: '01062091397',
            // text: '123123',
            to: sms.to,
            text: sms.text,
        })
            .catch(error => {
                console.log(error);
            });
    },
    sendKakao(data) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'messages/kakao', {
            data: data,
        })
            .catch(error => {
                console.log(error);
            });
    }
};
