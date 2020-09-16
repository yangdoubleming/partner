<template>
  <div>
    <a-card style="margin-bottom:20px">
      <a-row style="">
        <a-form layout="vertical">
          <a-col :md="4" :sm="24" :offset="1">
            <a-form-item label="总笔数" class="bold-form-item">
              <span class="info red-text">{{viewloanStatistic.allCount ? viewloanStatistic.allCount : 0}}</span>
            </a-form-item>

          </a-col>
          <a-col :md="4" :offset="1" :sm="24">
            <a-form-item label="总额度（万）" class="bold-form-item">
              <span class="info">{{viewloanStatistic.authAmount ? (viewloanStatistic.authAmount)/10000 : 0}}</span>
            </a-form-item>
          </a-col>
          <a-col :md="4" :offset="1" :sm="24">
            <a-form-item label="放款余额（万）" class="bold-form-item">
              <span class="info">{{viewloanStatistic.loanBalance ? (viewloanStatistic.loanBalance)/10000 : 0}}</span>
            </a-form-item>
          </a-col>
          <a-col :md="4" :offset="1" :sm="24">
            <a-form-item label="最近到期日" class="bold-form-item">
              <span class="info">{{viewloanStatistic.lasRepaymentDate || '-'}}</span>
            </a-form-item>
          </a-col>
        </a-form>
      </a-row>
    </a-card>
    <loan-table/>
  </div>

</template>

<script>
import {
  loanStatistics
} from '@/api/loan'
import moment from 'moment'
import LoanTable from '@/views/loan/common/LoanTable'

export default {
  name: 'LoanQuery',
  components: {
    LoanTable
  },
  data () {
    return {
      viewloanStatistic: {}
    }
  },
  filters: {

  },
  created () {
    this.loanStatistics()
  },
  methods: {
    loanStatistics () {
      loanStatistics().then(res => {
        this.viewloanStatistic = res.data
        if (this.viewloanStatistic.lasRepaymentDate) {
          this.viewloanStatistic.lasRepaymentDate = moment(this.viewloanStatistic.lasRepaymentDate).format('YYYY-MM-DD')
        } else {
          this.viewloanStatistic.lasRepaymentDate = '-'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .bold-form-item .info {
    font-size: 28px;
    font-weight: 400;
  }
</style>
