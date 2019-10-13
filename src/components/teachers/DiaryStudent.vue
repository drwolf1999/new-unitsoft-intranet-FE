<template>
    <div id="form">
        <span>{{ Student.name }}</span>
        <Time class="input-field col s4" v-bind:time="StudentDiary.lesson_time.start" label="시작 시간"
              v-on:input="onChangeDiaryStart"></Time>
        <Time class="input-field col s4" v-bind:time="StudentDiary.lesson_time.end" label="종료 시간"
              v-on:input="onChangeDiaryEnd"></Time>
        <div class="input-field col s12">
            <label class="active">상세 내용</label>
            <input type="text" v-model="StudentDiary.lesson_about">
        </div>
        <br>
    </div>
</template>

<script>
    import SelectForm from '../form/SelectForm.vue';
    import Date from '../form/Date.vue';
    import Time from '../form/Time.vue';
    import Utility from '../../Utility/Utility.js';

    export default {
        name: 'DiaryStudent',
        data() {
            return {
                Student: {
                    _id: this.id,
                    name: this.name,
                },
                StudentDiary: {
                    lesson_time: {
                        start: Utility.getTimeBaseNow(-3, 0),
                        end: Utility.getTimeBaseNow(0, 0),
                    },
                    lesson_about: '',
                    lesson_complete: false,
                },
            };
        },
        props: {
            id: String,
            name: String,
        },
        methods: {
            onChangeDiaryStart(value) {
                this.StudentDiary.lesson_time.start = value;
            },
            onChangeDiaryEnd(value) {
                this.StudentDiary.lesson_time.end = value;
            },
        },
        components: {
            // SelectForm,
            // Date,
            Time,
            // Utility,
        },
    };
</script>
