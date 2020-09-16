import { axios } from '@/utils/request'

import { loanServiceApi, shopServiceApi } from './config'

// 查询用户下所有店铺
export function getList (params) {
  return axios({
    url: loanServiceApi + '/third-auth-shop/loanShops',
    method: 'get',
    params
  })
}

export function myShop (params) {
  return axios({
    url: loanServiceApi + `/third-auth-shop/myshop`,
    method: 'get',
    params
  })
}

export function getStation (params) {
  return axios({
    url: shopServiceApi + `/third-auth-shop/station`,
    method: 'get',
    params
  })
}

export function showAmazonShop (params) {
  return axios({
    url: shopServiceApi + `/third-auth-shop/all`,
    method: 'get',
    params
  })
}

export function showEbayShop (params) {
  return axios({
    url: shopServiceApi + `/third-auth-shop/showEbayShop`,
    method: 'get',
    params
  })
}

export function amazonAuthorize (data) {
  return axios({
    url: shopServiceApi + `/auth/amazon/add`,
    method: 'post',
    data
  })
}

export function ebayAuthorize (data) {
  return axios({
    url: shopServiceApi + `/auth/ebay/add`,
    method: 'post',
    data
  })
}