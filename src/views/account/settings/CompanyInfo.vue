<template>
  <div class="account-settings-info-view">

    <div class="item">
      <a-form layout="horizontal" :label-col="{ span: 3, offset:1 }" :wrapper-col="{ span: 19, offset:1 }">
        <div class="account-settings-info-title"><span class="title">基本信息</span></div>
        <a-form-item
          label="企业名称"
        >
          <span>{{ detail.companyName }}</span>
        </a-form-item>
        <a-form-item
          label="统一社会信用代码"
        >
          <span>{{ detail.creditCode }}</span>
        </a-form-item>

        <a-form-item
          label="营业执照"
        >
          <a-icon type="link" theme="twoTone" /><a :href="detail.tradingCertificate" v-if="detail.tradingCertificate" target="_blank" style="color:rgb(25, 143, 254);">营业执照副本.png</a>
        </a-form-item>
        <a-form-item
          label="经营年限"
        >
          <a-radio-group v-model="detail.businessLife">
            <a-radio-button value="0">
              &lt;1年
            </a-radio-button>
            <a-radio-button value="1">
              1-2年
            </a-radio-button>
            <a-radio-button value="2">
              3-4年
            </a-radio-button>
            <a-radio-button value="3">
              4-5年
            </a-radio-button>
            <a-radio-button value="4">
              >5年
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <!--        <a-form-item-->
        <!--          label="企业规模"-->

        <!--        >-->
        <!--          <a-radio-group default-value="a">-->
        <!--            <a-radio-button value="a">-->
        <!--              &lt;20人-->
        <!--            </a-radio-button>-->
        <!--            <a-radio-button value="b">-->
        <!--              20-50人-->
        <!--            </a-radio-button>-->
        <!--            <a-radio-button value="c">-->
        <!--              50-100人-->
        <!--            </a-radio-button>-->
        <!--            <a-radio-button value="d">-->
        <!--              100-500人-->
        <!--            </a-radio-button>-->
        <!--            <a-radio-button value="f">-->
        <!--              >500人-->
        <!--            </a-radio-button>-->
        <!--          </a-radio-group>-->
        <!--        </a-form-item>-->
        <a-form-item
          label="地址"

        >
          <span>{{ detail.registration }}</span>
        </a-form-item>

      </a-form>

    </div>

    <!--    <div class="item">-->
    <!--      <a-form layout="horizontal" :label-col="{ span: 2 , offset:1}" :wrapper-col="{ span: 20,offset:1 }">-->
    <!--        <div class="account-settings-info-title"><span class="title">个人信息</span></div>-->
    <!--        <a-form-item-->
    <!--          label="姓名"-->
    <!--        >-->
    <!--          <span>张三</span><a-icon style="margin-left:20px" type="check-circle" theme="twoTone" two-tone-color="#52c41a" /><span style="color:#52c41a;margin-left:5px">已认证</span>-->
    <!--        </a-form-item>-->
    <!--        <a-form-item-->
    <!--          label="身份证号"-->
    <!--        >-->
    <!--          <span>1010101100010101</span>-->
    <!--        </a-form-item>-->

    <!--        <a-form-item-->
    <!--          label="手机号"-->
    <!--        >-->
    <!--          <span>13812121212</span>-->
    <!--        </a-form-item>-->
    <!--        <a-form-item-->
    <!--          label="邮箱"-->
    <!--        >-->
    <!--          <span>me@mail.com</span>-->
    <!--        </a-form-item>-->
    <!--        <a-form-item-->
    <!--          label="婚姻状况"-->

    <!--        >-->
    <!--          <span>已婚</span>-->
    <!--        </a-form-item>-->
    <!--        <a-form-item-->
    <!--          label="地址"-->

    <!--        >-->
    <!--          <span>广东省深圳市福田区凯丰路10号1098</span>-->
    <!--        </a-form-item>-->

    <!--      </a-form>-->
    <!--    </div>-->

    <div class="item">
      <a-form layout="horizontal" :label-col="{ span: 3, offset:1 }" :wrapper-col="{ span: 19,offset:1 }">
        <div class="account-settings-info-title"><span class="title">经营状况</span></div>
        <a-form-item
          label="地址"
        >
          <span>{{ detail.workAddress }}</span>
        </a-form-item>
        <a-form-item
          label="经营平台"
        >
          <a-checkbox-group
            v-model="detail.shopType"
            name="checkboxgroup"
            @change="onChange" >
            <a-row>
              <a-col :span="3">
                <a-checkbox value="1">
                  Amazon
                </a-checkbox>
              </a-col>
              <a-col :span="3">
                <a-checkbox value="2">
                  eBay
                </a-checkbox>
              </a-col>
              <a-col :span="3">
                <a-checkbox value="3">
                  AliExpress
                </a-checkbox>
              </a-col>
              <a-col :span="3">
                <a-checkbox value="4">
                  Wish
                </a-checkbox>
              </a-col>
              <a-col :span="3">
                <a-checkbox value="5">
                  Lazada
                </a-checkbox>
              </a-col>
              <a-col :span="3">
                <a-checkbox value="6">
                  Shop
                </a-checkbox>

              </a-col>
              <a-col :span="3">
                <a-checkbox value="7">
                  其它
                </a-checkbox>

              </a-col>
              <a-col :span="3">
                <a-input placeholder="请输入" />

              </a-col>
            </a-row>
          </a-checkbox-group>

        </a-form-item>

        <a-form-item
          label="年销售规模"
        >
          <a-radio-group v-model="detail.salesVolume">
            <a-radio-button value="1">
              &lt;10万
            </a-radio-button>
            <a-radio-button value="2">
              10-100万
            </a-radio-button>
            <a-radio-button value="3">
              100-1000万
            </a-radio-button>
            <a-radio-button value="4">
              1000-5000万
            </a-radio-button>
            <a-radio-button value="5">
              5000-1亿
            </a-radio-button>
            <a-radio-button value="6">
              1-5亿
            </a-radio-button>
            <a-radio-button value="7">
              >5亿
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <!--        <a-form-item-->
        <!--          label="主营品类"-->
        <!--        >-->
        <!--          <a-checkbox-group-->
        <!--            name="pinglei"-->
        <!--            @change="onChange" >-->
        <!--            <a-row>-->
        <!--              <a-col :span="3">-->
        <!--                <a-checkbox value="电子产品">-->
        <!--                  电子产品-->
        <!--                </a-checkbox>-->
        <!--              </a-col>-->
        <!--              <a-col :span="3">-->
        <!--                <a-checkbox value="服装服饰">-->
        <!--                  服装服饰-->
        <!--                </a-checkbox>-->
        <!--              </a-col>-->
        <!--              <a-col :span="3">-->
        <!--                <a-checkbox value="家居园艺">-->
        <!--                  家居园艺-->
        <!--                </a-checkbox>-->
        <!--              </a-col>-->
        <!--              <a-col :span="3">-->
        <!--                <a-checkbox value="健康美容">-->
        <!--                  健康美容-->
        <!--                </a-checkbox>-->
        <!--              </a-col>-->
        <!--              <a-col :span="3">-->
        <!--                <a-checkbox value="户外用品">-->
        <!--                  户外用品-->
        <!--                </a-checkbox>-->
        <!--              </a-col>-->
        <!--              <a-col :span="3">-->
        <!--                <a-checkbox value="鞋帽箱包">-->
        <!--                  鞋帽箱包-->
        <!--                </a-checkbox>-->
        <!--              </a-col>-->
        <!--            </a-row>-->
        <!--            <a-row>-->
        <!--              <a-col :span="3">-->
        <!--                <a-checkbox value="母婴用品">-->
        <!--                  母婴用品-->
        <!--                </a-checkbox>-->
        <!--              </a-col>-->
        <!--              <a-col :span="3">-->
        <!--                <a-checkbox value="玩具">-->
        <!--                  玩具-->
        <!--                </a-checkbox>-->
        <!--              </a-col>-->
        <!--              <a-col :span="3">-->
        <!--                <a-checkbox value="汽车配件">-->
        <!--                  汽车配件-->
        <!--                </a-checkbox>-->
        <!--              </a-col>-->
        <!--              <a-col :span="3">-->
        <!--                <a-checkbox value="灯光照明">-->
        <!--                  灯光照明-->
        <!--                </a-checkbox>-->
        <!--              </a-col>-->
        <!--              <a-col :span="3">-->
        <!--                <a-checkbox value="安全监控">-->
        <!--                  安全监控-->
        <!--                </a-checkbox>-->
        <!--              </a-col>-->
        <!--              <a-col :span="3">-->
        <!--                <a-checkbox value="其它">-->
        <!--                  其它-->
        <!--                </a-checkbox>-->

        <!--              </a-col>-->
        <!--              <a-col :span="3">-->
        <!--                <a-input placehoder="请输入"/>-->
        <!--              </a-col>-->
        <!--            </a-row>-->
        <!--          </a-checkbox-group>-->
        <!--        </a-form-item>-->

      </a-form>
    </div>

  </div>
