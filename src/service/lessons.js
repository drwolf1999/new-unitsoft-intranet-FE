import axios from 'axios';
import RestAPI from '../constants/RestAPI.js';

// student 에 대한 Action 정의
export default {
    // Get
    getLessons(name) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'lessons/search', name)
            .catch(error => {
                console.log(error);
            });
    },
    // Add
    addLesson(Lesson) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'lessons/add', Lesson)
            .catch(error => {
                console.log(error);
            });
    },
    // Update
};