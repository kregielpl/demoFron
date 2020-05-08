import Vue from 'vue'
import App from './App.vue'
import "./plugins/vuetify.js";
import store from "./stores/store";
import router from './router'
import acl from './acl/acl'

import VueMaterial from 'vue-material'
Vue.use(VueMaterial);

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import Vuex from 'vuex';
Vue.use(Vuex);

import 'vue-material/dist/vue-material.min.css'

import axios from "./axios.js"
Vue.prototype.$http = axios

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  acl,
  render: h => h(App),
}).$mount('#app');

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.data.code === 401) {
    localStorage.removeItem("accessToken")
    alert(error.response.data.message)
    // store.dispatch('logout')
  }

  if(router.currentRoute.path !== '/login'){
    router.push({ path: '/login' })
  }

  return Promise.reject(error)
})