<template>
  <a-card
    :bordered="false"
    :tabList="tabList"
    :activeTabKey="activeTabKey"
    @tabChange="(key) => tabChange(key)">
    <div slot="tabBarExtraContent" style="padding-left:10px">

      <!-- <a href="#"><a-icon type="profile" />列表</a> -->
    </div>

  </a-card>
</template>

<script>

export default {
  name: 'ShopTab',
  components: {},
  props: ['tChildren'],
  data () {
    return {
      activeTabKey: '0',
      tabList: [
        {
          key: '0',
          tab: '未授信'
        },
        {
          key: '2',
          tab: '已授信'
        },
        {
          key: '1',
          tab: '授信中'
        }]
    }
  },
  filters: {

  },
  created () {
    this.refresh({ loanProductStatus: 0 })
  },
  methods: {
    tabChange (key) {
      this.activeTabKey = key
      this.refresh({ loanProductStatus: key })
    },
    refresh (obj) {
      this.tChildren(obj)
    }
  }
}
</script>

<style lang="less" scoped>
  @height: 200px;

</style>
