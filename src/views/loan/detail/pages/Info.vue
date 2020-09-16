<template>
  <div style="margin-top:20px">
    <a-card
      title="产品信息"
      :bordered="false"
      class="bold-text">

      <a-row>
        <a-col :lg="2" :sm="2" :offset="1">
          <span>产品</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>{{loanDetail.productName}}</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>申请日期</span>
        </a-col>
        <a-col :lg="2" :sm="2">
          <span>{{loanDetail.applyTime||"-"}}</span>
        </a-col>

      </a-row>

      <a-row>
        <a-col :lg="2" :sm="2" :offset="1">
          <span>放款方</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>{{loanDetail.loanBank||'--'}}</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>起息日期</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>--</span>
        </a-col>

      </a-row>

      <a-row>
        <a-col :lg="2" :sm="2" :offset="1">
          <span>金额（万）</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>{{loanDetail.loanAmount}}</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>到期日期</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>--</span>
        </a-col>

      </a-row>

      <a-row>
        <a-col :lg="2" :sm="2" :offset="1">
          <span>利率</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>{{loanDetail.loanRate}}</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>还款方式</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>--</span>
        </a-col>

      </a-row>
      <a-row>
        <a-col :lg="2" :sm="2" :offset="1">
          <span>放款类型</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>{{loanDetail.capitalType}}</span>
        </a-col>

      </a-row>
    </a-card>
    <a-card
      title="担保信息"
      :bordered="false"
      class="bold-text">

      <a-row>
        <a-col :lg="2" :sm="2" :offset="1">
          <span>担保方式</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>--</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>开始日期</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>--</span>
        </a-col>

      </a-row>

      <a-row>
        <a-col :lg="2" :sm="2" :offset="1">
          <span>担保方</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>--</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>结束日期</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>--</span>
        </a-col>

      </a-row>

      <a-row>
        <a-col :lg="2" :sm="2" :offset="1">
          <span>担保额度</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>-</span><span class="unit">-</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>保险条款</span>
        </a-col>
        <a-col :lg="4" :sm="4">

          <span><a-icon type="link" theme="twoTone" />
            <a href="javascript:void(0);" style="color:rgb(25, 143, 254);">保险条款.pdf</a></span>
        </a-col>

      </a-row>

      <a-row>
        <a-col :lg="2" :sm="2" :offset="1">
          <span>担保费率</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>--</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>申请日期</span>
        </a-col>
        <a-col :lg="2" :sm="2">
          <span>-</span><span class="unit">-</span>
        </a-col>

      </a-row>
    </a-card>
  </div>

</template>

<script>
import {
  getLoanProduct
} from '@/api/loan'

import { pay } from '@/core/icons'
import moment from 'moment'
export default {
  name: 'Info',
  components: {
    pay
  },
  data () {
    return {
      productInfo: {

      },
      loanDetail: {

      }
    }
  },
  created () {
    const id = this.$route.query.id
    this.getLoanById(id)
  },
  methods: {
    getLoanById (id) {
      const _this = this
      getLoanProduct(id).then(res => {
        _this.loanDetail = res.data
        _this.loanDetail.limitByWan = _this.loanDetail.limit ? Number(_this.loanDetail.limit) / 10000 : 0
        _this.loanDetail.loanAmount = _this.loanDetail.loanAmount ? ((_this.loanDetail.loanAmount) / 10000).toFixed(2) : 0
        _this.loanDetail.repaymentTotalByWan = _this.loanDetail.repaymentTotal ? Number(_this.loanDetail.repaymentTotal) / 10000 : 0
        _this.loanDetail.extractTotalByWan = _this.loanDetail.extractTotal ? Number(_this.loanDetail.extractTotal) / 10000 : 0
        if (_this.loanDetail.loanRate) {
          _this.loanDetail.loanRate = Number(_this.loanDetail.loanRate * 100).toFixed(1) + '%'
        } else {
          _this.loanDetail.loanRate = '--'
        }
        if (_this.loanDetail.applyTime) {
          _this.loanDetail.applyTime = moment(_this.loanDetail.applyTime).format('YYYY-MM-DD')
        } else {
          _this.loanDetail.applyTime = '--'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

  .ant-card-head-wrapper {
    margin-top:20px
  }

  .ant-card-body .ant-row{
    margin-bottom: 20px;
  }
</style>
