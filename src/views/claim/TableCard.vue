<template>
  <a-card :bordered="false" class="table" style="margin-top:15px">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">

          <a-col :md="6" :sm="24">
            <a-form-item label="理赔单号">
              <a-input v-model="queryParam.applyIndemnifyNo" placeholder="请输入理赔单号" />
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="24">
            <a-form-item label="保司单号">
              <a-input v-model="queryParam.polNo" placeholder="请输入保司单号" />
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="24">
            <a-form-item label="保单状态">
              <a-select v-model="queryParam.orderStatus" placeholder="请选择" default-value="0">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="0">未生效</a-select-option>
                <a-select-option value="3">未支付</a-select-option>
                <a-select-option value="1">已支付（生效中）</a-select-option>
                <a-select-option value="8">已生效</a-select-option>
                <a-select-option value="2">作废</a-select-option>
                <a-select-option value="5">支付中</a-select-option>
                <a-select-option value="6">API承保超时</a-select-option>
                <a-select-option value="7">投保失败</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="24">
            <a-form-item label="订单号">
              <a-input v-model="queryParam.purchasOrderNo" placeholder="请输入订单号" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row layout="inline" :gutter="48">

          <a-col :md="10" :sm="24">
            <a-form-item label="申请时间">
              <div>
                <a-date-picker v-model="queryParam.startApplyTime" valueFormat="YYYY-MM-DD" placeholder="开始时间" />
                <span> - </span>
                <a-date-picker v-model="queryParam.endApplyTime" valueFormat="YYYY-MM-DD" placeholder="结束时间" />
              </div>

            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24" class="left">
            <a-form-item label="产品类型">
              <a-radio-group v-model="queryParam.productType" default-value="a" button-style="solid">
                <a-radio-button value="卖家险">
                  卖家险
                </a-radio-button>
                <a-radio-button value="物流险">
                  物流险
                </a-radio-button>
                <a-radio-button value="产品险">
                  产品险
                </a-radio-button>
                <a-radio-button value="其他险">
                  其他
                </a-radio-button>
              </a-radio-group>

            </a-form-item>
          </a-col>
        </a-row>
        <a-row layout="inline">
          <a-col :md="8" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" class="primary-btn" @click="$refs.table.refresh(true)">搜索</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      tableLayout="auto"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      showPagination="auto">

      <span slot="orderStatus" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="indemnifyStatus" slot-scope="text">
        <a-badge :status="text | indemnifyStatusTypeFilter" :text="text | indemnifyStatusFilter" />
      </span>

      <span slot="redText" slot-scope="text">
        <span class="red-text">{{ text }}</span>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleSub(record)" class="red-text">查看</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="handleDelete(record)">
            <a href="#">删除</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>
  </a-card>

</template>

<script>
import moment from 'moment'
import {
  STable,
  Ellipsis
} from '@/components'
import {
  getList, deleteIndemnifyById
} from '@/api/indemnify'

const statusMap = {
  0: {
    status: 'default',
    text: '未生效'
  },
  3: {
    status: 'processing',
    text: '未支付'
  },
  1: {
    status: 'success',
    text: '已支付'
  },
  2: {
    status: 'error',
    text: '作废'
  },
  4: {
    status: 'error',
    text: '失效'
  },
  8: {
    status: 'error',
    text: '已生效'
  },
  7: {
    status: 'error',
    text: '投保失败'
  },
  5: {
    status: 'processing',
    text: '支付中'
  },
  6: {
    status: 'error',
    text: 'API承保超时'
  }
}
const indemnifyStatusMap = {
  0: {
    status: 'default',
    text: '已上传'
  },
  1: {
    status: 'success',
    text: '已申请'
  },
  2: {
    status: 'error',
    text: '一审'
  },
  3: {
    status: 'processing',
    text: '已赔付'
  },
  4: {
    status: 'error',
    text: '已驳回'
  },
  5: {
    status: 'error',
    text: '小额快审待审核'
  },
  6: {
    status: 'error',
    text: '二审'
  },
  7: {
    status: 'error',
    text: '商户同意通过'
  },
  8: {
    status: 'error',
    text: '商户同意驳回'
  },
  9: {
    status: 'error',
    text: '已申诉'
  },
  10: {
    status: 'error',
    text: '待确认'
  },
  11: {
    status: 'error',
    text: '待打款'
  },
  12: {
    status: 'error',
    text: '已过期'
  },
  13: {
    status: 'error',
    text: '已取消'
  }
}

