<template>
    <v-app>
        <v-content>
            <Header v-if="this.$store.getters.isLogined"/>
            <AlertMessage/>
            <router-view/>
            <Footer v-if="this.$store.getters.isLogined"/>
        </v-content>
    </v-app>
</template>

<style>
    /*@import 'assets/stylesheets/materialize.css';*/
    /*@import 'assets/stylesheets/style.css';*/
    /*@import 'flatpickr/dist/flatpickr.css';*/
</style>

<script>
    import Header from './components/Header.vue';
    import Footer from './components/Footer.vue';
    import AlertMessage from './components/common/AlertMessage.vue';
    // import '@/assets/javascripts/materialize.js';
    // import '@/assets/javascripts/init.js';
    export default {
        name: 'App',
        data() {
            return {
                isLogined: this.$store.getters.isLogined,
            };
        },
        components: {
            Header,
            Footer,
            AlertMessage,
        }
    };
</script>
