import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { useRegisterHooks } from './utils/registerHooks'
import { useRegisterPlugin } from './plugins/index'
import './plugins/index'

import './normalize.css'
import './styles/layout.less'

Vue.config.productionTip = false

useRegisterHooks()
useRegisterPlugin()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
