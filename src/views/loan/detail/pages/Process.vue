
<template>
  <div class="" style="margin-top:20px">
    <a-card :bordered="false" title="流程进度">
      <a-steps :direction=" 'vertical'" :current="current" >
        <template v-for="item in operates" >
          <a-step
            :title="item.title"
            :description="item.optTime"
            :key="item.id">
          </a-step>
        </template>
      </a-steps>
    </a-card>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'

import {
  getLoanById
} from '@/api/loan'

const statusMap = {

}

export default {
  name: 'ProcessLog', // 日志
  components: {
    PageView
  },
  mixins: [mixinDevice],
  data () {
    return {
      current: 0,
      operates: [{
        'title': '资料未完成'
      }, {
        'title': '审核中'
      }, {
        'title': '已终止'
      }, {
        'title': '放款中'
      }, {
        'title': '还款中'
      }, {
        'title': '已结清'
      }]
    }
  },
  created () {
    this.getLoanById(this.$route.query.id)
  },
  filters: {
    operationMapFilter (operate) {
      return statusMap[operate].text
    }
  },
  methods: {
    getLoanById (id) {
      const _this = this
      getLoanById(
        id
      ).then(res => {
        _this.current = Number(res.data.status)
      })
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
