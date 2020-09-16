<template>
  <a-card class="table-page-search-wrapper">
    <a-form layout="inline">
      <a-row :gutter="48">
        <a-col :md="4" :sm="22">
          <a-form-item
            label="店铺名"
          >
            <a-input placeholder="店铺名" v-model="queryParam.shopName" />
          </a-form-item>
        </a-col>

        <a-col :md="4" :sm="22" :offset="2">
          <a-form-item
            label="订单号"
          >
            <a-input placeholder="订单号" />
          </a-form-item>
        </a-col>

        <a-col :md="4" :sm="22" :offset="2">
          <a-form-item
            label="运单号"
          >
            <a-input placeholder="运单号" />
          </a-form-item>
        </a-col>

        <a-col :md="4" :sm="22" :offset="2">
          <a-form-item
            label="收款单号"
          >
            <a-input placeholder="收款单号" />
          </a-form-item>
        </a-col>

      </a-row>

      <a-row :gutter="48">

        <a-col :md="4" :sm="22">
          <a-form-item
            label="保单号"
          >
            <a-input placeholder="保单号" />
          </a-form-item>
        </a-col>

        <a-col :md="4" :sm="22" :offset="2">
          <a-form-item
            label="运单号"
          >
            <a-input placeholder="理赔单号" />
          </a-form-item>
        </a-col>

        <a-col :md="7" :sm="22" >
          <a-form-item label="下单时间">
            <a-date-picker v-model="queryParam.amazonStartTime" valueFormat="YYYY-MM-DD" placeholder="开始时间" />
            <a-date-picker
              style="margin-left:10px"
              v-model="queryParam.amazonEndTime"
              valueFormat="YYYY-MM-DD"
              placeholder="结束时间"
              class="right"/>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="48">
        <a-col :md="6" :sm="22">
          <a-form-item label="平台">
            <a-radio-group v-model="queryParam.type" default-value="a" button-style="solid">
              <a-radio-button value="1">
                Amazon
              </a-radio-button>
              <a-radio-button value="2">
                eBay
              </a-radio-button>
              <a-radio-button value="9">
                其他
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :md="6" :sm="22" >
          <a-form-item label="状态">
            <a-radio-group v-model="queryParam.loanProductStatus" default-value="a" button-style="solid">
              <a-radio-button value="0">
                已授信
              </a-radio-button>
              <a-radio-button value="1">
                授信中
              </a-radio-button>
              <a-radio-button value="2">
                未授信
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>

      </a-row>

      <a-row layout="inline">
        <a-col :md="8" :sm="24">
          <span>
            <a-button type="primary" >搜索</a-button>
            <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
          </span>
        </a-col>
      </a-row>
    </a-form>
  </a-card>

</template>

<script>

export default {
  props: {

  },
  name: 'QueryParam',
  components: {
  },
  data () {
    return {
      queryParam: {}
    }
  },
  filters: {

  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
