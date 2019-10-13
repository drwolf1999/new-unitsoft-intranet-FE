import axios from 'axios';
import RestAPI from '../constants/RestAPI.js';

// teacher 에 대한 Action 정의
export default {
    // Get
    getTeachers(name) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'teachers/search', {name: name})
            .catch(error => {
                console.log(error);
            });
    },
    getTeacher(TeacherId) {
        return axios.get(RestAPI.SERVER_DOMAIN + 'teachers/' + TeacherId)
            .catch(error => {
                console.log(error);
            });
    },
    getTeacherDiaryByTeacherId(TeacherId, Data) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'teachers/get/diary/' + TeacherId, Data)
            .catch(error => {
                console.log(error);
            });
    },
    getTeacherDiaryById(DiaryId) {
        return axios.get(RestAPI.SERVER_DOMAIN + 'teachers/diary/get/' + DiaryId)
            .catch(error => {
                console.log(error);
            });
    },
    // Add
    addTeacher(Teacher) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'teachers/add', Teacher)
            .catch(error => {
                console.log(error);
            });
    },
    addTeacherDiary(Data) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'teachers/diary/add', Data)
            .catch(error => {
                console.log(error);
            });
    },
    // Update
    updateTeacherDiary(DiaryId, Data) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'teachers/diary/update/' + DiaryId, Data)
            .catch(error => {
                console.log(error);
            });
    },
    updateTeacher(TeacherId, Data) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'teachers/update/' + TeacherId, Data)
            .catch(error => {
                console.log(error);
            });
    },
};