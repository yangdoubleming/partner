<template>
  <div class="account-settings-info-view">

    <a-form layout="horizontal" :label-col="{ span: 2 }" :wrapper-col="{ span: 12,offset:1 }">
      <a-form-item
        label="登录密码"
      >

        <a-row>
          <a-col :md="{span: 17}">
            <span>建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码</span>
          </a-col>

          <a-col :md="{span: 6,offset:1}">
            <a-icon type="info-circle" theme="twoTone" two-tone-color="rgba(255, 184, 97, 1)" />
            <span style="color:#52c41a;margin-left:5px">未设置</span>
            <a-divider type="vertical" />
            <a href="#" @click="setupUser">设置</a>
          </a-col>
        </a-row>

      </a-form-item>
      <a-form-item
        label="手机绑定"
      >

        <a-row v-if="detail.phone === '' ">
          <a-col :md="{span: 17}">
            <span>绑定手机号</span>
          </a-col>

          <a-col :md="{span: 6,offset:1}">
            <a-icon type="info-circle" theme="twoTone" two-tone-color="rgba(255, 184, 97, 1)" />
            <span style="color:#52c41a;margin-left:5px">未设置</span>
            <a-divider type="vertical" />
            <a href="#">设置</a>
          </a-col>
        </a-row>
        <a-row v-else>
          <a-col :md="{span: 17}"><span>{{ detail.telephone }}</span>
          </a-col>

          <a-col :md="{span: 6,offset:1}">
            <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
            <span style="color:#52c41a;margin-left:5px">已绑定</span>
            <!-- <a-divider type="vertical" />
            <a href="#">修改</a> -->
          </a-col>
        </a-row>
      </a-form-item>
      <!--      <a-form-item-->
      <!--        label="备用邮箱"-->
      <!--      >-->
      <!--        <a-row v-if="detail.email === '' ">-->
      <!--          <a-col :md="{span: 17}">-->
      <!--            <span>备用邮箱绑定后可以用来接收放款通知、还款提醒等重要信息</span>-->
      <!--          </a-col>-->

      <!--          <a-col :md="{span: 6,offset:1}">-->
      <!--            <a-icon type="info-circle" theme="twoTone" two-tone-color="rgba(255, 184, 97, 1)" />-->
      <!--            <span style="color:#52c41a;margin-left:5px">未设置</span>-->
      <!--            <a-divider type="vertical" />-->
      <!--            <a href="#">设置</a>-->
      <!--          </a-col>-->
      <!--        </a-row>-->
      <!--        <a-row v-else>-->
      <!--          <a-col :md="{span: 17}">-->
      <!--            <span>{{ detail.email }}</span>-->
      <!--          </a-col>-->

      <!--          <a-col :md="{span: 6,offset:1}">-->
      <!--            <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />-->
      <!--            <span style="color:#52c41a;margin-left:5px">已设置</span>-->
      <!--            <a-divider type="vertical" />-->
      <!--            <a href="#">修改</a>-->
      <!--          </a-col>-->
      <!--        </a-row>-->
      <!--      </a-form-item>-->

    </a-form>

  </div>
</template>

<script>

import { getVO } from '@/api/userinfo'

export default {
  components: {

  },
  data () {
    return {
      detail: {
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
    setupUser () {
      this.$router.push({
        name: 'Password'
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
