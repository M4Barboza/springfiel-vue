import Vue from 'vue'
import axios from 'axios'

Vue.use({
  install(Vue) {
    Vue.prototype.$http = axios.create({
            baseURL: 'https://621677177428a1d2a3690be7.mockapi.io/api/v1/'
        })
  }
})