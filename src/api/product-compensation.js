import { axios } from '@/utils/request'

import { insuranceServiceApi } from './config'

// 获取产品对应
export function getList (parameter) {
  return axios({
    url: insuranceServiceApi + '/product-compensation/getlistbyproductid',
    method: 'get',
    params: parameter
  })
}
