
<template>
  <a-card :bordered="false" style="margin-top:20px">
    <a-steps :direction=" 'vertical'" :current="current" >

      <template v-for="item in operates" >
        <a-step
          :title="item.operation | operationMapFilter"
          :subTitle="item.remark"
          :description="item.optTime"
          :key="item.id">
        </a-step>
      </template>
    </a-steps>
  </a-card>

</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'

import { getList } from '@/api/apply-operate'

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
  name: 'ClaimLog', // 日志
  components: {
    PageView
  },
  mixins: [mixinDevice],
  data () {
    return {
      current: 0,
      operates: []

    }
  },
  created () {
    getList({
      applyId: this.$route.query.id
    }).then((res) => {
      this.current = res.data.length
      this.operates = res.data
    })
  },
  filters: {
    operationMapFilter (operate) {
      return statusMap[operate].text
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
</style>
