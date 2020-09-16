<template>
  <div style="margin-top:20px">
    <a-card style="">
      <a-row style="width:40%;margin-left:30%">
        <a-col :md="24" :sm="24">

          <a-alert
            :closable="true"
            style="margin-bottom: 24px;"
            message="提交成功"

            type="success"
            show-icon
          >
            <!-- <p slot="description">
              Success Description <span style="color: red">Success</span> Description Success Description
            </p> -->
            <p slot="description">
              理赔申请将由 人保财险 理赔人员进行审核，审核通过后将进行打款。如有疑问，请联系 95522-8.
              <br/>注：豆沙包不负责理赔审核及打款
            </p>

          </a-alert>

        </a-col>
      </a-row>

      <a-row :gutter="12" style="" class="btn-group">

        <a-col class="bold" :md="24" :sm="24">
          <a-button style="margin-left: 8px" @click="viewClaim">我要理赔</a-button>
          <a-button style="margin-left: 8px" type="primary" @click="viewClaim">查看理赔</a-button>
        </a-col>

      </a-row>
    </a-card>

  </div>
</template>

<script>
import { ClaimMaterials } from '@/views/claim/detail/page'

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

      queryParam: {}
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
    viewClaim () {
      this.$router.push({
        name: 'claim'
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
    margin-top: 70px;
    text-align:center
  }

  .btn-group button{
    width: 150px;
    margin-left: 30px;
  }
</style>
