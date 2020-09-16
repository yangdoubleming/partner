<template>

  <a-card
    :bordered="false"
  >
    <s-table
      ref="table"
      tableLayout="auto"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      showPagination="auto">

      <span slot="status" slot-scope="text">
        <a-badge :status="text | loanStatusFilterOfStatus" :text="text | loanStatusFilterOfText" />
      </span>

      <span slot="type" slot-scope="text">
        <span>{{ text | typeFilter }}</span>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleView(record)">查看</a>
        </template>
      </span>
    </s-table>

  </a-card>

</template>

<script>

import {
  STable
} from '@/components'
import {
  getList
} from '@/api/receipt'

const statusMap = {
  0: {
    status: 'success',
    text: '已授权'
  },
  1: {
    status: 'processing',
    text: '授权中'
  },
  2: {
    status: 'error',
    text: '未授权'
  }
}

const moneyTypeMap = {
  0: {
    text: '美元'
  },
  1: {
    text: '人民币'
  }
}

export default {
  name: 'ReceiptTable',
  components: {
    STable
  },
  data () {
    return {

      // 查询参数
      queryParam: {},
      // 表头
      columns: [{
        title: '收款商',
        dataIndex: 'receipt',
        align: 'center'
      },
      {
        title: '币种',
        dataIndex: 'moneyType',
        align: 'center',
        scopedSlots: {
          customRender: 'type'
        }
      },
      {
        title: '月均收款额¥',
        dataIndex: 'sellAmount',
        align: 'center'
      },
      {
        title: '关联店铺数',
        dataIndex: 'shopNum',
        align: 'center'
      },
      {
        title: '授权日期',
        dataIndex: 'tokenTime',
        align: 'center'
      },
      {
        title: '授权功能',
        dataIndex: 'authFunction',
        align: 'center'
      },
      {
        title: '授权状态',
        dataIndex: 'status',
        align: 'center',
        scopedSlots: {
          customRender: 'status'
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: {
          customRender: 'action'
        },
        align: 'center'
      } ],

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const newQueryParam = Object.assign({}, this.queryParam)
        console.log(parameter)

        newQueryParam.current = parameter.pageNo
        newQueryParam.size = parameter.pageSize

        return getList(newQueryParam)
          .then(res => {
            console.log(res)

            res.data.records.map((item, index) => {
              item.key = item.id
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
    loanStatusFilterOfText (type) {
      return statusMap[type].text
    },
    loanStatusFilterOfStatus (type) {
      return statusMap[type].status
    },
    typeFilter (type) {
      return moneyTypeMap[type].text
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
    }
  }
}
</script>

<style lang="less" scoped>
  .table-page-search-wrapper{
    margin-bottom: 20px;
  }

    .right,.right .ant-row{
    float:right;
  }

  .modal-row .ant-row{
    margin-top:30px;
  }
</style>
