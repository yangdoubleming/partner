import { axios } from '@/utils/request'

import { insuranceServiceApi } from './config'

export function getList (parameter) {
  return axios({
    url: insuranceServiceApi + '/apply-documentation/list',
    method: 'get',
    params: parameter
  })
}
