<template>
    <div class="row">
        <div id="view-element">
            <div v-if="Diary.lesson_complete">
                <span>[{{Diary.lesson_time.date}} / {{Diary.lesson_time.start}}~{{Diary.lesson_time.end}}] {{Diary.teacher.name}} / {{Diary.lesson_type.type}} / {{Diary.lesson_about}}</span>
            </div>
            <div v-else>
                <div id="edit-element" v-if="isModifyingDiary">
                    <Date v-bind:date="Diary.lesson_time.date" class="" label="날짜" v-on:input="onModifyDiaryDate"></Date>
                    <Time v-bind:time="Diary.lesson_time.start" class="" label="시작 시간" v-on:input="onModifyDiaryStart"></Time>
                    <Time v-bind:time="Diary.lesson_time.end" class="" label="종료 시간" v-on:input="onModifyDiaryEnd"></Time>
                    <InputForm readonly id="edit-teacher" v-model="Diary.teacher.name"></InputForm>
                    <InputForm readonly id="edit-lesson-type" v-model="Diary.lesson_type.type"></InputForm>
                    <InputForm id="edit-lesson-about" v-model="Diary.lesson_about"></InputForm>
                    <md-button @click="EditDiary" class="btn btn-info">수정하기</md-button>
                </div>
                <div v-else>
                    <!-- TODO 디자인 수정 -->
                    <md-checkbox v-model="DiaryCheck">
                        [{{Diary.lesson_time.date}} / {{Diary.lesson_time.start}}~{{Diary.lesson_time.end}}] {{Diary.teacher.name}} / {{Diary.lesson_type.type}} / {{Diary.lesson_about}}
                        <a href="javascript:void(0);" @click="doCompleteDiary" class="">결제 완료</a>
                        <a href="javascript:void(0);" @click="doModifyDiary" class="">일지 수정</a>
                    </md-checkbox>
                    <!--                        <span style="color: red;"></span>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import Time from '../form/Time.vue';
	import Date from '../form/Date.vue';
	import InputForm from '../form/Input.vue';

	export default {
		name: 'Diary',
		data() {
			return {
				DiaryCheck: false,
				isModifyingDiary: false,
				Diary: this.DiaryInfo,
				origin: {
					start: this.DiaryInfo.lesson_time.start,
					end: this.DiaryInfo.lesson_time.end,
				},
			};
		},
		props: {
			DiaryInfo: Object,
		},
		methods: {
			onModifyDiaryDate(value) {
				this.Diary.lesson_time.date = value;
			},
			onModifyDiaryStart(value) {
				this.Diary.lesson_time.start = value;
			},
			onModifyDiaryEnd(value) {
				this.Diary.lesson_time.end = value;
			},
			EditDiary() {
				this.isModifyingDiary = false;
				this.$emit('update', this.Diary, 'Edit', this.origin);
			},
			doCompleteDiary() {
				// this.Diary.lesson_complete = true;
				this.$emit('update', this.Diary, 'Complete', null);
			},
			doModifyDiary() {
				this.isModifyingDiary = true;
			},
		},
		components: {
			Time,
			Date,
			InputForm,
		}
	};
</script>
