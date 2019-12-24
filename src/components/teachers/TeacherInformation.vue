<template>
    <div class="md-layout md-alignment-center">
        <div class="md-layout-item md-size-70">
            <md-card md-with-hover>
                <md-card-header>
                    <h4 class="md-title">{{ Teacher.name }}</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-50">
                            <md-field>
                                <label>소속</label>
                                <md-input v-model="Teacher.department" :disabled="!ModifyingTeacher"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-50">
                            <md-field>
                                <label>전화번호</label>
                                <md-input v-model="Teacher.phone" :disabled="!ModifyingTeacher"></md-input>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>
                <md-card-actions>
                    <md-button v-if="!ModifyingTeacher" @click="modifyTeacher">
                        <i class="icon icon-pencil"></i>수정하기
                    </md-button>
                    <md-button v-else @click="doModifyTeacher">
                        <i class="icon icon-pencil"></i>완료
                    </md-button>
                </md-card-actions>
            </md-card>
            <br>
        </div>
        <div class="md-layout-item md-size-70">
            <md-card md-with-hover>
                <md-card-header>
                    <h6 class="md-title">일지 추가</h6>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <Date class="md-layout-item md-size-33" v-bind:date="Diary.lesson_date" label="날짜" v-on:input="onChangeDiaryDate"></Date>
                        <Time class="md-layout-item md-size-33" v-bind:time="Diary.lesson_start" label="시작 시간" v-on:input="onChangeDiaryStart"></Time>
                        <Time class="md-layout-item md-size-33" v-bind:time="Diary.lesson_end" label="종료 시간" v-on:input="onChangeDiaryEnd"></Time>
                        <SelectForm class="md-layout-item md-size-100" v-bind:selectList="getLessons" v-on:input="onChangeLessons" label="수업 종류"></SelectForm>
                    </div>
                </md-card-content>
                <md-card-actions>
                    <md-button @click="AddTeacherDiary()" name="action">일지추가</md-button>
                </md-card-actions>
            </md-card>
            <br>
        </div>
        <div class="md-layout-item md-size-70">
            <md-card md-with-hover>
                <md-card-header>
                    <h4 class="card-title">일지</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-alignment-center">
                        <div class="md-layout md-alignment-center">
                            <md-card class="md-layout-item md-size-100">
                                <md-card-header>
                                    <md-button v-on:click="noneCompletedShow = !noneCompletedShow">
                                        <md-icon>clear</md-icon>
                                        미결제 (횟수({{ Pay.Count }}) / 시간({{ Pay.Time }}))
                                    </md-button>
                                </md-card-header>
                                <md-card-content>
                                    <transition name="fade">
                                        <div v-if="noneCompletedShow">
                                            <DiaryTeacher v-for="diary in noneCompletedDiarys" v-bind:DiaryInfo="diary" v-on:update="onChangeDiary"></DiaryTeacher>
                                        </div>
                                    </transition>
                                </md-card-content>
                            </md-card>
                            <md-card class="md-layout-item md-size-100">
                                <md-card-header>
                                    <md-button v-on:click="CompletedShow = !CompletedShow">
                                        <md-icon>check</md-icon>
                                        결제 완료
                                    </md-button>
                                </md-card-header>
                                <md-card-content>
                                    <transition name="faded">
                                        <div v-if="CompletedShow" class="md-layout">
                                            <Date class="md-layout-item md-size-50" v-bind:date="load.start" label="시작" v-on:input="onChangeReloadStart"></Date>
                                            <Date class="md-layout-item md-size-50" v-bind:date="load.end" label="끝" v-on:input="onChangeReloadEnd"></Date>
                                            <DiaryTeacher v-for="diary in CompletedDiarys" v-bind:DiaryInfo="diary"></DiaryTeacher>
                                        </div>
                                    </transition>
                                </md-card-content>
                            </md-card>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
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
	import Diary from "../students/DiaryStudent";

	export default {
		name: 'TeacherInformation',
		mounted() {
			this.$store.dispatch('fetchLessons');
			this.$store.dispatch('fetchStudents');
			this.fetchTeacher();
			this.fetchTeacherDiarys();
		},
		data() {
			return {
				Label: 'test',
                vv: null,

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
					lesson_date: Utility.getDateBaseNow(0, 0, 0),
					lesson_start: Utility.getTimeBaseNow(-3, 0),
					lesson_end: Utility.getTimeBaseNow(0, 0),
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
				noneCompletedShow: false,
				CompletedShow: false,
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
				this.Diary.lesson_date = value;
			},
			onChangeDiaryStart(value) {
				this.Diary.lesson_start = value;
			},
			onChangeDiaryEnd(value) {
				this.Diary.lesson_end = value;
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
				value.lesson_date = Utility.StringToDate(value.lesson_date);
				TeacherService.updateTeacherDiary(value._id, {
					lesson_complete: value.lesson_complete,
					lesson_date: value.lesson_date,
					lesson_start: value.lesson_start,
					lesson_end: value.lesson_end,
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
							this.Pay.Time -= Utility.duration(value.lesson_start, value.lesson_end);
						} else if (type === 'Edit') {
							this.Pay.Time += Utility.duration(typeValue.start, typeValue.end) - Utility.duration(value.lesson_start, value.lesson_end);
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
				TeacherService.updateTeacher(this.$route.params.TeacherId, {
					department: this.Teacher.department,
                    phone: this.Teacher.phone,
                })
                    .then((response) => {
                    	this.$notify({
                            title: '성공',
                            text: '선생님 정보 수정에 성공했습니다.',
                            type: 'success',
                        });
                    })
                    .catch((error) => {
						this.$notify({
							title: '실패',
							text: '선생님 정보 수정에 실패했습니다.',
							type: 'error',
						});
                    });
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
								this.Pay.Time += parseFloat(Utility.duration(diary.lesson_start, diary.lesson_end));
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
					lesson_date: this.Diary.lesson_date,
					lesson_start: this.Diary.lesson_start,
					lesson_end: this.Diary.lesson_end,
					lesson_type: this.Diary.lesson_type,
				})
					.then((response) => {
						this.$notify({
							title: '일지 작성에 성공했습니다.',
							type: 'success',
						});
						this.Pay.Count++;
						this.Pay.Time += parseFloat(Utility.duration(response.data.Diary.lesson_start, response.data.Diary.lesson_end));
						this.noneCompletedDiarys.push(response.data.Diary);
						console.log('diary ' + JSON.stringify(response.data.Diary));
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
			Diary,
			DiaryStudent,
			DiaryTeacher,
			SelectForm,
			Date,
			Time,
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
