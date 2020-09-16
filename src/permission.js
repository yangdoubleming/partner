import router from './router'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { getToken } from '@/utils/auth'
import store from './store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/user/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))

  // determine whether the user has logged in
  const hasToken = getToken()
  const hasRefreshToken = getToken(true)

  console.log(hasToken)

  if (hasToken) {
    if (to.path === '/user/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  } else {
    if (hasRefreshToken) {
      try {
        // 根据refreshToken获取accessToken
        await store.dispatch('refreshToken')
        next({ ...to, replace: true })
      } catch (error) {
        // refreshToken无效或者失效
        await store.dispatch('resetToken')
        notification.error({
          message: '错误',
          description: '请求用户信息失败，请重试'
        })
        next(`/user/login?redirect=${to.path}`)
        NProgress.done()
      }
    } else {
      // 没有refreshToken，直接跳转
      next()
      NProgress.done()
    }
    /* has no token */
    // 没有token 先判断是否存在refreshToken

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      if (hasRefreshToken) {
        try {
          // 根据refreshToken获取accessToken
          await store.dispatch('refreshToken')
          next({ ...to, replace: true })
        } catch (error) {
          // refreshToken无效或者失效
          await store.dispatch('resetToken')
          notification.error({
            message: '错误',
            description: '请求用户信息失败，请重试'
          })
          next(`/user/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        // 没有refreshToken，直接跳转
        next()
        NProgress.done()
      }
    }
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
