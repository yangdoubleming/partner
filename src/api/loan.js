import { axios } from '@/utils/request'

import { loanServiceApi } from './config'

export function getLoanList (parameter) {
  return axios({
    url: loanServiceApi + '/loan-info/page',
    method: 'get',
    params: parameter
  })
}

export function companyBorrower (id) {
  return axios({
    url: loanServiceApi + `/company-borrower/detail`,
    method: 'get'
  })
}

export function getLoanById (id) {
  return axios({
    url: loanServiceApi + `/company-loan/${id}`,
    method: 'get'
  })
}

export function getLoanStatistic (parameter) {
  return axios({
    url: loanServiceApi + `/loan-statistics/productInfo`,
    method: 'get',
    parameter: parameter
  })
}

export function getLoanUserStatistic (type) {
  return axios({
    url: loanServiceApi + `/loan-statistics/productInfo?loanProductName=${type}`,
    method: 'get'
  })
}

export function getLoanProduct (id) {
  return axios({
    url: loanServiceApi + `/company-loan/${id}`,
    method: 'get'
  })
}

export function companyDocument (parameter) {
  return axios({
    url: loanServiceApi + `/company-document/page?ciCompanyId=${parameter}`,
    method: 'get'
  })
}

export function loanStatistics () {
  return axios({
    url: loanServiceApi + `/loan-statistics`,
    method: 'get'
  })
}

export function shopData () {
  return axios({
    url: loanServiceApi + `/third-auth-shop/shopdata`,
    method: 'get'
  })
}

export function loanShopData (id) {
  return axios({
    url: loanServiceApi + `/loan-shop/loanShopData?loanId=${id}`,
    method: 'get'
  })
}

export function queryConditions (id) {
  return axios({
    url: loanServiceApi + `/loan-info/queryConditions`,
    method: 'get'
  })
}
