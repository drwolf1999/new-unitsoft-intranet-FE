import axios from 'axios';
import RestAPI from '../constants/RestAPI.js';

// student 에 대한 Action 정의
export default {
    // Get
    getStudents(name) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'students/search', {name: name})
            .catch(error => {
                console.log(error);
            });
    },
    getStudent(StudentId) {
        return axios.get(RestAPI.SERVER_DOMAIN + 'students/' + StudentId)
            .catch(error => {
                console.log(error);
            });
    },
    getStudentDiaryByStudentId(StudentId, Data) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'students/diarys/' + StudentId, Data)
            .catch(error => {
                console.log(error);
            });
    },
    getStudentDiaryById(DiaryId) {
        return axios.get(RestAPI.SERVER_DOMAIN + 'students/diary/' + DiaryId)
            .catch(error => {
                console.log(error);
            });
    },
    // Add
    addStudent(Student) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'students/add', Student)
            .catch(error => {
                console.log(error);
            });
    },
    addStudentDiary(Data) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'students/diary/add', Data)
            .catch(error => {
                console.log(error);
            });
    },
    // Update
    updateStudentDiary(DiaryId, Data) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'students/diary/update/' + DiaryId, Data)
            .catch(error => {
                console.log(error);
            });
    },
    updateStudent(StudentId, Data) {
        return axios.post(RestAPI.SERVER_DOMAIN + 'students/update/' + StudentId, Data)
            .catch(error => {
                console.log(error);
            });
    },
};