
<template>
  <div>

    <a-card :bordered="false">
      <a-steps class="steps" :current="currentTab">
        <a-step title="查询保单" />
        <a-step title="填写信息" />
        <a-step title="提交材料" />
        <a-step title="提交保司审核" />
      </a-steps>

    </a-card>

    <a-row>
      <!-- <table-card v-if="currentTab === 0" @nextStep="nextStep"/> -->
      <!-- <step1 v-if="currentTab === 0" @nextStep="nextStep"/> -->
      <keep-alive>
        <step2 v-if="currentTab === 1" @firstStep="firstStep" @saveInsuranceDetail="saveInsuranceDetail"/>
      </keep-alive>
      <step3
        v-if="currentTab === 2"
        @secondStep="secondStep"
        @prevStep="prevStep"
        :submitVisiable="submitVisiable"
        :submitConfirmLoading="submitConfirmLoading"

        :productId="insuranceDetail.productId"/>
      <step4 v-if="currentTab === 3" @finish="finish"/>

    </a-row>
  </div>

</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import TableCard from '@/views/insurancelist/TableCard'
import Step2 from './create/Step2'
import Step3 from './create/Step3'
import Step4 from './create/Step4'

import { submitApply } from '@/api/indemnify'
import { countapply } from '@/api/order'

export default {
  name: 'ClaimDetail',
  components: {
    PageView,
    TableCard,
    Step2,
    Step3,
    Step4
  },
  mixins: [mixinDevice],
  data () {
    return {
      apply: {},
      insuranceDetail: {},
      currentTab: 1,
      submitVisiable: false,
      submitConfirmLoading: false
    }
  },
  filters: {

  },
  created () {
    countapply(this.$$route.query.orderId).then(res => {
      if (res.data && res.data > 0) {
        this.$message.info('保单已经申请过理赔')
        setTimeout(() => {
          this.$router.back()
        }, 3000)
      }
    })
  },
  methods: {
    saveInsuranceDetail (insuranceDetail) {
      this.insuranceDetail = insuranceDetail
      this.apply.ticketNo = insuranceDetail.ticketNo
      this.apply.productId = insuranceDetail.productId
      console.log(insuranceDetail)
    },

    // handler
    nextStep () {
      console.log('nextSTep')
      if (this.currentTab < 4) {
        this.currentTab += 1
      }
    },
    prevStep () {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    firstStep (data) {
      Object.assign(this.apply, data)
      console.log(this.apply)
      this.nextStep()
    },
    secondStep (fileList) {
      const _this = this
      this.apply.fileList = []
      // fileList.forEach(function (value, key, map) {
      //   value.map((item) => {
      //     this.apply.fileList.push(item)
      //   })
      // })

      const newFileList = Object.assign([], fileList)

      newFileList.map((item) => {
        item.map((file) => {
          this.apply.fileList.push(file)
        })
      })

      const newApply = Object.assign({}, this.apply)

      // newApply.insuranceTime = this.apply.insuranceTime.format('YYYY-MM-DD')
      this.submitConfirmLoading = true
      submitApply(newApply).then((res) => {
        _this.submitVisiable = false
        _this.submitConfirmLoading = false
        _this.nextStep()
      })
    },
    finish () {
      this.currentTab = 0
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
      font-size: 24px;
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

  .right,.right .ant-row{
    float:right;
  }

  .card .ant-card-head{
    border-bottom: 0px solid #e8e8e8!important;
  }
</style>
