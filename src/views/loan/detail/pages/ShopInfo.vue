<template>
  <div style="margin-top:20px">
    <shop-card/>
    <shop-alert/>
    <!-- <shop-tab :tChildren='tChildren'/> -->
    <shop-table ref='children'/>
  </div>

</template>

<script>

import ShopCard from '@/views/shop/common/ShopCard'
import ShopTable from '@/views/shop/common/ShopTable'
import ShopTab from '@/views/shop/common/ShopTab'
import ShopAlert from '@/views/shop/common/ShopAlert'

export default {
  name: 'ShopInfo',
  components: {
    ShopCard,
    ShopTab,
    ShopAlert,
    ShopTable
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
    tChildren (obj) {
      this.$refs.children.loadData(obj)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
