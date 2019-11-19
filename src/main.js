import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.prototype.$axios = axios

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.url !== 'login') {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
