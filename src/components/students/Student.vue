<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <br/>
                <h4>학생 목록 (총 {{ Students.length }}건)
                    <div class="float-right">
                        <input type="text" name="search" placeholder="검색" class="form-control" v-model="Query"
                               id="search-input" @keyup.enter="SearchStudents">
                    </div>
                </h4>
                <br/>
                <div class="table">
                    <table class="highlight centered" id="students">
                        <thead>
                        <tr>
                            <th width="10%">#</th>
                            <th width="15%">이름</th>
                            <th width="15%">학교/학년</th>
                            <th width="15%">유닛스터디 ID</th>
                            <th width="10%">삭제</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="fetchingStudents">학생 정보를 가져오는 중입니다.</tr>
                        <tr v-else v-for="(student, index) in Students">
                            <td>{{ index + 1 }}</td>
                            <td><a href="javascript:void(0)" @click="StudentClick(student._id)">{{ student.name }}</a></td>
                            <td>{{ student.school + '/' + student.grade }}</td>
                            <td>{{ student.unitStudyId }}</td>
                            <td><a href="javascript:void(0)" @click="RemoveStudent(student._id)">삭제</a></td>
                        </tr>
                        </tbody>
                    </table>
                    <br/><br/><br/>
                </div>
                <br/><br/>
                <h4>학생추가</h4>
                <br/>
                <div class="row">
                    <div class="input-field col s4">
                        <label for="name">이름</label>
                        <input class="form-control form-control-lg" type="text" v-model="Student.name" id="name"
                               placeholder="">
                    </div>
                    <div class="input-field col s4">
                        <label for="school">학교</label>
                        <input class="form-control form-control-lg" type="text" v-model="Student.school"
                               id="school" placeholder="">
                    </div>
                    <div class="input-field col s1">
                        <label for="grade">학년</label>
                        <input type="text" v-model="Student.grade" id="grade" placeholder="">
                    </div>
                    <div class="input-field col s3">
                        <label for="unitstudy_id">유닛스터디 ID</label>
                        <input type="text" v-model="Student.unitStudyId" id="unitstudy_id" placeholder="">
                    </div>
                    <div class="input-field col s6">
                        <label for="phone">학생 전화번호</label>
                        <input type="tel" v-model="Student.phone" id="phone" placeholder="">
                    </div>
                    <div class="input-field col s6">
                        <label for="parent_phone">부모님 전화번호</label>
                        <input type="tel" v-model="Student.parent_phone" id="parent_phone" placeholder="">
                    </div>
                    <button class="btn" @click="AddStudent()"><i
                            class="icon icon-check"></i> 추가하기
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import StudentService from '../../service/students.js';

    export default {
        name: 'Students',
        data() {
            return {
                Query: '',
                fetchingStudents: false,
                Students: [],
                Student: {
                    name: '',
                    school: '',
                    grade: '',
                    unitStudyId: '',
                    phone: '',
                    parent_phone: '',
                },
            };
        },
        methods: {
            SearchStudents() {
                this.fetchingStudents = true;
                if (this.Query === '') {
                    this.$notify({
                        title: '입력값이 없습니다.',
                        text: '다시 입력해주세요',
                        type: 'warn',
                    });
                    this.fetchingStudents = false;
                    return;
                }
                StudentService.getStudents(this.Query)
                    .then((response) => {
                        this.Students = response.data.students;
                        this.fetchingStudents = false;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            AddStudent() {
                StudentService.addStudent(this.Student)
                    .then((response) => {
                        this.$notify({
                            title: response.data.msg,
                            text: '성공했습니다.',
                            type: 'success',
                        });
                        this.Student = {
                            name: '',
                            school: '',
                            grade: '',
                            unitStudyId: '',
                            phone: '',
                            parent_phone: '',
                        };
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            StudentClick(StudentId) {
                const NextDestination = '/student/' + StudentId;
                // if() { TODO 로그인 여부 체크
                //     //
                // }z
                this.$router.push(NextDestination);
            }
        }
    };
</script>