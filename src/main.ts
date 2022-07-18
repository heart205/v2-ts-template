import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './normalize.css'
import './styles/layout.less'
Vue.config.productionTip = false

import { useRegisterHooks } from './utils/registerHooks'

useRegisterHooks()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
