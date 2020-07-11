import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import {
  Button,
  Image,
  Form,
  Field,
  Row,
  Col,
  Icon,
  Picker,
  Popup,
  Calendar,
  Notify,
  Panel,
  Cell,
  CellGroup,
  List,
  PullRefresh,
  IndexBar,
  IndexAnchor,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  NavBar,
  Overlay,
  Loading,
  Empty
} from 'vant';

Vue.use(Button)
Vue.use(Image)
Vue.use(Form)
Vue.use(Field)
Vue.use(Row)
Vue.use(Col)
Vue.use(Icon)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Calendar)
Vue.use(Notify)
Vue.use(Panel)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Dialog)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Overlay)
Vue.use(Loading)
Vue.use(Empty)

import '@/assets/styles/my-app.scss' // global style
import '@/assets/styles/zhuoyue.scss' // 针对卓越提供的配色方案和样式
// import './quasar'

Vue.config.productionTip = false

Vue.prototype.hasMore = function(pageNo, pageSize, count) {
  if (count == -1 || pageNo == 1) return true
  if ((pageNo - 1) * pageSize >= count) {
    return false
  }
  return true
}

Vue.prototype.msgSuccess = function(msg) {
  this.$notify({
    type: 'success',
    message: msg
  })
}

Vue.prototype.msgError = function(msg) {
  this.$notify({
    type: 'danger',
    message: msg
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
