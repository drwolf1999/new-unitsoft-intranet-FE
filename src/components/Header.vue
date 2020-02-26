<template>
    <v-card color="grey lighten-4" flat>
        <v-toolbar color="primary" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title @click="goMain">Intranet</v-toolbar-title>
            <v-spacer></v-spacer>
            <Button v-bind:content="`학생`" v-bind:textBtn="true" v-on:click.native="goStudent"></Button>
            <Button v-bind:content="`선생님`" v-bind:textBtn="true" v-on:click.native="goTeacher"></Button>
            <Button v-bind:content="`수업`" v-bind:textBtn="true" v-on:click.native="goLesson"></Button>
            <Button v-bind:content="`SMS`" v-bind:textBtn="true" v-on:click.native="goSMS"></Button>
            <Button v-bind:content="`로그아웃`" v-bind:textBtn="true" v-on:click.native="doLogout"></Button>
        </v-toolbar>
    </v-card>
</template>

<script>
    import Button from './form/Button.vue';

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
        },
        components: {
            Button
        }
    };
</script>
