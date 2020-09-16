<template>
  <div class="account-settings-info-view">

    <a-form layout="horizontal" :label-col="{ span: 2, offset:1 }" :wrapper-col="{ span: 12,offset:1 }">
      <a-form-item
        label="姓名"
      >
        <span>{{ detail.username }}</span>
        <template v-if="detail.auth === '-1' ||detail.auth === '0' ">
          <a-icon style="margin-left:20px" type="warning" theme="twoTone" two-tone-color="#52c41a" /><span style="color:#52c41a;margin-left:5px">未认证</span>
        </template>
        <template v-else-if="detail.auth === '1'">
          <a-icon style="margin-left:20px" type="exclamation-circle" theme="twoTone"/><span style="margin-left:5px">认证中</span>
        </template>
        <template v-else>
          <a-icon style="margin-left:20px" type="check-circle" theme="twoTone" two-tone-color="#eb2f96" /><span style="color:#eb2f96;margin-left:5px">已认证</span>
        </template>

      </a-form-item>
      <a-form-item
        label="身份证号"
      >
        <span>{{ detail.idCard }}</span>
      </a-form-item>

      <a-form-item
        label="手机号"
      >
        <span>{{ detail.telephone }}</span>
      </a-form-item>
      <a-form-item
        label="邮箱"
      >
        <span>{{ detail.legalPersonEmail }}</span>
      </a-form-item>
      <!--      <a-form-item-->
      <!--        label="婚姻状况"-->
      <!--      >-->
      <!--        <span>已婚</span>-->
      <!--      </a-form-item>-->
      <a-form-item
        label="地址"

      >
        <span>{{ detail.liveAddress }}</span>
      </a-form-item>

    </a-form>

  </div>
</template>

<script>

import { getVO } from '@/api/userinfo'

// const authMap = {
//   '-1': { 'text': '未认证', 'coler': '#C44B34' },
//   '0': { 'text': '未认证', 'coler': '#C44B34' },
//   '1': { 'text': '认证中', 'coler': '#C4A83E' },
//   '2': { 'text': '已认证', 'coler': '#52c41a' }
// }

export default {
  components: {

  },
  data () {
    return {
      // cropper
      preview: {},
      detail: {},
      option: {

      }
    }
  },
  created () {
    getVO()
      .then(res => {
        var data = res.data
        if (data.liveAddress && data.registration !== '') {
          var liveAddress = JSON.parse(data.liveAddress)
          data.liveAddress = liveAddress.province + liveAddress.city + liveAddress.area + liveAddress.Street
        }
        this.detail = res.data
      })
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
