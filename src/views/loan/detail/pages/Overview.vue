<template>

  <a-row :gutter="24">
    <a-col :md="17" :sm="24" >
      <a-card class="thin-height-card">
        <a-row>
          <!-- 图片 -->
          <a-col :sm="12" :md="6">
            <a-button type="primary" size="large" class="card-btn">
              {{ loanDetail.productName }}
            </a-button>
          </a-col>

          <a-col :md="4" :sm="12">
            <a-form-item class="bold-form-item" label="授信额度（万）">
              <span class="info">{{ loanDetail.limitByWan||'-' }}</span>
              <!-- <span class="unit" style="margin-left:15px">万</span> -->
            </a-form-item>
          </a-col>

          <a-col :md="4" :sm="12">
            <a-form-item class="bold-form-item" label="利率">
              <span class="info">{{ loanDetail.loanRate }}</span>
            </a-form-item>
          </a-col>

          <a-col :md="5" :sm="12">
            <a-form-item class="bold-form-item" label="已提取/已还款（万）">
              <span class="info">{{ loanDetail.repaymentTotalByWan||'-' }}</span>
              <span> / </span>
              <span class="info">{{ loanDetail.extractTotalByWan||'-' }}</span>
            </a-form-item>
          </a-col>

          <a-col :md="4" :sm="12">
            <a-form-item class="bold-form-item" label="贷款时间">
              <div class="info">{{ loanDetail.loanTime }}</div>
              <div class="info">{{ loanDetail.expirationTime }}</div>
            </a-form-item>
          </a-col>
        </a-row>

      </a-card>

      <a-card class="text two-height-card">
        <a-row>
          <a-col :md="3" :sm="12" :offset="1">
            <span>申请人</span>
          </a-col>

          <a-col :md="4" :sm="12">
            <span>{{applyUser.loanName}}</span>
          </a-col>
        </a-row>

        <a-row>
          <a-col :md="3" :sm="12" :offset="1">
            <span>申请企业</span>
          </a-col>

          <a-col :md="6" :sm="12">
            <span>{{applyUser.company && applyUser.company.companyName}}</span>
          </a-col>
        </a-row>

        <a-row>
          <a-col :md="3" :sm="12" :offset="1">
            <span>还款方式</span>
          </a-col>

          <a-col :md="4" :sm="12">
            <span>先息后本</span>
          </a-col>
        </a-row>

        <a-row>
          <a-col :md="3" :sm="12" :offset="1">
            <span>还款明细</span>
          </a-col>
          <a-col :md="12" :sm="12">
            <a-list bordered :data-source="repaymentList" :grid="{ gutter: 16 }">
              <a-list-item slot="renderItem" slot-scope="item,index">
                <a-row>
                  <a-col :md="4" :sm="12" >
                    <span>{{ index + 1 }}</span>
                  </a-col>

                  <a-col :md="5" :sm="12">
                    <span>{{ item.repaymentTime }}</span>
                  </a-col>
                  <a-col :md="5" :sm="12" >
                    <span>{{ item.repaymentType }}</span>
                  </a-col>

                  <a-col :md="5" :sm="12">
                    <span>{{ item.repaymentPrincipal }}</span>
                  </a-col>
                  <a-col :md="5" :sm="12">
                    <span>{{ item.repaymentAllAmount }}</span>
                  </a-col>
                </a-row>
              </a-list-item>
              <div slot="header">
                <a-row>
                  <a-col :md="4" :sm="12" >
                    <span>顺序</span>
                  </a-col>

                  <a-col :md="5" :sm="12">
                    <span>还款日</span>
                  </a-col>
                  <a-col :md="5" :sm="12" >
                    <span>类型</span>
                  </a-col>

                  <a-col :md="5" :sm="12">
                    <span>本金</span>
                  </a-col>
                  <a-col :md="5" :sm="12">
                    <span>还款金额</span>
                  </a-col>
                </a-row>
              </div>
            </a-list>
          </a-col>
        </a-row>
        <!-- <a-row>
          <a-col :md="4" :sm="4" :offset="10">
            <a-button>查看更多</a-button>
          </a-col>
        </a-row> -->

      </a-card>

      <a-card class="thin-height-card" >
        <a-row>

          <a-col :md="4" :sm="12" :offset="1" style="margin-top: 3%;">
            <span>担保信息</span>

          </a-col>

          <a-col :md="4" :sm="12" style="margin-top: 2%;font-size:40px;font-weight:400">
            <span class="info">无</span>
          </a-col>

          <a-col :md="5" :sm="12">
            <a-form-item class="bold-form-item" label="担保额度（万）">
              <span class="info">0</span>
            </a-form-item>
          </a-col>

          <a-col :md="4" :sm="12">
            <a-form-item class="bold-form-item" label="担保费率">
              <span class="info">-</span>
            </a-form-item>
          </a-col>
        </a-row>

      </a-card>
    </a-col>
    <a-col :md="7" :sm="24" >
      <a-card class="thin-height-card">
        <a-row style="    padding: 9%;">
          <a-form layout="vertical">
            <a-col :md="6" :offset="4" :sm="24">
              <a-form-item label="信用评分" class="bold-form-item">
                <span class="info red-text">75</span>
              </a-form-item>

            </a-col>
            <!-- <a-col :md="6" :offset="4" :sm="24">
              <a-form-item label="发现5个问题" class="bold-form-item">
                <router-link to="{name:''}">查看</router-link>
              </a-form-item>
            </a-col> -->
          </a-form>
        </a-row>
      </a-card>

      <a-card class="one-height-card">
        <a-row style="    padding: 9%;">
          <a-form layout="vertical">
            <a-col :md="8" :offset="4" :sm="24">
              <a-form-item label="店铺" class="bold-form-item">
                <span class="info red-text">{{shopInfo.allShop||'-'}}</span>
              </a-form-item>

            </a-col>
            <a-col :md="8" :offset="4" :sm="24">
              <a-form-item label="销售额（万）" class="bold-form-item">
                <span class="info">{{shopInfo.saleAmountYear ? ((shopInfo.saleAmountYear)/10000).toFixed(2) : 0}}</span>
              </a-form-item>
            </a-col>
          </a-form>
        </a-row>
      </a-card>

      <a-card class="one-height-card">
        <a-row style="    padding: 9%;">
          <a-form layout="vertical">
            <a-col :md="8" :offset="4" :sm="24">
              <a-form-item label="收款商" class="bold-form-item">
                <span class="info red-text">-</span>
              </a-form-item>

            </a-col>
            <a-col :md="8" :offset="4" :sm="24">
              <a-form-item label="收款额（万）" class="bold-form-item">
                <span class="info">-</span>
              </a-form-item>
            </a-col>
          </a-form>
        </a-row>
      </a-card>

      <a-card class="thin-height-card">
        <a-row style="    padding: 9%;">
          <a-form layout="vertical">
            <a-col :md="6" :offset="4" :sm="24">
              <a-form-item label="物流商" class="bold-form-item">
                <span class="info red-text">-</span>
              </a-form-item>

            </a-col>
            <a-col :md="6" :offset="4" :sm="24">
              <a-form-item label="货值" class="bold-form-item">
                <span class="info">-</span>
              </a-form-item>
            </a-col>
          </a-form>
        </a-row>
      </a-card>

    </a-col>
  </a-row>

