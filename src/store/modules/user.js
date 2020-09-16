import Vue from 'vue'

import { auth } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'

import {
  AVATAR
} from '@/store/mutation-types'

const user = {
  state: {
    accessToken: '',
    refreshToken: '',
    name: '',
    avatar: ''
  },
  mutations: {
    SET_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      state.refreshToken = refreshToken
    },
    SET_NICKNAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    // user login
    auth ({ commit }, token) {
      return new Promise((resolve, reject) => {
        auth({ grantType: 'saas_token', saasToken: token }).then(response => {
          const { data } = response

          const { accessToken, refreshToken, nickName, avatar } = data

          commit('SET_TOKEN', accessToken)
          commit('SET_REFRESH_TOKEN', refreshToken)
          commit('SET_NICKNAME', nickName)
          commit('SET_AVATAR', avatar)

          // 保存信息到缓存中
          setToken(data.accessToken, data.refreshToken, data.accessTokenExpire)
          Vue.ls.set(AVATAR, avatar)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // user login
    refreshToken ({ commit }) {
      return new Promise((resolve, reject) => {
        auth({ grantType: 'refresh_token', refreshToken: getToken(true) }).then(response => {
          const { data } = response

          const { accessToken, refreshToken, nickName, avatar } = data

          commit('SET_TOKEN', accessToken)
          commit('SET_REFRESH_TOKEN', refreshToken)
          commit('SET_NICKNAME', nickName)
          commit('SET_AVATAR', avatar)

          // 保存信息到缓存中
          setToken(data.accessToken, data.refreshToken, data.accessTokenExpire)
          Vue.ls.set(AVATAR, avatar)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // user logout
    logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        removeToken()
        window.location.href = `http://login.dowsure.com/login?href=userCenter&api=freightsure`
        resolve()
      })
    },

    // remove token
    resetToken ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        removeToken()
        window.location.href = 'http://login.dowsure.com/login'
        resolve()
      })
    }
  }
}

export default user
