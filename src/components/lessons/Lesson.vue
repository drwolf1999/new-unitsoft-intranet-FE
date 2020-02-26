<template>
    <v-row justify="center">
        <v-col cols="10">
            <br>
            <v-card>
                <v-card-title>
                    수업 목록 (총 {{ Lessons.length }}건)
                    <v-spacer></v-spacer>
                    <v-text-field v-model="Query" @keyup.enter="SearchLesson" label="수업 검색" append-icon="mdi-magnify"></v-text-field>
                </v-card-title>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">#</th>
                            <th class="text-left">종류</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr v-if="fetchingLessons">
                            <v-progress-linear indeterminate></v-progress-linear>
                        </tr>
                        <tr v-else v-for="(lesson, index) in Lessons" v-bind:key="lesson._id">
                            <td>{{ index }}</td>
                            <td>{{ lesson.type }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
            <br>
        </v-col>
        <v-col cols="10">
            <v-card>
                <v-card-title>수업 추가</v-card-title>
                <v-card-text>
                    <v-text-field label="종류" v-model="Lesson.type"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <Button v-bind:content="`추가하기`" v-bind:textBtn="true" v-on:click.native="AddLesson"></Button>
                </v-card-actions>
            </v-card>
            <br>
        </v-col>
    </v-row>
</template>

<script>
    import LessonService from '../../service/lessons.js';
    import Button from '../form/Button.vue';

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
        },
        components: {
            Button
        },
    };
</script>
