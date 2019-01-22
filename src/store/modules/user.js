import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { setUserInfo } from '@/utils/user'
const user = {
  state: {
    token: getToken(),
    account: '',
    pswtemp: '',
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_PSW: (state, pswtemp) => {
      state.pswtemp = pswtemp
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const account = userInfo.account.trim()
      return new Promise((resolve, reject) => {
        login(account, userInfo.password).then(response => {
          const data = response.data.commonContext
          setToken(data.token)
          // setUserInfo(data)
          commit('SET_ACCOUNT', account)
          localStorage.setItem('music_score_account', account)
          // commit('SET_PSW', userInfo.password)
          commit('SET_TOKEN', data.token)
          localStorage.setItem('music_score_token', data.token)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token, state.account, state.pswtemp).then(response => {
          const data = response.data
          commit('SET_PSW', '')
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          localStorage.removeItem('music_score_account') // token过期后清除本地存储
          localStorage.removeItem('music_score_token')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
