<template>
    <div class="md-layout md-alignment-center">
        <div class="md-layout-item md-size-70">
            <br>
            <md-card md-with-hover>
                <md-table>
                    <md-table-toolbar>
                        <div class="md-toolbar-section-start">
                            <h4>수업 목록 (총 {{ Lessons.length }}건)</h4>
                        </div>
                        <md-field md-clearable class="md-toolbar-section-end">
                            <label>수업 검색</label>
                            <md-input placeholder="수업 검색" v-model="Query" @keyup.enter="SearchLesson"></md-input>
                        </md-field>
                    </md-table-toolbar>
                    <md-table-row>
                        <md-table-cell md-numeric>#</md-table-cell>
                        <md-table-cell>종류</md-table-cell>
                    </md-table-row>
                    <md-table-row v-if="fetchingLessons">
                        <md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
                    </md-table-row>
                    <md-table-row v-for="(lesson, index) in Lessons" v-bind:key="lesson._id">
                        <md-table-cell md-numeric> {{ index }}</md-table-cell>
                        <md-table-cell>{{ lesson.type }}</md-table-cell>
                    </md-table-row>
                </md-table>
            </md-card>
            <br>
        </div>
        <div class="md-layout-item md-size-70">
            <md-card md-with-hover>
                <md-card-header>
                    <h4 class="md-title">수업 추가</h4>
                </md-card-header>
                <md-card-content>
                    <md-field>
                        <label for="lesson-type" class="required">종류</label>
                        <md-input placeholder="" v-model="Lesson.type"></md-input>
                    </md-field>
                </md-card-content>
                <md-card-actions>
                    <md-button @click="AddLesson()"><i class="icon icon-check"></i> 추가하기</md-button>
                </md-card-actions>
            </md-card>
            <br>
        </div>
    </div>
</template>

<script>
	import LessonService from '../../service/lessons.js';

	export default {
		name: 'Lesson',
		data() {
			return {
				Query: '',
				Lessons: [],
				Lesson: {
					type: '',
				},
				fetchingLessons: false,
			};
		},
		methods: {
			SearchLesson() {
				this.fetchingLessons = true;
				if (this.Query === '') {
					this.$notify({
						title: '입력값이 없습니다.',
						text: '다시 입력해주세요',
						type: 'warn',
					});
					this.fetchingLessons = false;
					return;
				}
				LessonService.getLessons(this.Query)
					.then(response => {
						this.Lessons = response.data.Lessons;
						this.fetchingLessons = false;
					})
					.catch(() => {
						this.$notify({
							title: '에러가 발생했습니다.',
							type: 'error',
						});
					});
			},
			AddLesson: function () {
				if (this.Lesson.type === '') {
					this.$notify({
						title: '빈 수업은 생성할 수 없습니다.',
						type: 'error',
					});
					return;
				}
				this.Lesson.type = this.Lesson.type.trim();
				LessonService.addLesson(this.Lesson)
					.then(response => {
						if (response.crash === true) {
							this.$notify({
								title: '이미 존재하는 수업입니다.',
								type: 'warn',
							});
						} else {
							this.$notify({
								title: '생성에 성공하였습니다.',
								type: 'success',
							});
						}
						this.Lesson = {
							type: '',
						};
					})
					.catch(() => {
						this.$notify({
							title: '생성에 실패하였습니다.',
							type: 'error',
						});
					});
			},
		}
	};
</script>
