// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './src/App'
import VueNotification from 'vue-notification';
import router from './src/router/router.js';
import store from './src/store/store.js';
import vuetify from '@/plugins/vuetify'; // path to vuetify export
import 'vue-search-select/dist/VueSearchSelect.css';
Vue.config.productionTip = false;

Vue.use(VueNotification);

// Vue.use(VueMaterial);

// eslint-disable no-new
new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
