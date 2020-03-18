import Vue from 'vue'
import App from './App.vue'
import store from './store'

// Import Framework7 Bundle
import Framework7 from 'framework7/framework7-lite.esm.bundle.js'
import 'framework7/css/framework7.bundle.css'

import '@/assets/styles/f7-app.css' // f7 style

// Import Framework7-Vue with all components
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'

// Init plugin and register all components
Framework7.use(Framework7Vue)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
