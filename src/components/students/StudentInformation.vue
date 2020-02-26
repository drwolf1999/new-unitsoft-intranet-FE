<template>
    <v-row justify="center">
        <v-col cols="10">
            <v-card>
                <v-card-title>{{ Student.name }}</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="4" md="4">
                            <v-text-field label="학교" v-model="Student.school" :disabled="!ModifyingStudent"></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field label="학년" v-model="Student.grade" :disabled="!ModifyingStudent"></v-text-field>
                        </v-col>
                        <v-col cols="4" md="4">
                            <v-text-field label="유닛스터디 ID" v-model="Student.unitStudyId" :disabled="true"></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-text-field label="학생 전화번호" v-model="Student.phone" :disabled="!ModifyingStudent"></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-text-field label="부모님 전화번호" v-model="Student.parent_phone" :disabled="!ModifyingStudent"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <Button v-if="!ModifyingStudent" v-bind:content="`수정하기`" v-bind:textBtn="true" v-on:click.native="modifyStudent"></Button>
                    <Button v-else v-bind:content="`완료`" v-bind:textBtn="true" v-on:click.native="doModifyStudent"></Button>
                </v-card-actions>
            </v-card>
            <br/>
        </v-col>
        <v-col cols="10">
            <v-card>
                <v-card-title>일지 추가</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="4" md="4">
                            <Date v-bind:date="Diary.lesson_date" label="날짜" v-on:input="onChangeDiaryDate"></Date>
                        </v-col>
                        <v-col cols="4" md="4">
                            <Time v-bind:time="Diary.lesson_start" label="시작 시간" v-on:input="onChangeDiaryStart"></Time>
                        </v-col>
                        <v-col cols="4" md="4">
                            <Time v-bind:time="Diary.lesson_end" label="종료 시간" v-on:input="onChangeDiaryEnd"></Time>
                        </v-col>
                        <v-col cols="6" md="6">
                            <SelectForm v-bind:selectList="getTeachers" v-on:input="onChangeTeachers" name="담당 선생님"></SelectForm>
                        </v-col>
                        <v-col cols="6" md="6">
                            <SelectForm v-bind:selectList="getLessons" v-on:input="onChangeLessons" name="수업 종류"></SelectForm>
                        </v-col>
                        <v-col cols="12" md="12">
                            <InputForm v-bind:data="Diary.lesson_about" v-on:input="onChangeReloadLessonAbout" label="상세내용"></InputForm>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <Button v-bind:content="`일지추가`" v-bind:text="true" v-on:click.native="AddStudentDiary()">일지추가</Button>
                </v-card-actions>
            </v-card>
            <br/>
        </v-col>
        <v-col cols="10">
            <v-card>
                <v-card-title>일지</v-card-title>
                <v-card-text>
                    <v-expansion-panels multiple>
                        <v-expansion-panel>
                            <v-expansion-panel-header>미결제 (횟수({{ Pay.Count }}) / 시간({{ Pay.Time }}))</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-simple-table>
                                    <template v-slot:default>
                                        <thead>
                                        <tr>
                                            <th class="text-left">날짜</th>
                                            <th class="text-left">시작 시간</th>
                                            <th class="text-left">종료 시간</th>
                                            <th class="text-left">선생님</th>
                                            <th class="text-left">수업 종류</th>
                                            <th class="text-left">상세내용</th>
                                            <th class="text-left">결제 완료</th>
                                            <th class="text-left">일지 수정</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-if="fetchingStudents">
                                            <v-progress-linear></v-progress-linear>
                                        </tr>
                                        <DiaryStudent v-for="diary in noneCompletedDiarys" v-bind:key="diary" v-bind:DiaryInfo="diary" v-on:update="onChangeDiary"></DiaryStudent>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <!-- 결제 일지 -->
                        <v-expansion-panel>
                            <v-expansion-panel-header>결제 완료</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row>
                                    <v-col cols="6">
                                        <Date v-bind:date="load.start" label="시작" v-on:input="onChangeReloadStart"></Date>
                                    </v-col>
                                    <v-col cols="6">
                                        <Date v-bind:date="load.end" label="끝" v-on:input="onChangeReloadEnd"></Date>
                                    </v-col>
                                </v-row>
                                <v-simple-table>
                                    <template v-slot:default>
                                        <thead>
                                        <tr>
                                            <th class="text-left">날짜</th>
                                            <th class="text-left">시작 시간</th>
                                            <th class="text-left">종료 시간</th>
                                            <th class="text-left">선생님</th>
                                            <th class="text-left">수업 종류</th>
                                            <th class="text-left">상세내용</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-if="fetchingStudents">
                                            <v-progress-linear></v-progress-linear>
                                        </tr>
                                        <DiaryStudent v-for="diary in CompletedDiarys" v-bind:key="diary" v-bind:DiaryInfo="diary"></DiaryStudent>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    // import SMSService from '../../service/sms.js';
    import StudentService from '../../service/students.js';
    import SelectForm from '../form/SelectForm.vue';
    import DiaryStudent from './DiaryStudent.vue';
    import Date from '../form/Date.vue';
    import Time from '../form/Time.vue';
    import InputForm from '../form/Input.vue';
    import Utility from '../../Utility/Utility.js';
    import Button from '../form/Button.vue';

    export default {
        name: 'StudentInformation',
        mounted() {
            this.$store.dispatch('fetchTeachers');
            this.$store.dispatch('fetchLessons');
            this.fetchStudent();
            this.fetchStudentDiarys();
        },
        data() {
            return {
                Student: {
                    _id: 'key',
                    school: 'school',
                    grade: 'grade',
                    phone: 'phone',
                    parent_phone: 'parent phone',
                    unitStudyId: 'unitStudyId',
                },
                ModifyingStudent: false,
                CompletedDiarys: [],
                noneCompletedDiarys: [],
                Diary: {
                    teacher: null,
                    lesson_type: null,
                    lesson_date: Utility.getDateBaseNow(0, 0, 0),
                    lesson_start: Utility.getTimeBaseNow(-3, 0),
                    lesson_end: Utility.getTimeBaseNow(0, 0),
                    lesson_about: '',
                    lesson_complete: false,
                },
                isSelectAll: false,
                Pay: {
                    Time: 0,
                    Count: 0,
                },
                load: {
                    start: Utility.getDateBaseNow(0, -1, 0),
                    end: Utility.getDateBaseNow(0, 0, 0),
                },
            };
        },
        computed: {
            getTeachers() {
                const TeachersInfo = this.$store.getters.getTeachers;
                let ret = [];
                TeachersInfo.forEach(teacher => {
                    ret.push({
                        id: teacher._id,
                        name: teacher.name,
                    });
                });
                return ret;
            },
            getLessons() {
                const LessonsInfo = this.$store.getters.getLessons;
                let ret = [];
                LessonsInfo.forEach(lesson => {
                    ret.push({
                        id: lesson._id,
                        name: lesson.type,
                    });
                });
                return ret;
            },
        },
        methods: {
            AllSelect() {
                this.isSelectAll = !this.isSelectAll;
            },
            modifyStudent() {
                this.ModifyingStudent = true;
            },
            doModifyStudent() {
                this.ModifyingStudent = false;
                StudentService.updateStudent(this.Student._id, this.Student)
                    .then((response) => {
                        this.$notify({
                            title: response.data.message,
                            text: '수정 되었습니다.',
                            type: 'success',
                        });
                        this.Student = response.data.Student;
                    })
                    .catch(error => {
                        this.$notify({
                            title: error.data.message,
                            text: '실패하였습니다.',
                            type: 'error',
                        });
                        console.log(error);
                    });
            },
            onChangeTeachers(value) {
                this.Diary.teacher = value;
            },
            onChangeLessons(value) {
                this.Diary.lesson_type = value;
            },
            onChangeDiaryDate(value) {
                this.Diary.lesson_date = value;
            },
            onChangeDiaryStart(value) {
                this.Diary.lesson_start = value;
            },
            onChangeDiaryEnd(value) {
                this.Diary.lesson_end = value;
            },
            onChangeReloadLessonAbout(value) {
                this.Diary.lesson_about = value;
            },
            onChangeReloadStart(value) {
                this.load.start = value;
                this.fetchStudentDiarys();
            },
            onChangeReloadEnd(value) {
                this.load.end = value;
                this.fetchStudentDiarys();
            },
            isValidDiaryDuration() {
                if (this.Diary.lesson_date === '' || this.Diary.lesson_start === '' || this.Diary.lesson_end === '')
                    return false;
                else if (Utility.compareTime(this.Diary.lesson_start, this.Diary.lesson_end) >= 0)
                    return false;
                return true;
            },
            isValidDiaryTeacher() {
                return this.Diary.teacher !== null;
            },
            isValidDiaryLesson() {
                return this.Diary.lesson_type !== null;
            },
            onChangeDiary(value, type, typeValue) {
                if (type === 'Complete') {
                    value.lesson_complete = true;
                } else if (type === 'Edit') {
                    //
                }
                value.lesson_date = Utility.StringToDate(value.lesson_date);
                StudentService.updateStudentDiary(value._id, {
                    lesson_complete: value.lesson_complete,
                    lesson_date: value.lesson_date,
                    lesson_start: value.lesson_start,
                    lesson_end: value.lesson_end,
                    lesson_about: value.lesson_about,
                })
                    .then(response => {
                        this.$notify({
                            title: response.data.message,
                            text: '성공!',
                            type: 'success',
                        });
                        if (type === 'Complete') {
                            this.CompletedDiarys.push(response.data.Diary);
                            this.noneCompletedDiarys = Utility.removeElemntByValue(this.noneCompletedDiarys, response.data.Diary);
                            this.Pay.Count--;
                            this.Pay.Time -= Utility.duration(value.lesson_start, value.lesson_end);
                        } else if (type === 'Edit') {
                            this.Pay.Time += Utility.duration(typeValue.start, typeValue.end) - Utility.duration(value.lesson_start, value.lesson_end);
                            // SMSService.sendSMS({
                            // 	to: this.Student.parent_phone,
                            // 	text: this.Student.name + '학생의 수정된 수업 입니다.\n' + Utility.LessonInfo(value),
                            // });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            fetchStudent() {
                StudentService.getStudent(this.$route.params.StudentId)
                    .then((response) => {
                        this.Student = response.data.Student;
                    })
                    .catch(error => {
                        this.$notify({
                            title: '학생 정보를 가져오는데 문제가 발생하였습니다.',
                            text: '관리자에게 문의 바랍니다.',
                            type: 'error',
                        });
                        console.log(error);
                    });
            },
            fetchStudentDiarys() {
                if (Utility.compTime(this.load.start, this.load.end) === 1) {
                    this.$notify({
                        title: '입력값을 검토해주세요.',
                        type: 'warn',
                    });
                    return;
                }
                while (this.CompletedDiarys.length) this.CompletedDiarys.pop();
                while (this.noneCompletedDiarys.length) this.noneCompletedDiarys.pop();
                StudentService.getStudentDiaryByStudentId(this.$route.params.StudentId, {
                    start: this.load.start,
                    end: this.load.end,
                })
                    .then((response) => {
                        response.data.Diarys.forEach(diary => {
                            if (diary.lesson_complete) {
                                this.CompletedDiarys.push(diary);
                            } else {
                                this.noneCompletedDiarys.push(diary);
                                this.Pay.Time += parseFloat(Utility.duration(diary.lesson_start, diary.lesson_end));
                                this.Pay.Count++;
                            }
                        });
                        this.$notify({
                            title: '성공적으로 로딩했습니다.',
                            // text: error,
                            type: 'success',
                        });
                    })
                    .catch(error => {
                        this.$notify({
                            title: '에러 발생!',
                            text: error,
                            type: 'error',
                        });
                        console.log(error);
                    });
            },
            AddStudentDiary() {
                if (!this.isValidDiaryDuration()) {
                    this.$notify({
                        title: '시간이 잘 못 입력되었습니다.',
                        text: '종료시간이 더 빠릅니다.',
                        type: 'error',
                    });
                    return;
                } else if (!this.isValidDiaryTeacher()) {
                    this.$notify({
                        title: '지도한 선생님을 입력해주세요',
                        text: '다시 입력해주세요',
                        type: 'error',
                    });
                    return;
                } else if (!this.isValidDiaryLesson()) {
                    this.$notify({
                        title: '수업한 내용을 입력해주세요',
                        text: '다시 입력해주세요',
                        type: 'error',
                    });
                    return;
                }
                console.log(JSON.stringify(this.Diary));
                StudentService.addStudentDiary({
                    student_id: this.Student._id,
                    teacher: this.Diary.teacher,
                    lesson_type: this.Diary.lesson_type,
                    lesson_date: this.Diary.lesson_date,
                    lesson_start: this.Diary.lesson_start,
                    lesson_end: this.Diary.lesson_end,
                    lesson_about: this.Diary.lesson_about,
                })
                    .then((response) => {
                        this.$notify({
                            title: response.data.msg,
                            text: '성공!',
                            type: 'success',
                        });
                        this.Pay.Count++;
                        this.Pay.Time += parseFloat(Utility.duration(response.data.Diary.lesson_start, response.data.Diary.lesson_end));
                        this.noneCompletedDiarys.push(response.data.Diary);
                        console.log('the end...');
                        // SMSService.sendSMS({
                        // 	to: this.Student.parent_phone,
                        // 	text: this.Student.name + '학생의 수업 내용입니다.\n' + Utility.LessonInfo(response.data.Diary),
                        // })
                        // 	.then((response) => {
                        // 		console.log('success' + response.data);
                        // 	})
                        // 	.catch(error => {
                        // 		this.$notify({
                        // 			title: '메세지 전송에 실패하였습니다.',
                        // 			type: 'error',
                        // 		});
                        // 		console.log('send sms error' + error.message);
                        // 	});
                    })
                    .catch((error) => {
                        this.$notify({
                            title: '실패..',
                            text: '실패..',
                            type: 'error',
                        });
                        console.log('diary error' + error.message);
                    });
            },
        },
        components: {
            Button,
            SelectForm,
            DiaryStudent,
            Date,
            Time,
            InputForm,
        },
    };
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .faded-enter-active, .faded-leave-active {
        transition: opacity .5s;
    }

    .faded-enter, .faded-leave-to {
        opacity: 0;
    }
</style>
