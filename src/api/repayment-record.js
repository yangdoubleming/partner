import { axios } from '@/utils/request'

import { loanServiceApi } from './config'

export function getRepaymentRecordList (parameters) {
  return axios({
    url: loanServiceApi + '/repayment-record/page',
    method: 'get',
    params: parameters
  })
}
