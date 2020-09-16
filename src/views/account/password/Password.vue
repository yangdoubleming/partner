
<template>
  <div>

    <a-card :bordered="false">
      <a-steps class="steps" :current="currentTab">
        <a-step title="身份证明" />
        <a-step title="修改密码" />
        <a-step title="完成" />
      </a-steps>

    </a-card>

    <a-card :bordered="false" style="margin-top:40px">
      <div class="content">
        <step1 v-if="currentTab === 0" @nextStep="nextStep" @prevStep="prevStep"/>
        <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep"/>
        <step3 v-if="currentTab === 2" @nextStep="nextStep" @prevStep="prevStep" @finish="finish"/>
      </div>

    </a-card>

  </div>

</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

export default {
  name: 'ClaimDetail',
  components: {
    PageView,
    Step2,
    Step3,
    Step1
  },
  mixins: [mixinDevice],
  data () {
    return {
      currentTab: 0
    }
  },
  filters: {

  },
  created () {
    const currentTab = this.$route.query.currentTab
    console.log(currentTab)
    if (currentTab) {
      this.nextStep()
    }
  },
  methods: {

    // handler
    nextStep () {
      console.log('nextSTep')
      if (this.currentTab < 4) {
        this.currentTab += 1
      }
    },
    prevStep () {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish () {
      this.currentTab = 0
    }
  }
}
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }

  .content {

  }
</style>
