import { axios } from '@/utils/request'

import { insuranceServiceApi } from './config'

export function getInruleList (parameter) {
  return axios({
    url: insuranceServiceApi + '/inrule-list',
    method: 'get',
    params: parameter
  })
}
