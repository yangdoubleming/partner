<template>
  <div>
    <home-card/>
    <loan-table/>
  </div>

</template>

<script>

import HomeCard from './HomeCard'
import LoanTable from '@/views/loan/common/LoanTable'

export default {
  name: 'LoanHome',
  components: {
    LoanTable,
    HomeCard
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

</style>
