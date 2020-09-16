import Vue from 'vue'

import { ACCESS_TOKEN, RRFRESH_TOKEN } from '@/store/mutation-types'

/**
 * token
 */
export function getToken (refresh) {
  return refresh ? Vue.ls.get(RRFRESH_TOKEN) : Vue.ls.get(ACCESS_TOKEN)
}
// ===============  ================= //
/**
 * 带上dowsure头
 */
export function getRequestToken (refresh) {
  return 'dowsure' + getToken(refresh)
}

/**
 * 设置本地缓存，不考虑设置过期
 *
 * accessTokenExpire 单位s 考虑到网络延时，可以将accessToken的过期时间设置的比实际短一点
 * 便于permission.js可以实时监测到token不存在
 */
export function setToken (accessToken, refreshToken, accessTokenExpire) {
  Vue.ls.set(ACCESS_TOKEN, accessToken, (accessTokenExpire - 100) * 1000)
  Vue.ls.set(RRFRESH_TOKEN, refreshToken)
}

export function removeToken () {
  Vue.ls.remove(ACCESS_TOKEN)
  Vue.ls.remove(RRFRESH_TOKEN)
}

/**
 * 判断返回code是否是未认证/未登录
 */
export function checkNotAuth (code) {
  // 401: unauthorized; 4011: Illegal token; 4012: access Token expired; 4013 refresh token expire
  return code === 401 || code === 4011 || code === 4012 || code === 4013
}

/**
 * 判断是否禁止访问
 */
export function checkForbidden (code) {
  // 403: forbidden
  return code === 403
}

/**
 * 判断返回code是否用户未找到
 */
export function checkUserNotFound (code) {
  return code === 4041
}
