import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 5701

const orderList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1
  const key = (pageNo - 1) * pageSize

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      polNo: Mock.mock('@datetime("yyyyMMddHHmmss")') + Mock.mock('@integer(1, 999)'),
      productName: '卖家险' + Mock.mock('@integer(1, 999)'),
      amount: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(1, 4)'),
      platform: 1,
      shopName: 'XXXXX店铺',
      orderNo: Mock.mock('@datetime("yyyyMMddHHmmss")') + Mock.mock('@integer(1, 999)'),
      orderAmount: Mock.mock('@float(1, 100, 3, 6)'),
      takeEffectTime: Mock.mock('@datetime("yyyy-MM-ddHH:mm:ss")'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const ruleList = (options) => {
  const parameters = getQueryParameters(options)

  const thisTotalCount = 5

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(thisTotalCount / pageSize)
  const next = (pageNo >= totalPage ? (thisTotalCount % pageSize) : pageSize) + 1
  const key = (pageNo - 1) * pageSize

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      name: '规则名' + Mock.mock('@integer(1, 999)'),
      ruleMethod: Mock.mock('@integer(1, 2)'),
      status: Mock.mock('@integer(1, 4)'),
      amount: 'SKU' + Mock.mock('@integer(1, 4)'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: thisTotalCount,
    totalPage: totalPage,
    data: result
  })
}

Mock.mock(/\/order/, 'get', orderList)
Mock.mock(/\/rule/, 'get', ruleList)
