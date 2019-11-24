<template>
    <div v-if="LoginMode">
        <form novalidate class="md-layout" @submit.prevent="validateUser('Login')">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-progress-bar md-mode="indeterminate" v-if="sending"/>
                <md-card-header>
                    <div class="md-title">Login</div>
                </md-card-header>

                <md-card-content>
                    <md-field :class="getValidationClass('username')">
                        <label for="login-username">username</label>
                        <md-input type="text" name="login-username" id="login-username" v-model="Login.username" :disabled="sending"/>
                        <span class="md-error" v-if="!$v.Login.username.required">The username is required</span>
                        <span class="md-error" v-if="!$v.Login.username.minLength">The username is very short!</span>
                        <span class="md-error" v-if="!$v.Login.username.maxLength">The username is very long! </span>
                    </md-field>
                    <md-field :class="getValidationClass('password')">
                        <label for="login-password">password</label>
                        <md-input type="password" name="login-password" id="login-password" v-model="Login.password" :disabled="sending"/>
                        <span class="md-error" v-if="!$v.Login.password.required">The password is required</span>
                        <span class="md-error" v-if="!$v.Login.password.minLength">The password is very short!</span>
                        <span class="md-error" v-if="!$v.Login.password.maxLength">The password is very long! </span>
                    </md-field>
                </md-card-content>

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
                    <md-button type="button" class="md-primary" @click="Mode">RegisterMode</md-button>
                </md-card-actions>
            </md-card>
        </form>
    </div>
    <div v-else>
        <form novalidate class="md-layout" @submit.prevent="validateUser('Register')">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Register</div>
                </md-card-header>

                <md-card-content>
                    <md-field :class="getValidationClass('username')">
                        <label for="register-username">username</label>
                        <md-input type="text" name="register-username" id="register-username" v-model="Register.username" :disabled="sending"/>
                        <span class="md-error" v-if="!$v.Register.username.required">The username is required</span>
                    </md-field>
                    <md-field :class="getValidationClass('password')">
                        <label for="register-password">password</label>
                        <md-input type="password" name="register-password" id="register-password" v-model="Register.password" :disabled="sending"/>
                        <span class="md-error" v-if="!$v.Register.password.required">The password is required</span>
                    </md-field>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending"/>

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Register</md-button>
                    <md-button type="button" class="md-primary" @click="Mode">LoginMode</md-button>
                </md-card-actions>
            </md-card>
        </form>
    </div>
</template>

<script>
	import {validationMixin} from 'vuelidate';
	import {
		required,
		email,
		minLength,
		maxLength
	} from 'vuelidate/lib/validators';
	import Auth from '../../service/auth.js';

	export default {
		name: 'FormValidation',
		mixins: [validationMixin],
		data: () => ({
			Login: {
				username: null,
				password: null,
			},
			Register: {
				username: null,
				password: null,
			},
			userSaved: false,
			sending: false,
			LoginMode: true,
		}),
		validations: {
			Login: {
				username: {
					required,
					minLength: minLength(4),
					maxLength: maxLength(15),
				},
				password: {
					required,
					minLength: minLength(8),
					maxLength: maxLength(20),
				}
			},
			Register: {
				username: {
					required,
					minLength: minLength(4),
					maxLength: maxLength(15),
				},
				password: {
					required,
					minLength: minLength(8),
					maxLength: maxLength(20),
				},
			}
		},
		methods: {
			Mode() {
				this.LoginMode = !this.LoginMode;
				this.$v.$reset();
			},
			getValidationClass(fieldName) {
				// const field = this.LoginMode ? this.$v.Login[fieldName] : this.$v.Register[fieldName];
				const field = this.$v.Login[fieldName];

				if (field) {
					return {
						'md-invalid': field.$invalid && field.$dirty,
					};
				}
			},
			clearForm() {
				this.$v.$reset();
				if (this.LoginMode) {
					this.Login.username = null;
					this.Login.password = null;
				} else {
					this.Register.username = null;
					this.Register.password = null;
				}
			},
			LoginUser() {
				this.sending = true;
				this.$store.dispatch('LOGIN', {
					username: this.Login.username,
					password: this.Login.password,
				})
					.then(() => {
						this.sending = false;
						if(this.$store.getters.isLogined) {
							this.$notify({
								title: '로그인 성공!',
								text: '로그인에 성공하였습니다.',
								type: 'success',
							});
							this.$router.push(this.$store.getters.getNextDestination);
						} else {
							this.$notify({
								title: '로그인 실패..',
								text: '정보를 다시 입력해주세요',
								type: 'error',
							});
                        }
					})
					.catch(error => {
						this.sending = false;
						this.$notify({
							title: '처리중 에러가 발생하였습니다.',
							text: '문제가 발생한것 같습니다.',
							type: 'error',
						});
					});
			},
			RegisterUser() {
				this.sending = true;

				// Instead of this timeout, here you can call your API
				Auth.DoRegister({
					username: this.Register.username,
					password: this.Register.password,
				})
					.then(result => {
						this.sending = false;
						this.LoginMode = true;
						this.$notify({
							title: '성공!',
							text: '회원가입이 성공적으로 이루어졌습니다.',
							type: 'success',
						});
					})
					.catch(error => {
						this.sending = false;
						this.$notify({
							title: '실패...',
							text: '회원가입에 실패하였습니다.',
							type: 'error',
						});
					});
			},
			validateUser() {
				this.$v.$touch();

				if (this.LoginMode && !this.$v.Login.$invalid) {
					this.LoginUser();
				}
				if (!this.LoginMode && !this.$v.Register.$invalid) {
					this.RegisterUser();
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
</style>
