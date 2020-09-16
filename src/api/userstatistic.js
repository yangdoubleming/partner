import { axios } from '@/utils/request'

import { insuranceServiceApi } from './config'

export function getUserStatistic () {
  return axios({
    url: insuranceServiceApi + '/user-statistic',
    method: 'get'
  })
}
