import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js';
import store from './vuex/store';

import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';

Vue.config.productionTip = false

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