</template>

<script>
import { getVO } from '@/api/userinfo'
import { isNumber } from '@/utils/util'

const plainOptions = ['Amazon', 'eBay', 'AliExpress', 'Wish', 'Lazada', 'Shop', '其它']
const typePlainOptions = ['电子品类', '服装服饰', '家居园艺', '健康美容', '户外用品', '鞋帽箱包',
  '母婴用品', '玩具', '汽车配件', '灯光照明', '安全监控', '其它']

export default {
  components: {

  },
  data () {
    return {
      plainOptions,
      typePlainOptions,
      value: [],
      detail: {},
      typeValue: []
    }
  },
  created () {
    getVO()
      .then(res => {
        var data = res.data
        if (data.registration && data.registration !== '') {
          var registration = JSON.parse(data.registration)
          data.registration = registration.province + registration.city + registration.area + registration.Street
        }
        if (data.workAddress && data.workAddress !== '') {
          var workAddress = JSON.parse(data.workAddress)
          data.workAddress = workAddress.province + workAddress.city + workAddress.area + workAddress.Street
        }
        var businessLife = res.data.businessLife
        if (isNumber(businessLife)) {
          var yaer = parseInt(businessLife)
          if (yaer <= 2) {
            data.businessLife = '1'
          } else if (yaer <= 4) {
            data.businessLife = '2'
          } else if (yaer <= 5) {
            data.businessLife = '3'
          } else {
            data.businessLife = '4'
          }
        } else {
          data.businessLife = '0'
        }
        var salesVolume = res.data.salesVolume
        if (isNumber(salesVolume)) {
          var sales = parseInt(salesVolume)
          if (sales <= 10) {
            data.salesVolume = '1'
          } else if (sales <= 100) {
            data.salesVolume = '2'
          } else if (sales <= 1000) {
            data.salesVolume = '3'
          } else if (sales <= 5000) {
            data.salesVolume = '4'
          } else if (sales <= 10000) {
            data.salesVolume = '5'
          } else if (sales <= 50000) {
            data.salesVolume = '6'
          } else {
            data.salesVolume = '7'
          }
        } else {
          data.salesVolume = '0'
        }
        // data.shopType = [ '1', '2' ] salesVolume
        if (data.tradingCertificate && data.tradingCertificate !== '') {
          data.tradingCertificate = 'http://api.dousha8ao.com' + data.tradingCertificate
        }
        // data.tradingCertificate = 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg'
        this.detail = data
      })
  },
  methods: {
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
      console.log('value = ', this.value)
    }
  }
}

</script>

<style lang="less" scoped>
  .item{
    margin-top: 10px;
  }

  .ant-checkbox + span {
    padding-left: 4px;
  }

  .ant-checkbox-group{
    width:80%
  }

</style>
