<template>
    <div class="container">
        <div class="row">
            <div class="card">
                <div class="card-content">
                    <h4 class="card-title">{{ Student.name }}</h4>
                    <div class="row">
                        <div class="col s6">
                            <label for="school" class="active">학교</label>
                            <input type="text" name="school" v-model="Student.school" id="school"
                                   :disabled="!ModifyingStudent" placeholder="학교">
                        </div>
                        <div class="col s6">
                            <label for="grade" class="active">학년</label>
                            <input type="text" name="grade" v-model="Student.grade" id="grade"
                                   :disabled="!ModifyingStudent" placeholder="학년">
                        </div>
                        <div class="col s4">
                            <label for="unitStudy-id" class="active">유닛스터디 ID</label>
                            <input type="text" name="unitStudy-id" v-model="Student.unitStudyId" id="unitStudy-id"
                                   :disabled="true" placeholder="unitStudyID">
                        </div>
                        <div class="col s4">
                            <label for="phone" class="active">학생 전화번호</label>
                            <input type="text" name="phone" v-model="Student.phone" id="phone"
                                   :disabled="!ModifyingStudent" placeholder="전화번호">
                        </div>
                        <div class="col s4">
                            <label for="parent-phone" class="active">부모님 전화번호</label>
                            <input type="text" name="parent-phone" v-model="Student.parent_phone" id="parent-phone"
                                   :disabled="!ModifyingStudent" placeholder="부모님 전화번호">
                        </div>
                    </div>
                </div>
                <div class="card-action">
                    <a v-if="!ModifyingStudent" href="javascript:void(0);" @click="modifyStudent()" id="change-btn">
                        <i class="icon icon-pencil"></i> 수정하기
                    </a>
                    <a v-else href="javascript:void(0);" @click="doModifyStudent()" id="do-chang-btn">
                        <i class="icon icon-pencil"></i>완료
                    </a>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-content">
                <h4 class="card-title">일지 추가</h4>
                <div class="row">
                    <div class="row">
                        <Date class="input-field col s4" v-bind:date="Diary.lesson_time.date" label="날짜"
                              v-on:input="onChangeDiaryDate"></Date>
                        <Time class="input-field col s4" v-bind:time="Diary.lesson_time.start" label="시작 시간"
                              v-on:input="onChangeDiaryStart"></Time>
                        <Time class="input-field col s4" v-bind:time="Diary.lesson_time.end" label="종료 시간"
                              v-on:input="onChangeDiaryEnd"></Time>
                        <SelectForm class="input-field col s6" v-bind:selectList="getTeachers" v-on:input="onChangeTeachers"
                                    name="담당 선생님"></SelectForm>
                        <SelectForm class="input-field col s6" v-bind:selectList="getLessons" v-on:input="onChangeLessons"
                                    name="수업 종류"></SelectForm>
                        <div class="input-field col s12">
                            <label class="active">상세 내용</label>
                            <input type="text" id="lesson-about" v-model="Diary.lesson_about">
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-action">
                <a @click="AddStudentDiary()" name="action">일지추가</a>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <h4 class="card-title">일지</h4>
                <h5>횟수({{ Pay.Count }}) / 시간({{ Pay.Time }})</h5>
                <ul class="collapsible">
                    <li>
                        <div class="collapsible-header"><i class="material-icons">clear</i>미결제</div>
                        <div class="collapsible-body">
                            <div v-for="diary in noneCompletedDiarys" id="noneCompleteDiarys">
                                <DiaryStudent v-bind:DiaryInfo="diary" v-on:update="onChangeDiary"></DiaryStudent>
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
                                        <DiaryStudent v-bind:DiaryInfo="diary"></DiaryStudent>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
	import SMSService from '../../service/sms.js';
	import StudentService from '../../service/students.js';
	import SelectForm from '../form/SelectForm.vue';
	import DiaryStudent from './DiaryStudent.vue';
	import Date from '../form/Date.vue';
	import Time from '../form/Time.vue';
	import Utility from '../../Utility/Utility.js';

	export default {
		name: 'StudentInformation',
		mounted() {
			$('.collapsible').collapsible();
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
					lesson_time: {
						date: Utility.getDateBaseNow(0, 0, 0),
						start: Utility.getTimeBaseNow(-3, 0),
						end: Utility.getTimeBaseNow(0, 0),
					},
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
				}
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
				this.Diary.lesson_time.date = value;
			},
			onChangeDiaryStart(value) {
				this.Diary.lesson_time.start = value;
			},
			onChangeDiaryEnd(value) {
				this.Diary.lesson_time.end = value;
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
				if (this.Diary.lesson_time.date === '' || this.Diary.lesson_time.start === '' || this.Diary.lesson_time.end === '')
					return false;
				else if (Utility.compareTime(this.Diary.lesson_time.start, this.Diary.lesson_time.end) >= 0)
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
				value.lesson_time.date = Utility.StringToDate(value.lesson_time.date);
				StudentService.updateStudentDiary(value._id, {
					lesson_complete: value.lesson_complete,
					lesson_time: JSON.stringify(value.lesson_time),
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
							this.Pay.Time -= Utility.duration(value.lesson_time.start, value.lesson_time.end);
						} else if (type === 'Edit') {
							this.Pay.Time += Utility.duration(typeValue.start, typeValue.end) - Utility.duration(value.lesson_time.start, value.lesson_time.end);
							SMSService.sendSMS({
								to: this.Student.parent_phone,
								text: this.Student.name + '학생의 수정된 수업 입니다.\n' + Utility.LessonInfo(value),
							});
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
								this.Pay.Time += parseFloat(Utility.duration(diary.lesson_time.start, diary.lesson_time.end));
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
				StudentService.addStudentDiary({
					student_id: this.Student._id,
					teacher: this.Diary.teacher,
					lesson_type: this.Diary.lesson_type,
					lesson_time: JSON.stringify(this.Diary.lesson_time),
					lesson_about: this.Diary.lesson_about,
				})
					.then((response) => {
						this.$notify({
							title: response.data.msg,
							text: '성공!',
							type: 'success',
						});
						this.Pay.Count++;
						this.Pay.Time += parseFloat(Utility.duration(response.data.Diary.lesson_time.start, response.data.Diary.lesson_time.end));
						this.noneCompletedDiarys.push(response.data.Diary);
						console.log('init');
						SMSService.sendSMS({
							to: this.Student.parent_phone,
							text: this.Student.name + '학생의 수업 내용입니다.\n' + Utility.LessonInfo(response.data.Diary),
						})
							.then((response) => {
								console.log('success' + response.data);
							})
							.catch(error => {
								this.$notify({
									title: '메세지 전송에 실패하였습니다.',
									type: 'error',
								});
								console.log('send sms error' + error.message);
							});
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
			SelectForm,
			DiaryStudent,
			Date,
			Time,
		},
	};
</script>
