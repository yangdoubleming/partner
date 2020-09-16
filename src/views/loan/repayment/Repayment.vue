<template>
  <div>
    <a-card style="margin-bottom:20px">
      <a-row style="">
        <a-form layout="vertical">
          <a-col :md="4" :sm="24" :offset="1">
            <a-form-item label="在贷笔数" class="bold-form-item">
              <span class="info red-text">5</span>
            </a-form-item>

          </a-col>
          <a-col :md="4" :offset="1" :sm="24">
            <a-form-item label="在贷余额" class="bold-form-item">
              <span class="info">230</span>
              <span
                class="unit info">万</span>
            </a-form-item>
          </a-col>
        </a-form>
      </a-row>
    </a-card>
    <loan-table/>
  </div>

</template>

<script>

import LoanTable from '@/views/loan/common/LoanTable'

export default {
  name: 'LoanExtract',
  components: {
    LoanTable
  },
  data () {
    return {
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
    .bold-form-item .info {
    font-size: 28px;
    font-weight: 400;
  }
</style>
