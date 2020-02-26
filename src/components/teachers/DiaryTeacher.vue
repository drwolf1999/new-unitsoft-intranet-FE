<template>
    <tr>
        <!--         Date -->
        <td v-if="Diary.lesson_complete || !isModifyingDiary">{{ Diary.lesson_date | dateToString }}</td>
        <td v-else>
            <Date v-bind:date="Diary.lesson_date | dateToString" v-on:input="onModifyDiaryDate"></Date>
        </td>
        <!-- Start Time -->
        <td v-if="Diary.lesson_complete || !isModifyingDiary">{{ Diary.lesson_start | doubleDigit }}</td>
        <td v-else>
            <Time v-bind:time="Diary.lesson_start" v-on:input="onModifyDiaryStart"></Time>
        </td>
        <!-- End Time -->
        <td v-if="Diary.lesson_complete || !isModifyingDiary">{{ Diary.lesson_end | doubleDigit }}</td>
        <td v-else>
            <Time v-bind:time="Diary.lesson_end" label="종료 시간" v-on:input="onModifyDiaryEnd"></Time>
        </td>
        <!-- Lesson Type -->
        <td>{{ Diary.lesson_type.type }}</td>
        <!-- Button -->
        <td v-if="!Diary.lesson_complete && !isModifyingDiary"><a href="javascript:void(0);" @click="doCompleteDiary" class="">결제 완료</a></td>
        <td v-if="!Diary.lesson_complete && !isModifyingDiary"><a href="javascript:void(0);" @click="doModifyDiary" class="">일지 수정</a></td>
        <td v-if="isModifyingDiary"></td>
        <td v-if="isModifyingDiary"><a href="javascript:void(0);" @click="EditDiary">수정하기</a></td>
    </tr>
</template>

<script>
	import Time from '../form/Time.vue';
	import Date from '../form/Date.vue';
	import Utility from '../../Utility/Utility';

	export default {
		name: 'DiaryTeacher',
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
			onModifyLesson(value) {
				this.Diary.lesson_type.type = value;
			},
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
				this.Diary.lesson_complete = true;
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
            doubleDigit: function (value) {
                return Utility.TimeDigit1To2(value);
            },
        },
		components: {
			Time,
			Date,
		},
	};
</script>
