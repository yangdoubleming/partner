<template>
  <div style="margin-top:40px">

    <a-row style="width:40%;margin-left:30%">
      <a-col :md="24" :sm="24">

        <a-alert
          :closable="true"
          style="margin-bottom: 24px;"
          message="修改密码成功"

          type="success"
          show-icon
        >
          <!-- <p slot="description">
              Success Description <span style="color: red">Success</span> Description Success Description
            </p> -->
          <p slot="description">
            您可以使用新密码登录了!
          </p>

        </a-alert>

      </a-col>
    </a-row>

    <a-row :gutter="12" class="btn-group">
      <img
        :src="completeImg"
        draggable="false"
        style=""/>

    </a-row>
    <a-row :gutter="12" style="" class="btn-group">

      <a-col class="bold" :md="24" :sm="24">
        <a-button style="margin-left: 8px" type="primary" @click="viewUser">完成</a-button>
      </a-col>

    </a-row>

  </div>
</template>

<script>
import { ClaimMaterials } from '@/views/claim/detail/page'

import config from '@/config/defaultSettings'

export default {
  name: 'Step2',
  components: {
    ClaimMaterials
  },
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0,
      detail: {
        polstatus: 1
      },
      queryParam: {},
      completeImg: config.publicPath + '/icons/complete.png'
    }
  },
  methods: {
    nextStep () {
      const that = this
      that.$emit('nextStep')
    },
    prevStep () {
      this.$emit('prevStep')
    },
    viewUser () {
      this.$router.push({
        name: 'settings'
      })
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
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
    margin-top: 20px;
    text-align:center
  }

  .btn-group button{
    width: 150px;
    margin-left: 30px;
  }
</style>
