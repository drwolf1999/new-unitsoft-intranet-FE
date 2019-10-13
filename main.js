// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './src/App'
import VueNotification from 'vue-notification';
import router from './src/router/router.js';
import store from './src/store/store.js';
import CoolSelect from 'vue-cool-select';
import VueDateTime from 'vue-flatpickr-component';

Vue.config.productionTip = false;

Vue.use(VueNotification);
Vue.use(VueDateTime);
Vue.use(CoolSelect, {theme: 'material-design'});
Vue.component('v-TimeDate', VueDateTime);
// eslint-disable no-new
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');