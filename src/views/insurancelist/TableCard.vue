<template>
  <a-card :bordered="false" class="table" >
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="5" :sm="24">
            <a-form-item label="投保单号">
              <a-input v-model="queryParam.ticketNo" placeholder="请输入投保单号" />
            </a-form-item>
          </a-col>

          <a-col :md="5" :sm="24">
            <a-form-item label="订单号">
              <a-input v-model="queryParam.purchasOrderNo" placeholder="请输入订单号" />
            </a-form-item>
          </a-col>

          <a-col :md="5" :sm="24">
            <a-form-item label="保单状态">
              <a-select v-model="queryParam.orderStatus" placeholder="请选择" default-value="0">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="0">未生效</a-select-option>
                <a-select-option value="3">未支付</a-select-option>
                <a-select-option value="1">已支付</a-select-option>
                <a-select-option value="4">失效</a-select-option>
                <a-select-option value="2">作废</a-select-option>
                <a-select-option value="5">支付中</a-select-option>
                <a-select-option value="6">API承保超时</a-select-option>
                <a-select-option value="7">投保失败</a-select-option>
                <a-select-option value="8">已生效</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" class="left">
            <a-form-item label="平台">
              <a-radio-group v-model="queryParam.shoppingSite" default-value="a" button-style="solid">
                <a-radio-button value="亚马逊">
                  Amazon
                </a-radio-button>
                <a-radio-button value="ebay">
                  eBay
                </a-radio-button>
                <!--                <a-radio-button value="AliExpress">-->
                <!--                  AliExpress-->
                <!--                </a-radio-button>-->
                <!--                <a-radio-button value="Wish">-->
                <!--                  Wish-->
                <!--                </a-radio-button>-->
                <!--                <a-radio-button value="Lazada">-->
                <!--                  Lazada-->
                <!--                </a-radio-button>-->
                <!--                <a-radio-button value="Shopee">-->
                <!--                  Shopee-->
                <!--                </a-radio-button>-->
                <!-- <a-radio-button value="其他">
                  其他
                </a-radio-button> -->
              </a-radio-group>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row layout="inline" :gutter="48">
          <a-col :md="5" :sm="24">
            <a-form-item label="店铺">
              <a-input v-model="queryParam.shopName" placeholder="" />
            </a-form-item>
          </a-col>

          <a-col :md="10" :sm="24">
            <a-form-item label="保单生效时间">
              <div>
                <a-date-picker v-model="queryParam.startEffectiveDate" valueFormat="YYYY-MM-DD" placeholder="开始时间" />
                <span> - </span>
                <a-date-picker v-model="queryParam.endEffectiveDate" valueFormat="YYYY-MM-DD" placeholder="结束时间" />
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
              <a-button type="primary" @click="$refs.table.refresh(true)">搜索</a-button>
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

      <span slot="redText" slot-scope="text">
        <span class="red-text">{{ text }}</span>
      </span>

      <span slot="emptyText" slot-scope="text">
        <span class="red-text">{{ text || '--' }}</span>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleSub(record)" class="red-text">查看</a>
          <a-divider type="vertical" />
          <a @click="handleNext(record)" class="red-text">申请理赔</a>
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
  getList
} from '@/api/order'

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
    status: 'success',
    text: '已生效'
  },
  7: {
    status: 'error',
    text: '投保失败'
  },
  5: {
    status: 'error',
    text: '支付中'
  },
  6: {
    status: 'error',
    text: 'API承保超时'
  }
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
        title: '投保单号',
        dataIndex: 'ticketNo',
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
        align: 'center',
        scopedSlots: {
          customRender: 'emptyText'
        }
      },
      {
        title: '店铺',
        dataIndex: 'shopName',
        align: 'center',
        scopedSlots: {
          customRender: 'emptyText'
        }
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
        title: '保单生效时间',
        dataIndex: 'effectiveDate',
        align: 'center'
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
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {

  },
  methods: {
    handleNext (record) {
      if (record.orderStatus === '1' || record.orderStatus === '8') {
        this.$router.push({
          path: '/claim/profile/create',
          query: {
            orderId: record.id
          }
        })
      } else {
        this.$message.info('当前保单不可申请理赔！')
      }
    },
    handleSub (record) {
      // this.$router.push('/insurancelist/profile/basic')
      this.$router.push({ path: '/insurancelist/profile/basic', query: { id: record.id } })
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

  .half-card-top {
    height: @height/ 2;

  }

  .half-card-buttom {
    height: @height/ 2 - 10px;
    margin-top: 10px;
  }

  .half-card-top button,
  .half-card-buttom button {
    width: @width;
  }

  .card {
    height: @height;
  }

  .left,.left .ant-row{
    float:right;
  }

  .red{
    color:rgb(254, 25, 100);
  }
</style>
