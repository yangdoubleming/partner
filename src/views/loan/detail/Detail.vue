<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24" style="margin-bottom: 20px;">
      <a-col :xs="12" :sm="12" class="order-no">
        <span>{{ loanDetail.loanNo }}</span>
        <span style="margin-left:13px" >额度</span> <span class="red-text">{{ loanDetail.loanAmount }}万</span>
        <a-button type="primary" style="margin-left:13px" ghost>{{ loanDetail.status | loanStatusFilterOfText }}</a-button>
      </a-col>

      <!-- <a-col :xs="4" :sm="4" class="right">
        <span ><a-button type="primary" icon="edit">
          修改
        </a-button></span>
        <span style="margin-left:13px"><a-button type="primary" icon="close">
          撤回
        </a-button></span>
      </a-col> -->
    </a-row>
    <a-row>
      <a-card
        :bordered="false"
        :tabList="tabList"
        :activeTabKey="activeTabKey"
        @tabChange="(key) => {this.activeTabKey = key}">
      </a-card>
    </a-row>

    <overview v-if="activeTabKey === '1'"/>
    <info v-if="activeTabKey === '2'"/>
    <repaymentPlan v-if="activeTabKey === '3'"/>
    <apply-user v-if="activeTabKey === '4'"/>
    <shop-info v-if="activeTabKey === '5'"/>
    <!-- <express v-if="activeTabKey === '6'"/> -->
    <receipt v-if="activeTabKey === '7'"/>
    <file v-if="activeTabKey === '8'"/>
    <link-stat v-if="activeTabKey === '9'"/>
    <rule v-if="activeTabKey === '10'"/>
    <process v-if="activeTabKey === '11'"/>
  </div>

</template>

<script>
import {
  getLoanById
} from '@/api/loan'

import {
  Overview,
  Express,
  Info,
  RepaymentPlan,
  ApplyUser,
  ShopInfo,
  File,
  Process,
  Receipt,
  LinkStat,
  Rule

} from './pages'

const loanStatusMap = {
  0: {
    status: 'default',
    text: '资料未完成'
  },
  1: {
    status: 'processing',
    text: '审核中'
  },
  2: {
    status: 'error',
    text: '已终止'
  },
  3: {
    status: 'processing',
    text: '放款中'
  },
  4: {
    status: 'error',
    text: '未结清'
  },
  5: {
    status: 'error',
    text: '已逾期'
  },
  6: {
    status: 'success',
    text: '已结清'
  },
  7: {
    status: 'processing',
    text: '还款中'
  }
}

export default {
  name: 'HomeDetail',
  components: {
    Overview,
    Info,
    RepaymentPlan,
    ApplyUser,
    ShopInfo,
    File,
    Process,
    Express,
    Receipt,
    LinkStat,
    Rule
  },
  data () {
    return {
      tabList: [
        {
          key: '1',
          tab: '概览'
        },
        {
          key: '2',
          tab: '产品信息'
        },
        {
          key: '3',
          tab: '还款明细'
        },
        {
          key: '4',
          tab: '申请人'
        },
        {
          key: '5',
          tab: '店铺'
        },
        // {
        //   key: '6',
        //   tab: '物流'
        // },
        // {
        //   key: '7',
        //   tab: '收款'
        // },
        {
          key: '8',
          tab: '文件资料'
        },
        // {
        //   key: '9',
        //   tab: '关联分析'
        // },
        // {
        //   key: '10',
        //   tab: '准入规则'
        // },
        {
          key: '11',
          tab: '流程进度'
        }
      ],
      activeTabKey: '1',

      loanDetail: {}
    }
  },
  filters: {
    loanStatusFilterOfText (type = '1') {
      return loanStatusMap[type].text
    }
  },
  created () {
    const id = this.$route.query.id
    this.getLoanById(id)
  },
  methods: {
    getLoanById (id) {
      const _this = this
      getLoanById(
        id
      ).then(res => {
        _this.loanDetail = res.data
        _this.loanDetail.limitByWan = (res.data.limit / 10000)
        _this.loanDetail.loanAmount = res.data.loanAmount ? (res.data.loanAmount / 10000).toFixed(2) : 0
      })
    },
    handleTabChange (key, type) {
      this[type] = key
    },
    handleEdit () {
      this.$message.info('点击修改')
    },
    handleCancel () {
      this.$message.info('点击撤回')
    }
  }
}
</script>

<style lang="less" scoped>
  .order-no{
    font-size: 20px;
  }

  .right{
      float : right;
      text-align: right;
  }
</style>
