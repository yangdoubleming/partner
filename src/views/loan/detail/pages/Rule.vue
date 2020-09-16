<template>

  <a-card
    title="准入规则"
    :bordered="false">

    <a-row style="margin-bottom:30px">
      <a-alert message="系统判定没有满足准入规则，请仔细审核，或修正数据" type="info" show-icon />
    </a-row>
    <s-table
      ref="table"
      tableLayout="auto"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :showPagination="false">

      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusFilter" :text="text | textFilter" />
      </span>

      <span slot="remark" slot-scope="text">
        <span v-html="text"></span>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a-button @click="handlePass(record)" type="">通过</a-button>

          <a-divider type="vertical" />

          <a-button @click="handleNotPass(record)" type="danger" >不通过</a-button>

          <a-divider type="vertical" />

          <a @click="correct(record)" >修正数据</a>

        </template>
      </span>
    </s-table>

  </a-card>

</template>

<script>

import {
  STable
} from '@/components'

import { getInruleList } from '@/api/in-rule'

var passStatusMap = {
  0: {
    status: 'default',
    text: '通过'
  },
  1: {
    status: 'processing',
    text: '不通过'
  },
  2: {
    status: 'error',
    text: '无法判定'
  }
}

const rules = [{
  type: 1,
  point: '年龄',
  standard: '年龄',
  remark: '年龄',
  realData: '35',
  system: 0,
  artificiality: 1
}, {
  type: 2,
  point: '主营区域',
  standard: '深圳',
  remark: '借款人、企业所在地',
  realData: '深圳',
  system: 0,
  artificiality: 1
}, {
  type: 3,
  point: '企业经营时长',
  standard: '1年以上',
  remark: '审核企业',
  realData: '2年',
  system: 0,
  artificiality: 1
}, {
  type: 4,
  point: '年销售额',
  standard: '≥1000万人民币',
  remark: '需要豆沙包进行店铺授权',
  realData: '1200万',
  system: 0,
  artificiality: 1
}, {
  type: 5,
  point: '退货率',
  standard: '≤10%',
  remark: '近1年数据值',
  realData: '7.8%',
  system: 0,
  artificiality: 1
}, {
  type: 6,
  point: '店铺经营时长',
  standard: '≥1年',
  remark: '每个申请账号均需满足',
  realData: '2年',
  system: 0,
  artificiality: 1
}, {
  type: 7,
  point: '店铺经营占比',
  standard: '单店销售占比≤40%',
  remark: '近1年数据值',
  realData: '35%',
  system: 0,
  artificiality: 1
}, {
  type: 8,
  point: '贷款合作银行数',
  standard: '≤3家',
  remark: '主要指企业贷款',
  realData: '-',
  system: 0,
  artificiality: 1
}, {
  type: 9,
  point: '征信状况',
  standard: '良好',
  remark: '1.次级、可疑、损失不操作<br/>2.近 1 年逾期次数累计不超过 6 次（挂“2”算逾期两次）<br/>3.近 1 年无逾期>60 天的记录 <br/>4.近 3 年无逾期>90 天的记',
  realData: '2年',
  system: 0,
  artificiality: 1
}, {
  type: 10,
  point: '征信查询次数',
  standard: '近半年≤6次',
  remark: '其他金融机构贷款审批名义查询的次数（同一金额机构的查询只认定为1次）',
  realData: '-',
  system: 0,
  artificiality: 1
}, {
  type: 11,
  point: '物流企业合作时长',
  standard: '≥6个月',
  remark: '与融资支付物流运费的物流企业最短合作时间要求',
  realData: '9个月',
  system: 0,
  artificiality: 1
}]

export default {
  name: 'LoanRule',
  components: {
    STable
  },
  data () {
    return {

      // 表头
      columns: [
        {
          title: '准入要点',
          dataIndex: 'point',
          align: 'center'
        },
        {
          title: '标准',
          dataIndex: 'standard',
          align: 'center'
        }, {
          title: '备注',
          dataIndex: 'remark',
          width: '500',
          scopedSlots: {
            customRender: 'remark'
          }
        },
        {
          title: '实际数据',
          dataIndex: 'realData',
          align: 'center'
        },
        {
          title: '系统判定',
          dataIndex: 'system',
          align: 'center',
          scopedSlots: {
            customRender: 'status'
          }
        },
        {
          title: '人工判定',
          dataIndex: 'artificiality',
          align: 'center',
          scopedSlots: {
            customRender: 'action'
          }
        }],

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getInruleList()
          .then(res => {
            const result = {
              pageSize: parameter.pageSize,
              pageNo: parameter.pageNo,
              data: rules
            }

            return result
          })
      }
    }
  },
  filters: {
    textFilter (type) {
      return passStatusMap[type].text
    },
    statusFilter (type) {
      return passStatusMap[type].status
    }
  },
  created () {

  },
  methods: {
    handleView (record) {
      this.$router.push({
        name: 'LoanDetail',
        query: {
          loanNo: record.loanNo,
          productNo: record.productNo
        }
      })
    },
    handleEdit (record) {
      this.$router.push({
        name: '',
        query: { id: record.id } })
    },
    handleRepeyment (record) {
      // TODO 获取该贷款的信息
      this.repaymentVisible = true
    },
    handleExtract (record) {
      // TODO 获取该贷款的信息
      this.extractVisible = true
    },
    formatter (value) {
      const newValue = value * 5
      return `${newValue}万`
    },
    repaymentAmountFormatter (value) {
      const newValue = value
      return `${newValue}万`
    },
    onSearchByLoanNo (value) {
      console.log(value)
    },
    onSearchByName (value) {
      console.log(value)
    },
    handleLoanStatusChange (value) {

    },
    handleLoanMethodChange (value) {

    },
    handleLoanProductChange (value) {

    },
    handleLoanBankChange (value) {

    },
    handleRepaymentOk (e) {
      this.confirmLoading = true
      setTimeout(() => {
        this.repaymentVisible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleRepaymentCancel (e) {
      this.repaymentVisible = false
    },
    handleExtractOk (e) {
      this.confirmLoading = true
      setTimeout(() => {
        this.extractVisible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleExtractCancel (e) {
      this.extractVisible = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
