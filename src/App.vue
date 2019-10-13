<template>
    <div id="app">
        <Header/>
        <AlertMessage/>
        <router-view/>
        <Footer/>
    </div>
</template>

<style>
    @import 'assets/stylesheets/materialize.css';
    @import 'assets/stylesheets/style.css';
    @import 'flatpickr/dist/flatpickr.css';
</style>

<script>
    import Header from './components/Header.vue';
    import Footer from './components/Footer.vue';
    import AlertMessage from './components/common/AlertMessage.vue';
    import '@/assets/javascripts/materialize.js';
    import '@/assets/javascripts/init.js';

    export default {
        name: 'App',
        components: {
            Header,
            Footer,
            AlertMessage,
        }
    }
    ;
</script>