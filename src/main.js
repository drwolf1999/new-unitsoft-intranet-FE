// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import store from './store/store.js';
import 'vue-search-select/dist/VueSearchSelect.css';
import Datetime from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.config.productionTip = false;

Vue.component('datetime', Datetime);
// eslint-disable no-new
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
