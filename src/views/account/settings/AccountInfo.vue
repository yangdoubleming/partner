<template>
  <div class="account-settings-info-view">
    <div class="account-settings-info-title"><span class="title">账户余额：</span>
      <span class="money">￥<span class="money" v-html="subTotalAccountBalance"></span></span>
      <a-button class="pay" type="primary" @click="recharge">充值</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
    </s-table>

  </div>
</template>

<script>
import { STable } from '@/components'
import { getPaymentBillByPage, getAccountInfo } from '@/api/userinfo'

// const channelMap = {
//   0: '支付宝',
//   1: '微信',
//   2: '银行卡'
// }

const billTypeMap = {
  0: '账户充值',
  1: '提现'
}
const billStatusMap = {
  0: '账单充值未付款',
  100: '账单充值成功'
}

export default {
  components: {
    STable
  },
  data () {
    return {
      subTotalAccountBalance: 0.00,
      columns: [
        {
          title: '记账时间',
          dataIndex: 'createDate',
          align: 'center'
        },
        {
          title: '流水单号',
          dataIndex: 'billNo',
          align: 'center'
        },
        {
          title: '账单类型',
          dataIndex: 'billType',
          align: 'center'
        },
        {
          title: '账单金额',
          dataIndex: 'billAmount1',
          align: 'center'
        },
        {
          title: '账单状态',
          dataIndex: 'billStatus',
          align: 'center'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const newQueryParam = Object.assign({}, this.queryParam)
        newQueryParam.current = parameter.pageNo
        newQueryParam.size = parameter.pageSize
        return getPaymentBillByPage(newQueryParam)
          .then(res => {
            res.data.records.map((item) => {
              item.key = item.id
              item.billType = billTypeMap[item.billType]
              item.billStatus = billStatusMap[item.billStatus]
            })
            const result = {
              pageSize: parameter.pageSize,
              pageNo: parameter.pageNo,
              totalCount: res.data.total,
              totalPage: Math.ceil(res.total / parameter.pageSize),
              data: res.data.records
            }
            return result
          })
      }
    }
  },
  methods: {
    recharge () {
      this.$router.push({
        name: 'Recharge'
      })
    }
  },
  filters: {

  },
  created () {
    getAccountInfo().then((res) => {
      this.subTotalAccountBalance = res.data.subTotalAccountBalance
    })
  }
}
</script>

<style lang="less" scoped>
  .account-settings-info-title{
    margin-bottom: 20px;
  }
  .money{
    color:red;
    font-size:20px;
  }

  .pay{
    margin-left: 10px;
  }
</style>
