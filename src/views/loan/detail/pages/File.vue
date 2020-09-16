<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main" style="margin-top:20px">
    <a-card
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="(key) => {this.activeTabKey = key}">

      <div v-if="activeTabKey === '1'">
        <a-row :gutter="48" class="file-row" >
          <a-col :md="6" v-for="item in companyImages" :key="item.title">
            <div>{{ item.title }}</div>
            <a-row>
              <a-col :md="12" :offset="2" v-for="image in item.images" :key="image.url">
                <a-icon type="link" /><a :href="image.url" target="_blank">{{ image.name }}</a>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>

      <div v-if="activeTabKey === '2'">
        <a-row :gutter="48" class="file-row">
          <a-col :md="6" v-for="item in personImages" :key="item.title">
            <div>{{ item.title }}</div>

            <a-row style="height:100px">
              <a-col :md="10" :offset="2" v-for="image in item.images" :key="image.url">
                <a-icon type="link" /><a :href="image.url" target="_blank">{{ image.name }}</a>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>

</template>

<script>
import {
  companyDocument
} from '@/api/loan'
import { picUrl } from '@/api/config'
export default {
  name: 'LoanFile',
  components: {
  },
  data () {
    return {
      imgUrl: picUrl,
      tabList: [
        {
          key: '1',
          tab: '企业文件'
        },
        {
          key: '2',
          tab: '个人文件'
        }
      ],
      companyImages: [{
        type: '0',
        title: '其他补充资料',
        images: []
      }, {
        type: '1',
        title: '营业执照副本',
        images: []
      }, {
        type: '2',
        title: '开户许可证',
        images: []
      }, {
        type: '3',
        title: '最新公司章程',
        images: []
      }, {
        type: '4',
        title: '实际控制人及其配偶的身份证正反面',
        images: []
      }, {
        type: '5',
        title: '企业国税纳税证明',
        images: []
      }, {
        type: '6',
        title: '现金流量表及主要会计科目明细',
        images: []
      }, {
        type: '7',
        title: '房产证明',
        images: []
      }, {
        type: '8',
        title: '最近12个月资金流水',
        images: []
      }, {
        type: '9',
        title: '企业征信报告',
        images: []
      }, {
        type: '10',
        title: '实际控制人及所控制企业的担保书',
        images: []
      }],
      personImages: [{
        type: '11',
        title: '法定代表人身份证正反面',
        images: []
      }, {
        type: '12',
        title: '配偶身份证正反面',
        images: []
      }, {
        type: '13',
        title: '法人代表房产证明',
        images: []
      }, {
        type: '14',
        title: '法人征信报告',
        images: []
      }, {
        type: '15',
        title: '法人配偶征信报告',
        images: []
      }, {
        type: '16',
        title: '法人代表及配偶的担保书',
        images: []
      }],
      activeTabKey: '1'
    }
  },
  filters: {
  },
  created () {
    const ciCompanyId = this.$route.query.ciCompanyId
    this.getLoanUserStatistic(ciCompanyId)
  },
  methods: {
    addFile (item) {
      this.$message.info(item.title)
    },
    getLoanUserStatistic (ciCompanyId) {
      companyDocument(ciCompanyId).then(res => {
        res.data.records.forEach(element => {
          this.companyImages.forEach(item => {
            if (String(element.type) === item.type) {
              if (element.documentPath) {
                item.images.push({ url: this.imgUrl + element.documentPath, name: '图片.jpg' })
              }
            }
          })
          this.personImages.forEach(item => {
            if (String(element.type) === item.type) {
              if (element.documentPath) {
                item.images.push({ url: this.imgUrl + element.documentPath, name: '图片.jpg' })
              }
            }
          })
          console.log(this.companyImages)
          console.log(this.personImages)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .file-row{
        height:100px;
    }
    .file-row > .ant-col{
        margin-top:30px
    }

    .file-row .ant-col {
        margin-top:20px
    }
</style>
