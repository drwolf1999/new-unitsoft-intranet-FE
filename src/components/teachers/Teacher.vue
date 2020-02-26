<template>
    <v-row justify="center">
        <v-col cols="10" md="10">
            <br/>
            <v-card>
                <v-card-title>
                    선생님 목록(총 {{ Teachers.length }}건)
                    <v-spacer></v-spacer>
                    <v-text-field v-model="Query" @keyup.enter="SearchTeachers" label="선생님 검색" append-icon="mdi-magnify"></v-text-field>
                </v-card-title>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">#</th>
                            <th class="text-left">이름</th>
                            <th class="text-left">소속</th>
                            <th class="text-left">삭제</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="fetchingTeachers">
                            <td v-for="_ in 4" :key="_">
                            <v-progress-linear indeterminate></v-progress-linear>
                            </td>
                        </tr>
                        <tr v-else v-for="(teacher, index) in Teachers" v-bind:key="teacher._id">
                            <td md-numeric>{{ index }}</td>
                            <td><a href="javascript:void(0)" @click="TeacherClick(teacher._id)">{{ teacher.name }}</a></td>
                            <td>{{ teacher.department }}</td>
                            <td><a href="javascript:void(0)" @click="RemoveTeacher(teacher._id)">삭제</a></td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
            <br>
        </v-col>
        <v-col cols="10">
            <v-card>
                <v-card-title>선생님</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="4" md="4">
                            <v-text-field label="이름" v-model="Teacher.name"></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field label="소속" v-model="Teacher.department"></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field label="전화번호" v-model="Teacher.phone"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <Button v-bind:content="`추가하기`" v-bind:text="true" v-on:click.native="AddTeacher"></Button>
                </v-card-actions>
            </v-card>
            <br>
        </v-col>
    </v-row>
</template>

<script>
    import TeacherService from '../../service/teachers.js';
    import Button from '../form/Button.vue';
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
            RemoveTeacher(TeacherId) {
                return TeacherId;
            },
        },
        components: {
            Button,
        }
    };
</script>
