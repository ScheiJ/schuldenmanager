import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import { VueGoogleMaps } from './plugins/vue-google-maps';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VueGoogleMaps,
  render: h => h(App)
}).$mount('#app')
