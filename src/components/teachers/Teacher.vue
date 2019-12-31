<template>
    <div class="md-layout md-alignment-center">
        <div class="md-layout-item md-size-70">
            <br/>
            <md-card md-with-hover>
                <md-table>
                    <md-table-toolbar>
                        <div class="md-toolbar-section-start">
                            <h1 class="md-title">선생님 목록(총 {{ Teachers.length }}건)</h1>
                        </div>
                        <md-field class="md-toolbar-section-end">
                            <label>선생님 검색</label>
                            <md-input v-model="Query" @keyup.enter="SearchTeachers"></md-input>
                        </md-field>
                    </md-table-toolbar>

                    <md-table-row>
                        <md-table-head md-numeric>#</md-table-head>
                        <md-table-head>이름</md-table-head>
                        <md-table-head>소속</md-table-head>
                        <md-table-head>삭제</md-table-head>
                    </md-table-row>

                    <md-table-row v-if="fetchingStudents">
                        <md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
                    </md-table-row>
                    <md-table-row v-else v-for="(teacher, index) in Teachers" v-bind:key="teacher._id">
                        <md-table-cell md-numeric>{{ index }}</md-table-cell>
                        <md-table-cell><a href="javascript:void(0)" @click="TeacherClick(teacher._id)">{{ teacher.name }}</a></md-table-cell>
                        <md-table-cell>{{ teacher.department }}</md-table-cell>
                        <md-table-cell><a href="javascript:void(0)" @click="RemoveTeacher(teacher._id)">삭제</a></md-table-cell>
                    </md-table-row>
                </md-table>
            </md-card>
            <br>
        </div>
        <div class="md-layout-item md-size-70">
            <md-card md-with-hover>
                <md-card-header>
                    <div class="md-title">선생님</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-33">
                            <md-field>
                                <label>이름</label>
                                <md-input v-model="Teacher.name" placeholder=""></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-33">
                            <md-field>
                                <label>소속</label>
                                <md-input v-model="Teacher.department" placeholder=""></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-33">
                            <md-field>
                                <label>전화번호</label>
                                <md-input v-model="Teacher.phone" placeholder=""></md-input>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>
                <md-card-actions>
                    <md-button @click="AddTeacher">
                        <md-icon>check</md-icon>
                        추가하기
                    </md-button>
                </md-card-actions>
            </md-card>
            <br>
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
			RemoveTeacher(TeacherId) {
				return TeacherId;
			},
		},
	};
</script>
