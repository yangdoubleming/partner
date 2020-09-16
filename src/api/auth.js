import { axios } from '@/utils/request'

import { authServiceApi } from './config'

export function auth (params) {
  return axios({
    url: authServiceApi + '/token',
    method: 'get',
    params
  })
}
