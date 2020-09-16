
<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">

    <!-- 按钮组 -->
    <div>
      <a-row>
        <a-col :xs="12" :sm="12">
          <span class="order-no">{{ detail.ticketNo }}</span>
          <span style="margin-left:13px" class="order-no">理赔金额</span> <span class="order-no red-text">{{ detail.applyAmount }}元</span>
          <a-button class="green-btn" style="margin-left:13px">{{ detail.status | aiOrderFilter }}</a-button>

        </a-col>

        <!-- <a-col :xs="12" :sm="12" class="right">
          <a-button type="danger">撤回</a-button>
          <a-button style="margin-left:3px" type="danger" ghost>加急</a-button>
        </a-col> -->
      </a-row>

    </div>

    <!-- 模块 -->
    <a-card

      style="margin-top: 20px;margin-bottom:20px"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="(key) => {this.activeTabKey = key}"
    >

    </a-card>

    <!-- <article-page v-if="activeTabKey === '1'"></article-page>
      <app-page v-else-if="activeTabKey === '2'"></app-page>
      <project-page v-else-if="activeTabKey === '3'"></project-page> -->
    <claim-overview v-if="activeTabKey === '1'"></claim-overview>
    <claim-materials v-if="activeTabKey === '2'"></claim-materials>
    <claim-log v-if="activeTabKey === '3'"></claim-log>
  </div>

</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import { ClaimLog, ClaimMaterials, ClaimOverview } from './page'

import { getById } from '@/api/indemnify'

const statusMap = {
  0: {
    status: 'default',
    text: '未确认'
  },
  1: {
    status: 'processing',
    text: '已申请'
  },
  2: {
    status: 'success',
    text: '一审'
  },
  3: {
    status: 'error',
    text: '已赔付'
  },
  4: {
    status: 'error',
    text: '已驳回'
  },
  5: {
    status: 'error',
    text: '小额快审待审核'
  },
  6: {
    status: 'error',
    text: '二审'
  },
  7: {
    status: 'error',
    text: '商户同意通过'
  },
  8: {
    status: 'error',
    text: '已申诉'
  },
  9: {
    status: 'error',
    text: '待确认'
  },
  10: {
    status: 'error',
    text: '待打款'
  },
  11: {
    status: 'error',
    text: '已过期'
  },
  12: {
    status: 'error',
    text: '已驳回'
  },
  13: {
    status: 'error',
    text: '取消'
  }
}

export default {
  name: 'ClaimDetail',
  components: {
    PageView,
    ClaimLog,
    ClaimMaterials,
    ClaimOverview
  },
  mixins: [mixinDevice],
  data () {
    return {
      detail: {},
      tabList: [
        {
          key: '1',
          tab: '概览'
        },
        {
          key: '2',
          tab: '理赔材料'
        },
        {
          key: '3',
          tab: '理赔日志'
        }
      ],
      activeTabKey: '1'

    }
  },
  created () {
    const id = this.$route.query.id
    getById(id).then((res) => {
      this.detail = res.data
      console.log(this.detail)
    })
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'agree': '成功',
        'reject': '驳回'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        'agree': 'success',
        'reject': 'error'
      }
      return statusTypeMap[type]
    },
    aiOrderFilter (status) {
      return statusMap[status].text
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
        text-align: right;
  }

  .card .ant-card-head{
    border-bottom: 0px solid #e8e8e8!important;
  }

  .order-no{
    font-size: 20px;
  }
</style>
