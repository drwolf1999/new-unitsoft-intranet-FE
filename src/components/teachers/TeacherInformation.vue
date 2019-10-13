<template>
    <div class="container">
        <div class="row">
            <div class="card" style="">
                <div class="card-content">
                    <h4 class="card-title">{{ Teacher.name }}</h4>
                    <div class="row">
                        <div class="col-12">
                            <label for="department" class="required">소속</label>
                            <input class="form-control form-control-lg" type="text" name="department"
                                   v-model="Teacher.department"
                                   id="department" placeholder="" :disabled="!ModifyingTeacher">
                        </div>
                        <div class="col-12">
                            <label for="phone" class="required">전화번호</label>
                            <input class="form-control form-control-lg" type="text" name="phone" v-model="Teacher.phone" id="phone" placeholder="" :disabled="!ModifyingTeacher">
                        </div>
                    </div>
                    <div class="text-center p-t-20">
                        <button v-if="!ModifyingTeacher" class="btn" @click="modifyTeacher()" id="change-btn">
                            <i class="icon icon-pencil"></i> 수정하기
                        </button>
                        <button v-else class="btn" @click="doModifyTeacher()" id="do-chang-btn">
                            <i class="icon icon-pencil"></i>완료
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="card">
                <div class="card-content">
                    <h6 class="card-title">일지 작성</h6>
                    <Date class="col s4" v-bind:date="Diary.lesson_time.date" label="날짜"
                          v-on:input="onChangeDiaryDate"></Date>
                    <Time class="col s4" v-bind:time="Diary.lesson_time.start" label="시작 시간"
                          v-on:input="onChangeDiaryStart"></Time>
                    <Time class="col s4" v-bind:time="Diary.lesson_time.end" label="종료 시간"
                          v-on:input="onChangeDiaryEnd"></Time>
                    <SelectForm v-bind:selectList="getLessons" v-on:input="onChangeLessons" name="수업 종류"></SelectForm>
                </div>
                <div class="card-action">
                    <a href="javascript:void(0);" style="color: #0288d1;" id="add-teacherdiary-btn" @click="AddTeacherDiary()" name="action">일지추가</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="card">
                <div class="card-content">
                    <h4 class="card-title">일지</h4>
                    <h5>횟수({{ Pay.Count }}) / 시간({{ Pay.Time }})</h5>
                    <ul class="collapsible">
                        <li>
                            <div class="collapsible-header"><i class="material-icons">clear</i>미결제</div>
                            <div class="collapsible-body">
                                <div v-for="diary in noneCompletedDiarys" id="noneCompleteDiarys">
                                    <DiaryTeacher v-bind:DiaryInfo="diary" v-on:update="onChangeDiary"></DiaryTeacher>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="collapsible-header"><i class="material-icons">check</i>결제 완료</div>
                            <div class="collapsible-body">
                                <div class="row">
                                    <div class="col s6">
                                        <Date class="input-field col s6" v-bind:date="load.start" label="시작"
                                              v-on:input="onChangeReloadStart"></Date>
                                        <Date class="input-field col s6" v-bind:date="load.end" label="끝"
                                              v-on:input="onChangeReloadEnd"></Date>
                                    </div>
                                    <div class="col s6">
                                        <div v-for="diary in CompletedDiarys" id="diary-list">
                                            <DiaryTeacher v-bind:DiaryInfo="diary"></DiaryTeacher>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import StudentService from '../../service/students.js';
    import TeacherService from '../../service/teachers.js';
    import DiaryStudent from './DiaryStudent.vue';
    import DiaryTeacher from './DiaryTeacher.vue';
    import SelectForm from '../form/SelectForm.vue';
    import Date from '../form/Date.vue';
    import Time from '../form/Time.vue';
    import Utility from '../../Utility/Utility.js';

    export default {
        name: 'TeacherInformation',
        mounted() {
            $('.collapsible').collapsible();
            this.$store.dispatch('fetchLessons');
            this.$store.dispatch('fetchStudents');
            this.fetchTeacher();
            this.fetchTeacherDiarys();
        },
        data() {
            return {
                Teacher: {
                    name: '',
                    department: '',
                    phone: '',
                },
                ModifyingTeacher: false,
                CompletedDiarys: [],
                noneCompletedDiarys: [],
                Diary: {
                    lesson_type: null,
                    lesson_time: {
                        date: Utility.getDateBaseNow(0, 0, 0),
                        start: Utility.getTimeBaseNow(-3, 0),
                        end: Utility.getTimeBaseNow(0, 0),
                    },
                },
                idSelectAll: false,
                Pay: {
                    Time: 0,
                    Count: 0,
                },
                SelectedStudent: null,
                StudentDiarys: new Map(),
                load: {
                    start: Utility.getDateBaseNow(0, -1, 0),
                    end: Utility.getDateBaseNow(0, 0, 0),
                },
            };
        },
        computed: {
            getStudents() {
                const StudentsInfo = this.$store.getters.getStudents;
                let ret = [];
                StudentsInfo.forEach(student => {
                    ret.push({
                        id: student._id,
                        name: student.name,
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
            AppendStudent() {
                let Student = null;
                StudentService.getStudent(this.SelectedStudent)
                    .then((response) => {
                        Student = response.data.Student;
                    })
                    .catch((error) => {
                        this.$notify({
                            title: '데이터를 처리하는 과정에서 오류가 발생했습니다.',
                            type: 'error',
                        });
                    });
                this.StudentDiarys.set(this.SelectedStudent, {name: Student.name});
                // this.StudentDiarys.forEach(std => {
                //     alert(JSON.stringify(std));
                // });
            },
            AllSelect() {
                //
            },
            onChangeLessons(value) {
                this.Diary.lesson_type = value;
            },
            onChangeDiaryDate(value) {
                this.Diary.lesson_time.date = value;
            },
            onChangeDiaryStart(value) {
                this.Diary.lesson_time.start = value;
            },
            onChangeDiaryEnd(value) {
                this.Diary.lesson_time.end = value;
            },
            onChangeStudent(value) {
                this.SelectedStudent = value;
            },
            onChangeReloadStart(value) {
                this.load.start = value;
            },
            onChangeReloadEnd(value) {
                this.load.end = value;
            },
            onChangeDiary(value, type, typeValue) {
                value.lesson_time.date = Utility.StringToDate(value.lesson_time.date);
                TeacherService.updateTeacherDiary(value._id, {
                    lesson_complete: value.lesson_complete,
                    lesson_time: JSON.stringify(value.lesson_time),
                })
                    .then(response => {
                        this.$notify({
                            title: response.data.msg,
                            text: '성공!',
                            type: 'success',
                        });
                        if (type === 'Complete') {
                            this.CompletedDiarys.push(value);
                            this.noneCompletedDiarys = Utility.removeElemntByValue(this.noneCompletedDiarys, value);
                            this.Pay.Count--;
                            this.Pay.Time -= Utility.duration(value.lesson_time.start, value.lesson_time.end);
                        } else if (type === 'Edit') {
                            this.Pay.Time += Utility.duration(typeValue.start, typeValue.end) - Utility.duration(value.lesson_time.start, value.lesson_time.end);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            modifyTeacher() {
                this.ModifyingTeacher = true;
            },
            doModifyTeacher() {
                this.ModifyingTeacher = false;
            },
            fetchTeacher() {
                TeacherService.getTeacher(this.$route.params.TeacherId)
                    .then((response) => {
                        this.Teacher = response.data.Teacher;
                    })
                    .catch((error) => {
                        this.$notify({
                            title: '선생님 정보를 가져오는데 문제가 발생했습니다.',
                            type: 'error',
                        });
                    });
            },
            fetchTeacherDiarys() {
                while (this.CompletedDiarys.length) this.CompletedDiarys.pop();
                while (this.noneCompletedDiarys.length) this.noneCompletedDiarys.pop();
                TeacherService.getTeacherDiaryByTeacherId(this.$route.params.TeacherId, {})
                    .then((response) => {
                        response.data.Diarys.forEach(diary => {
                            if (diary.lesson_complete) {
                                this.CompletedDiarys.push(diary);
                            } else {
                                this.noneCompletedDiarys.push(diary);
                                this.Pay.Time += parseFloat(Utility.duration(diary.lesson_time.start, diary.lesson_time.end));
                                this.Pay.Count++;
                            }
                        })
                    })
                    .catch((error) => {
                        this.$notify({
                            title: '에러발생',
                            type: 'error',
                        })
                    });
            },
            isValidDiaryLesson() {
                return true;
            },
            isValidDiaryTime() {
                return true;
            },
            AddTeacherDiary() {
                // TODO 선생님 페이지에서 학생 추가 가능하게 할것
                // if (!this.isValidDiaryLesson()) {
                //     //
                // }
                // if (!this.isValidDiaryTime()) {
                //     //
                // }
                // alert('INIT');
                TeacherService.addTeacherDiary({
                    teacher: this.$route.params.TeacherId,
                    lesson_time: JSON.stringify(this.Diary.lesson_time),
                    lesson_type: this.Diary.lesson_type,
                })
                    .then((response) => {
                        this.$notify({
                            title: '일지 작성에 성공했습니다.',
                            type: 'success',
                        });
                        this.Pay.Count++;
                        this.Pay.Time += parseFloat(Utility.duration(response.data.Diary.lesson_time.start, response.data.Diary.lesson_time.end));
                        this.noneCompletedDiarys.push(response.data.Diary);
                    })
                    .catch((error) => {
                        this.$notify({
                            title: '일지 작성에 실패하였습니다.',
                            type: 'error',
                        });
                    });
            },
        },
        components: {
            DiaryStudent,
            DiaryTeacher,
            SelectForm,
            Date,
            Time,
        },
    };
</script>