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
<!--    -->
<!--    <md-list-item>-->
<!--        <div v-if="Diary.lesson_complete">-->
<!--            <span>[{{Diary.lesson_date | dateToString }} / {{Diary.lesson_start}}~{{Diary.lesson_end}}] / {{Diary.lesson_type.type}}</span>-->
<!--        </div>-->
<!--        <div v-else>-->
<!--            <div class="md-layout md-gutter" v-if="isModifyingDiary">-->
<!--                <Date v-bind:date="Diary.lesson_date" class="md-layout-item md-size-33" label="날짜" v-on:input="onModifyDiaryDate"></Date>-->
<!--                <Time v-bind:time="Diary.lesson_start" class="md-layout-item md-size-33" label="시작 시간" v-on:input="onModifyDiaryStart"></Time>-->
<!--                <Time v-bind:time="Diary.lesson_end" class="md-layout-item md-size-33" label="종료 시간" v-on:input="onModifyDiaryEnd"></Time>-->
<!--                <InputForm v-bind:data="Diary.lesson_type.type" label="수업" class="my-layout-item" v-on:input="onModifyLesson"></InputForm>-->
<!--                <md-button @click="EditDiary" class="md-layout-item md-size-100">수정하기</md-button>-->
<!--            </div>-->
<!--            <div v-else>-->
<!--                <md-checkbox v-model="DiaryCheck">-->
<!--                    [{{Diary.lesson_date | dateToString }} / {{Diary.lesson_start}}~{{Diary.lesson_end}}] / {{Diary.lesson_type.type}}-->
<!--                    <a href="javascript:void(0);" @click="doCompleteDiary">결제 완료</a>-->
<!--                    <a href="javascript:void(0);" @click="doModifyDiary">일지 수정</a>-->
<!--                </md-checkbox>-->
<!--            </div>-->
<!--        </div>-->
<!--    </md-list-item>-->
</template>

<script>
	import Time from '../form/Time.vue';
	import Date from '../form/Date.vue';
	import InputForm from '../form/Input.vue';
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
			InputForm,
		},
	};
</script>
