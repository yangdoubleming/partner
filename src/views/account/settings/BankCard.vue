<template>
  <div class="account-settings-info-view">

    <a-card style="width:300px;    border-radius: 10px; ">
      <a slot="extra" @click="modify">修改</a>
      <div>
        <p>开户行：{{ detail.openingBank }}</p>
        <p>姓名：{{ detail.legalPersonName }}</p>
        <p>银行卡号：{{ detail.openingBank }}</p>
      </div>
    </a-card>

    <a-modal
      title="修改"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"

      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <!-- step1 -->
          <div>
            <a-form-item
              label="开户行"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select v-decorator="['openingBank', {initialValue: '中国工商银行', rules: [{required: true,message: '请选择银行!'}]}]" style="width: 100%">>
                <a-select-option value="中国工商银行">中国工商银行</a-select-option>
                <a-select-option value="中国建设银行">中国建设银行</a-select-option>
                <a-select-option value="中国银行">中国银行</a-select-option>
                <a-select-option value="中国农业银行">中国农业银行</a-select-option>
                <a-select-option value="交通银行">交通银行</a-select-option>
                <a-select-option value="招商银行">招商银行</a-select-option>
                <a-select-option value="中信银行">中信银行</a-select-option>
                <a-select-option value="浦发银行">浦发银行</a-select-option>
                <a-select-option value="兴业银行">兴业银行</a-select-option>
                <a-select-option value="民生银行">民生银行</a-select-option>
                <a-select-option value="中国邮政银行">中国邮政银行</a-select-option>
                <a-select-option value="中国光大银行">中国光大银行</a-select-option>
                <a-select-option value="平安银行">平安银行</a-select-option>
                <a-select-option value="华夏银行">华夏银行</a-select-option>
                <a-select-option value="中国人民银行">中国人民银行</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="银行卡号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input v-decorator="['openingBankAccount', {rules: [{required: true,message: '请输入银行卡号!'}]}]"></a-input>
            </a-form-item>
          </div>

        </a-form>
      </a-spin>
    </a-modal>

  </div>
</template>

<script>
import { getVO } from '@/api/userinfo'
import { updateBank } from '@/api/company'

export default {
  components: {

  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      detail: {},
      visible: false,
      confirmLoading: false,

      form: this.$form.createForm(this)
    }
  },
  created () {
    this.getVO()
  },
  methods: {
    getVO () {
      getVO()
        .then(res => {
          this.detail = res.data
        })
    },
    handleSubmit () {
      const { form: { validateFields } } = this

      // last step
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          const params = Object.assign({}, values)
          params.id = this.detail.id

          updateBank(params).then(res => {
            this.$message.info('修改成功')
            this.visible = true
            this.getVO()
          }).catch(() => {
            this.confirmLoading = false
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    modify () {
      if (!this.detail.id) {
        this.$message.info('不存在企业信息')
        return
      }
      this.visible = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
