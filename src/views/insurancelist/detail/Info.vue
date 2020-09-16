
<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">

    <!-- 按钮组 -->
    <div>
      <a-row>
        <a-col :xs="18" :sm="18">
          <span class="order-no">{{ detail.ticketNo }}</span>
          <span style="margin-left:13px" class="order-no">保费</span> <span class="order-no red-text">{{ detail.productPrice / 100 }}元</span>
          <span style="margin-left:13px" class="order-no">保额</span> <span class="order-no red-text">{{ detail.productCompensationAmount / 100 }}元</span>
          <a-button class="green-btn" style="margin-left:13px">{{ detail.orderStatus | orderStatusTypeFilter }}</a-button>

        </a-col>

        <a-col :xs="6" :sm="6" class="right">
          <a-button v-if="applyShow" type="primary" @click="apply">申请理赔</a-button>
          <a-button v-if="isShow" style="margin-left:3px" type="primary" ghost><a :href="pdfUrl" target="_blank">电子保单</a></a-button>
        </a-col>
      </a-row>

    </div>

    <!-- 模块 -->
    <a-card

      style="margin-top: 24px"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="key => handleTabChange(key, 'noTitleKey')"
    >
      <!-- <article-page v-if="activeTabKey === '1'"></article-page>
      <app-page v-else-if="activeTabKey === '2'"></app-page>
      <project-page v-else-if="activeTabKey === '3'"></project-page> -->

    </a-card>

    <overview v-if="activeTabKey === '1'"></overview>

  </div>

</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import { Overview } from './page'

import { getOrderById, getOrderPdf, getApply } from '@/api/order'

const DetailListItem = DetailList.Item

const polStatusMap = {
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

export default {
  name: 'ClaimDetail',
  components: {
    PageView,
    DetailList,
    DetailListItem,
    Overview
  },
  mixins: [mixinDevice],
  data () {
    return {
      tabList: [
        {
          key: '1',
          tab: '概览'
        }
      ],
      activeTabKey: '1',
      pdfUrl: '',
      isShow: false,
      applyShow: false,
      detail: {}

    }
  },
  mounted () {
    this.orderId = this.$route.query.id
    getOrderPdf(this.orderId).then((res) => {
      if (res.data.polUrl && res.data.polUrl !== '') {
        this.pdfUrl = res.data.polUrl
        this.isShow = true
      }
    })
    getOrderById(this.orderId).then((res) => {
      this.detail = res.data

      if (this.detail.orderStatus === '1' || this.detail.orderStatus === '8') {
        this.applyShow = true
      }
    })

    getApply(this.$$route.query.orderId).then(res => {
      if (res.data) {
        this.applyShow = false
        this.applyId = res.data.id
      } else {
        this.tabList.remove(1)
      }
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
    orderStatusFilter (type) {
      return polStatusMap[type].status
    },
    orderStatusTypeFilter (type) {
      return polStatusMap[type].text
    }
  },
  methods: {
    handleTabChange (key, type) {
      if (key === '2') {
        this.$router.push({
          path: '/claim/profile/basic',
          query: { id: this.applyId }
        })
      } else {
        this[type] = key
      }
    },
    apply () {
      this.orderId = this.$route.query.id
      this.$router.push({
        path: '/claim/profile/create',
        query: {
          orderId: this.orderId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

  .order-no{
    font-size:18px
  }

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
</style>
