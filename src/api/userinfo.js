import { axios } from '@/utils/request'

import { insuranceServiceApi } from './config'

export function getVO () {
  return axios({
    url: insuranceServiceApi + '/ci-company/getvo',
    method: 'get'
  })
}

export function getPaymentBillByPage (parameter) {
  return axios({
    url: insuranceServiceApi + '/saas/getpaymentbillbypage',
    method: 'get',
    params: parameter
  })
}

export function payment (parameter) {
  return axios({
    url: insuranceServiceApi + '/saas/payment',
    method: 'post',
    params: parameter
  })
}

export function paymentResult (parameter) {
  return axios({
    url: insuranceServiceApi + '/saas/paymentresult',
    method: 'get',
    params: parameter
  })
}

export function sendPhoneCodeVerify () {
  return axios({
    url: insuranceServiceApi + '/saas/sendphonecodeverify',
    method: 'post'
  })
}

export function checkPhoneCodeVerify (code) {
  return axios({
    url: insuranceServiceApi + `/saas/checkphonecodeverify/${code}`,
    method: 'get'
  })
}

export function resetPassword (password, confirmPassword) {
  return axios({
    url: insuranceServiceApi + `/saas/resetpassword/${password}/${confirmPassword}`,
    method: 'post'
  })
}

export function getAccountInfo () {
  return axios({
    url: insuranceServiceApi + '/saas/getaccountinfo',
    method: 'get'
  })
}

export function getUserName () {
  return axios({
    url: insuranceServiceApi + '/sys-user/getusername',
    method: 'get'
  })
}
