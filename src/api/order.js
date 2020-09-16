import { axios } from '@/utils/request'

import { insuranceServiceApi } from './config'

export function getList (parameter) {
  return axios({
    url: insuranceServiceApi + '/order',
    method: 'get',
    params: parameter
  })
}

export function getOrderById (id) {
  return axios({
    url: insuranceServiceApi + `/order/${id}`,
    method: 'get'
  })
}

export function getOrderPdf (orderId) {
  return axios({
    url: insuranceServiceApi + `/order-insure/getorderpdfbyorderid/${orderId}`,
    method: 'get'
  })
}

export function countapply (orderId) {
  return axios({
    url: insuranceServiceApi + `/order/${orderId}/countapply`,
    method: 'get'
  })
}

export function getApply (orderId) {
  return axios({
    url: insuranceServiceApi + `/order/${orderId}/getapply`,
    method: 'get'
  })
}
