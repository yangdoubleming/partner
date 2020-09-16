<template>

  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="22">
            <a-input-search placeholder="贷款编号" v-model="queryParam.loanNo" @search="onSearchByLoanNo" />
          </a-col>

          <a-col :md="6" :sm="22" :offset="3">
            <a-input-search placeholder="申请人姓名或企业名称" v-model="queryParam.loanName" @search="onSearchByName" />
          </a-col>

          <a-col :md="6" :sm="22" :offset="3">
            <a-form-item label="额度范围">
              <a-slider :tip-formatter="formatter" :range="true" v-model="queryParam.loanAmount"/>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row layout="inline" :gutter="48">
          <a-col :md="3" :sm="11">
            <a-select  @change="handleLoanStatusChange" v-model="queryParam.status">
              <a-select-option value="">
                全部状态
              </a-select-option>
              <a-select-option v-for="item in status" :key="item.status" :value="item.status">
                {{ item.loanStatusName }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :md="3" :sm="11">
            <a-select @change="handleLoanMethodChange" v-model="queryParam.guaranteeMethod">
              <a-select-option value="">
                所有担保方式
              </a-select-option>
              <a-select-option v-for="item in dbfs" :key="item.guaranteeMethod" :value="item.guaranteeMethod">
                {{ item.guaranteeName }}
              </a-select-option>
            </a-select>
          </a-col>

          <a-col :md="10" :sm="22" :offset="2">
            <a-form-item label="申请日期">
              <a-date-picker v-model="queryParam.applyStartTime" valueFormat="YYYY-MM-DD" placeholder="开始时间" style="margin-right:15px" />
              <a-date-picker
                v-model="queryParam.applyEndTime"
                valueFormat="YYYY-MM-DD"
                placeholder="结束时间"
                class="right"
                style="float:none"/>
            </a-form-item>
          </a-col>

          <!-- <a-col :md="6" :sm="22" :offset="2" class="right">
            <a-form-item label="平台">
              <a-radio-group v-model="queryParam.paltformName" default-value="a" button-style="solid">
                <a-radio-button value="Amazon">
                  Amazon
                </a-radio-button>
                <a-radio-button value="ebay">
                  eBay
                </a-radio-button>
                <a-radio-button value="其他">
                  其他
                </a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-col> -->
        </a-row>

        <a-row layout="inline" :gutter="48">
          <a-col :md="3" :sm="11">
            <a-select default-value="" @change="handleLoanProductChange" v-model="queryParam.productName">
              <a-select-option value="">
                全部贷款
              </a-select-option>
              <a-select-option v-for="item in dklx" :key="item.productName" :value="item.productName">
                {{ item.productName }}
              </a-select-option>
            </a-select>

          </a-col>
          <a-col :md="3" :sm="11">
            <a-select default-value="" @change="handleLoanBankChange" v-model="queryParam.loanBank">
              <a-select-option value="">
                全部银行
              </a-select-option>
              <a-select-option v-for="item in bank" :key="item.loanBank" :value="item.loanBank">
                {{ item.loanBank }}
              </a-select-option>
            </a-select>
          </a-col>

          <a-col :md="10" :sm="22" :offset="2">
            <a-form-item label="到期日期">
              <div>
                <a-date-picker v-model="queryParam.expirationStartTime" valueFormat="YYYY-MM-DD" placeholder="开始时间" style="margin-right:15px" />
                <a-date-picker v-model="queryParam.expirationEndTime" valueFormat="YYYY-MM-DD" placeholder="结束时间" class="right" style="float:none"/>
              </div>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row layout="inline">
          <a-col :md="8" :sm="24">
            <span>
              <a-button type="primary" @click="search">搜索</a-button>
              <a-button style="margin-left: 8px" @click="reset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-table
      ref="table"
      tableLayout="auto"
      size="default"
      rowKey="key"
      :columns="columns"
      :pagination="pagination"
      :dataSource="tableList"
      @change="handleTableChange">
      <span slot="status" slot-scope="text">
        <a-badge :status="text | loanStatusFilterOfStatus" :text="text | loanStatusFilterOfText" />
      </span>
      <span slot="guarantee" slot-scope="text">
        <span>{{ text ? text : '-'}}</span>
      </span>
      <span slot="loanNo" slot-scope="text">
        <span>{{ text ? text : '-'}}</span>
      </span>
      <span slot="productName" slot-scope="text">
        <span>{{ text ? text : '-'}}</span>
      </span>
      <span slot="loanAmountByWan" slot-scope="text">
        <span>{{ text ? text : '-'}}</span>
      </span>
      <span slot="loanBank" slot-scope="text">
        <span>{{ text ? text : '-'}}</span>
      </span>
      <span slot="applyType" slot-scope="text">
        <span>{{ text ? text : '-'}}</span>
      </span>
      <span slot="loanRate" slot-scope="text">
        <span>{{ text ? text : '-'}}</span>
      </span>
      <span slot="loanName" slot-scope="text">
        <span>{{ text ? text : '-'}}</span>
      </span>
      <span slot="companyName" slot-scope="text">
        <span>{{ text ? text : '-'}}</span>
      </span>
      <span slot="applyTime" slot-scope="text">
        <span>{{ text ? text : '-'}}</span>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleView(record)">查看</a>
          <template v-if="record.canRepayment">
            <a-divider type="vertical" />
            <a @click="handleRepeyment(record)" >还款</a>

          </template>
          <template v-if="record.canEdit">
            <a-divider type="vertical" />
            <a @click="handleEdit(record)">修改</a>

          </template>
          <template v-if="record.canExtract">
            <a-divider type="vertical" />
            <a @click="handleExtract(record)" >提款</a>
          </template>

        </template>
      </span>
    </a-table>
  </a-card>

</template>

<script>

import {
  STable
} from '@/components'
import {
  getLoanList,
  queryConditions
} from '@/api/loan'
import moment from 'moment'
const loanStatusMap = {
  0: {
    status: 'default',
    text: '资料未完成'
  },
  1: {
    status: 'processing',
    text: '审核中'
  },
  2: {
    status: 'error',
    text: '已终止'
  },
  3: {
    status: 'processing',
    text: '放款中'
  },
  4: {
    status: 'error',
    text: '未结清'
  },
  5: {
    status: 'error',
    text: '已逾期'
  },
  6: {
    status: 'success',
    text: '已结清'
  },
  7: {
    status: 'processing',
    text: '还款中'
  }
}

export default {
  name: 'LoanTable',
  components: {
    STable
  },
  data () {
    return {

      verified: false,
      toExtract: false,

      labelCol: { md: { span: 4 }, sm: { span: 4 } },
      wrapperCol: { md: { span: 13 }, sm: { span: 13 } },

      // 模态框
      repaymentVisible: false,
      extractVisible: false,
      confirmLoading: false,

      repaymentAmount: 50,

      // 查询参数
      queryParam: {
        status: '',
        guaranteeMethod: '',
        productName: '',
        loanBank: ''
      },
      // 表头
      columns: [{
        title: '贷款编号',
        dataIndex: 'loanNo',
        align: 'center',
        scopedSlots: {
          customRender: 'loanNo'
        }
      },
      {
        title: '产品',
        dataIndex: 'productName',
        align: 'center',
        scopedSlots: {
          customRender: 'productName'
        }
      },
      {
        title: '金额（万）',
        dataIndex: 'loanAmountByWan',
        align: 'center',
        scopedSlots: {
          customRender: 'loanAmountByWan'
        }
      },
      {
        title: '利率',
        dataIndex: 'loanRate',
        align: 'center',
        scopedSlots: {
          customRender: 'loanRate'
        }
      },
      {
        title: '资金方',
        dataIndex: 'loanBank',
        align: 'center',
        scopedSlots: {
          customRender: 'loanBank'
        }
      },
      {
        title: '担保方',
        dataIndex: 'guarantee',
        align: 'center',
        scopedSlots: {
          customRender: 'guarantee'
        }
      },
      {
        title: '申请类型',
        dataIndex: 'applyType',
        align: 'center',
        scopedSlots: {
          customRender: 'applyType'
        }
      },
      {
        title: '姓名',
        dataIndex: 'loanName',
        align: 'center',
        scopedSlots: {
          customRender: 'loanName'
        }
      },
      {
        title: '企业名称',
        dataIndex: 'companyName',
        align: 'center',
        scopedSlots: {
          customRender: 'companyName'
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        scopedSlots: {
          customRender: 'status'
        },
        align: 'center'
      },
      {
        title: '申请日期',
        dataIndex: 'applyTime',
        align: 'center',
        scopedSlots: {
          customRender: 'applyTime'
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '150px',
        scopedSlots: {
          customRender: 'action'
        },
        align: 'center'
      } ],
      status: [],
      dbfs: [],
      dklx: [],
      bank: [],
      tableList: [],
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0
      }
    }
  },
  filters: {
    loanStatusFilterOfText (type) {
      return loanStatusMap[type].text
    },
    loanStatusFilterOfStatus (type) {
      return loanStatusMap[type].status
    }
  },
  created () {
    this.queryConditions()
    this.loadData({ pageNo: 1, pageSize: 10 })
  },
  methods: {
    handleView (record) {
      this.$router.push({
        name: 'LoanDetail',
        query: {
          loanNo: record.loanNo,
          productNo: record.productNo,
          id: record.id,
          ciCompanyId: record.ciCompanyId
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
      this.queryParam.loanNo = value
      this.loadData({ pageNo: 1, pageSize: 10 })
    },
    onSearchByName (value) {
      console.log(value)
    },
    handleLoanStatusChange (value) {
      this.queryParam.status = value
    },
    handleLoanMethodChange (value) {
      this.queryParam.guaranteeMethod = value
    },
    handleLoanProductChange (value) {
      this.queryParam.productName = value
    },
    handleLoanBankChange (value) {
      this.queryParam.loanBank = value
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
    },
    toVerify () {
      this.verified = true
    },
    extract () {
      this.toExtract = true
    },
    queryConditions () {
      queryConditions().then(res => {
        this.status = res.data[4]
        this.dbfs = res.data[1]
        this.dklx = res.data[3]
        this.bank = res.data[0]
      })
    },
    reset () {
      this.queryParam = {}
      this.loadData({ pageNo: 1, pageSize: 10 })
    },
    loadData (parameter) {
      if (this.queryParam.loanAmount && this.queryParam.loanAmount.length > 0) {
        this.queryParam.capitalAmountStart = this.queryParam.loanAmount[0] * 5
        this.queryParam.capitalAmountEnd = this.queryParam.loanAmount[1] * 5
        delete this.queryParam.loanAmount
      }
      var newQueryParam = Object.assign({}, this.queryParam)
      newQueryParam.current = parameter.pageNo
      newQueryParam.size = parameter.pageSize
      getLoanList(newQueryParam).then(res => {
        res.data.records.map((item, index) => {
          item.key = item.id
          item.loanAmountByWan = item.loanAmount
          item.loanRate = item.loanRate ? Number(item.loanRate * 100).toFixed(1) + '%' : '-'
          item.loanTime = moment(item.loanTime).format('YYYY-MM-DD')
          item.expirationTime = moment(item.expirationTime).format('YYYY-MM-DD')
          item.applyTime = moment(item.applyTime).format('YYYY-MM-DD')
          if (item.loanStatus === 5 || item.loanStatus === 7) {
            item.canRepayment = true
          } else if (item.loanStatus === 0 || item.loanStatus === 0) {
            item.canEdit = true
          } else if (item.loanStatus === 1 || item.loanStatus === 3) {
            item.canExtract = true
          } else {
            // 1 , 2 , 4 , 6
          }
        })
        const result = {
          pageSize: parameter.pageSize,
          pageNo: parameter.pageNo,
          totalCount: res.data.total,
          totalPage: Math.ceil(res.total / parameter.pageSize),
          data: res.data.records
        }
        this.tableList = result.data
        this.pagination.total = result.totalCount
      })
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.loadData({ pageNo: pagination.current, pageSize: pagination.pageSize })
    },
    search () {
      this.loadData({ pageNo: 1, pageSize: 10 })
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

  .description{
    height: 63px;
    padding-top: 3%;
  }

</style>
