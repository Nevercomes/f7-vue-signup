import {
  login,
  wxLogin,
  logout
} from '@/api/login.js'
import {
  getToken,
  setToken
} from '@/utils/auth.js'
import {
  isNullOrEmpty
} from '@/utils/util.js'

const user = {
  state: {
    token: getToken(),
    name: '',
    shopId: '',
    userId: '',
    loginName: '',
    role: '',
    memberId: '',
    openId: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_SHOPID: (state, shopId) => {
      state.shopId = shopId
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_LOGINNAME: (state, loginName) => {
      state.loginName = loginName
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_MEMBERID: (state, memberId) => {
      state.memberId = memberId
    },
    SET_OPENID: (state, openId) => {
      state.openId = openId
    }
  },
  actions: {
    Login({
      commit
    }, info) {
      const username = info.username.trim()
      const password = info.password
      const shopId = info.shopId
      const openId = info.openId
      return new Promise((resolve, reject) => {
        login({
          username: username,
          password: password,
          shop: shopId,
          openId: openId,
          fetchToken: true,
        }).then(res => {
          console.log(res)
          if (isNullOrEmpty(res.data.sessionId)) {
            console.log('empty session id')
            reject()
          } else {
            let data = res.data
            setToken(data.sessionId)
            commit('SET_TOKEN', data.sessionId)
            commit('SET_SHOPID', data.shopId)
            commit('SET_OPENID', data.openId)
            commit('SET_MEMBERID', data.memberId)
            commit('SET_ROLE', data.role)
            commit('SET_LOGINNAME', data.loginName)
            commit('SET_USERID', data.userId)
            commit('SET_NAME', data.name)
            resolve()
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    WxLogin({
      commit
    }, code) {
      return new Promise((resolve, reject) => {
        wxLogin({
          code: code,
          fetchToken: true,
          fromWeChat: true,
          fromFenXiao: true,
        }).then(res => {
          if (!res.data) {
            reject()
          } else {
            let data = res.data
            if (data.sessionId) {
              setToken(data.sessionId)
              commit('SET_TOKEN', data.sessionId)
              commit('SET_SHOPID', data.shopId)
              commit('SET_OPENID', data.openId)
              commit('SET_MEMBERID', data.memberId)
              commit('SET_ROLE', data.role)
              commit('SET_LOGINNAME', data.loginName)
              commit('SET_USERID', data.userId)
              commit('SET_NAME', data.name)
              resolve()
            } else {
              console.log('empty session id')
              commit('SET_OPENID', res.data.openId)
              reject()
            }
          }
        }).catch(error => {
          reject(error)
        })
      })

    },

    // 退出系统
    Logout({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_SHOPID', '')
          commit('SET_OPENID', '')
          commit('SET_MEMBERID', '')
          commit('SET_ROLE', '')
          commit('SET_LOGINNAME', '')
          commit('SET_USERID', '')
          commit('SET_NAME', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default user
