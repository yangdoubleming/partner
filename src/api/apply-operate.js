import { axios } from '@/utils/request'

import { insuranceServiceApi } from './config'

export function getList (parameter) {
  return axios({
    url: insuranceServiceApi + '/apply-operate-record/getlistbyapplyid',
    method: 'get',
    params: parameter
  })
}
