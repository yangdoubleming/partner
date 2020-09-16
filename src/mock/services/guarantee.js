import Mock from 'mockjs2'
import {
  builder,
  getQueryParameters
} from '../util'

const totalCount = 5701

// 保单列表
const guaranteeList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      orderNo: 'Order No ' + tmpKey,
      trackingNo: 'tracking No' + tmpKey,
      applyTime: Mock.mock('@datetime'),
      phone: '186121212',
      status: Mock.mock('@integer(0, 4)'),
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

// 资金流水列表
const jounalList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      chargeTime: Mock.mock('@datetime'),
      jounalNo: 'J No ' + tmpKey,
      orderNo: 'Order No ' + tmpKey,
      billType: Mock.mock('@integer(0, 1)'),
      Amount: Mock.mock('@integer(100, 1000)'),
      status: Mock.mock('@integer(0, 2)'),
      channel: Mock.mock('@integer(0, 2)'),
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

// 理赔列表
const claimList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      polNo: Mock.mock('@datetime("yyyyMMddHHmmss")') + Mock.mock('@integer(1, 999)'),
      productName: '卖家险' + Mock.mock('@integer(1, 999)'),
      amount: Mock.mock('@integer(1, 999)'),
      polStatus: Mock.mock('@integer(0, 4)'),
      claimStatus: Mock.mock('@integer(0, 7)'),
      orderNo: Mock.mock('@datetime("yyyyMMddHHmmss")') + Mock.mock('@integer(1, 999)'),
      orderAmount: Mock.mock('@float(1, 100, 3, 6)'),
      applyTime: Mock.mock('@datetime("yyyy-MM-ddHH:mm:ss")'),
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

// 理赔详情
const claimDetail = (options) => {
  const result = {
    key: 1,
    id: 1,
    orderNo: 'Order No ' + 1,
    trackingNo: 'tracking No' + 1,
    applyTime: Mock.mock('@datetime'),
    product: '理赔产品' + Mock.mock('@integer(0, 4)'),
    status: Mock.mock('@integer(0, 4)'),
    editable: false
  }

  return builder(result)
}

Mock.mock(/\/guarantee\/list/, 'get', guaranteeList)
Mock.mock(/\/journal\/list/, 'get', jounalList)
Mock.mock(/\/claim\/list/, 'get', claimList)
Mock.mock(/\/claim\/\d+/, 'get', claimDetail)
