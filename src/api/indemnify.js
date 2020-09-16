import { axios } from '@/utils/request'

import { insuranceServiceApi } from './config'

export function getList (parameter) {
  return axios({
    url: insuranceServiceApi + '/apply-indemnify',
    method: 'get',
    params: parameter
  })
}

export function getById (id) {
  return axios({
    url: insuranceServiceApi + `/apply-indemnify/${id}`,
    method: 'get'
  })
}

export function submitApply (data) {
  return axios({
    url: insuranceServiceApi + '/apply-indemnify',
    method: 'post',
    data: data
  })
}

export function deleteIndemnifyById (id) {
  return axios({
    url: insuranceServiceApi + `/apply-indemnify/${id}`,
    method: 'delete'
  })
}
