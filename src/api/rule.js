import { axios } from '@/utils/request'

import { insuranceServiceApi } from './config'

export function getList (parameter) {
  return axios({
    url: insuranceServiceApi + '/third-auto-rule',
    method: 'get',
    params: parameter
  })
}

export function deleteRuleById (id) {
  return axios({
    url: insuranceServiceApi + `/third-auto-rule/${id}`,
    method: 'delete'
  })
}

export function createRule (parameter) {
  return axios({
    url: insuranceServiceApi + `/third-auto-rule`,
    method: 'post',
    data: parameter
  })
}

export function updateRule (parameter) {
  return axios({
    url: insuranceServiceApi + `/third-auto-rule`,
    method: 'put',
    data: parameter
  })
}
