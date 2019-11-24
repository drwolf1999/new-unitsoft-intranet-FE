<template>
    <md-toolbar class="md-primary" md-elevation="1">
        <h3 class="md-title" style="flex: 1" @click="goMain">Intranet</h3>
        <md-button @click="goStudent">학생</md-button>
        <md-button @click="goTeacher">선생님</md-button>
        <md-button @click="goLesson">수업</md-button>
        <md-button @click="goSMS">알림</md-button>
        <md-button @click="doLogout">로그아웃</md-button>
    </md-toolbar>
</template>

<script>
	export default {
		name: 'Header',
		props: {},
		methods: {
			goMain() {
				this.$router.push('/');
			},
			goStudent() {
				this.$router.push('/students');
			},
			goTeacher() {
				this.$router.push('/teachers');
			},
			goLesson() {
				this.$router.push('/lessons');
			},
			goSMS() {
				this.$router.push('/sms');
			},
			doLogout() {
				this.$store.dispatch('LOGOUT').then(() => this.$router.push('/auth'));
			},
		}
	};
</script>
