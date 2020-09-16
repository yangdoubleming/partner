<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">

    <!-- 保险信息 -->

    <a-card :bordered="false" class="table">
      <a-form layout="vertical" class="bold-form-item">
        <a-row :gutter="48">
          <a-col :md="2" :sm="2">
            <a-form-item label="总规则数">
              <span>{{ totalCount }}</span>
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>

    </a-card>

    <a-card :bordered="false" class="table" style="margin-top:20px">
      <a-row>
        <a-alert message="进行投保，可以选择全部订单投保，或设定自动投保规则" type="info" show-icon />
      </a-row>

      <div class="table-page-search-wrapper" style="margin-top:20px">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="5" :sm="12">
              <a-form-item>
                <!-- <a-input placeholder="请输入规则名进行搜索" v-model="queryParam.name" style="width: 200px" @click="$refs.table.refresh(true)" /> -->
                <a-input-search placeholder="请输入规则名进行搜索" v-model="queryParam.name" style="width: 200px" @search="onSearch" />
                <a-button style="margin-left: 8px;border:none" @click="() => queryParam = {}">清空</a-button>
              </a-form-item>
            </a-col>

            <a-col :md="5" :sm="12" class="left">
              <a-form-item>
                <a-button style="margin-left: 8px;" type="primary" @click="handleCreate">新增</a-button>
              </a-form-item>
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

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="handleDelete(record)">
              <a href="#">删除</a>
            </a-popconfirm>
          </template>
        </span>
      </s-table>

      <a-modal
        title="新增"
        v-model="visible"
        @ok="handleOk"
      >
        <a-form :autoFormCreate="(form)=>{this.form = form}">

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="规则名称"
            hasFeedback
            v-decorator="['note', { rules: [{ required: true, message: '请输入规则名称' }] }]"
          >
            <a-input placeholder="请输入规则名称" v-model="mdl.name" />
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="店铺"
            hasFeedback
          >
            <a-select
              :default-value="mdl.authShopId"
              v-model="mdl.authShopId"
            >
              <a-select-option v-for="shop in shops" :key="shop.id" :value="shop.id">{{ shop.shopName }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="投保方式"
            hasFeedback
          >
            <a-radio-group v-model="mdl.ruleType" default-value="1" button-style="solid">
              <a-radio-button value="1">
                按SKU投保
              </a-radio-button>
              <!-- <a-radio-button value="2" >
                按价格投保
              </a-radio-button> -->
            </a-radio-group>
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="SKU"
            hasFeedback
          >
            <a-textarea
              :rows="5"
              v-model="mdl.viewSku"
              placeholder="输入SKU，每行一个"
              v-decorator="['note', { rules: [{ required: true, message: '请输入规则名称' }] }]"
            />
            <div>
              <p>eBay实例：XXXAAAF112</p>
              <p>Amazom实例：21341-12313-1123</p>
            </div>

          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="价格范围"
            hasFeedback
            v-show="mdl.ruleType == 2"
          >
            <a-input placeholder="价格范围" v-model="mdl.range"/>

          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="最高金额"
            hasFeedback
            v-show="mdl.ruleType === 2"
          >
            <a-input placeholder="含最高值" v-model="mdl.maxValue" />

          </a-form-item>

        </a-form>
      </a-modal>
    </a-card>
  </div>

</template>

<script>
import moment from 'moment'
import {
  STable,
  Ellipsis
} from '@/components'

import {
  getList, deleteRuleById, createRule, updateRule
} from '@/api/rule'

import {
  getList as getShopList
} from '@/api/shop'
export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      totalCount: 0,
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: null,

      // 所有店铺
      shops: [],

      mdl: {
      },
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '规则名称',
          dataIndex: 'name',
          width: 150
        },
        {
          title: '投保店铺',
          dataIndex: 'shopName',
          width: 150
        },
        {
          title: '投保方式',
          dataIndex: 'ruleMethod',
          width: 150
        },
        {
          title: '规则内容',
          dataIndex: 'viewSku'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const newQueryParam = Object.assign({}, this.queryParam)

        newQueryParam.current = parameter.pageNo
        newQueryParam.size = parameter.pageSize
        return getList(newQueryParam)
          .then(res => {
            res.data.records.map((item) => {
              item.key = item.id
              item.ruleMethod = 'SKU'
              if (item.sku) {
                const skus = JSON.parse(item.sku)

                item.viewSku = skus.join(' | ')
              }
            })
            const result = {
              pageSize: parameter.pageSize,
              pageNo: parameter.pageNo,
              totalCount: res.data.total,
              totalPage: Math.ceil(res.total / parameter.pageSize),
              data: res.data.records
            }

            this.totalCount = res.total

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
          onChange: this.onSelectChange,
          type: 'radio'
        }
      },
      optionAlertShow: false
    }
  },
  filters: {

  },
  created () {
    getShopList().then((res) => {
      this.shops = res.data
      console.log(res.data)
    })
  },
  methods: {
    onSearch () {
      this.$refs.table.refresh(true)
    },
    handleCreate () {
      this.mdl = {}
      this.visible = true
    },
    // 新增确认
    handleOk () {
      if (this.validate(this.mdl) === false) {
        return
      }
      this.mdl.sku = this.mdl.viewSku.replace(/\n/g, ',')
      if (!this.mdl.editRuleId) {
        createRule(this.mdl).then(() => {
          this.$message.info('新建成功')
          this.$refs.table.refresh(true)
        })
      } else {
        updateRule(this.mdl).then(() => {
          this.$message.info('更新成功')
          this.$refs.table.refresh(true)
        })
      }

      this.visible = false
    },
    validate (values) {
      if (!values.name || values.name === '') {
        this.$message.info('请输入规则名称')
        return false
      }
      if (!values.shopId || values.shopId === '') {
        this.$message.info('请选择店铺')
        return false
      }
      if (!values.viewSku || values.viewSku === '') {
        this.$message.info('请输入sku')
        return false
      }

      return true
    },

    handleDelete (record) {
      deleteRuleById(record.id).then(() => {
        this.$message.info('删除成功')
        this.$refs.table.refresh(true)
      })
    },
    handleEdit (record) {
      this.mdl.editRuleId = record.id
      this.mdl.name = record.name

      if (record.sku) {
        const skus = JSON.parse(record.sku)

        this.mdl.viewSku = skus.join('\n')
      }
      this.mdl.authShopId = record.authShopId
      this.mdl.name = record.name

      this.visible = true
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    handleTabChange (key, type) {
      this[type] = key

      if (key !== 'all') {
        const newImages = []
        this.allPromoiseImages.map((item) => {
          if (item.key === key) {
            newImages.push(item)
          }
        })
        this.viewPromoiseImages = newImages
      } else {
        this.viewPromoiseImages = this.allPromoiseImages
      }
    },
    sign () {

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
    font: bold;
    font-size: 16px;
  }

  .bold-form-item span {
    font: bold;
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
</style>
