
<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main card" >

    <a-row :gutter="20">
      <a-col :md="24" :lg="24">
        <a-card :bordered="false">
          <a-steps :direction="isMobile() && 'vertical' || 'horizontal'" :current="current">
            <a-step title="查询保单">
            </a-step>
            <a-step title="提交材料">
            </a-step>
            <a-step title="保司审核">
            </a-step>
            <a-step title="待打款">
            </a-step>
            <a-step title="已打款">
            </a-step>
          </a-steps>
        </a-card>
      </a-col>

    </a-row>

    <a-row :gutter="20">
      <!-- 左侧信息 -->
      <a-col :md="24" :lg="17" >
        <!-- 保单信息 -->
        <a-card style="margin-top: 20px" title="保单信息">

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>投保单号</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span class="red-text">{{ detail.ticketNo || '--' }}</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>保单状态</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span><a-badge :status="detail.orderStatus | orderStatusFilter" :text="detail.orderStatus | orderStatusTypeFilter" /></span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>产品</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span><a-button class="blue-btn">{{ detail.productEnsureLine || '--' }}</a-button></span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>承保公司</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span >{{ detail.insuranceName || '--' }}</span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>保费</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span class="red-text">{{ detail.productPrice / 100 || '--' }}元</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>保额</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span class="red-text">{{ detail.productCompensationAmount / 100 || '--' }}元</span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>生效时间</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.effectiveDate|| '--' }}</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>到期时间</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.maturityDate || '--' }}</span>
            </a-col>
          </a-row>

        </a-card>

        <!-- 理赔信息 -->
        <a-card style="margin-top: 20px" :bordered="true" title="理赔信息">

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>出险时间</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.insuranceTime || '--' }}</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>出险原因</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.insurerReason || '--' }}</span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>申请时间</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.applyTime || '--' }}</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>赔付比例</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.productCompensationRatio|| '--' }}</span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>备注</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.applyRemark|| '--' }}</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>赔付上限</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.productMaxCompensation || '--' }}元</span>
            </a-col>
          </a-row>

        </a-card>

        <!-- 订单信息 -->
        <a-card style="margin-top: 20px" :bordered="true" title="订单信息">

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>订单号</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span class="red-text">{{ detail.purchasOrderNo|| '--' }}</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>金额</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.goodsValue / 100 }}元</span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>订单时间</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.shoppingTime || '--' }}</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>订单状态</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.thirdOrderStatus || '--' }}</span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>商品种类</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.goodsKind || '--' }}</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>商品列表</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.goodsCategory || '--' }}</span>
            </a-col>
          </a-row>

        </a-card>

        <!-- 物流信息 -->
        <a-card style="margin-top: 20px" :bordered="true" title="物流信息">

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>物流单号</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.expressNo || '--' }}</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>运输方式</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.expressChannel || '--' }}</span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>起运地</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.loadingPort || '--' }}</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>目的地</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.receiverAddress || '--' }}</span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="3" :sm="12">
              <span>发货日期</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span>{{ detail.expressTime || '--' }}</span>
            </a-col>

            <a-col class="bold" :push="1" :md="3" :offset="2" :sm="12">
              <span>到达日期</span>
            </a-col>

            <a-col :md="8" :sm="24">
              <span></span>
            </a-col>
          </a-row>

        </a-card>
      </a-col>

      <!-- 右侧信息 -->
      <a-col :md="24" :lg="7">
        <!-- 保障范围 -->
        <a-card style="margin-top: 20px" :bordered="true" title="保障范围" class="bz-group">

          <template v-if="detail.productEnsureLine === '产品险' || detail.productEnsureLine=== '卖家险'">
            <div style="">
              <a-button type="primary" v-if="detail.insurerReason === '丢失'" ghost>丢失</a-button>
              <a-button type="default" v-else ghost>丢失</a-button>

              <a-button type="primary" v-if="detail.insurerReason === '破损'" ghost>破损</a-button>
              <a-button type="default" v-else ghost>破损</a-button>
            </div>

            <div style="">
              <a-button type="primary" v-if="detail.insurerReason === '退货'" ghost>退货</a-button>
              <a-button type="default" v-else ghost>退货</a-button>
            </div>
          </template>

          <template v-else-if="detail.productEnsureLine === '物流险'">
            <div style="">
              <a-button type="primary" v-if="detail.insurerReason === '丢失'" ghost>丢失</a-button>
              <a-button type="default" v-else ghost>丢失</a-button>

              <a-button type="primary" v-if="detail.insurerReason === '破损'" ghost>破损</a-button>
              <a-button type="default" v-else ghost>破损</a-button>
            </div>

            <div style="">
              <a-button type="primary" v-if="detail.insurerReason === '延时'" ghost>延时</a-button>
              <a-button type="default" v-else ghost>延时</a-button>
            </div>
          </template>
        </a-card>

        <!-- 店铺 -->
        <a-card style="margin-top: 20px" :bordered="true" title="店铺">

          <a-row>
            <a-col class="bold" :push="1" :md="5" :sm="5">
              <span>平台</span>
            </a-col>

            <a-col :md="16" :sm="16">
              <span>{{ detail.shoppingSite || '--' }}</span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="5" :sm="5">
              <span>站点</span>
            </a-col>

            <a-col :md="16" :sm="16">
              <span>{{ detail.amazonShop || '--' }}</span>
            </a-col>
          </a-row>

          <a-row>
            <a-col class="bold" :push="1" :md="5" :sm="5">
              <span>店铺</span>
            </a-col>

            <a-col :md="16" :sm="16">
              <span>{{ detail.shopName|| '--' }}</span>
            </a-col>
          </a-row>

        </a-card>

        <!-- 物流商 -->
        <a-card style="margin-top: 20px" :bordered="true" title="物流商">

          <a-row>
            <a-col class="bold" :push="1" :md="5" :sm="5">
              <span>物流公司</span>
            </a-col>

            <a-col :md="16" :sm="16">
              <span>{{ detail.expressCompanyName|| '--' }}</span>
            </a-col>
          </a-row>

        </a-card>

      </a-col>

    </a-row>

  </div>

