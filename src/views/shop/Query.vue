<template>
  <div style="margin-top:20px">
    <div>
      <a-card style="margin-bottom:20px">
        <a-row style="">
          <a-form layout="vertical">
            <a-col :md="4" :sm="24" :offset="1">
              <a-form-item label="店铺" class="bold-form-item">
                <span class="info red-text">{{shopInfo.allShop}}</span>
              </a-form-item>

            </a-col>
            <a-col :md="4" :offset="1" :sm="24">
              <a-form-item label="销售额" class="bold-form-item">
                <span class="info">{{(shopInfo.saleAmountYear)/10000}}</span>
                <span
                  class="unit info">万</span>
              </a-form-item>
            </a-col>
            <a-col :md="4" :offset="1" :sm="24">
              <a-form-item label="订单数" class="bold-form-item">
                <span class="info">{{shopInfo.allOrders}}</span>
              </a-form-item>
            </a-col>
          </a-form>
        </a-row>
      </a-card>
    </div>

    <query-param/>
    <shop-table/>
  </div>

</template>

<script>

import ShopTable from '@/views/shop/common/ShopTable2'
import QueryParam from '@/views/shop/common/ShopQueryParam'
import {
  shopData
} from '@/api/loan'

export default {
  name: 'ShopQuery',
  components: {
    ShopTable,
    QueryParam
  },
  data () {
    return {
      shopInfo: {}
    }
  },
  filters: {

  },
  created () {
    this.shopData()
  },
  methods: {
    shopData () {
      const _this = this
      shopData().then(res => {
        _this.shopInfo = res.data
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
