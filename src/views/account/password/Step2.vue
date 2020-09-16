<template>

  <div >

    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">

      <a-form-item
        label="请输入密码"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >

        <a-input
          size="large"
          type="text"
          placeholder="请输入密码"
          v-model="password">

        </a-input>

      </a-form-item>
      <a-form-item
        label="请确认密码"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >

        <a-input
          size="large"
          type="text"
          placeholder="请确认密码"
          v-model="confirmPassword">

        </a-input>

      </a-form-item>

      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>

  </div>

</template>

<script>

import { resetPassword } from '@/api/userinfo'

export default {
  name: 'Step2',
  data () {
    return {
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    nextStep () {
      // eslint-disable-next-line eqeqeq
      if (this.password !== this.confirmPassword) {
        this.$notification['error']({
          message: '错误',
          description: '两次密码输入不一致！',
          duration: 4
        })
        return
      }
      if (this.password == null || this.password === '') {
        this.$notification['error']({
          message: '错误',
          description: '密码不能为空！',
          duration: 4
        })
        return
      }
      if (this.confirmPassword == null || this.confirmPassword === '') {
        this.$notification['error']({
          message: '错误',
          description: '确认密码不能为空！',
          duration: 4
        })
        return
      }
      resetPassword(this.password, this.confirmPassword).then((res) => {
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
    }
  },
  filters: {

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
