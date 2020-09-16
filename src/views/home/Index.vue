<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :md="24" :lg="12">
        <a-card
          class="card "
          style="width:100%"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')">

          <a-row style="margin-top:30px">
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
                    <a-form-item style="padding-top: 10%;">
                      <a-button type="primary" size="large" style="    background-color: rgb(254, 25, 100);">去提高</a-button>
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
                    <a-form-item class="bold-form-item" label="风险评级">
                      <span>{{ insureDetail.securityLevel }}</span>
                    </a-form-item>
                  </a-col> -->
                </a-row>

              </a-form>
            </a-col>
          </a-row>

        </a-card>

      </a-col>

      <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '24px' }">
        <a-card title="我的投保" class="card">
          <a slot="extra" href="#"><a-button type="primary" @click="viewApply">全部</a-button></a>
          <s-table
            ref="table"
            tableLayout="auto"
            size="default"
            :columns="columns"
            :data="loadData"
            :showPagination="false">
            <span slot="redText" slot-scope="text">
              <span class="red-text">{{ text || '--' }}</span>
            </span>

            <span slot="action">
              <a class="red-text" @click="viewRule">查看</a>
            </span>
          </s-table>
        </a-card>
      </a-col>
    </a-row>

  </div>
</template>

<script>
import { STable } from '@/components'
import 'swiper/css/swiper.css'
import { mixinDevice } from '@/utils/mixin'
import {
  getUserStatistic
} from '@/api/userstatistic'
import {
  getList
} from '@/api/rule'

import config from '@/config/defaultSettings'

export default {
  name: 'Index',
  mixins: [mixinDevice],
  components: {
    STable
  },
  data () {
    return {
      loading: true,
      // insuranceCcolumns,
      // 1.amazon 2.ebay
      // 上部简单信息
      platformType: {
        1: 'amazon',
        2: 'eBay',
        3: '其他',
        4: '其他',
        5: '其他',
        6: '其他',
        7: '其他',
        8: '其他'
      },
      tabListNoTitle: [{
        key: 'all',
        tab: '全部保险 '
      },
      {
        key: 'seller',
        tab: '卖家保障 '
      }
      ],
      noTitleKey: 'all',

      allPromoiseImages: [{
        'key': 'seller',
        'productName': '卖家保险',
        'productType': 1,
        'url': config.publicPath + '/icons/renbao.png'
      }, {
        'key': 'logistics',
        'productType': 2,
        'url': config.publicPath + '/icons/renshou.png'
      }, {
        'key': 'product',
        'productType': 3
      }],

      basePromoiseImages: {
        '人才保险': config.publicPath + '/icons/renbao.png',
        '人寿保险': config.publicPath + '/icons/renshou.png'
      },

      viewPromoiseImages: [{
        'key': 'seller',
        'url': config.publicPath + '/icons/renbao.png'
      }, {
        'key': 'logistics',
        'url': config.publicPath + '/icons/renshou.png'
      }, {
        'key': 'product',
        'url': ''
      }],

      insureDetail: { },

      // 表头
      columns: [
        {
          title: '规则名称',
          dataIndex: 'name',
          scopedSlots: {
            customRender: 'redText'
          },
          align: 'center'
        },
        {
          title: '投保店铺',
          dataIndex: 'shopName',
          align: 'center'
        },
        {
          title: '投保方式',
          dataIndex: 'ruleMethod',
          align: 'center'
        },
        {
          title: '适用平台',
          dataIndex: 'platform',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: {
            customRender: 'action'
          },
          align: 'center'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: () => {
        return getList({
          size: 4,
          current: 1
        })
          .then(res => {
            res.data.records.map((item) => {
              item.key = item.id
              item.ruleMethod = 'SKU'
              if (item.sku) {
                const skus = JSON.parse(item.sku)
                const platform = item.platform
                item.platform = this.platformType[platform]
                item.viewSku = skus.join(' | ')
              }
            })
            const result = {
              data: res.data.records
            }

            return result
          })
      }

    }
  },
  created () {
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
        // countCompensationAmount += parseFloat(detail.countCompensationAmount / 10000).toFixed(2)
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
        countInsuranceShop: countInsuranceShop,
        countThirdOrder: result.countThirdOrder,
        countOrder: countOrder,
        countCompensationAmount: countCompensationAmount,
        countCompensationAmountUnit: countCompensationAmountUnit,
        percent: percent,
        list: result.list,
        securityLevel: securityLevel
      }
    })
  },
  methods: {
    viewRule () {
      this.$router.push({
        name: 'rule'
      })
    },
    viewApply () {
      this.$router.push({
        name: 'insurance'
      })
    },
    handleTabChange (key, type) {
      this[type] = key
      var hadPromoiseImages = { }
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
                  this.insureDetail.percent = parseFloat(detail.countOrder / this.insureDetail.countThirdOrder).toFixed(2)
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
          percent = parseInt(parseFloat(countOrder / this.insureDetail.countThirdOrder).toFixed(2))
        }
        if (percent <= 0 && countOrder > 0) {
          percent = '1%'
        }
        this.insureDetail.percent = percent
        if (this.insureDetail.countOrder > 0) {
          this.insureDetail.securityLevel = 60
        }
      }
    },
    sign () {

    }
  }
}
</script>

<style lang="less" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }

  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);
    /deep/ .ant-card-head {
      position: relative;
    }
  }

  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }

  @height: 400px;
  @width: 100px;

  .table {
    margin-top: 30px;
  }

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

  .card .ant-card-head {
    border-bottom: none!important;
  }
</style>
