import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login.vue'
import WxLogin from '@/views/login-wx.vue'
import NotFound from '@/views/404.vue'

import Index from '@/views/index.vue'
import IndexTeacher from '@/views/index-teacher.vue'

import SignupInfo from '@/views/signup-info.vue'
import SignupList from '@/views/signup-list.vue'
import SignupIndexList from '@/views/signup-index-list.vue'
import SignupStudent from '@/views/signup-student.vue'
import SignupStudentCode from '@/views/signup-student-code.vue'
import SignupTeacher from '@/views/signup-teacher.vue'
import SignupStatistic from '@/views/signup-statistic.vue'
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
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/index/teacher',
    name: 'indexTeacher',
    component: IndexTeacher
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
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
