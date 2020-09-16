<template>
  <a-row :gutter="24">
    <a-col :span="8" v-for="(item,i) in products" :key="i" style="margin-top:20px">
      <apply
        :title="item.title"
        :productUrl="item.productUrl"
        :description="item.description"
        :productName="item.productName"
        :items="item.items"

      />
    </a-col>

  </a-row>

</template>

<script>

import Apply from '@/components/Apply'

export default {
  name: 'LoanApply',
  components: {
    Apply
  },
  data () {
    return {
      products: [
        {
          title: '邮储银行 跨运保',
          productName: '产品名称',
          productUrl: '产品名称',
          description: '适用于深圳企业申请，不超过300万，专项用于支付运费，基于太平洋财险出具的贷款信用保证保险发放的普惠金融贷款。',
          items: [{
            title: '贷款余额',
            value: '300万'
          }, {
            title: '利率',
            value: '8.5%'
          }, {
            title: '贷款期限',
            value: '6个月'
          }]
        },
        {
          title: '宁波人保 跨商保',
          productName: '产品名称',
          productUrl: '产品名称',
          description: '适用于宁波企业申请，不超过300万，贷款用于企业日常经营，基于宁波人保财险出具的贷款信用保证保险发放的普惠金融贷款。',
          items: [{
            title: '贷款余额',
            value: '300万'
          }, {
            title: '利率',
            value: '9%'
          }, {
            title: '贷款期限',
            value: '12个月'
          }]
        },
        // {
        //   title: '民生易贷 提前贷',
        //   productName: '产品名称',
        //   productUrl: '产品名称',
        //   description: '适用全国企业申请，不超过20万，线上申请，流程简单，放款方式灵活。',
        //   items: [{
        //     title: '贷款余额',
        //     value: '20万'
        //   }, {
        //     title: '利率',
        //     value: '18%'
        //   }, {
        //     title: '贷款期限',
        //     value: '3个月'
        //   }]
        // },
        {
          title: '汇丰银行 跨商贷',
          productName: '产品名称',
          productUrl: '产品名称',
          description: '适用企业申请，不低于500万，近1年累计销售额大于8000万人民币。放款方式灵活。',
          items: [{
            title: '贷款余额',
            value: '500万'
          }, {
            title: '利率',
            value: '5.3%'
          }, {
            title: '贷款期限',
            value: '6个月'
          }]
        }
      ]
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
