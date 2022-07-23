import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import { useRegisterHooks } from './config/registerHooks'
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
