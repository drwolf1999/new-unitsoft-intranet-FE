import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/Index.vue';
import Student from '../components/students/Student.vue';
import StudentDiary from '../components/students/StudentInformation.vue';
import Teacher from '../components/teachers/Teacher.vue';
import TeacherDiary from '../components/teachers/TeacherInformation.vue';
import Lesson from '../components/lessons/Lesson.vue';
import PageNotFound from '../components/Index.vue';
// import store from '../store/store.js';

Vue.use(Router);

// const requireAuth = () => (from, to, next) => {
//     if (store.getters.isLogined) return next(); // isAuth === true면 페이지 이동
//     next('/noauth'); // isAuth === false면 다시 로그인 화면으로 이동
// };

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/students',
            // name: 'Index',
            // component: Index
        },
        {
            path: '/students',
            name: 'Students',
            component: Student,
        },
        {
            path: '/student/:StudentId',
            name: 'StudentsDiary',
            component: StudentDiary,
        },
        {
            path: '/teachers',
            name: 'Teacher',
            component: Teacher,
        },
        {
            path: '/teacher/:TeacherId',
            name: 'TeacherDiary',
            component: TeacherDiary,
        },
        {
            path: '/lessons',
            name: 'Lesson',
            component: Lesson,
        },
        {
            path: '*',
            name: '404 Not Found',
            component: PageNotFound,
        },
    ]
});

export default router;
