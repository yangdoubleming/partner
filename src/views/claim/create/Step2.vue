<template>
  <div>
    <a-row :gutter="20" class="common-height">
      <!-- 左侧信息 -->
      <a-col :md="24" :lg="17" >
        <!-- 保单信息 -->
        <a-card style="margin-top: 20px" class="card" title="保单信息">

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>投保单号</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span class="red-text">{{ insureDetail.ticketNo || '--' }}</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>保单状态</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span><a-badge :status="insureDetail.orderStatus | statusFilter" :text="insureDetail.orderStatus | statusTypeFilter" /></span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>产品</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span><a-button class="blue-btn">{{ insureDetail.productEnsureLine || '--' }}</a-button></span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>承保公司</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span >{{ insureDetail.insuranceName || '--' }}</span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>保费</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span class="red-text">{{ insureDetail.productPrice / 100 }}元</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>保额</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span class="red-text">{{ insureDetail.productCompensationAmount / 100 }}元</span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>生效时间</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ insureDetail.effectiveDate || '--' }}</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>到期时间</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ insureDetail.maturityDate || '--' }}</span>
            </a-col>
          </a-row>

        </a-card>
      </a-col>

      <!-- 右侧信息 -->
      <a-col :md="24" :lg="7">
        <!-- 保障范围 -->
        <a-card style="margin-top: 20px" :bordered="true" title="保障范围" class="bz-group card">
          <template v-if="insureDetail.productEnsureLine === '产品险' || insureDetail.productEnsureLine=== '卖家险'">
            <div style="">
              <a-button type="primary" ghost>丢失</a-button>
              <a-button type="primary" ghost>破损</a-button>
            </div>

            <div style="">
              <a-button type="primary" ghost>退货</a-button>
            </div>
          </template>

          <template v-if="insureDetail.productEnsureLine === '物流险'">
            <div style="">
              <a-button type="primary" ghost>丢失</a-button>
              <a-button type="primary" ghost>破损</a-button>
            </div>

            <div style="">
              <a-button type="primary" ghost>延时</a-button>
            </div>
          </template>

        </a-card>

      </a-col>

    </a-row>

    <a-row>
      <a-form :form="form" layout="inline">
        <a-card :bordered="false" class="table card card2">

          <!-- 后端生成 -->
          <!-- <a-row :gutter="12">
          <a-col class="bold" :push="1" :md="3" :sm="12">
            <span>理赔单号</span>
          </a-col>

          <a-col :md="8" :sm="24">
            <span>DSB2231213132</span>
          </a-col>

          <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
            <span>申请时间</span>
          </a-col>

          <a-col :md="8" :sm="24">
            <span>2020-01-01 01:00:00</span>
          </a-col>

        </a-row> -->

          <a-row :gutter="12">

            <a-col class="bold" :push="1" :md="3" :sm="7">
              <a-form-item>
                <span>理赔金额</span>
              </a-form-item>

            </a-col>

            <a-col :md="2" :sm="8">
              <a-form-item>
                <span><a-input
                  placeholder="理赔金额"
                  v-decorator="['applyAmount', { rules: [{required: true, message: '理赔金额必须填写'}] }]" /></span>
              </a-form-item>

            </a-col>

            <a-col class="bold" :md="1" :sm="1">
              <a-form-item>
                <span style="margin-left: -5px;">元</span>
              </a-form-item>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="5" :sm="12">
              <a-form-item >
                <span>出险时间</span>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item >
                <a-date-picker
                  valueFormat="YYYY-MM-DD"
                  v-decorator="['insuranceTime', { rules: [{required: true, message: '出险时间必须填写'}] }]"
                  placeholder="请输入出险时间" >
                </a-date-picker>
              </a-form-item>
            </a-col>

          </a-row>
          <a-row :gutter="12">
            <a-col class="bold" :push="1" :md="3" :sm="24">
              <a-form-item >
                <span>理赔原因</span>
              </a-form-item>
            </a-col>

            <a-col :md="12" :sm="12">
              <a-form-item>
                <a-radio-group
                  button-style="solid"
                  v-decorator="['insurerReason', { rules: [{required: true, message: '理赔原因必须填写'}] }]"
                >
                  <a-radio-button value="破损">
                    破损
                  </a-radio-button>
                  <a-radio-button value="丢包">
                    丢包
                  </a-radio-button>
                  <a-radio-button value="延误">
                    延误
                  </a-radio-button>
                  <a-radio-button value="描述不符">
                    描述不符
                  </a-radio-button>
                  <a-radio-button value="退运">
                    退运
                  </a-radio-button>
                  <a-radio-button value="货不对版">
                    货不对版
                  </a-radio-button>
                </a-radio-group>
              </a-form-item>
            </a-col>

          </a-row>

          <a-row :gutter="12">
            <a-col class="bold" :push="1" :md="3" :sm="24">
              <a-form-item >
                <span>备注</span>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-textarea
                rows="5"
                placeholder="多行输入"
                v-model="applyRemark"></a-textarea>
            </a-col>
          </a-row>

          <a-row :gutter="12" style="" class="btn-group">

            <a-col class="bold" :md="24" :sm="24">
              <!-- <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button> -->

              <a-button style="margin-left: 8px" type="primary" @click="nextStep">下一步</a-button>
            </a-col>

          </a-row>
        </a-card>
      </a-form>

    </a-row>

  </div>
</template>

<script>

import { getOrderById } from '@/api/order'

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
    status: 'processing',
    text: '支付中'
  },
  6: {
    status: 'error',
    text: 'API承保超时'
  }
}

export default {
  name: 'Step2',
  data () {
    return {
      apply: {},
      applyRemark: '',
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0,

      insureDetail: {

      }
    }
  },
  created () {
    const that = this
    this.orderId = this.$route.query.orderId
    that.insureDetail = {}

    getOrderById(this.orderId).then((res) => {
      that.insureDetail = res.data
      that.$emit('saveInsuranceDetail', res.data)
      console.log(res.data)
    })
  },
  methods: {
    nextStep () {
      const that = this
      const { form: { validateFields } } = this
      validateFields((err, values) => {
        if (!err) {
          console.log(values)
          values.applyRemark = this.applyRemark
          that.$emit('firstStep', values)
        }
      })
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  filters: {
    statusFilter (type) {
      if (type) {
        return statusMap[type].status
      }
      return 'error'
    },
    statusTypeFilter (type) {
      if (type) {
        return statusMap[type].text
      }

      return '加载中'
    }
  }
}
</script>

<style lang="less" scoped>

  @height: 300px;
  @width: 100px;
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }

  .card .ant-row{
    font-size: 16px;
    height: 60px;
  }

    .card .ant-row img{
    height: 40px;
  }

  .half-card-top {
    height: @height/ 2;

  }

  .card {
    height: @height;
  }

  .card2{
    height: @height + 140px!important;
  }

  .card .button{
    width:@width;
  }

  .bz-group div{
    text-align: center;
    margin-top: 43px;
  }
  .bz-group button{
    width: 100px;
    margin-left: 30px;
  }

  .table {
    margin-top: 20px;
  }
    .bold label{
    font-weight: bold;
  }

  .btn-group{
    margin-top: 70px;
    text-align:center
  }

  .btn-group button{
    width: 150px;
    margin-left: 30px;
  }
</style>
