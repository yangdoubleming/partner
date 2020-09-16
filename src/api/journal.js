import { axios } from '@/utils/request'

import { insuranceServiceApi } from './config'

export function getJounalList (parameter) {
  return axios({
    url: insuranceServiceApi + '/journal/list',
    method: 'get',
    params: parameter
  })
}