const platformImageMap = {
  1: '/merchant/icons/amazon.png'
}

export default {
  name: 'TableCard',
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
      columns: [{
        title: '理赔单号',
        dataIndex: 'applyIndemnifyNo',
        align: 'center',
        scopedSlots: {
          customRender: 'redText'
        }
      },
      {
        title: '保司单号',
        dataIndex: 'polNo',
        align: 'center',
        scopedSlots: {
          customRender: 'redText'
        }
      },
      {
        title: '产品',
        dataIndex: 'productEnsureLine',
        align: 'center'
      },
      {
        title: '保费(元)',
        dataIndex: 'productPrice',
        align: 'center'
      },
      {
        title: '保单状态',
        dataIndex: 'orderStatus',
        align: 'center',
        scopedSlots: {
          customRender: 'orderStatus'
        }
      },
      {
        title: '平台',
        dataIndex: 'shoppingSite',
        align: 'center'
      },
      {
        title: '订单号',
        dataIndex: 'purchasOrderNo',
        align: 'center',
        scopedSlots: {
          customRender: 'redText'
        }
      },
      {
        title: '订单金额（元）',
        dataIndex: 'goodsValue',
        align: 'center'
      },
      {
        title: '申请时间',
        dataIndex: 'applyTime',
        align: 'center'
      },
      {
        title: '理赔状态',
        dataIndex: 'status',
        align: 'center',
        scopedSlots: {
          customRender: 'indemnifyStatus'
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '150px',
        scopedSlots: {
          customRender: 'action'
        }
      }
      ],

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const newQueryParam = Object.assign({}, this.queryParam)

        // 对产品类型进行处理
        if (newQueryParam.productType) {
          delete newQueryParam.productType

          if (this.queryParam.productType === '卖家险') {
            newQueryParam.saleEnsureLine = '1,2'
          } else if (this.queryParam.productType === '物流险') {
            newQueryParam.expressEnsureLine = '1'
          } else if (this.queryParam.productType === '产品险') {
            newQueryParam.productEnsureLine = '1'
          } else if (this.queryParam.productType === '其他') {
            newQueryParam.elseLine = '1'
          }
        }

        newQueryParam.current = parameter.pageNo
        newQueryParam.size = parameter.pageSize

        return getList(newQueryParam)
          .then(res => {
            res.data.records.map((item, index) => {
              item.key = item.id + index

              item.goodsValue = item.goodsValue / 100
              item.productPrice = item.productPrice / 100
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
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: true,
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  filters: {
    indemnifyStatusFilter (type) {
      return indemnifyStatusMap[type].text
    },
    indemnifyStatusTypeFilter (type) {
      return indemnifyStatusMap[type].status
    },
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    },
    platformImageFilter (platform) {
      return platformImageMap[platform]
    }
  },
  created () {

  },
  methods: {
    handleDelete (record) {
      deleteIndemnifyById(record.id).then(() => {
        this.$message.info('删除成功')
        this.$refs.table.refresh(true)
      })
    },
    handleSub (record) {
      this.$router.push({ path: '/claim/profile/basic', query: { id: record.id } })
    },
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

<style lang="less" scoped>
  @height: 326px;
  @width: 100px;

  .insure-img {
    width: 50%;
    margin-left: 20%;
    margin-top: 40px;
  }

  .unit {
    margin-left: 5px;
    font-size: 16px !important;
  }

  .bold-form-item label {
    font-weight: bold;
    font-size: 16px;
  }

  .bold-form-item span {
    font-weight: bold;
    font-size: 45px;
  }

  // .half-card-top {
  //   height: @height/ 2;

  // }

  .half-card-buttom {
    height: @height/ 2 - 10px;
    margin-top: 10px;
  }

  .half-card-top button,
  .half-card-buttom button {
    width: @width;
  }

  // .card {
  //   height: @height;
  // }

  .left,.left .ant-row{
    float:right;
  }

  .red{
    color:rgb(254, 25, 100);
  }

</style>
