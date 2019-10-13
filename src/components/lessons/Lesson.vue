<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h4>수업 목록 (총 {{ Lessons.length }}건)
                    <div class="float-right">
                        <input type="text" name="search" placeholder="검색"
                               class="form-control" v-model="Query" id="search-input"
                               @keyup.enter="SearchLesson">
                    </div>
                </h4>
                <div class="box-body table-responsive no-padding">
                    <table class="table table-hover" id="lessons">
                        <thead>
                        <tr>
                            <th width="20%">#</th>
                            <th width="80%">종류</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="fetchingLessons">학생정보를 가져오는 중입니다.</tr>
                        <tr v-else v-for="(lesson, index) in Lessons">
                            <td>{{ index + 1}}</td>
                            <td>{{ lesson.type }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <br/><br/><br/>
                    <center>
                        <ul>
                            <button class="btn btn-success">1</button>
                        </ul>
                    </center>
                </div>
            </div>
            <br/><br/>
            <div class="p-40 border r-3 white" style="">
                <br/>
                <h4>수업 추가</h4>
                <br/>
                <div class="row">
                    {{ Lesson }}
                    <div class="col-12">
                        <label for="lesson-type" class="required">종류</label>
                        <input class="form-control form-control-lg" type="text" name="lesson-type"
                               id="lesson-type" placeholder="" v-model="Lesson.type">
                    </div>
                </div>
                <div class="text-center p-t-20">
                    <button class="btn btn-danger btn-lg" @click="AddLesson()"><i
                            class="icon icon-check"></i> 추가하기
                    </button>
                </div>
            </div>
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
                    .catch(error => {
                        this.$notify({
                            title: '에러가 발생했습니다.',
                            type: 'error',
                        });
                        console.log(error);
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
                    .catch(error => {
                        this.$notify({
                            title: '생성에 실패하였습니다.',
                            type: 'error',
                        });
                    });
            },
        }
    };
</script>