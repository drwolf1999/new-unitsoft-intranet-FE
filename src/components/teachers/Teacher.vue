<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <br/>
                    <h4>
                        선생님 목록(총 {{ Teachers.length }}건)
                        <div class="float-right">
                            <input type="text" name="search" placeholder="검색" class="form-control" v-model="Query" id="search-input" @keyup.enter="SearchTeachers">
                        </div>
                    </h4>
                    <br/>
                    <div>
                        <table class="highlight centered" id="teachers">
                            <thead>
                            <tr>
                                <th width="20%">#</th>
                                <th width="40%">이름</th>
                                <th width="40%">소속</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-if="fetchingTeachers">선생님 정보를 가져오는 중입니다.</tr>
                            <tr v-else v-for="(teacher, index) in Teachers">
                                <td>{{ index }}</td>
                                <td><a href="javascript:void(0)" @click="TeacherClick(teacher._id)">{{ teacher.name }}</a></td>
                                <td>{{ teacher.department }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <h4>선생님 추가</h4>
                    <br>
                    <div class="row">
                        <div class="input-field col s4">
                            <label for="name" class="active required">이름</label>
                            <input type="text" v-model="Teacher.name" id="name" placeholder="">
                        </div>
                        <div class="input-field col s4">
                            <label for="department" class="active required">소속</label>
                            <input type="text" v-model="Teacher.department" id="department" placeholder="">
                        </div>
                        <div class="input-field col s4">
                            <label for="phone" class="active required">전화번호</label>
                            <input type="text" v-model="Teacher.phone" id="phone" placeholder="">
                        </div>
                    </div>
                    <div class="text-center p-t-20">
                        <button class="btn btn-danger btn-lg" @click="AddTeacher"><i
                                class="icon icon-check"></i> 추가하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TeacherService from '../../service/teachers.js';

    export default {
        name: 'Teacher',
        data() {
            return {
                Query: '',
                fetchingTeachers: false,
                Teachers: [],
                Teacher: {
                    name: '',
                    department: '',
                    phone: '',
                },
            };
        },
        methods: {
            SearchTeachers() {
                this.fetchingTeachers = true;
                if (this.Query === '') {
                    this.$notify({
                        title: '입력값이 없습니다.',
                        text: '다시 입력해주세요',
                        type: 'warn',
                    });
                    this.fetchingTeachers = false;
                    return;
                }
                TeacherService.getTeachers(this.Query)
                    .then((response) => {
                        this.Teachers = response.data.Teachers;
                        this.fetchingTeachers = false;
                    })
                    .catch((error) => {
                        this.$notify({
                            title: '에러발생',
                            text: '조회에 실패하였습니다.',
                            type: 'error',
                        });
                        console.log(error);
                    });
            },
            TeacherClick(TeacherId) {
                const NextDestination = '/teacher/' + TeacherId;
                // if() { TODO 로그인 여부 체크
                //     //
                // }z
                this.$router.push(NextDestination);
            },
            AddTeacher() {
                TeacherService.addTeacher(this.Teacher)
                    .then((response) => {
                        this.$notify({
                            title: response.data.message,
                            text: '선생님 추가 완료',
                            type: 'success',
                        });
                        this.Teacher = {
                            name: '',
                            department: '',
                            phone: '',
                        };
                    })
                    .catch((error) => {
                        this.$notify({
                            title: '실패하였습니다.',
                            text: '선생님 추가에 실패하였습니다.',
                            type: 'error',
                        });
                        console.log(error);
                    });
            },
        },
    };
</script>
