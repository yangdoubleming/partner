import Mock from 'mockjs2'
import { getQueryParameters } from '../util'

const loanBank = ['邮储银行', '建设银行', '中信银行', '光大银行', '汇丰银行', '天星银行', '宁波通商银行', '浙江农信']
const guarantor = ['保险公司', '担保公司', '信用']
const productName = ['跨商贷', '跨商保', '跨运保', '提前贷']
const loanDetail = (options) => {
  const parameters = getQueryParameters(options)

  console.log(parameters)

  let productNo
  if (parameters.productNo) {
    productNo = parameters.productNo
  } else {
    productNo = Mock.mock('@integer(0, 3)')
  }

  console.log(productNo)

  return {
    data: {
      loanNo: 'DSB1213132123',
      limit: Mock.mock('@integer(1, 5)') * 1000000,
      loanStatus: Mock.mock('@integer(0, 7)'),
      productNo: productNo,
      loanBank: loanBank[Mock.mock('@integer(0, 7)')],
      guarantor: guarantor[Mock.mock('@integer(0, 2)')],
      applyTime: Mock.mock('@date'),
      startDate: Mock.mock('@date'),
      updatedAt: Mock.mock('@date'),
      dueDate: Mock.mock('@date'),
      applyType: '企业',
      companyName: '企业名称',
      contactName: '张三',
      legalPersonPhone: '13801010101',
      productName: productName[productNo],
      loanAmount: Mock.mock('@integer(1, 5)') * 1000000,
      loanRate: Mock.mock('@float(0, 1, 2, 2)'),
      repaymentTotal: Mock.mock('@integer(1, 5)') * 1000000,

      extractTotal: Mock.mock('@integer(1, 5)') * 1000000
    }
  }
}

Mock.mock(/\/loanproduct-detail/, 'get', loanDetail)
