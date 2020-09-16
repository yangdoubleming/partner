<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <!-- 统计信息 -->
      <a-col :sm="24" :md="7">
        <a-card
          class="full-card"
          :bordered="false"
        >
          <a-row>
            <span>我的店铺</span>
          </a-row>

          <a-row style="padding: 3%;">
            <a-form layout="vertical">
              <a-col :md="6" :offset="5" :sm="24" style="margin-top:2%">
                <a-form-item label="我的店铺" class="bold-form-item">
                  <span class="info">{{shopInfo.allShop||'-'}}</span>
                </a-form-item>

              </a-col>
              <a-col :md="6" :offset="5" :sm="24" style="margin-top:2%">
                <a-form-item label="已授信店铺" class="bold-form-item">
                  <span class="info">{{shopInfo.authShop||'-'}}</span>
                </a-form-item>
              </a-col>
            </a-form>
          </a-row>
        </a-card>

      </a-col>
      <!-- 账户信息 理赔信息 -->
      <a-col :sm="24" :md="17">
        <a-card class="full-card">
          <a-row>
            <span>销售额</span>
          </a-row>

          <a-row >
            <a-form layout="vertical">
              <a-col :md="10" :offset="2" :sm="24" style="margin-top:1%">
                <a-form-item label="年销售额（万）" class="bold-form-item">
                  <span class="info">{{shopInfo.saleAmountYear ? ((shopInfo.saleAmountYear)/10000).toFixed(2) : '-'}}</span>
                </a-form-item>
              </a-col>
              <!-- <a-col :md="6" :offset="2" :sm="24" style="margin-top:1%">
                <a-form-item label="收款匹配销售额（万）" class="bold-form-item">
                  <div class="chart-card-content">
                    <div><span class="info ">-</span></div>
                    <div><span class="unit">-</span></div>
                    <div class="content-fix">
                      <v-chart
                        :forceFit="true"
                        height="100"
                        :data="data"
                        padding="auto"
                      >
                        <v-tooltip></v-tooltip>
                        <v-facet
                          type="rect"
                          :fields="['type']"
                          :padding="20"
                          :showTitle="false"
                          :eachView="eachView"
                        />
                      </v-chart>
                    </div>
                  </div>
                </a-form-item>
              </a-col> -->
              <a-col :md="10" :offset="2" :sm="24" style="margin-top:1%">
                <a-form-item label="预估授权额度（万）" class="bold-form-item">
                  <span class="info red-text">200</span>
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
  shopData,
  loanShopData
} from '@/api/loan'
const data = [{
  type: '匹配',
  value: 43.6
}]

const eachView = function (view, facet) {
  var data = facet.data
  var color = 'blue'

  data.push({
    type: '其他',
    value: 100 - data[0].value
  })
  view.source(data)
  view.coord('theta', {
    radius: 0.8,
    innerRadius: 0.5
  })
  view.intervalStack().position('value').color('type', [color, '#eceef1']).opacity(1)
}

export default {
  name: 'HomeCard',
  components: {},
  data () {
    return {
      data,
      eachView,
      shopInfo: {}
    }
  },
  filters: {

  },
  created () {
    this.shopData()
  },
  methods: {
    shopData () {
      const _this = this
      console.log(2222, _this.$route.path)
      if (this.$route.path === '/shop/home') {
        shopData().then(res => {
          _this.shopInfo = res.data
        })
      } else {
        loanShopData(this.$route.query.id).then(res => {
          _this.shopInfo = res.data
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @height: 200px;

 .full-card {
    height: @height
  }

   .bold-form-item .info {
    font-size: 28px;
    font-weight: 400;
  }

  .chart-card-content {
    margin-bottom: 12px;
    position: relative;
    height: 86px;
    width: 100%;

    .content-fix {
      position: absolute;
      left: -15px;
      bottom: 0;
      width: 100%;
    }
  }
</style>
