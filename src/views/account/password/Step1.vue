<template>

  <div >

    <a-form style="max-width: 500px; margin: 40px auto 0;">

      <a-form-item
        label="手机号"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <label>{{ userName }}</label>
      </a-form-item>
      <a-form-item
        label="验证码"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-group
          style="display: flex; vertical-align: middle;"
          :compact="true"
        >
          <a-input
            size="large"
            type="text"
            placeholder="验证码"
            v-model="CodeVerify"
          >

          </a-input>
          <a-button
            class="getCaptcha"
            size="large"
            type="primary"
            ghost
            :disabled="state.smsSendBtn"
            @click.stop.prevent="getCaptcha"
            v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"
            style="margin-left:10px;    border-radius: 4px;"
          ></a-button>
        </a-input-group>
      </a-form-item>

      <a-row style="">
        <a-alert
          :closable="true"
          style="margin-bottom: 24px;"
          message="没收到短信验证码？"

          type="warning"
          show-icon
        >
          <p slot="description">
            1、网络通讯异常可能会造成短信丢失，请重新获取或稍后再试。
            <br/>2、请核实手机是否已欠费停机，或者屏蔽了系统短信。
            <br/>3、如果手机已丢失或停用， 请选择其他验证方式 。
            <br/>4、您也可以尝试将SIM卡移动到另一部手机，然后重试。
          </p>

        </a-alert>
      </a-row>

      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>

  </div>

</template>

<script>

import { sendPhoneCodeVerify, checkPhoneCodeVerify, getUserName } from '@/api/userinfo' // sendPhoneCodeVerify ,

export default {
  name: 'Step2',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      phoneNo: '18372710125',
      CodeVerify: '',
      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtn: false,
      userName: ''
    }
  },
  methods: {
    nextStep () {
      if (this.CodeVerify === null || this.CodeVerify === '') {
        this.$notification['error']({
          message: '错误',
          description: '验证码不能为空！',
          duration: 4
        })
        return
      }
      checkPhoneCodeVerify(this.CodeVerify).then((res) => {
        if (res.code === 200) {
          this.$emit('nextStep')
        }
      }).catch((err) => {
        this.$notification['error']({
          message: '错误',
          description: err.response.data.message,
          duration: 4
        })
      })
    },
    prevStep () {
      this.$emit('prevStep')
    },
    getCaptcha: function (e) {
      e.preventDefault()
      this.state.smsSendBtn = true

      const interval = window.setInterval(() => {
        if (this.state.time-- <= 0) {
          this.state.time = 60
          this.state.smsSendBtn = false
          window.clearInterval(interval)
        }
      }, 1000)

      const hide = this.$message.loading('验证码发送中..', 0)

      sendPhoneCodeVerify().then(res => {
        if (res.code === 200) {
          setTimeout(hide, 2500)
          this.$notification['success']({
            message: '提示',
            description: res.message,
            duration: 8
          })
          this.state.smsSendBtn = true
        } else {
          setTimeout(hide, 1)
          clearInterval(interval)
          this.state.time = 60
          this.state.smsSendBtn = true
          this.$notification['error']({
            message: '错误',
            description: res.message,
            duration: 4
          })
          this.state.smsSendBtn = true
        }
      }).catch(err => {
        setTimeout(hide, 1)
        clearInterval(interval)
        this.state.time = 60
        this.$notification['error']({
          message: '错误',
          description: err.response.data.message,
          duration: 4
        })
        this.state.smsSendBtn = false
      })
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  filters: {

  },
  created () {
    getUserName().then((res) => {
      this.userName = res.data.userName
    })
  }
}
</script>

<style lang="less" scoped>

  @height: 300px;
  @width: 100px;
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }

  .card .ant-row{
    font-size: 16px;
    height: 60px;
  }

    .card .ant-row img{
    height: 40px;
  }

  .half-card-top {
    height: @height/ 2;

  }

  .card {
    height: @height;
  }

  .card2{
    height: @height + 140px!important;
  }

  .card .button{
    width:@width;
  }

  .bz-group div{
    text-align: center;
    margin-top: 43px;
  }
  .bz-group button{
    width: 100px;
    margin-left: 30px;
  }

  .table {
    margin-top: 30px;
  }
    .bold label{
    font-weight: bold;
  }

  .btn-group{
    margin-top: 70px;
    text-align:center
  }

  .btn-group button{
    width: 150px;
    margin-left: 30px;
  }
</style>
