// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import store from './store/store.js';
import VueDateTime from 'vue-ctk-date-time-picker';

Vue.config.productionTip = false;
Vue.component('v-TimeDate', VueDateTime);
// eslint-disable no-new
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');