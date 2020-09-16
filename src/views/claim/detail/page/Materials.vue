
<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main" style="margin-top:20px" >

    <a-row>
      <a-card :bordered="false">
        <div
          v-for="item in fileList"
          :key="item.id">
          <div class="title">
            {{ item.docName }}
          </div>
          <a-row>
            <div v-for="(image) in item.files" :key="image.id">
              <a-col :md="4">
                <a-icon type="link" /><a :href="image.path" target="_blank">{{ item.docName }}</a></a-col>
            </div>
          </a-row>
        </div>
      </a-card>
    </a-row>

    <a-modal
      :visible="
        previewVisible"
      :footer="null"
      @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>

</template>

<script>
import { getList } from '@/api/indemnify-document'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
  name: 'ClaimMaterials', // 概览
  components: {

  },
  props: { productId: {
    type: String,
    default: ''
  } },
  data () {
    return {
      fileList: [],
      previewVisible: false,
      previewImage: '',
      imageTypes: []
    }
  },
  filters: {

  },
  created () {
    const id = this.$route.query.id
    getList({
      applyId: id
    }).then((res) => {
      const data = res.data
      const fileList = []
      data.map((item) => {
        const docName = item.docName

        var hasDocName = false
        fileList.map((file) => {
          if (file.docName === docName) {
            file.files.push(item)
            hasDocName = true
          }
        })

        if (hasDocName === false) {
          const newFile = {
            docName: docName,
            files: [item]
          }

          fileList.push(newFile)
        }
      })

      this.fileList = fileList
      console.log(fileList)
    })
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    }
  }
}
</script>

<style scoped>

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
