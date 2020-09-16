<template>
  <div>

    <a-card class="table" style="margin-buttom:20px">
      <a-form layout="vertical" class="bold-form-item">
        <a-row :gutter="48">
          <a-col :md="2" :sm="2">
            <a-form-item label="总理赔数">
              <span>{{ countApply }}</span>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="4">
            <a-form-item label="总理赔额">
              <span>{{ countApplyAmount }}{{ countApplyAmountUnit }}</span>
            </a-form-item>
          </a-col>

        </a-row>

      </a-form>

    </a-card>

    <table-card />
  </div>
</template>

<script>

import {
  getUserStatistic
} from '@/api/userstatistic'

import TableCard from './TableCard'

export default {
  name: 'TableList',
  components: {
    TableCard
  },
  data () {
    return {
      countApply: null,
      countApplyAmount: null,
      countApplyAmountUnit: null

    }
  },
  filters: {

  },
  created () {
    getUserStatistic().then(res => {
      const result = res.data
      this.countApply = result.countApply || 0
      var countApplyAmount = result.countApplyAmount || 0

      var countApplyAmountUnit = '万'
      if (countApplyAmount < 10000) {
        countApplyAmountUnit = ''
      } else if (countApplyAmount >= 10000) {
        countApplyAmountUnit = '万'
        countApplyAmount = countApplyAmount / 10000
      }

      countApplyAmount = parseInt(countApplyAmount)

      this.countApplyAmountUnit = countApplyAmountUnit
      this.countApplyAmount = countApplyAmount
    })
  },
  methods: {

  }
}
</script>
<style scoped>
  .left,.left .ant-row{
    float:right;
  }

  .bold-form-item label {
    font: bold;
    font-size: 16px;
  }

  .bold-form-item span {
    font: bold;
    font-size: 45px;
  }
</style>
