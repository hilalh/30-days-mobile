import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/registerServiceWorker';
import '@/plugins/vuetify';
import '@/plugins/amplify';

import DefaultLayout from '@/layouts/DefaultLayout.vue'; // @ is an alias to /src
import AppLayout from '@/layouts/AppLayout.vue'; // @ is an alias to /src
import AuthLayout from '@/layouts/AuthLayout.vue'; // @ is an alias to /src
Vue.component('default-layout', DefaultLayout);
Vue.component('app-layout', AppLayout);
Vue.component('auth-layout', AuthLayout);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
