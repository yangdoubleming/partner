<template>
  <a-card
    style="margin-top:20px"
    title="关联分析"
    :bordered="false">

    <div style="margin-bottom:20px;margin-top:-10px">
      <a-row>
        <a-alert message="系统根据订单、运单、收款单三单匹配情况计算最大贷款额度，仅供参考。" type="warning" show-icon />
      </a-row>
    </div>

    <a-row>
      <a-col :md="8" :sm="12">
        <a-card>
          <a-row>
            <a-col :md="12">
              <v-chart
                :forceFit="true"
                height="200"
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
            </a-col>
            <a-col :md="6" height="200px" class="info">
              <div><span class="">店铺销售额</span></div>
              <div><span class="gray">50万</span></div>
            </a-col>
          </a-row>

        </a-card>
      </a-col>
      <a-col :md="8" :sm="12">
        <a-card>
          <a-row>
            <a-col :md="12">
              <v-chart
                :forceFit="true"
                height="200"
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
            </a-col>
            <a-col :md="6" height="200px" class="info">
              <div><span class="">收款金额</span></div>
              <div><span class="gray">50万</span></div>
            </a-col>
          </a-row>

        </a-card>
      </a-col>
      <a-col :md="8" :sm="12">
        <a-card>
          <a-row>
            <a-col :md="12">
              <v-chart
                :forceFit="true"
                height="200"
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
            </a-col>
            <a-col :md="6" height="200px" class="info">
              <div><span class="">物流货值</span></div>
              <div><span class="gray">0</span></div>
            </a-col>

            <a-col :md="6" height="200px" class="small-info">
              <div><span class="">物流运费</span></div>
              <div><span class="gray">0</span></div>
            </a-col>
          </a-row>

        </a-card>
      </a-col>
      <a-col :md="8" :sm="12">
        <a-card>
          <a-row>
            <a-col :md="12">
              <v-chart
                :forceFit="true"
                height="200"
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
            </a-col>
            <a-col :md="6" height="200px" class="info">
              <div><span class="">三单匹配交易额</span></div>
              <div><span class="gray">50万</span></div>
            </a-col>
          </a-row>

        </a-card>
      </a-col>
      <a-col :md="8" :sm="12">
        <a-card>
          <a-row>
            <a-col :md="12">
              <v-chart
                :forceFit="true"
                height="200"
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
            </a-col>
            <a-col :md="6" height="200px" class="info">
              <div><span class="">订单/收款匹配交易额</span></div>
              <div><span class="gray">50万</span></div>
            </a-col>
          </a-row>

        </a-card>
      </a-col>
      <a-col :md="8" :sm="12">
        <a-card>
          <a-row>
            <a-col :md="12">
              <v-chart
                :forceFit="true"
                height="200"
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
            </a-col>
            <a-col :md="6" height="200px" class="info">
              <div><span class="">订单/运单匹配交易额</span></div>
              <div><span class="gray">50万</span></div>
            </a-col>
          </a-row>

        </a-card>
      </a-col>
      <a-col :md="8" :sm="12">
        <a-card>
          <a-row>
            <a-col :md="12">
              <v-chart
                :forceFit="true"
                height="200"
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
            </a-col>
            <a-col :md="6" height="200px" class="info">
              <div><span class="">信用贷款最大授信额度</span></div>
              <div><span class="red-text gray">500万</span></div>
            </a-col>
          </a-row>

        </a-card>
      </a-col>
      <a-col :md="8" :sm="12">
        <a-card>
          <a-row>
            <a-col :md="12">
              <v-chart
                :forceFit="true"
                height="200"
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
            </a-col>
            <a-col :md="6" height="200px" class="info">
              <div><span class="">应收贷款最大授信额度</span></div>
              <div><span class="red-text gray">50万</span></div>
            </a-col>
          </a-row>

        </a-card>
      </a-col>
      <a-col :md="8" :sm="12">
        <a-card>
          <a-row>
            <a-col :md="12">
              <v-chart
                :forceFit="true"
                height="200"
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
            </a-col>
            <a-col :md="6" height="200px" class="info">
              <div><span class="">运费最大授信额度</span></div>
              <div><span class="gray red-text">50万</span></div>
            </a-col>
          </a-row>

        </a-card>
      </a-col>
    </a-row>
  </a-card>

</template>

<script>
const data = [{
  type: '匹配',
  value: 68.5
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
    radius: 0.5,
    innerRadius: 0.9
  })
  view.intervalStack().position('value').color('type', [color, '#eceef1']).opacity(1)
  view.guide().html({
    position: ['50%', '50%'],
    html: '<div class="g2-guide-html">' + (data[0].value + '%') + '</p></div>'
  })
}

export default {
  name: 'LinkStat',
  components: {

  },
  data () {
    return {
      data,
      eachView
    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

    .info{
        margin-top: 13%;
        margin-left: -14%;

        .gray{
          font-weight: 400;
          font-size: 28px;
          color: rgb(157, 157, 157);
          font-style: normal;
          letter-spacing: 0px;
          line-height: 42px;
          text-decoration: none;
        }
    }

    .small-info{
        margin-top: 15%;
        margin-left: -6%;

        .gray{
          font-weight: 400;
          font-size: 14px;
          color: rgb(157, 157, 157);
          font-style: normal;
          letter-spacing: 0px;
          line-height: 42px;
          text-decoration: none;
        }
    }

</style>
