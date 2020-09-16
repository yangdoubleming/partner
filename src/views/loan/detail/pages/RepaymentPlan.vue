<template>

  <a-card title="还款明细">
    <a-row
      style="margin-bottom: 20px;">
      <!-- <a-alert message="共12期，先息后本" type="info" show-icon /> -->
    </a-row>

    <s-table
      ref="table"
      tableLayout="auto"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :showPagination="false">

      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>

      <span slot="status" slot-scope="text">
        <a-button :class="text | classFilter" :type="text | typeFilter">{{ text | textFilter }}</a-button>
      </span>

    </s-table>

  </a-card>

</template>

<script>
import {
  STable
} from '@/components'

import {
  getRepaymentRecordList
} from '@/api/repayment-record'

const statusMap = {
  0: {
    type: 'default',
    class: 'green',
    text: '已还'
  },
  1: {
    type: 'default',
    text: '未还'
  },
  2: {
    class: 'error',
    type: 'error',
    text: '逾期'
  }
}

export default {
  name: 'Overview',
  components: { STable },
  data () {
    return {

      // 表头
      columns: [{
        title: '序号',
        scopedSlots: {
          customRender: 'serial'
        },
        align: 'center'
      },
      {
        title: '还款日期',
        dataIndex: 'repaymentTime',
        align: 'center'
      },
      {
        title: '类型',
        dataIndex: 'repaymentType',
        align: 'center'
      },
      {
        title: '剩余本金（元）',
        dataIndex: 'repaymentPrincipal',
        align: 'center'
      },
      {
        title: '还款金额（元）',
        dataIndex: 'repaymentAllAmount',
        align: 'center'
      },
      {
        title: '状态',
        dataIndex: 'status',
        scopedSlots: {
          customRender: 'status'
        },
        align: 'center'
      }],

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const newQueryParam = Object.assign({}, this.queryParam)
        newQueryParam.loanNo = this.$route.query.loanNo
        newQueryParam.current = parameter.pageNo
        newQueryParam.size = 12
        return getRepaymentRecordList(newQueryParam)
          .then(res => {
            console.log(res)

            res.data.records.map((item, index) => {
              item.key = item.id
              item.loanRate = Number(item.loanRate * 100).toFixed(1) + '%'
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
  filters: {
    classFilter (type) {
      return statusMap[type].class
    },
    typeFilter (type) {
      return statusMap[type].type
    },
    textFilter (type) {
      return statusMap[type].text
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
   .ant-card{
       margin-top: 20px;
   }

  .ant-btn.green{
    background-color: rgb(227, 252, 202);
    border-color: rgb(81, 196, 26);
  }

  .ant-btn.error{
        background-color: rgb(255, 241, 240);
    border-color: rgb(255, 163, 158);
    color: red;
  }

  .ant-btn{
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
  }
</style>
