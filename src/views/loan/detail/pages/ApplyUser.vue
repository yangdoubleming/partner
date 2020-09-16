<template>
  <div style="margin-top:20px">
    <a-card
      title="申请人"
      :bordered="false"
      class="bold-text">

      <a-row>
        <a-col :lg="3" :sm="3" :offset="1">
          <span>姓名</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>{{loanDetail.loanName}}</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>邮箱</span>
        </a-col>
        <a-col :lg="4" :sm="4">

          <span>{{loanDetail.loanEmail}}</span>
        </a-col>

      </a-row>

      <a-row>
        <a-col :lg="3" :sm="3" :offset="1">
          <span>身份证号</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>{{loanDetail.loanCard}}</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>婚姻状况</span>
        </a-col>
        <a-col :lg="4" :sm="4">

          <span>--</span>
        </a-col>

      </a-row>

      <a-row>
        <a-col :lg="3" :sm="3" :offset="1">
          <span>手机号</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>{{loanDetail.loanTelephone}}</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>地址</span>
        </a-col>
        <a-col :lg="4" :sm="4">

          <span>--</span>
        </a-col>

      </a-row>

    </a-card>

    <a-card
      title="连带责任人"
      :bordered="false"
      class="bold-text">
      <a-row>
        <a-col :lg="3" :sm="3" :offset="1">
          <span>姓名</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>--</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>邮箱</span>
        </a-col>
        <a-col :lg="4" :sm="4">

          <span>--</span>
        </a-col>

      </a-row>

      <a-row>
        <a-col :lg="3" :sm="3" :offset="1">
          <span>身份证号</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>--</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>婚姻状况</span>
        </a-col>
        <a-col :lg="4" :sm="4">

          <span>--</span>
        </a-col>

      </a-row>

      <a-row>
        <a-col :lg="3" :sm="3" :offset="1">
          <span>手机号</span>
        </a-col>
        <a-col :lg="2" :sm="2">

          <span>--</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>地址</span>
        </a-col>
        <a-col :lg="4" :sm="4">

          <span>--</span>
        </a-col>

      </a-row>

    </a-card>

    <a-card
      title="申请企业"
      :bordered="false"
      class="bold-text">

      <a-row>
        <a-col :lg="3" :sm="3" :offset="1">
          <span>企业名称</span>
        </a-col>
        <a-col :lg="2" :sm="2">
          <span>{{loanDetail.company && loanDetail.company.companyName}}</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="3">
          <span>经营年限</span>
        </a-col>
        <a-col :lg="4" :sm="4">

          <span>{{loanDetail.company && loanDetail.company.businessLife}}年</span>
        </a-col>

      </a-row>

      <a-row>
        <a-col :lg="3" :sm="3" :offset="1">
          <span>统计社会信用代码</span>
        </a-col>
        <a-col :lg="4" :sm="4">

          <span>{{loanDetail.company && loanDetail.company.creditCode}}</span>
        </a-col>

        <a-col :lg="2" :sm="2" :offset="1">
          <span>地址</span>
        </a-col>
        <a-col :lg="4" :sm="4">

          <span>{{loanDetail.company && loanDetail.company.registration}}</span>
        </a-col>

      </a-row>

      <a-row>
        <a-col :lg="3" :sm="3" :offset="1">
          <span>营业执照</span>
        </a-col>
        <a-col :lg="4" :sm="4">

          <span><a-icon type="link" theme="twoTone" />
            <a :href="loanDetail.company && loanDetail.company.tradingCertificate" target="_blank" style="color:rgb(25, 143, 254);">营业执照副本.png</a></span>
        </a-col>

      </a-row>

    </a-card>
  </div>

</template>

<script>
import {
  companyBorrower
} from '@/api/loan'

import { pay } from '@/core/icons'
import { picUrl } from '@/api/config'

export default {
  name: 'ApplyUser',
  components: {
    pay
  },
  data () {
    return {
      productInfo: {

      },
      loanDetail: {
        company: {}
      }
    }
  },
  mounted () {
    const loanNo = this.$route.query.loanNo
    this.companyBorrower(loanNo)
  },
  methods: {
    companyBorrower (loanNo) {
      const _this = this
      companyBorrower(
        loanNo
      ).then(res => {
        _this.loanDetail = res.data
        _this.loanDetail.company.tradingCertificate = picUrl + res.data.company.tradingCertificate
        if (_this.loanDetail.company.registration) {
          var addr = JSON.parse(_this.loanDetail.company.registration) || {}
          _this.loanDetail.company.registration = `${addr.province}${addr.city}${addr.area}${addr.Street}`
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
