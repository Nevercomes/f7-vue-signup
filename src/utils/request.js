import axios from 'axios'
import store from '@/store'
import {
  f7
} from 'framework7-vue';
import {
  getToken
} from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(res => {
    // const code = res.data.code
    let statusCode = res.statusCode + ''
    let codeHead = statusCode.substring(0, 1)
    if (codeHead == '4' || codeHead == '5') {
      // fetch.toast("数据请求失败")
      return Promise.reject(res)
    } else {
      if (res.data == undefined) {
        // fetch.toast("数据请求失败")
        return Promise.reject(res)
      } else {
        try {
          res.data = JSON.parse(res.data)
        } catch (e) {
          console.log("not json data")
        }
      }
      // 后台多端杂糅要处理鉴权失败返回Json数据一直运行错误...请原谅我用这样一种吊诡的方式来处理这个问题
      let needLogin = false
      if (typeof(res.data) == 'string' && (res.data.indexOf('家校通') != -1 && res.data.indexOf(
          'placeholder="请填写登录账号"') != -1))
        needLogin = true
      if (needLogin) {
        // uni.showModal({
        //   title: '登录异常',
        //   content: '身份验证异常，请重新登录',
        //   showCancel: false,
        //   confirmColor: "#5677FC",
        //   confirmText: '确定',
        //   success(e) {
        //     uni.redirectTo({
        //       url: '../../login'
        //     })
        //   }
        // })
        return Promise.reject(res)
      } else if (res.statusCode == 403 || res.data.code == '70001') {
        // fetch.toast('数据接口请求权限不足')
        return Promise.reject(res)
      } else if (res.data.code != '200' && res.data.message != undefined) {
        // fetch.toast(res.data.message)
        return Promise.reject(res)
      } else {
        return res.data
      }
    }
  },
  error => {
    console.log('err' + error)
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
