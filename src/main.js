import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from './router'
import './mock/mock.js'
import axios from "axios";
import $ from "jquery"

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://localhost:8081'
Vue.prototype.$axios = axios

new Vue({
  $,
  router,
  axios,
  render: h => h(App)
}).$mount('#app')

