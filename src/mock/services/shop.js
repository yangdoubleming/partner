import Mock from 'mockjs2'
import { getQueryParameters } from '../util'

const total = 400

const List = (options) => {
  const parameters = getQueryParameters(options)

  console.log(parameters)

  const records = []
  const pageNo = parseInt(parameters.current)
  const pageSize = parseInt(parameters.size)
  const totalPage = Math.ceil(total / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (total % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    records.push({
      id: tmpKey,
      shopName: 'shopName' + tmpKey,
      type: Mock.mock('@integer(0, 1)'),
      authStatation: '北美站',
      receipt: '连连支付',
      status: Mock.mock('@integer(0, 2)'),
      sellAmount: Mock.mock('@integer(100000, 200000)'),
      tokenTime: Mock.mock('@date')
    })
  }

  return {
    data: {
      data: {
        total: total,
        records: records
      }
    }
  }
}

// const loanDetail = (options) => {

// }

Mock.mock(/\web\/third-auth-shop\/getlist/, 'get', List)
