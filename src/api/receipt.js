import { axios } from '@/utils/request'

import { insuranceServiceApi } from './config'

// 查询用户下所有店铺
export function getList (params) {
  return axios({
    url: insuranceServiceApi + '/receipt/getlist',
    method: 'get',
    params
  })
}
