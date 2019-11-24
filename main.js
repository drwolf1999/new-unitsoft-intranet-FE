// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './src/App'
import VueNotification from 'vue-notification';
import router from './src/router/router.js';
import store from './src/store/store.js';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css'
import 'vue-search-select/dist/VueSearchSelect.css';
import Datetime from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
Vue.config.productionTip = false;

Vue.use(VueNotification);

Vue.component('datetime', Datetime);
Vue.use(VueMaterial);

// eslint-disable no-new
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