</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'

import { getById } from '@/api/indemnify'

const statusMap = {
  0: {
    status: 'default',
    text: '未确认'
  },
  1: {
    status: 'processing',
    text: '已申请'
  },
  2: {
    status: 'processing',
    text: '一审'
  },
  3: {
    status: 'success',
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
    status: 'processing',
    text: '二审'
  },
  7: {
    status: 'success',
    text: '商户同意通过'
  },
  8: {
    status: 'error',
    text: '已申诉'
  },
  9: {
    status: 'error',
    text: '待确认'
  },
  10: {
    status: 'processing',
    text: '待打款'
  },
  11: {
    status: 'error',
    text: '已过期'
  },
  12: {
    status: 'error',
    text: '已驳回'
  },
  13: {
    status: 'error',
    text: '取消'
  }
}

const polStatusMap = {
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
  name: 'ClaimOverview', // 概览
  components: {
    PageView
  },
  mixins: [mixinDevice],
  data () {
    return {
      detail: {
        polstatus: 1
      },
      current: 1,
      status: 'success'
    }
  },
  created () {
    const id = this.$route.query.id
    getById(id).then((res) => {
      this.detail = res.data

      if (this.detail.productCompensationRatio) { this.detail.productCompensationRatio = parseFloat(this.detail.productCompensationRatio).toFixed(4) }

      const status = res.data.status
      // 待审核
      if (status === 0 || status === 11) {
        this.current = 0
      } else if (status === 3 || status === 11) {
        this.current = 4
      } else if (status === 3 || status === 7 || status === 10) {
        this.current = 3
      } else if (status === 1) {
        this.current = 1
      } else if (status === 2 || status === 4 || status === 5 || status === 6 ||
        status === 9 || status === 12 || status === 13
      ) {
        this.current = 2
      }
    })
  },
  filters: {
    statusFilter (type) {
      console.log(type)
      return statusMap[type].status
    },
    statusTypeFilter (type) {
      return statusMap[type].text
    },
    orderStatusFilter (type) {
      console.log(type)
      return polStatusMap[type].status
    },
    orderStatusTypeFilter (type) {
      return polStatusMap[type].text
    }
  }
}
</script>

<style lang="less" scoped>

  .detail-layout {
    margin-left: 44px;
  }
  .text {
    color: rgba(0, 0, 0, .45);
  }

  .heading {
    color: rgba(0, 0, 0, .85);
    font-size: 20px;
  }

  .no-data {
    color: rgba(0, 0, 0, .25);
    text-align: center;
    line-height: 64px;
    font-size: 16px;

    i {
      font-size: 20px;
      margin-right: 16px;
      position: relative;
      top: 3px;
    }
  }

  .mobile {
    .detail-layout {
      margin-left: unset;
    }
    .text {

    }
    .status-list {
      text-align: left;
    }
  }

  .card .ant-row{
    font-size: 16px;
    height: 60px;
  }

    .card .ant-row img{
    height: 40px;
  }

  .ant-card-head{
   border-bottom: 0px solid #e8e8e8!important;
  }

  .bold{
    font-weight: bold;
  }

  .bz-group div{
    text-align: center;
    margin-top: 10px;
    margin-bottom: 26px;
  }
  .bz-group button{
    width: 100px;
    margin-left: 20px;
  }

  .ant-btn-default{
    background-color: rgb(245, 245, 245);
    border-color: rgb(221, 221, 221);
    border-width: 1px;
    border-style: solid;
    color: rgb(96, 98, 102);
    border-radius: 4px;
  }
</style>
