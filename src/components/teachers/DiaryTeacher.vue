<template>
    <div class="row">
        <div id="view-element">
            <div v-if="Diary.lesson_complete">
                <span>[{{Diary.lesson_time.date}} / {{Diary.lesson_time.start}}~{{Diary.lesson_time.end}}] / {{Diary.lesson_type.type}}</span>
            </div>
            <div v-else>
                <div id="edit-element" v-if="isModifyingDiary">
                    <Date v-bind:date="Diary.lesson_time.date" class="" label="날짜" v-on:input="onModifyDiaryDate"></Date>
                    <Time v-bind:time="Diary.lesson_time.start" class="" label="시작 시간" v-on:input="onModifyDiaryStart"></Time>
                    <Time v-bind:time="Diary.lesson_time.end" class="" label="종료 시간" v-on:input="onModifyDiaryEnd"></Time>
                    <input type="text" readonly id="edit-lesson-type" v-model="Diary.lesson_type.type">
                    <input type="button" @click="EditDiary" value="수정하기" class="btn btn-info">
                </div>
                <div v-else>
                    <label>
                        <input type="checkbox" v-model="DiaryCheck">
                        <span style="color: red;">[{{Diary.lesson_time.date}} / {{Diary.lesson_time.start}}~{{Diary.lesson_time.end}}] / {{Diary.lesson_type.type}}</span>
                    </label>
                    &nbsp
                    <a href="javascript:void(0);" @click="doCompleteDiary">결제 완료</a>
                    &nbsp
                    <a href="javascript:void(0);" @click="doModifyDiary">일지 수정</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Time from '../form/Time.vue';
    import Date from '../form/Date.vue';

    export default {
        name: 'DiaryTeacher',
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
                this.Diary.lesson_complete = true;
                this.$emit('update', this.Diary, 'Complete', null);
            },
            doModifyDiary() {
                this.isModifyingDiary = true;
            },
        },
        components: {
            Time,
            Date,
        }
    };
</script>