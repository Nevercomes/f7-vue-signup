import Vue from 'vue'
import App from './App.vue'
import store from './store'

// Import Framework7 Bundle
import Framework7 from 'framework7/framework7-lite.esm.bundle.js'
import 'framework7/css/framework7.bundle.css'

import '@/assets/styles/my-app.scss' // my app style
import '@/assets/styles/f7-app.css' // f7 style

// Import Framework7-Vue with all components
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'

// Init plugin and register all components
Framework7.use(Framework7Vue)

import {
  f7
} from 'framework7-vue'

Vue.prototype.msgSuccess = function(msg) {
  f7.toast.create({
    icon: app.theme === 'ios' ? '<i class="f7-icons">checkmark_alt</i>' : '<i class="material-icons">checkmark_alt</i>',
    text: msg,
    position: 'center',
    closeTimeout: 2000,
  }).open()
}

Vue.prototype.msgError = function(msg) {
  f7.toast.create({
    icon: app.theme === 'ios' ? '<i class="f7-icons">xmark</i>' : '<i class="material-icons">xmark</i>',
    text: msg,
    position: 'center',
    closeTimeout: 2000,
  }).open()
}

Vue.prototype.msgInfo = function(msg) {
  f7.toast.create({
    text: msg,
    position: 'center',
    closeTimeout: 2000,
  }).open()
}

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