</template>

<script>
import {
  getLoanById,
  companyBorrower,
  shopData
} from '@/api/loan'

import {
  getRepaymentRecordList
} from '@/api/repayment-record'

import config from '@/config/defaultSettings'
import moment from 'moment'

const productNoLoanStatistic = {
  '0': 'shangdai',
  '1': 'yunbao',
  '2': 'shangbao',
  '3': 'ahead'
}

export default {
  name: 'Overview',
  components: {},
  data () {
    return {
      viewPromoiseImages: {},
      loanDetail: {},
      allPromoiseImages: {
        shangdai: {
          images: [{
            url: config.publicPath + '/icons/loan/youzheng.png'
          }],
          text: '跨商贷',
          viewType: '2'
        },
        yunbao: {
          images: [{
            url: config.publicPath + '/icons/loan/taipinyang.png'
          }, {
            url: config.publicPath + '/icons/loan/youzheng.png'
          }],
          text: '跨运保',
          viewType: '2'
        },
        shangbao: {
          images: [{
            url: config.publicPath + '/icons/loan/renbao.png'
          }, {
            url: config.publicPath + '/icons/loan/zhejiang.png'
          }, {
            url: config.publicPath + '/icons/loan/nongcun.png'
          }],
          text: '跨商保',
          viewType: '2'
        },
        ahead: {
          images: [{
            url: config.publicPath + '/icons/loan/minsheng.png'
          }],
          text: '提前贷',
          viewType: '2'
        }
      },
      repaymentList: [{

      }],
      applyUser: {
        company: {}
      },
      shopInfo: {},
      uu: config.publicPath + '/icons/loan/taipinyang.png'
    }
  },
  created () {
    const id = this.$route.query.id
    const loanNo = this.$route.query.loanNo
    this.getLoanById(id)
    this.getRepaymentRecordList(loanNo)
    this.companyBorrower()
    this.shopData()
  },
  methods: {
    getLoanById (id) {
      const _this = this
      getLoanById(
        id
      ).then(res => {
        _this.loanDetail = res.data
        _this.loanDetail.limitByWan = _this.loanDetail.loanAmount ? ((_this.loanDetail.loanAmount) / 10000).toFixed(2) : 0
        _this.loanDetail.repaymentTotalByWan = _this.loanDetail.repaymentTotal ? Number(_this.loanDetail.repaymentTotal) / 10000 : 0
        _this.loanDetail.extractTotalByWan = _this.loanDetail.extractTotal ? Number(_this.loanDetail.extractTotal) / 10000 : 0
        if (_this.loanDetail.loanRate) {
          _this.loanDetail.loanRate = Number(_this.loanDetail.loanRate * 100).toFixed(1) + '%'
        } else {
          _this.loanDetail.loanRate = '-'
        }
        if (_this.loanDetail.expirationTime) {
          _this.loanDetail.expirationTime = moment(_this.loanDetail.expirationTime).format('YYYY-MM-DD')
        } else {
          _this.loanDetail.expirationTime = '-'
        }
        if (_this.loanDetail.loanTime) {
          _this.loanDetail.loanTime = moment(_this.loanDetail.loanTime).format('YYYY-MM-DD')
        } else {
          _this.loanDetail.loanTime = '-'
        }
        const key = productNoLoanStatistic[_this.loanDetail.productId] || 2
        _this.viewPromoiseImages = this.allPromoiseImages[key] || {}
      })
    },
    getRepaymentRecordList (loanNo) {
      const _this = this
      getRepaymentRecordList({
        loanNo,
        current: 1,
        size: 5
      }).then(res => {
        res.data.records.map((item, index) => {
          // item.loanRate = Number(item.loanRate * 100).toFixed(1) + '%'
          item.repaymentTime = moment(item.repaymentTime).format('YYYY-MM-DD')
        })
        _this.repaymentList = res.data.records
      })
    },
    companyBorrower () {
      const _this = this
      companyBorrower().then(res => {
        _this.applyUser = res.data
      })
    },
    shopData () {
      const _this = this
      shopData().then(res => {
        _this.shopInfo = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @height: 210px;

  @thin-height: 190px;

  .card-img {
    margin-left: 16%;
  }

  .card-btn {
    width: 50%;
    margin-left: 20%;
    margin-top: 38px;
    height: 53px;
    font-size:26px;
    font-weight: 900;
  }

  .card-img img {
    width: 54%;
    margin-top: 3%;
  }

  .bold-form-item .info {
    font-size: 28px;
    font-weight: 500;
  }

  .bold-form-item {
    margin-top:10%
  }

  .text span{
    font-weight: 500;
  }

  .text .ant-row{
    margin-top:1%;
  }

  .ant-card{
    margin-top:20px
  }

  .one-height-card{
    height:@height
  }

  .thin-height-card{
    height: @thin-height;
  }

  .two-height-card{
    height:@height * 2 + 20
  }
</style>
