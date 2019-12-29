<template>
    <div class="md-layout md-alignment-center">
        <div class="md-layout-item md-size-70">
            <br>
            <md-card>
                <md-card-header>
                    <h3 class="md-title">카톡 보내기</h3>
                </md-card-header>
                <md-card-content>
                    <SelectForm v-bind:selectList="getTemplates" v-on:input="onChangeTemplate" name="템플릿 고르기"></SelectForm>
                    <div class="md-layout">
                        <div class="md-layout-item">
                            <pre v-html="selectedTemplate"></pre>
                        </div>
                        <div class="md-layout-item md-layout md-gutter">
                            <div v-for="(input, index) in obj.input" class="md-layout-item md-size-30">
                                <md-field>
                                    <label>{{ input }}</label>
                                    <md-input v-model="kakaoObj.input[index]"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-size-50" v-for="(textarea, index) in obj.textarea">
                                <md-field>
                                    <label>{{ textarea }}</label>
                                    <md-textarea md-autogrow v-model="kakaoObj.textarea[index]"></md-textarea>
                                </md-field>
                            </div>
                        </div>
                    </div>
                    <div class="md-layout">
                        <pre v-html="kakaoSendTarget"></pre>
                    </div>
                    <SelectForm v-bind:selectList="getTargets" v-on:input="onChangeTarget" name="전송할 사람"></SelectForm>
                    <md-button @click="doAddTarget">추가</md-button>
                    <md-table>
                        <md-table-row>
                            <md-table-cell>#</md-table-cell>
                            <md-table-cell>이름</md-table-cell>
                            <md-table-cell>소속(학생의 경우 학교)</md-table-cell>
                            <md-table-cell>전화번호(학생의 경우 부무님 전화번호)</md-table-cell>
                            <md-table-cell>제거</md-table-cell>
                        </md-table-row>
                        <md-table-row v-for="(target, index) in targets" v-bind:key="target._id">
                            <md-table-cell md-numeric>{{ index }}</md-table-cell>
                            <md-table-cell>{{ target.name }}</md-table-cell>
                            <md-table-cell>{{ target.student ? target.school : target.department }}</md-table-cell>
                            <md-table-cell>
                                <md-input readonly v-model="target.phone"></md-input>
                            </md-table-cell>
                            <md-table-cell>
                                <md-button @click="removeTarget(target)">제거</md-button>
                            </md-table-cell>
                        </md-table-row>
                    </md-table>
                </md-card-content>
                <md-card-actions>
                    <md-button @click="sendKakao">전송</md-button>
                </md-card-actions>
            </md-card>
            <br/>
        </div>
    </div>
</template>

<script>
	import SelectForm from '../form/SelectForm';
	import SMSTemplate from '../../constants/KakaoTemplate.js';
	import VRuntimeTemplate from 'v-runtime-template';
	import Utility from "../../Utility/Utility";
	import SMSService from '../../service/sms.js';

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
				this.arrayForTarget = ret;
				return ret;
			}
		},
		methods: {
			convertKakao() {
				let ret = this.selectedTemplate;
				for (let i = 0; i < this.obj.input.length; i++) {
					if(this.kakaoObj.input[i] === '') return '';
					ret = Utility.kakaoReplace(ret, '#', this.obj.input[i], this.kakaoObj.input[i]);
				}
				for (let i = 0; i < this.obj.textarea.length; i++) {
					if(this.kakaoObj.textarea[i] === '') return '';
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
				if(msg === '') {
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
				if(phone.length === 0) {
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
					.then((response) => {
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
				//
			}
		},
		components: {
			SelectForm,
			VRuntimeTemplate,
		}
	};
</script>
