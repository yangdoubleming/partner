<template>
  <div style="margin-top:20px">
    <receipt-card/>
    <div style="margin-bottom:10px">
      <a-row>
        <a-alert message="小提示：绑定的与店铺销售额匹配收款金额越高，授权额度及通过率都会显著提高" type="info" show-icon />
      </a-row>
    </div>
    <receipt-table/>
  </div>

</template>

<script>

import ReceiptCard from '@/views/receipt/common/ReceiptCard'
import ReceiptTable from '@/views/receipt/common/ReceiptTable'

export default {
  name: 'LoanReceipt',
  components: {
    ReceiptCard,
    ReceiptTable
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
