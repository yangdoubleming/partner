<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24" style="margin-bottom: 20px;">
      <!-- 统计信息 -->
      <a-col :sm="24" :md="17">
        <a-card
          class="full-card"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')">
          <a-row style="margin-top:20px">
            <template v-if="viewPromoiseImages.viewType === '1'">
              <!-- 图片 -->
              <a-col :sm="12" :md="6">
                <span v-for="item in viewPromoiseImages.images" :key="item.url" class="card-small-img">
                  <img :src="item.url" :class="item.gray ? 'img-gray' : ''">
                </span>
              </a-col>
            </template>
            <template v-else-if="viewPromoiseImages.viewType === '2'">
              <!-- 图片 -->
              <a-col :sm="12" :md="6">
                <div class="my-btn" style="background-color: #6dae71;" v-if="viewPromoiseImages.text == '跨商贷'">
                  {{ viewPromoiseImages.text }}
                </div>

                <div class="my-btn" style="background-color: #b566b0;" v-if="viewPromoiseImages.text == '跨运保'">
                  {{ viewPromoiseImages.text }}
                </div>

                <div class="my-btn" style="background-color: #df6347;" v-if="viewPromoiseImages.text == '跨商保'">
                  {{ viewPromoiseImages.text }}
                </div>

                <div class="my-btn" style="background-color: #639fd9;" v-if="viewPromoiseImages.text == '提前贷'">
                  {{ viewPromoiseImages.text }}
                </div>
              </a-col>
            </template>

            <!-- 信息 -->
            <a-col :sm="24" :md="18" v-if="activeKey == 'all'">
              <a-form layout="vertical">
                <a-row style="margin-top:20px">
                  <a-col :md="8" :sm="24">
                    <a-form-item label="在贷笔数" class="bold-form-item">
                      <span class="red-text info">{{ dataArr[0].loanCount }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="在贷余额（万）">
                      <span class="info">{{ dataArr[0].loanBalance ? (dataArr[0].loanBalance/10000).toFixed(2) : 0}}</span>
                      <!-- <span class="unit" style="margin-left:15px">万</span> -->
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="最近还款日">
                      <span class="info">{{ dataArr[0].lasRepaymentDate }}</span>
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="授信店铺">
                      <span class="info">{{ dataArr[0].authShopCount||0 }}</span> <span
                        class="">{{ dataArr[0].countCompensationAmountUnit }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="授信总额（万）">
                      <span class="info">{{ dataArr[0].authAmount ? dataArr[0].authAmount : 0 }}</span>
                      <!-- <span class="unit" style="margin-left:15px">万</span> -->
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24" style="margin-top:2%">
                    <!-- <template v-if="noTitleKey === 'all'">
                      <a-button type="danger" size="large">去提高</a-button>
                    </template> -->
                    <template v-if="noTitleKey !== 'all'">
                      <a-button type="primary" ghost size="large">{{ dataArr[0].loanProductName }}</a-button>
                    </template>

                  </a-col>
                </a-row>

              </a-form>
            </a-col>
            <a-col :sm="24" :md="18" v-if="activeKey == 'shangdai'">
              <a-form layout="vertical">
                <a-row style="margin-top:20px">
                  <a-col :md="8" :sm="24">
                    <a-form-item label="在贷笔数" class="bold-form-item">
                      <span class="red-text info">{{ dataArr[1].loanCount }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="在贷余额（万）">
                      <span class="info">{{ dataArr[1].loanBalance ? dataArr[1].loanBalance : 0}}</span>
                      <!-- <span class="unit" style="margin-left:15px">万</span> -->
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="最近还款日">
                      <span class="info">{{ dataArr[1].lasRepaymentDate }}</span>
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="授信店铺">
                      <span class="info">{{ dataArr[1].authShopCount||0 }}</span> <span
                        class="">{{ dataArr[1].countCompensationAmountUnit }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="授信总额（万）">
                      <span class="info">{{ dataArr[1].authAmount ? dataArr[1].authAmount : 0 }}</span>
                      <!-- <span class="unit" style="margin-left:15px">万</span> -->
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24" style="margin-top:2%">
                    <template v-if="noTitleKey === 'all'">
                      <a-button type="danger" size="large">去提高</a-button>
                    </template>
                    <template v-else>
                      <a-button type="primary" ghost size="large">{{ dataArr[1].loanProductName }}</a-button>
                    </template>

                  </a-col>
                </a-row>

              </a-form>
            </a-col>
            <a-col :sm="24" :md="18" v-if="activeKey == 'yunbao'">
              <a-form layout="vertical">
                <a-row style="margin-top:20px">
                  <a-col :md="8" :sm="24">
                    <a-form-item label="在贷笔数" class="bold-form-item">
                      <span class="red-text info">{{ dataArr[2].loanCount }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="在贷余额（万）">
                      <span class="info">{{ dataArr[2].loanBalance ? dataArr[2].loanBalance :0 }}</span>
                      <!-- <span class="unit" style="margin-left:15px">万</span> -->
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="最近还款日">
                      <span class="info">{{ dataArr[2].lasRepaymentDate }}</span>
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="授信店铺">
                      <span class="info">{{ dataArr[2].authShopCount||0 }}</span> <span
                        class="">{{ dataArr[2].countCompensationAmountUnit }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="授信总额（万）">
                      <span class="info">{{ dataArr[2].authAmount ? dataArr[2].authAmount : 0}}</span>
                      <!-- <span class="unit" style="margin-left:15px">万</span> -->
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24" style="margin-top:2%">
                    <template v-if="noTitleKey === 'all'">
                      <a-button type="danger" size="large">去提高</a-button>
                    </template>
                    <template v-else>
                      <a-button type="primary" ghost size="large">{{ dataArr[2].loanProductName }}</a-button>
                    </template>

                  </a-col>
                </a-row>

              </a-form>
            </a-col>
            <a-col :sm="24" :md="18" v-if="activeKey == 'shangbao'">
              <a-form layout="vertical">
                <a-row style="margin-top:20px">
                  <a-col :md="8" :sm="24">
                    <a-form-item label="在贷笔数" class="bold-form-item">
                      <span class="red-text info">{{ dataArr[3].loanCount }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="在贷余额（万）">
                      <span class="info">{{ dataArr[3].loanBalance ? dataArr[3].loanBalance : 0}}</span>
                      <!-- <span class="unit" style="margin-left:15px">万</span> -->
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="最近还款日">
                      <span class="info">{{ dataArr[3].lasRepaymentDate }}</span>
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="授信店铺">
                      <span class="info">{{ dataArr[3].authShopCount||0 }}</span> <span
                        class="">{{ dataArr[3].countCompensationAmountUnit }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="授信总额（万）">
                      <span class="info">{{ dataArr[3].authAmount ? authAmountdataArr[3].authAmount : 0}}</span>
                      <!-- <span class="unit" style="margin-left:15px">万</span> -->
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24" style="margin-top:2%">
                    <template v-if="noTitleKey === 'all'">
                      <a-button type="danger" size="large">去提高</a-button>
                    </template>
                    <template v-else>
                      <a-button type="primary" ghost size="large">{{ dataArr[3].loanProductName }}</a-button>
                    </template>

                  </a-col>
                </a-row>

              </a-form>
            </a-col>
            <a-col :sm="24" :md="18" v-if="activeKey == 'ahead'">
              <a-form layout="vertical">
                <a-row style="margin-top:20px">
                  <a-col :md="8" :sm="24">
                    <a-form-item label="在贷笔数" class="bold-form-item">
                      <span class="red-text info">{{ dataArr[4].loanCount }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="在贷余额">
                      <span class="info">{{ dataArr[4].loanBalance ? dataArr[4].loanBalance : 0}}</span>
                      <!-- <span class="unit" style="margin-left:15px">万</span> -->
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="最近还款日">
                      <span class="info">{{ dataArr[4].lasRepaymentDate }}</span>
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="授信店铺">
                      <span class="info">{{ dataArr[4].authShopCount||0 }}</span> <span
                        class="">{{ dataArr[4].countCompensationAmountUnit }}</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item class="bold-form-item" label="授信总额（万）">
                      <span class="info">{{ dataArr[4].authAmount ? dataArr[4].authAmount : 0 }}</span>
                      <!-- <span class="unit" style="margin-left:15px">万</span> -->
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24" style="margin-top:2%">
                    <template v-if="noTitleKey === 'all'">
                      <a-button type="danger" size="large">去提高</a-button>
                    </template>
                    <template v-else>
                      <a-button type="primary" ghost size="large">{{ dataArr[4].loanProductName }}</a-button>
                    </template>

                  </a-col>
                </a-row>

              </a-form>
            </a-col>
          </a-row>

        </a-card>

      </a-col>
      <!-- 账户信息 理赔信息 -->
      <a-col :sm="24" :md="7">
        <a-card class="half-card">
          <a-row>
            <span>我的申请</span>
          </a-row>

          <a-row style="    padding: 3%;">
            <a-form layout="vertical">
              <a-col :md="6" :offset="5" :sm="24" style="margin-top:2%">
                <a-form-item label="贷款申请" class="bold-form-item">
                  <span class="info" v-if="activeKey == 'all'">{{ dataArr[0].applyLoanCount }}</span>
                  <span class="info" v-if="activeKey == 'shangdai'">{{ dataArr[1].applyLoanCount }}</span>
                  <span class="info" v-if="activeKey == 'yunbao'">{{ dataArr[2].applyLoanCount }}</span>
                  <span class="info" v-if="activeKey == 'shangbao'">{{ dataArr[3].applyLoanCount }}</span>
                  <span class="info" v-if="activeKey == 'ahead'">{{ dataArr[4].applyLoanCount }}</span>
                </a-form-item>

              </a-col>
            </a-form>
          </a-row>
        </a-card>
        <a-card class="half-card bottom-card">
          <a-row>
            <span>我的额度</span>
          </a-row>
          <a-row style="    padding: 3%;">
            <a-form layout="vertical">
              <a-col :md="6" :offset="6" :sm="24">
                <a-form-item label="企业（万）" class="bold-form-item">
                  <span class="info" v-if="activeKey == 'all'">{{ dataArr[0].quotaEnt ? ((dataArr[0].quotaEnt)/10000).toFixed(2) : 0 }}</span>
                  <span class="info" v-if="activeKey == 'shangdai'">{{ dataArr[1].quotaEnt ? ((dataArr[1].quotaEnt)/10000).toFixed(2) : 0 }}</span>
                  <span class="info" v-if="activeKey == 'yunbao'">{{ dataArr[2].quotaEnt ? ((dataArr[2].quotaEnt)/10000).toFixed(2) : 0}}</span>
                  <span class="info" v-if="activeKey == 'shangbao'">{{ dataArr[3].quotaEnt ? ((dataArr[3].quotaEnt)/10000).toFixed(2) : 0 }}</span>
                  <span class="info" v-if="activeKey == 'ahead'">{{ dataArr[4].quotaEnt ? ((dataArr[4].quotaEnt)/10000).toFixed(2) : 0 }}</span>
                  <!-- <span class="unit">万</span> -->
                </a-form-item>

              </a-col>
              <a-col :md="6" :offset="6" :sm="24">
                <a-form-item label="个人（万）" class="bold-form-item">
                  <span class="info" v-if="activeKey == 'all'">{{ dataArr[0].quotaPerson ? dataArr[0].quotaPerson : 0 }}</span>
                  <span class="info" v-if="activeKey == 'shangdai'">{{  dataArr[1].quotaPerson ? dataArr[1].quotaPerson : 0 }}</span>
                  <span class="info" v-if="activeKey == 'yunbao'">{{  dataArr[2].quotaPerson ? (dataArr[2].quotaPerson) : 0 }}</span>
                  <span class="info" v-if="activeKey == 'shangbao'">{{  dataArr[3].quotaPerson ? dataArr[3].quotaPerson : 0 }}</span>
                  <span class="info" v-if="activeKey == 'ahead'">{{  dataArr[4].quotaPerson ? dataArr[4].quotaPerson : 0 }}</span>
                </a-form-item>
              </a-col>
            </a-form>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>

</template>

<script>
import {
  getLoanUserStatistic
} from '@/api/loan'
import config from '@/config/defaultSettings'
import { picUrl } from '@/api/config'
import moment from 'moment'

export default {
  name: 'HomeCard',
  components: {},
  data () {
    return {

      // 上部简单信息
      tabListNoTitle: [{
        key: 'all',
        tab: `全部贷款`
      },
      {
        key: 'shangdai',
        tab: '跨商贷'
      },
      {
        key: 'yunbao',
        tab: '跨运保'
      },
      {
        key: 'shangbao',
        tab: '跨商保'
      },
      {
        key: 'ahead',
        tab: '提前贷'
      }
      ],
      noTitleKey: 'all',

      allPromoiseImages: {
        all: {
          images: [],
          viewType: '1'
        },
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

      viewPromoiseImages: null,

      loanStatistic: {
        'all': {

        },
        'shangdai': {

        },
        'yunbao': {

        },
        'shangbao': {

        },
        'ahead': {

        }
      },

      loanUserStatistic: {

      },

      viewloanStatistic: { loanCount: '' },
      loanProductName: '',
      activeKey: 'all',
      dataArr: [
        {},
        {},
        {},
        {}
      ]
    }
  },
  watch: {
    // 如果 `noTitleKey` 发生改变，这个函数就会运行
    noTitleKey: function () {
    }
  },

  filters: {

  },
  created () {
    this.viewPromoiseImages = this.allPromoiseImages['all']
    this.getLoanUserStatistic(14261, '全部贷款')
  },
  methods: {
    getLoanUserStatistic (userId, type) {
      const _this = this
      getLoanUserStatistic(userId, type).then(res => {
        _this.dataArr = res.data
        _this.dataArr.forEach(item => {
          if (item.lasRepaymentDate) {
            item.lasRepaymentDate = moment(item.lasRepaymentDate).format('YYYY-MM-DD')
          } else {
            item.lasRepaymentDate = '-'
          }
        })
        _this.viewloanStatistic = res.data[0]
        this.tabListNoTitle.forEach(item => {
          this.dataArr.forEach(ele => {
            if (item.tab === ele.loanProductName) {
              item.tab = `${item.tab} ${ele.loanCount}`
            }
          })
        })
        if (_this.viewloanStatistic.lasRepaymentDate === '-') {
          _this.viewloanStatistic.lasRepaymentDate = '-'
        } else {
          _this.viewloanStatistic.lasRepaymentDate = moment(_this.viewloanStatistic.lasRepaymentDate).format('YYYY-MM-DD')
        }
        if (_this.viewloanStatistic && _this.viewloanStatistic.bankLogo) {
          var logoList = _this.viewloanStatistic.bankLogo.split('|')
          logoList.forEach(item => {
            this.allPromoiseImages.all.images.push({ url: picUrl + item })
          })
          if (this.allPromoiseImages.all.images.length < 9) {
            for (var i = this.allPromoiseImages.all.images.length; i < 9; i++) { this.allPromoiseImages.all.images.push({ url: config.publicPath + '/icons/loan/head6.png', gray: true }) }
          }
        } else {
          for (var j = 0; j < 9; j++) { this.allPromoiseImages.all.images.push({ url: config.publicPath + '/icons/loan/head6.png', gray: true }) }
        }
      })
    },
    handleTabChange (key, type) {
      this[type] = key
      this.activeKey = key
      this.viewPromoiseImages = this.allPromoiseImages[key]
    },
    apply () {
      this.$router.push({
        name: 'LoanApply'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @height: 360px;
  @width: 100px;

  .row {
    height: @height !important;
  }

  .full-card {
    height: @height
  }

  .half-card {
    height: @height / 2 - 10
  }

  .bottom-card {
    margin-top: 20px
  }

  .card-img {
    margin-left: 16%;
  }

  .card-btn {
    width: 50%;
    margin-left: 20%;
    height: 53px;
    font-size:26px;
    font-weight: 900;
  }

  .card-img img {
    width: 54%;
    margin-top: 3%;
  }

  .card-small-img {
    margin-left: 3%;
    padding: 5%;
  }

  .card-small-img img {
    width: 14%;
    margin-top: 6%;
  }

  .half-card-top button,
  .half-card-buttom button {
    width: @width;
  }

  .img-gray {
    filter: grayscale(1);
    opacity: .1;
  }

  .bold-form-item .info {
    font-size: 28px;
    font-weight: 400;
  }

  .ant-form label {
    font-size: 16px !important;
  }
  .my-btn {
    width: 50%;
    margin-left: 20%;
    margin-top: 80px;
    height: 53px;
    font-size: 26px;
    font-weight: 900;
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    padding: 0 15px;
    border-radius: 4px;
    outline: 0;
    line-height: 2;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
  }
</style>
