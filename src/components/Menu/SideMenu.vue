<template>
  <transition name="slide-fade">
    <div v-show="!collapsed" style="z-index:10000">
      <a-layout-sider
        :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
        width="256px"
        :collapsible="collapsible"
        v-model="collapsed"
        :trigger="null">
        <logo />
        <s-menu
          :collapsed="collapsed"
          :menu="menus"
          :theme="theme"
          :mode="mode"
          @onSelect="onSelect"
          style="padding: 16px 0px;"></s-menu>
      </a-layout-sider>
    </div>
  </transition>
</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('onSelect')
    },
    onCollapse (collapsed, type) {
      console.log(collapsed, type)
    }
  }
}
</script>
<style scoped>
  .ant-layout-sider {
    display: flex;
    position: absolute;
    top: 64px;
    bottom: 0px;
    left: 0px;
    z-index: 998;
    right: 0px;
    flex: 0 0 256px;
    height: 300px;
    min-height: 85vh;
  }

  .ant-layout-sider-collapsed{
    display: none;
     position: fixed;
    top: 50px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: 998;
    width: 0px;
    overflow: hidden;
  }

  .sider .ant-layout-sider-children{
    height: 300px;
  }

  .slide-fade-enter-active {
    transition: all 1s ease;
  }
  .slide-fade-leave-active {
    transition: all 2s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(-10px);
    opacity: 0;
  }
</style>
