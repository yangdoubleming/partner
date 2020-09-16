<template>
  <a-card :bordered="false">
    <a-table
      ref="table"
      :columns="columns"
      :dataSource="tableList">
      <span slot="type" slot-scope="text">
        <span>{{ text | typeFilter }}</span>
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | loanStatusFilterOfStatus" :text="text | loanStatusFilterOfText" />
      </span>
      <span slot="authStatation" slot-scope="text">
        <span>{{ text ? text : '-'}}</span>
      </span>
      <span slot="receipt" slot-scope="text">
        <span>{{ text ? text : '-'}}</span>
      </span>
    </a-table>
  </a-card>

</template>

<script>

import {
  STable
} from '@/components'
import {
  getList
} from '@/api/shop'

const statusMap = {
  0: {
    status: 'success',
    text: '未授信'
  },
  1: {
    status: 'processing',
    text: '授信中'
  },
  2: {
    status: 'error',
    text: '已授信'
  }
}
const typeMap = {
  1: {
    text: 'amazon'
  },
  2: {
    text: 'eBay'
  },
  3: {
    text: '敦煌网'
  },
  4: {
    text: 'wish'
  },
  5: {
    text: 'cdiscount'
  },
  6: {
    text: 'shopee'
  },
  7: {
    text: '阿里速卖通'
  }
}

export default {
  name: 'ShopTable',
  components: {
    STable
  },
  data () {
    return {

      // 查询参数
      queryParam: {},
      // 表头
      columns: [{
        title: '店铺名称',
        dataIndex: 'shopName',
        align: 'center'
      },
      {
        title: '平台',
        dataIndex: 'type',
        align: 'center',
        scopedSlots: {
          customRender: 'type'
        }
      },
      {
        title: '授权站点',
        dataIndex: 'authStatation',
        align: 'center',
        scopedSlots: {
          customRender: 'authStatation'
        }
      },
      {
        title: '收款商',
        dataIndex: 'receipt',
        align: 'center',
        scopedSlots: {
          customRender: 'receipt'
        }
      },
      {
        title: '授信状态',
        dataIndex: 'loanProductStatus',
        align: 'center',
        scopedSlots: {
          customRender: 'status'
        }
      },
      {
        title: '月均销售额（元）',
        dataIndex: 'volumeMonthAverage',
        align: 'center'
      },
      {
        title: '授权日期',
        dataIndex: 'tokenTime',
        align: 'center'
      }],
      selectedRowKeys: [],
      selectedRows: [],
      tableList: [],
      // custom table alert & rowSelection
      options: {
        alert: { show: false, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
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
      return typeMap[type].text
    }
  },
  created () {
    this.loadData({ loanProductStatus: 0 })
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
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 加载数据方法 必须为 Promise 对象
    loadData (parameter) {
      const newQueryParam = Object.assign({}, this.queryParam)
      newQueryParam.loanId = this.$route.query.id
      // this.loanProductStatus = newQueryParam.loanProductStatus
      getList(newQueryParam).then(res => {
        res.data.map((item, index) => {
          item.key = item.id
        })
        this.tableList = res.data
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
