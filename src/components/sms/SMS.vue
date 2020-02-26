<template>
    <v-row justify="center">
        <v-col cols="10">
            <br>
            <v-card>
                <v-card-title>카톡 보내기</v-card-title>
                <v-card-text>
                    <SelectForm v-bind:selectList="getTemplates" v-on:input="onChangeTemplate" name="템플릿 고르기"></SelectForm>

                    <v-row>
                        <v-col>
                            <pre v-html="selectedTemplate"></pre>
                        </v-col>
                        <v-col>
                            <v-row>
                                <v-col v-for="(input, index) in obj.input" cols="4" :key="index">
                                    <v-text-field :label="input" v-model="kakaoObj.input[index]"></v-text-field>
                                </v-col>
                                <v-col v-for="(textarea, index) in obj.textarea" cols="6" :key="index">
                                    <v-textarea :label="textarea" auto-grow single-line v-model="kakaoObj.textarea[index]"></v-textarea>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row justify="center">
                        <v-col cols="10">
                            <SelectForm v-bind:selectList="getTargets" v-on:input="onChangeTarget"></SelectForm>
                        </v-col>
                        <v-col cols="2">
                            <Button v-bind:content="`추가`" v-bind:textBtn="false" v-bind:color="`success`" v-on:click.native="doAddTarget"></Button>
                        </v-col>
                    </v-row>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-left">#</th>
                                <th class="text-left">이름</th>
                                <th class="text-left">소속(학생의 경우 학교)</th>
                                <th class="text-left">전화번호(학생의 경우 부모님 전화번호)</th>
                                <th class="text-left">제거</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(target, index) in targets" v-bind:key="target._id">
                                <td>{{ index }}</td>
                                <td>{{ target.name }}</td>
                                <td>{{ target.student ? target.school : target.department }}</td>
                                <td>{{ target.phone }}</td>
                                <td>
                                    <Button v-bind:content="`제거`" v-bind:textBtn="true" v-on:click="removeTarget(target)"></Button>
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <Button v-bind:content="`전송`" v-bind:textBtn="true" v-on:click.native="sendKakao"></Button>
                </v-card-actions>
            </v-card>
            <br/>
        </v-col>
    </v-row>
</template>

<script>
    import SelectForm from '../form/SelectForm';
    import SMSTemplate from '../../constants/KakaoTemplate.js';
    import Utility from '../../Utility/Utility';
    import SMSService from '../../service/sms.js';
    import Button from '../form/Button.vue';

    export default {
        name: 'SMS',
        mounted() {
            this.$store.dispatch('fetchTeachers');
            this.$store.dispatch('fetchStudents');
        },
        data() {
            return {
                templateNo: 0,
                selectedTemplate: '',
                selectedTemplateId: 0,
                addTarget: null,
                targets: [],
                arrayForTarget: [],
                value: Array(50),
                obj: {
                    input: [],
                    textarea: [],
                },
                kakaoObj: {
                    input: [],
                    textarea: [],
                },
            };
        },
        computed: {
            getTemplates() {
                let ret = [];
                for (let i = 0; i < SMSTemplate.templates.length; i++)
                    if (SMSTemplate.templates[i].group)
                        ret.push({'id': i, 'name': SMSTemplate.templates[i].name});
                return ret;
            },
            getTargets() {
                let ret = [];
                this.$store.getters.getStudents.forEach(ele => ret.push({
                    student: true,
                    id: ele._id,
                    name: ele.name,
                    school: ele.school,
                    parent_phone: ele.parent_phone,
                }));
                this.$store.getters.getTeachers.forEach(ele => ret.push({
                    student: false,
                    id: ele._id,
                    name: ele.name,
                    department: ele.department,
                    phone: ele.phone,
                }));
                // eslint-disable-next-line
                this.arrayForTarget = ret;
                return ret;
            }
        },
        methods: {
            convertKakao() {
                let ret = this.selectedTemplate;
                for (let i = 0; i < this.obj.input.length; i++) {
                    if (this.kakaoObj.input[i] === '') return '';
                    ret = Utility.kakaoReplace(ret, '#', this.obj.input[i], this.kakaoObj.input[i]);
                }
                for (let i = 0; i < this.obj.textarea.length; i++) {
                    if (this.kakaoObj.textarea[i] === '') return '';
                    ret = Utility.kakaoReplace(ret, '!', this.obj.textarea[i], this.kakaoObj.textarea[i]);
                }
                return ret;
            },
            onChangeTemplate(value) {
                this.templateNo = value;
                this.selectedTemplate = Utility.kakaoAddTag(SMSTemplate.templates[value].print);
                this.selectedTemplateId = SMSTemplate.templates[value].tmplId;
                this.obj.input = Utility.kakaoParse(this.selectedTemplate, '#');
                this.obj.textarea = Utility.kakaoParse(this.selectedTemplate, '!');
                this.kakaoObj.input = new Array(this.obj.input.length);
                this.kakaoObj.textarea = new Array(this.obj.textarea.length);
            },
            onChangeTarget(value) {
                this.addTarget = value;
            },
            sendKakao() {
                let msg = this.convertKakao();
                if (msg === '') {
                    this.$notify({
                        title: '템플릿 오류',
                        text: '템플릿 내용이 부족하거나, 템플릿이 선택되지 않았어요.',
                        type: 'warn',
                    });
                    return;
                }
                let phone = [];
                this.targets.forEach(ele => {
                    phone.push(ele.phone);
                });
                if (phone.length === 0) {
                    this.$notify({
                        title: '수신자는 1명이상이어야 합니다.',
                        type: 'warn',
                    });
                    return;
                }
                SMSService.sendKakao({
                    phone: phone,
                    msg: msg,
                    tmplId: this.selectedTemplateId,
                })
                    .then(() => {
                        this.$notify({
                            title: '메세지 전송에 성공하였습니다.',
                            type: 'success',
                        });
                    })
                    .catch(() => {
                        this.$notify({
                            title: '메세지 전송에 실파하였습니다.',
                            type: 'error',
                        });
                    });
            },
            doAddTarget() {
                this.targets.push(this.arrayForTarget.filter(ele => {
                    return ele.id === this.addTarget;
                })[0]);
                if (this.targets[this.targets.length - 1].student)
                    this.targets[this.targets.length - 1].phone = this.targets[this.targets.length - 1].parent_phone;
            },
            removeTarget(target) {
                return target;
            }
        },
        components: {
            SelectForm,
            Button,
        }
    };
</script>
