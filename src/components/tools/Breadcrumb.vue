<template>
  <a-breadcrumb class="breadcrumb">

    <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
      <span
        v-if="item.name === 'index'">
        <img
          :src="favicon"
          style="margin-top: -5px;width: 1%; margin-right:10px"></span>
      <router-link
        v-if="item.name != name && index != 1"
        :to="{ path: item.path === '' ? '/' : item.path }"
      >{{ item.meta.title }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>

</template>

<script>

import config from '@/config/defaultSettings'

export default {
  data () {
    return {
      name: '',
      breadList: [],
      favicon: config.publicPath + '/favicon.ico'
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      this.breadList = []
      // this.breadList.push({name: 'index', path: '/dashboard/', meta: {title: '首页'}})

      this.name = this.$route.name
      this.$route.matched.forEach(item => {
        // item.name !== 'index' && this.breadList.push(item)
        this.breadList.push(item)
      })
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  }
}
</script>

<style scoped>
</style>
