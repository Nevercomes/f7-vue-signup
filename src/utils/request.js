import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {
  getToken
} from '@/utils/auth'
import {
  Dialog
} from 'vant';
import {
  Toast
} from 'vant'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // dev to prod
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: 'http://www.haitun158.com/HTMU/',
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['cookie'] = 'jeesite.session.id=' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
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
      Toast.fail('数据请求失败')
      return Promise.reject(res)
    } else {
      if (res.data == undefined) {
        Toast.fail('数据请求失败')
        return Promise.reject(res)
      } else {
        try {
          res.data = JSON.parse(res.data)
        } catch (e) {
          // console.log("not json data")
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
        //   content: '身份验证已过期，请重新登录',
        //   showCancel: false,
        //   confirmColor: "#5677FC",
        //   confirmText: '确定',
        //   success(e) {
        //     uni.redirectTo({
        //       url: '../../login'
        //     })
        //   }
        // })
        Dialog.alert({
          title: '登录异常',
          message: '身份验证已过期，请重新登录',
        }).then(() => {
          router.push({
            name: 'login'
          })
        });
        return Promise.reject(res)
      } else if (res.statusCode == 403 || res.data.code == '70001') {
        Toast.fail('接口数据权限不足')
        return Promise.reject(res)
      } else if (res.data.code != '1' && res.data.message != undefined) {
        Toast.fail(res.data.message)
        return Promise.reject(res)
      } else {
        return res.data
      }
    }
  },
  error => {
    console.log('err' + error)
    Dialog.alert({
      title: '登录异常',
      message: '身份验证已过期，请重新登录',
    }).then(() => {
      router.push({
        name: 'wxLogin'
      })
    });
    return Promise.reject(error)
  }
)

export default service
