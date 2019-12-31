<template>
    <md-list-item>
        <div v-if="Diary.lesson_complete">
            <span>[{{Diary.lesson_date | dateToString}} / {{Diary.lesson_start}}~{{Diary.lesson_end}}] {{Diary.teacher.name}} / {{Diary.lesson_type.type}} / {{Diary.lesson_about}}</span>
        </div>
        <div v-else>
            <div class="md-layout md-gutter" v-if="isModifyingDiary">
                <Date v-bind:date="Diary.lesson_date" class="md-layout-item md-size-33" label="날짜" v-on:input="onModifyDiaryDate"></Date>
                <Time v-bind:time="Diary.lesson_start" class="md-layout-item md-size-33" label="시작 시간" v-on:input="onModifyDiaryStart"></Time>
                <Time v-bind:time="Diary.lesson_end" class="md-layout-item md-size-33" label="종료 시간" v-on:input="onModifyDiaryEnd"></Time>
                <InputForm v-bind:readonly="true" v-bind:data="Diary.teacher.name" class="md-layout-item md-size-50" label="선생님"></InputForm>
                <InputForm v-bind:readonly="true" v-bind:data="Diary.lesson_type.type" class="md-layout-item md-size-50" label="수업"></InputForm>
                <InputForm v-bind:data="Diary.lesson_about" label="상세내용" class="md-layout-item md-size-100"></InputForm>
                <md-button @click="EditDiary" class="btn btn-info">수정하기</md-button>
            </div>
            <div v-else class="md-layout">
                <!-- TODO 디자인 수정 -->
                <md-checkbox v-model="DiaryCheck" class="md-layout-item">
                    [{{Diary.lesson_date | dateToString}} / {{Diary.lesson_start}}~{{Diary.lesson_end}}] {{Diary.teacher.name}} / {{Diary.lesson_type.type}} / {{Diary.lesson_about}}
                    <a href="javascript:void(0);" @click="doCompleteDiary" class="">결제 완료</a>
                    <a href="javascript:void(0);" @click="doModifyDiary" class="">일지 수정</a>
                </md-checkbox>
                <!--                        <span style="color: red;"></span>-->
            </div>
        </div>
    </md-list-item>
</template>

<script>
	import Time from '../form/Time.vue';
	import Date from '../form/Date.vue';
	import InputForm from '../form/Input.vue';
	import Utility from '../../Utility/Utility';

	export default {
		name: 'Diary',
		data() {
			return {
				DiaryCheck: false,
				isModifyingDiary: false,
				Diary: this.DiaryInfo,
				origin: {
					start: this.DiaryInfo.lesson_start,
					end: this.DiaryInfo.lesson_end,
				},
			};
		},
		props: {
			DiaryInfo: Object,
		},
		methods: {
			onModifyDiaryDate(value) {
				this.Diary.lesson_date = value;
			},
			onModifyDiaryStart(value) {
				this.Diary.lesson_start = value;
			},
			onModifyDiaryEnd(value) {
				this.Diary.lesson_end = value;
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
        filters: {
			dateToString: function (value) {
                return Utility.convertDateToString(value);
			},
        },
		components: {
			Time,
			Date,
			InputForm,
		}
	};
</script>
