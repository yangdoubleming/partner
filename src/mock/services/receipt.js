import Mock from 'mockjs2'
import { getQueryParameters } from '../util'

const authFunctions = ['信息传输', '账户锁定', '指定账户还款']

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
      moneyType: Mock.mock('@integer(0, 1)'),
      shopNum: Mock.mock('@integer(1, 4)'),
      authStatation: '北美站',
      receipt: '连连支付',
      status: Mock.mock('@integer(0, 2)'),
      sellAmount: Mock.mock('@integer(100000, 200000)'),
      tokenTime: Mock.mock('@date'),
      authFunction: authFunctions[Mock.mock('@integer(0, 2)')]
    })
  }

  return {
    data: {
      total: total,
      records: records
    }
  }
}

// const loanDetail = (options) => {

// }

Mock.mock(/\web\/receipt\/getlist/, 'get', List)
