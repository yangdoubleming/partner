<template>
  <div>

    <a-card :bordered="false" style="margin-bottom:20px">
      <a-steps class="steps" :current="0">
        <a-step title="查询保单" />
        <a-step title="填写信息" />
        <a-step title="提交材料" />
        <a-step title="提交保司审核" />
      </a-steps>

    </a-card>

    <table-card/>
  </div>
</template>

<script>

import TableCard from '@/views/insurancelist/TableCard'

export default {
  name: 'TableList',
  components: {
    TableCard
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
<style scoped>
  .left,.left .ant-row{
    float:right;
  }
</style>
