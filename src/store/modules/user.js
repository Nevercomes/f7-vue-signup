import {
  login,
  wxLogin,
  logout
} from '@/api/login.js'
import {
  getToken,
  setToken
} from '@/utils/auth.js'

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
    SET_TOKEN: (state, shopId) => {
      state.shopId = shopId
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
    login({
      commit
    }, info) {
      const username = info.username.trim()
      const password = info.password
      const shopId = info.shopId
      return new Promise((resolve, reject) => {
        login({
          username: username,
          password: password,
          shop: shopId,
          fetchToken: true,
        }).then(res => {
          if (!res.data.sessionId) {
            console.log('reject')
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
          reject(error)
        })
      })
    },
    wxLogin({
      commit
    }, code) {
      return new Promise((resolve, reject) => {
        wxLogin({
          code: code,
          fromWeChat: true,
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
              reject()
            }
          }
        }).catch(error => {
          reject(error)
        })
      })

    },

    // 退出系统
    logout({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
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
