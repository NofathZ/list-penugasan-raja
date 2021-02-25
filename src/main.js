import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import Tawk from 'vue-tawk'

import "./assets/scss/main.scss";

Vue.prototype.$http = axios;
// const token = localStorage.getItem('token')
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer '+token
// } else {
//   window.location.href = 'https://rajabrawijaya.ub.ac.id/login';
// }

Vue.use(Tawk, {
  tawkSrc: 'https://embed.tawk.to/5b47696c6d961556373daa55/1egdgplh3'
})

Vue.use(axios) 
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
