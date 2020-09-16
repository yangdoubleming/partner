<template>
  <div class="account-settings-info-view">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="账单类型">
              <a-select v-model="queryParam.billType" placeholder="请选择" default-value="">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="0">账户充值</a-select-option>
                <a-select-option value="1">提现</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="10" :sm="24">
            <a-form-item label="申请时间">
              <div>
                <a-date-picker v-model="queryParam.createMinDate" valueFormat="YYYY-MM-DD" placeholder="开始时间" />
                <span> - </span>
                <a-date-picker v-model="queryParam.createMaxDate" valueFormat="YYYY-MM-DD" placeholder="结束时间" />
              </div>

            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
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
import { getPaymentBillByPage } from '@/api/userinfo'

const channelMap = {
  0: '支付宝',
  1: '微信',
  2: '银行卡'
}
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
      queryParam: {},
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
          title: '渠道',
          dataIndex: 'channel',
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
              item.channel = channelMap[1]
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

  },
  filters: {

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
