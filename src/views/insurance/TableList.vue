<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24" class="row" style="margin-bottom:20px">
      <!-- 保险信息 -->
      <a-col :md="24" :lg="17" class="row">
        <a-card
          style="width:100%;    height: inherit;"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')">

          <a-row>
            <!-- 保险图片 -->
            <a-col :md="24" :lg="6">
              <a-row v-for="(item) in viewPromoiseImages" :key="item.url">
                <div>
                  <img :src="item.url" class="insure-img">

                </div>
                <div>
                  <a-button icon="check" class="insure-img green-btn" v-if="item.productName && noTitleKey != 'all'" type="primary">{{ item.productName }}</a-button>
                </div>

              </a-row>
            </a-col>

            <!-- 保险信息 -->
            <a-col :md="24" :lg="18">
              <a-form layout="vertical">
                <a-row>
                  <a-col :md="11" :sm="24" :offset="1">
                    <a-form-item label="保障店铺" class="bold-form-item">
                      <span>{{ insureDetail.countInsuranceShop }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="11" :sm="24" :offset="1">
                    <a-form-item class="bold-form-item" label="保障比例">
                      <span>{{ insureDetail.percent }}</span>
                    </a-form-item>
                  </a-col>
                  <!-- <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="风险评级">
                      <span>{{ insureDetail.securityLevel }}</span>
                    </a-form-item>
                  </a-col> -->

                </a-row>

                <a-row>
                  <a-col :md="11" :sm="24" :offset="1">
                    <a-form-item class="bold-form-item" label="总保额">
                      <span>{{ insureDetail.countCompensationAmount }}</span> <span class="unit">{{ insureDetail.countCompensationAmountUnit }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="11" :sm="24" :offset="1">
                    <a-form-item class="bold-form-item" label="保障订单">
                      <span>{{ insureDetail.countOrder | toThousandFilter }}</span>
                    </a-form-item>
                  </a-col>

                  <!-- <a-col :md="8" :sm="24">
                    <a-form-item style="padding-top: 10%;">
                      <a-button type="primary" size="large" style="    background-color: rgb(254, 25, 100);">去提高</a-button>
                    </a-form-item>
                  </a-col> -->
                </a-row>

              </a-form>
            </a-col>
          </a-row>

        </a-card>

      </a-col>
      <!-- 账户信息 理赔信息 -->
      <a-col :md="24" :lg="7" class="row">
        <a-card class="half-card-top">
          <a-row>
            <span>保险账户</span>
          </a-row>

          <a-row>
            <a-form layout="vertical">
              <a-col :md="6" :offset="6" :sm="24">
                <a-form-item label="账户余额" class="bold-form-item">
                  <span >{{ subTotalAccountBalance }}</span>
                </a-form-item>

              </a-col>
              <a-col :md="6" :offset="6" :sm="24">
                <a-form-item style="padding-top: 10%;">
                  <a-button @click="recharge" type="primary" ghost size="large">充值</a-button>
                </a-form-item>
              </a-col>
            </a-form>
          </a-row>
        </a-card>
        <a-card class="half-card-buttom">
          <a-row>
            <span>理赔</span>
          </a-row>

          <a-row>
            <a-form layout="vertical">
              <a-col :md="6" :offset="6" :sm="24">
                <a-form-item label="理赔中" class="bold-form-item">
                  <span style="font-size:28px">{{ insureDetail.countApplyInsurance }}</span>
                </a-form-item>

              </a-col>
              <a-col :md="6" :offset="6" :sm="24">
                <a-form-item style="padding-top: 10%;">
                  <a-button @click="apply" type="primary" ghost size="large">申请理赔</a-button>
                </a-form-item>
              </a-col>
            </a-form>
          </a-row>
        </a-card>

      </a-col>

    </a-row>
    <table-card></table-card>
  </div>

</template>

<script>
import moment from 'moment'
import TableCard from '@/views/insurancelist/TableCard'
import { getAccountInfo } from '@/api/userinfo'

import {
  STable,
  Ellipsis
} from '@/components'

import {
  getUserStatistic
} from '@/api/userstatistic'

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

const platformImageMap = {
  1: '../assets/icons/amazon.png'
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    TableCard
  },
  data () {
    return {
      subTotalAccountBalance: '',

      // 上部简单信息
      tabListNoTitle: [{
        key: 'all',
        tab: '全部保险'
      },
      {
        key: 'seller',
        tab: '卖家保障'
      } ],
      noTitleKey: 'all',

      allPromoiseImages: [{
        'key': 'seller',
        'productType': 1,
        'productName': '卖家保险',
        'url': '/merchant/icons/renbao.png'
      }, {
        'key': 'logistics',
        'productType': 2,
        'url': '/merchant/icons/renshou.png'
      }, {
        'key': 'product',
        'productType': 3,
        'url': ''
      }],

      viewPromoiseImages: [{
        'key': 'seller',
        'url': '/merchant/icons/renbao.png'
      }, {
        'key': 'logistics',
        'url': '/merchant/icons/renshou.png'
      }, {
        'key': 'product',
        'url': ''
      }],
      countApplyInsurance: 0.00,
      insureDetail: { }
    }
  },
  filters: {
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
    getAccountInfo().then((res) => {
      this.subTotalAccountBalance = res.data.subTotalAccountBalance
    })
    getUserStatistic().then(res => {
      const result = res.data
      var countInsuranceShop = 0
      var countOrder = 0
      var countCompensationAmount = 0
      var securityLevel = 0
      var percent = 0
      const newImages = []
      var hadPromoiseImages = { }
      res.data.list.map((detail) => {
        countInsuranceShop += detail.countInsuranceShop
        countOrder += detail.countOrder
        countCompensationAmount += detail.countCompensationAmount / 100 / 10000
        var insuranceNames = []
        if (detail.insuranceName && detail.insuranceName !== '') {
          insuranceNames = detail.insuranceName.split('|')
        }
        insuranceNames.map((insuranceName) => {
          if (!hadPromoiseImages[insuranceName]) {
            hadPromoiseImages[insuranceName] = 1
            var promoiseImage = { }
            promoiseImage.key = insuranceName
            promoiseImage.url = this.basePromoiseImages[insuranceName]
            newImages.push(promoiseImage)
          }
        })
      })
      // this.viewPromoiseImages = newImages
      if (countOrder > 0) {
        securityLevel = 60
      }
      if (result.countThirdOrder > 0) {
        percent = parseFloat(countOrder / result.countThirdOrder).toFixed(2)
      }
      var countCompensationAmountUnit = '万'
      countCompensationAmount = parseInt(countCompensationAmount)
      if (percent <= 0 && countOrder > 0) {
        percent = '1%'
      }
      percent = percent * 100 + '%'
      this.insureDetail = {
        countShop: result.countShop,
        countInsuranceShop: countInsuranceShop,
        countThirdOrder: result.countThirdOrder ? result.countThirdOrder : 0,
        countOrder: countOrder,
        countCompensationAmount: countCompensationAmount,
        countCompensationAmountUnit: countCompensationAmountUnit,
        countApplyInsurance: result.countApplyInsurance ? result.countApplyInsurance : 0,
        percent: percent,
        list: result.list,
        securityLevel: securityLevel
      }
    })
  },
  methods: {
    handleDelete (record) {
      console.log(record)
      this.$refs.modal.edit(record)
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
        console.log(newImages)

        this.viewPromoiseImages = newImages
      } else {
        this.viewPromoiseImages = this.allPromoiseImages
      }

      var hadPromoiseImages = { }
      if (key !== 'all') {
        const newImages = []
        this.allPromoiseImages.map((item) => {
          if (item.key === key) {
            this.insureDetail.countInsuranceShop = 0
            this.insureDetail.countOrder = 0
            this.insureDetail.countCompensationAmount = 0
            this.insureDetail.percent = 0
            this.insureDetail.securityLevel = 0
            this.insureDetail.list.map((detail) => {
              if (detail.pruductType === item.productType) {
                this.insureDetail.countInsuranceShop = detail.countInsuranceShop
                this.insureDetail.countOrder = detail.countOrder
                this.insureDetail.countCompensationAmount = detail.countCompensationAmount / 100 / 10000
                this.insureDetail.countCompensationAmountUnit = '万'
                this.insureDetail.countCompensationAmount = parseInt(this.insureDetail.countCompensationAmount)
                if (this.insureDetail.countThirdOrder > 0) {
                  this.insureDetail.percent = parseFloat(countOrder / this.insureDetail.countThirdOrder).toFixed(2)
                }
                var insuranceNames = []
                if (detail.insuranceName && detail.insuranceName !== '') {
                  insuranceNames = detail.insuranceName.split('|')
                }
                insuranceNames.map((insuranceName) => {
                  if (!hadPromoiseImages[insuranceName]) {
                    hadPromoiseImages[insuranceName] = 1
                    var promoiseImage = { }
                    promoiseImage.key = insuranceName
                    promoiseImage.url = this.basePromoiseImages[insuranceName]
                    newImages.push(promoiseImage)
                  }
                })
              }
            })
            if (this.insureDetail.countOrder > 0) {
              this.insureDetail.securityLevel = 60
            }

            console.log(this.insureDetail.percent)
            if (this.insureDetail.percent <= 0 && this.insureDetail.countOrder > 0) {
              this.insureDetail.percent = '1%'
            } else {
              this.insureDetail.percent = this.insureDetail.percent * 100 + '%'
            }
          }
        })
        // this.viewPromoiseImages = newImages
      } else {
        this.viewPromoiseImages = this.allPromoiseImages
        var countInsuranceShop = 0
        var countOrder = 0
        var countCompensationAmount = 0
        var percent = 0
        const newImages = []
        this.insureDetail.list.map((detail) => {
          countInsuranceShop += detail.countInsuranceShop
          countOrder += detail.countOrder
          countCompensationAmount += detail.countCompensationAmount / 100 / 10000
          var insuranceNames = []
          if (detail.insuranceName && detail.insuranceName !== '') {
            insuranceNames = detail.insuranceName.split('|')
          }
          insuranceNames.map((insuranceName) => {
            if (!hadPromoiseImages[insuranceName]) {
              hadPromoiseImages[insuranceName] = 1
              var promoiseImage = { }
              promoiseImage.key = insuranceName
              promoiseImage.url = this.basePromoiseImages[insuranceName]
              newImages.push(promoiseImage)
            }
          })
        })
        var countCompensationAmountUnit = '万'
        countCompensationAmount = parseInt(countCompensationAmount)
        // this.viewPromoiseImages = newImages
        this.insureDetail.countInsuranceShop = countInsuranceShop
        this.insureDetail.countOrder = countOrder
        this.insureDetail.countCompensationAmount = countCompensationAmount
        this.insureDetail.countCompensationAmountUnit = countCompensationAmountUnit
        if (this.insureDetail.countThirdOrder > 0) {
          percent = parseFloat(countOrder / this.insureDetail.countThirdOrder).toFixed(2)
        }
        console.log(percent)

        if (percent <= 0 && countOrder > 0) {
          this.insureDetail.percent = '1%'
        } else {
          this.insureDetail.percent = percent * 100 + '%'
        }
        if (this.insureDetail.countOrder > 0) {
          this.insureDetail.securityLevel = 60
        }
      }
    },
    apply () {
      this.$router.push({
        name: 'claimApplyTable'
      })
    },
    recharge () {
      this.$router.push({
        name: 'Recharge'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @height: 340px;
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
    height: @height / 2 - 10;
    padding: 10px;
  }

  .half-card-buttom {
    height: @height / 2 - 10;
    margin-top: 20px;
    padding: 10px;
  }

  .half-card-top button,
  .half-card-buttom button {
    width: @width;
  }

  .row {
    height: @height!important;
  }

  .left,.left .ant-row{
    float:right;
  }
</style>
