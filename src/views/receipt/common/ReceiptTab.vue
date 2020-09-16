<template>
  <a-card
    :bordered="false"
    :tabList="tabList"
    :activeTabKey="activeTabKey"
    @tabChange="(key) => {this.activeTabKey = key}">
    <a slot="tabBarExtraContent" href="#"><a-icon type="profile" />列表</a>

  </a-card>
</template>

<script>

export default {
  name: 'ShopTab',
  components: {},
  data () {
    return {
      activeTabKey: '1',
      tabList: [
        {
          key: '1',
          tab: '未授信'
        },
        {
          key: '2',
          tab: '已授信'
        },
        {
          key: '3',
          tab: '授信中'
        }]
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
  @height: 200px;

</style>
