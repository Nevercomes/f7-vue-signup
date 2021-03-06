import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login.vue'
import WxLogin from '@/views/login-wx.vue'
import NotFound from '@/views/404.vue'
import SuccessPage from '@/views/sys-success.vue'

import Index from '@/views/index.vue'

import SignupInfo from '@/views/signup-info.vue'
import SignupIndexList from '@/views/signup-index-list.vue'
import SignupStudent from '@/views/signup-student.vue'
import SignupTeacher from '@/views/signup-teacher.vue'
import SignupStudentCode from '@/views/signup-student-code.vue'
import SignupStatistic from '@/views/signup-statistic.vue'
import SignupQrCode from '@/views/signup-qrcode'
import PixelLearn from '@/views/pixel-learn.vue'


Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: 'wxLogin',
    component: WxLogin
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    path: '/success',
    name: 'successPage',
    component: SuccessPage
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/signup',
    name: 'signupStudent',
    component: SignupStudent
  },
  {
    path: '/signup/code',
    name: 'signupStudentCode',
    component: SignupStudentCode
  },
  {
    path: '/signup/teacher',
    name: 'signupTeacher',
    component: SignupTeacher
  },
  {
    path: '/signup/list',
    name: 'signupList',
    component: SignupIndexList
  },
  {
    path: '/signup/info',
    name: 'signupInfo',
    component: SignupInfo
  },
  {
    path: '/signup/statistic',
    name: 'signupStatistic',
    component: SignupStatistic
  },
  {
    path: '/signup/qr',
    name: 'signupQrcode',
    component: SignupQrCode
  },
  {
    path: '/pixel',
    name: 'pixelLearn',
    component: PixelLearn
  },
  {
    path: '*',
    redirect: {
      name: "404"
    }
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  // dev to prod
  // base: '/fenxiao/',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
