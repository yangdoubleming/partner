<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">

    <!-- 保险信息 -->

    <a-card :bordered="false" class="table">
      <a-form layout="vertical" class="bold-form-item">
        <a-row :gutter="48">
          <a-col :md="2" :sm="2">
            <a-form-item label="总保单数">
              <span>{{ insureDetail.countOrder }}</span>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="4">
            <a-form-item label="总保额">
              <span>{{ insureDetail.countCompensationAmount }}</span><span class="unit">{{ insureDetail.countCompensationAmountUnit }}</span>
            </a-form-item>
          </a-col>

        </a-row>

      </a-form>

    </a-card>

    <table-card style="margin-top:20px"></table-card>

  </div>

</template>

<script>
import moment from 'moment'
import TableCard from './TableCard'
import {
  STable,
  Ellipsis
} from '@/components'

import {
  getUserStatistic
} from '@/api/userstatistic'

const statusMap = {
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
  name: 'TableList',
  components: {
    STable,
    TableCard,
    Ellipsis
  },
  data () {
    return {

      insureDetail: {

      }
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    getUserStatistic().then(res => {
      const result = res.data
      var countOrder = 0
      var countCompensationAmount = 0
      result.list.map((detail) => {
        countOrder += detail.countOrder
        countCompensationAmount += detail.countCompensationAmount
      })

      var countCompensationAmountUnit = '万'
      if (countCompensationAmount < 10000) {
        countCompensationAmountUnit = ''
        countCompensationAmount = countCompensationAmount / 100
      } else if (countCompensationAmount >= 10000) {
        countCompensationAmountUnit = '万'
        countCompensationAmount = countCompensationAmount / 100 / 10000
      }

      countCompensationAmount = parseInt(countCompensationAmount)

      this.insureDetail = {
        countOrder,
        countCompensationAmount,
        countCompensationAmountUnit
      }
    })
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    sign () {

    }
  }
}
</script>

<style lang="less" scoped>
  @height: 326px;
  @width: 100px;

  .insure-img {
    width: 50%;
    margin-left: 20%;
    margin-top: 40px;
  }

  .unit {
    margin-left: 5px;
    font-size: 16px !important;
  }

  .bold-form-item label {
    font: bold;
    font-size: 16px;
  }

  .bold-form-item span {
    font: bold;
    font-size: 45px;
  }

  .half-card-top {
    height: @height/ 2;

  }

  .half-card-buttom {
    height: @height/ 2 - 10px;
    margin-top: 10px;
  }

  .half-card-top button,
  .half-card-buttom button {
    width: @width;
  }

  .card {
    height: @height;
  }

  .left,.left .ant-row{
    float:right;
  }

  .unit {
    margin-left: 5px;
    font-size: 16px !important;
  }
</style>
