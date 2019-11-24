<template>
    <div class="md-layout md-alignment-center">
        <div class="md-layout-item md-size-70">
            <md-card>
                <md-card-header>
                    <h3 class="md-title">카톡 보내기</h3>
                </md-card-header>
                <md-card-content>
                    <SelectForm v-bind:selectList="getTemplates" v-on:input="onChangeTemplate" name="템플릿 고르기"></SelectForm>
                    <md-field>
                        <label>내용</label>
                        <md-textarea md-autogrow v-model="selectedTemplate"></md-textarea>
                    </md-field>
                    <SelectForm v-bind:selectList="getTargets" v-on:input="onChangeTarget" name="전송할 사람"></SelectForm>
                    <md-button @click="doAddTarget">추가</md-button>
                    <md-table>
                        <md-table-row>
                            <md-table-cell>이름</md-table-cell>
                            <md-table-cell>소속(학생의 경우 학교)</md-table-cell>
                            <md-table-cell>전화번호(학생의 경우 부무님 전화번호)</md-table-cell>
                            <md-table-cell>제거</md-table-cell>
                        </md-table-row>
                        <md-table-row v-for="target in targets" v-bind:key="target._id">
                            <md-table-cell>{{ target.name }}</md-table-cell>
                            <md-table-cell>{{ target.student ? target.school : target.department }}</md-table-cell>
                            <md-table-cell>{{ target.student ? target.parent_phone : target.phone }}</md-table-cell>
                            <md-table-cell><md-button @click="removeTarget(target)">제거</md-button></md-table-cell>
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
	import SMSTemplate from '../../constants/kakao_template.js';
	export default {
		name: 'SMS',
		mounted() {
			this.$store.dispatch('fetchTeachers');
			this.$store.dispatch('fetchStudents');
		},
		data() {
			return {
				templateNo: 0,
				selectedTemplate: SMSTemplate.templates[0],
				addTarget: null,
				targets: [],
				arrayForTarget: [],
			};
		},
		computed: {
			getTemplates() {
				let ret = [];
				for (let i = 0; i < SMSTemplate.templates.length; i++) ret.push({'id': i, 'name': i});
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
				// this.arrayForTarget = ret;
				return ret;
			}
		},
		methods: {
			onChangeTemplate(value) {
				this.templateNo = value;
				this.selectedTemplate = SMSTemplate.templates[value];
			},
			onChangeTarget(value) {
				this.addTarget = value;
			},
			sendKakao() {
				//
			},
			doAddTarget() {
				this.targets.push(this.arrayForTarget.filter(ele => {
					return ele.id === this.addTarget;
				})[0]);
			},
			removeTarget(target) {
				//
			}
		},
		components: {
			SelectForm,
		}
	};
</script>
