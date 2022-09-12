import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'
import './config/axios'
import './global.css'
import './config/toasted'

import router from './config/router'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
