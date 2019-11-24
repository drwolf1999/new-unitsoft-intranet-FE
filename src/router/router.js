import Vue from 'vue';
import Router from 'vue-router';
import Auth from '../components/auth/Auth.vue';
import Student from '../components/students/Student.vue';
import StudentDiary from '../components/students/StudentInformation.vue';
import Teacher from '../components/teachers/Teacher.vue';
import TeacherDiary from '../components/teachers/TeacherInformation.vue';
import Lesson from '../components/lessons/Lesson.vue';
import PageNotFound from '../components/Index.vue';
import SMS from '../components/sms/SMS.vue';
import store from '../store/store.js';

Vue.use(Router);

const requireAuth = () => (from, to, next) => {
    if (store.getters.isLogined) return next(); // isAuth === true면 페이지 이동
    next('auth'); // isAuth === false면 다시 로그인 화면으로 이동
};

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/students',
            beforeEnter: requireAuth(),
            // name: 'Index',
            // component: Index
        },
        {
            path: '/students',
            name: 'Students',
            component: Student,
            beforeEnter: requireAuth(),
        },
        {
            path: '/student/:StudentId',
            name: 'StudentsDiary',
            component: StudentDiary,
            beforeEnter: requireAuth(),
        },
        {
            path: '/teachers',
            name: 'Teacher',
            component: Teacher,
            beforeEnter: requireAuth(),
        },
        {
            path: '/teacher/:TeacherId',
            name: 'TeacherDiary',
            component: TeacherDiary,
            beforeEnter: requireAuth(),
        },
        {
            path: '/lessons',
            name: 'Lesson',
            component: Lesson,
            beforeEnter: requireAuth(),
        },
        {
            path: '/auth',
            name: 'Auth',
            component: Auth,
        },
        {
            path: '/sms',
            name: 'SMS',
            component: SMS,
            beforeEnter: requireAuth(),
        },
        {
            path: '*',
            name: '404 Not Found',
            component: PageNotFound,
            beforeEnter: requireAuth(),
        },
    ]
});

export default router;
