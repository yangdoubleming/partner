import { axios } from '@/utils/request'

import { insuranceServiceApi } from './config'

export function updateBank (data) {
  return axios({
    url: insuranceServiceApi + '/ci-company/updatebankinfo',
    method: 'put',
    data
  })
}
