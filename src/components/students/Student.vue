<template>
    <v-row justify="center">
        <v-col cols="10">
            <v-card md-with-hover>
                <v-card-title>
                    학생 목록 (총 {{ Students.length }}건)
                    <v-spacer></v-spacer>
                    <v-text-field v-model="Query" @keyup.enter="SearchStudents" label="학생검색" append-icon="mdi-magnify"></v-text-field>
                </v-card-title>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">#</th>
                            <th class="text-left">이름</th>
                            <th class="text-left">학교 / 학년</th>
                            <th class="text-left">unitstudyId</th>
                            <th class="text-left">삭제</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr v-if="fetchingStudents">
                            <v-progress-linear indeterminate></v-progress-linear>
                        </tr>
                        <tr v-else v-for="(student, index) in Students" v-bind:key="student._id">
                            <td>{{ index }}</td>
                            <td><a href="javascript:void(0)" @click="StudentClick(student._id)">{{ student.name }}</a></td>
                            <td>{{ student.school + '/' + student.grade }}</td>
                            <td>{{ student.unitStudyId }}</td>
                            <td><a href="javascript:void(0)" @click="RemoveStudent(student._id)">삭제</a></td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
            <br/>
        </v-col>
        <v-col cols="10">
            <v-card>
                <v-card-title>학생추가</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6" md="4">
                            <v-text-field label="이름" v-model="Student.name"></v-text-field>
                        </v-col>
                        <v-col cols="6" md="4">
                            <v-text-field label="학교" v-model="Student.school"></v-text-field>
                        </v-col>
                        <v-col cols="6" md="4">
                            <v-text-field label="학년" v-model="Student.grade"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6" md="4">
                            <v-text-field label="유닛스터디 ID" v-model="Student.unitStudyId"></v-text-field>
                        </v-col>
                        <v-col cols="6" md="4">
                            <v-text-field label="전화번호" v-model="Student.phone"></v-text-field>
                        </v-col>
                        <v-col cols="6" md="4">
                            <v-text-field label="부모님 전화번호" v-model="Student.parent_phone"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <Button v-bind:text="true" v-bind:content="`추가하기`" v-on:click.native="AddStudent"></Button>
                </v-card-actions>
            </v-card>
            <br/>
        </v-col>
    </v-row>
</template>

<script>
    import StudentService from '../../service/students.js';
    import Button from '../form/Button.vue';

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
                this.$router.push(NextDestination);
            },
            RemoveStudent(StudentId) {
                return StudentId;
            },
        },
        components: {
            Button,
        },
    };
</script>
