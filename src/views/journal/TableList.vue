<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="账单类型">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="交易时间">
              <a-range-picker v-model="queryParam.date" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a-button type="default">导出</a-button>
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
      :alert="options.alert"
      :rowSelection="options.rowSelection"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusStatusFilter" :text="text | statusFilter" />
      </span>

      <span slot="billType" slot-scope="text">
        <a-badge :status="text | billTypeStatusFilter" :text="text | billTypeFilter" />
      </span>

    </s-table>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getJounalList } from '@/api/journal'

const statusMap = {
  0: {
    status: 'default',
    text: '账户充值未付款'
  },
  1: {
    status: 'processing',
    text: '支付保费交易成功'
  },
  2: {
    status: 'success',
    text: '账户充值成功'
  }
}

const billTypeMap = {
  0: {
    status: 'default',
    text: '账户充值'
  },
  1: {
    status: 'processing',
    text: '支付保费'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '记账时间',
          dataIndex: 'chargeTime',
          sorter: true
        },
        {
          title: '流水单号',
          dataIndex: 'jounalNo'
        },
        {
          title: '订单号',
          dataIndex: 'orderNo'
        },
        {
          title: '账单类型',
          dataIndex: 'billType',
          scopedSlots: { customRender: 'billType' }
        },
        {
          title: '账单金额',
          dataIndex: 'Amount',
          sorter: true
        },
        {
          title: '账单状态',
          dataIndex: 'status',
          width: '150px',
          scopedSlots: { customRender: 'status' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getJounalList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: true,
        rowSelection: null
      },
      optionAlertShow: false
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusStatusFilter (type) {
      return statusMap[type].status
    },
    billTypeFilter (type) {
      return billTypeMap[type].text
    },
    billTypeStatusFilter (type) {
      return billTypeMap[type].status
    }
  },
  created () {
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
