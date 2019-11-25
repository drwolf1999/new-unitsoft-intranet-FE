<template>
    <div class="md-layout md-alignment-center">
        <div class="md-layout-item md-size-70">
            <br/>
            <md-card md-with-hover>
                <md-table>
                    <md-table-toolbar>
                        <div class="md-toolbar-section-start">
                            <h1 class="md-title">학생 목록 (총 {{ Students.length }}건)</h1>
                        </div>
                        <md-field md-clearable class="md-toolbar-section-end">
                            <label>학생 검색</label>
                            <md-input placeholder="학생 검색" v-model="Query" @keyup.enter="SearchStudents"></md-input>
                        </md-field>
                    </md-table-toolbar>
                    <md-table-row>
                        <md-table-head md-numeric>#</md-table-head>
                        <md-table-head>이름</md-table-head>
                        <md-table-head>학교 / 학년</md-table-head>
                        <md-table-head>unitstudyId</md-table-head>
                        <md-table-head>삭제</md-table-head>
                    </md-table-row>
                    <md-table-row v-if="fetchingStudents">
                        <md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
                    </md-table-row>
                    <md-table-row v-else v-for="(student, index) in Students" v-bind:key="student._id">
                        <md-table-cell md-numeric>{{ index }}</md-table-cell>
                        <md-table-cell><a href="javascript:void(0)" @click="StudentClick(student._id)">{{ student.name }}</a></md-table-cell>
                        <md-table-cell>{{ student.school + '/' + student.grade }}</md-table-cell>
                        <md-table-cell>{{ student.unitStudyId }}</md-table-cell>
                        <md-table-cell><a href="javascript:void(0)" @click="RemoveStudent(student._id)">삭제</a></md-table-cell>
                    </md-table-row>
                </md-table>
            </md-card>
            <br/>
        </div>
        <div class="md-layout-item md-size-70">
            <md-card md-with-hover>
                <md-card-header>
                    <div class="md-title">학생추가</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-30">
                            <md-field>
                                <label for="name">이름</label>
                                <md-input v-model="Student.name" id="name" placeholder=""></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-30">
                            <md-field>
                                <label for="school">학교</label>
                                <md-input v-model="Student.school" id="school" placeholder=""></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-30">
                            <md-field>
                                <label for="grade">학년</label>
                                <md-input v-model="Student.grade" id="grade" placeholder=""></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-30">
                            <md-field>
                                <label for="unitstudy_id">유닛스터디 ID</label>
                                <md-input v-model="Student.unitStudyId" id="unitstudy_id" placeholder=""></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-30">
                            <md-field>
                                <label for="phone">학생 전화번호</label>
                                <md-input v-model="Student.phone" id="phone" placeholder=""></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-30">
                            <md-field>
                                <label for="parent_phone">부모님 전화번호</label>
                                <md-input v-model="Student.parent_phone" id="parent_phone" placeholder=""></md-input>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>
                <md-card-actions>
                    <md-button @click="AddStudent">
                        <md-icon>check</md-icon>
                        추가하기
                    </md-button>
                </md-card-actions>
            </md-card>
            <br/>
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
			},
			RemoveStudent(StudentId) {
				//
			},
		}
	};
</script>
