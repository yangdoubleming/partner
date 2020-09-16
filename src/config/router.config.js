// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { dsbLogo } from '@/core/icons'

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '豆沙包', icon: dsbLogo },
    redirect: '/home',
    children: [
      {
        hidden: true,
        path: '/home',
        name: 'Home',
        component: () => import('@/views/loan/home/LoanHome'),
        meta: { title: '首页', icon: 'home' }
      },
      {
        hidden: true,
        path: '/insurance',
        name: 'insurancemanage',
        redirect: '/insurance/table-list/:pageNo([1-9]\\d*)?',
        component: PageView,
        meta: { title: '保险管理', keepAlive: false, icon: 'insurance' },
        children: [
          {
            path: '/insurance/table-list/:pageNo([1-9]\\d*)?',
            name: 'insurance',
            component: () => import('@/views/insurance/TableList'),
            meta: { title: '我的保险', keepAlive: false, icon: 'bank' }

          },
          {
            path: '/insurancelist/table-list/:pageNo([1-9]\\d*)?',
            name: 'insurancelist',
            component: () => import('@/views/insurancelist/TableList'),
            meta: { title: '保单查询', keepAlive: false, icon: 'search' }

          },
          {
            hidden: true,
            path: '/journal/table-list/:pageNo([1-9]\\d*)?',
            name: 'journal',
            component: () => import('@/views/journal/TableList'),
            meta: { title: '资金流水', keepAlive: false, icon: 'search' }

          },
          // {
          //   path: '/guarantee/table-list/:pageNo([1-9]\\d*)?',
          //   name: 'guarantee',
          //   component: () => import('@/views/guarantee/TableList'),
          //   meta: { title: '保单管理', keepAlive: false, icon: 'form', permission: [ 'guarantee' ] }

          // },

          {
            path: '/claim/table-list/:pageNo([1-9]\\d*)?',
            name: 'claim',
            component: () => import('@/views/claim/TableList'),
            meta: { title: '理赔查询', keepAlive: false, icon: 'profile' }
          },

          {
            hidden: true,
            path: '/claim/table-applylist/:pageNo([1-9]\\d*)?',
            name: 'claimApplyTable',
            component: () => import('@/views/claim/ApplyTable'),
            meta: { title: '我要理赔', keepAlive: false, icon: 'profile' }
          },

          {
            path: '/rule/table-list/:pageNo([1-9]\\d*)?',
            name: 'rule',
            component: () => import('@/views/rule/TableList'),
            meta: { title: '投保规则', keepAlive: false, icon: 'profile' }
          },

          {
            hidden: true,
            path: '/claim/profile/basic',
            name: 'ClaimDetail',
            component: () => import('@/views/claim/detail/Info'),
            meta: { title: '理赔详情' }
          },

          {
            hidden: true,
            path: '/insurancelist/profile/basic',
            name: 'InsurancelistDetail',
            component: () => import('@/views/insurancelist/detail/Info'),
            meta: { title: '保单详情' }
          },
          {
            path: '/claim/profile/create',
            name: 'ClaimCreate',
            component: () => import('@/views/claim/Create'),
            meta: { title: '我要理赔', icon: 'profile' },
            hidden: true
          }
        ]
      },

      {
        path: '/loan',
        name: 'Loan',
        redirect: '/loan/home',
        component: PageView,
        meta: { title: '贷款管理', keepAlive: false, icon: 'interaction' },
        children: [
          {
            path: '/loan/home',
            name: 'LoanHome',
            component: () => import('@/views/loan/home/LoanHome'),
            meta: { title: '我的贷款', keepAlive: false, icon: 'interaction' }

          },
          {
            path: '/loan/query',
            name: 'LoanQuery',
            component: () => import('@/views/loan/query/Query'),
            meta: { title: '贷款查询', keepAlive: false, icon: 'search' }

          },
          {
            hidden: true,
            path: '/loan/detail',
            name: 'LoanDetail',
            component: () => import('@/views/loan/detail/Detail'),
            meta: { title: '贷款详情', keepAlive: false }
          },

          {
            path: '/loan/apply',
            name: 'LoanApply',
            component: () => import('@/views/loan/apply/Apply'),
            meta: { title: '申请贷款', keepAlive: false, icon: 'money-collect' }
          },

          {
            hidden: true,
            path: '/loan/extract',
            name: 'LoanExtract',
            component: () => import('@/views/loan/extract/Extract'),
            meta: { title: '我要提取', keepAlive: false, icon: 'pay-circle' }
          },

          {
            hidden: true,
            path: '/loan/repayment',
            name: 'LoanRepayment',
            component: () => import('@/views/loan/repayment/Repayment'),
            meta: { title: '我要还款', keepAlive: false, icon: 'profile' }
          }
        ]
      },

      {
        // hidden: true,
        path: '/shop',
        name: 'Shop',
        redirect: '/shop/home',
        component: PageView,
        meta: { title: '店铺管理', keepAlive: false, icon: 'shopping' },
        children: [
          {
            path: '/shop/home',
            name: 'ShopHome',
            component: () => import('@/views/shop/Index'),
            meta: { title: '我的店铺', keepAlive: false, icon: 'shopping' }

          },
          {
            path: '/shop/query',
            name: 'ShopQuery',
            component: () => import('@/views/shop/Query'),
            meta: { title: '店铺查询', keepAlive: false, icon: 'search' }

          },
          {
            hidden: true,
            path: '/shop/detail',
            name: 'ShopDetail',
            component: () => import('@/views/shop/Detail'),
            meta: { title: '店铺详情', keepAlive: false, icon: 'plus-square' }
          },
          {
            hidden: true,
            path: '/shop/authorize',
            name: 'ShopAuthorize',
            component: () => import('@/views/shop/authorize'),
            meta: { title: '店铺授权', keepAlive: false, icon: 'plus-square' }
          },
          {
            hidden: true,
            path: '/shop/amazonAuthorizeList',
            name: 'ShopAuthorize',
            component: () => import('@/views/shop/authorize/storeAuthorize/amazonAuthorizeList'),
            meta: { title: 'Amazon店铺授权', keepAlive: false, icon: 'plus-square' }
          },
          {
            hidden: true,
            path: '/shop/ebayAuthorizeList',
            name: 'ShopAuthorize',
            component: () => import('@/views/shop/authorize/storeAuthorize/ebayAuthorizeList'),
            meta: { title: 'eBay店铺授权', keepAlive: false, icon: 'plus-square' }
          }
        ]
      },
      {
        hidden: true,
        path: '/account/settings',
        name: 'settings',
        component: () => import('@/views/account/settings/Index'),
        meta: { title: '个人中心', icon: 'user' },
        redirect: '/account/settings/userinfo',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/account/settings/userinfo',
            name: 'UserInfo',
            component: () => import('@/views/account/settings/UserInfo'),
            meta: { title: '个人信息' }
          },
          {
            path: '/account/settings/company',
            name: 'CompanyInfo',
            component: () => import('@/views/account/settings/CompanyInfo'),
            meta: { title: '企业信息', keepAlive: true }
          },
          {
            path: '/account/settings/accountinfo',
            name: 'AccountInfo',
            component: () => import('@/views/account/settings/AccountInfo'),
            meta: { title: '账户信息', keepAlive: true }
          },
          {
            path: '/account/settings/cashjournal',
            name: 'CashJournal',
            component: () => import('@/views/account/settings/CashJournal'),
            meta: { title: '资金流水', keepAlive: true }
          },
          {
            path: '/account/settings/backcard',
            name: 'BankCard',
            component: () => import('@/views/account/settings/BankCard'),
            meta: { title: '银行卡管理', keepAlive: true }
          },
          {
            path: '/account/settings/security',
            name: 'SecuritySetting',
            component: () => import('@/views/account/settings/SecuritySetting'),
            meta: { title: '安全设置', keepAlive: true }
          },
          {
            path: '/account/settings/realname',
            name: 'RealName',
            component: () => import('@/views/account/settings/RealName'),
            meta: { title: '实名认证', keepAlive: true }
          }
        ]
      },
      {
        hidden: true,
        path: '/account/settings/Password',
        name: 'Password',
        component: () => import('@/views/account/password/Password'),
        meta: { title: '修改密码', keepAlive: true }
      },
      {
        hidden: true,
        path: '/account/settings/recharge',
        name: 'Recharge',
        component: () => import('@/views/account/settings/Recharge'),
        meta: { title: '账户充值', keepAlive: true }
      }

    ]
  },
  {
    path: '/user',
    component: BlankLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
