<template>
  <a-card style="margin-top:20px">

    <a-row>
      <a-card :bordered="false">
        <div v-for="(item,index) in imageTypes" :key="item.id">
          <div class="title">
            {{ item.docName }}
          </div>
          <a-row>
            <a-upload
              list-type="picture-card"
              :data="{'index':index,'docName':item.docName,'docId':item.docsId}"
              :file-list="fileList[index]"
              :customRequest="customRequest"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList[index].length < 8">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  上传
                </div>
              </div>
            </a-upload>

          </a-row>
        </div>

      </a-card>
    </a-row>

    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>

    <a-row :gutter="12" style="" class="btn-group">

      <a-col class="bold" :md="24" :sm="24">
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
        <a-button style="margin-left: 8px" type="primary" @click="handleOk">提交</a-button>
      </a-col>

    </a-row>

    <a-modal
      title="提交"
      :visible="visible"
      :confirm-loading="submitConfirmLoading"
      @ok="secondStep"
      @cancel="handleSubmitCancel"
    >
      <p>{{ ModalText }}</p>
    </a-modal>

  </a-card>
</template>

<script>
import { getList } from '@/api/product-compensation'
import { uploadFile } from '@/api/file'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
  name: 'Step2',
  components: {
  },
  props: {
    productId: {
      type: [String, Number],
      required: true
    },
    submitVisiable: {
      type: Boolean,
      required: true

    },
    submitConfirmLoading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      previewVisible: false,
      previewImage: '',

      fileList: {},

      imageTypes: [],

      // 提交
      ModalText: '确认提交理赔信息？',
      visible: this.submitVisiable,
      confirmLoading: this.submitConfirmLoading
    }
  },
  created () {
    const that = this
    getList({
      productId: this.productId
    }).then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        that.fileList[index] = []
      }

      that.imageTypes = res.data
      console.log(that.fileList)
    })
  },
  methods: {
    handleOk (e) {
      this.visible = true
    },
    handleSubmitCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
      this.submitConfirmLoading = false
    },
    secondStep () {
      const that = this
      that.$emit('secondStep', that.fileList)
    },
    prevStep () {
      this.$emit('prevStep')
    },
    handleCancel () {
      this.previewVisible = false
    },
    handleChange ({ fileList }) {

    },

    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    customRequest (data) {
      const that = this
      console.log(data)
      const index = data.data.index
      const docName = data.data.docName
      const docId = data.data.docId

      const formData = new FormData()
      formData.append('uploadFile', data.file)
      formData.append('folder', 'apply')

      uploadFile(formData).then((res) => {
        const data = res.data

        that.fileList[index].push({
          uid: -1 - index,
          name: data.name,
          status: 'done',
          url: data.fullFilePath,
          docName,
          docId
        })
      })
    }
  },
  beforeDestroy () {
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
  .upload-list-inline .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .title{
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 16px;
  }
</style>
