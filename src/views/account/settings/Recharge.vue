<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">

    <a-card :bordered="false" class="table">
      <a-row>
        <a-alert message="您充值的保费将由合作经纪公司 上海汇中保险经纪有限公司 收取，确保您的账户及资金安全" type="info" show-icon />
      </a-row>

      <a-row style="margin-top:40px">
        <div class="account-settings-info-title"><span class="title">账户余额：</span>
          <span class="money">￥<span class="money" v-html="subTotalAccountBalance"></span></span>
        </div>
      </a-row>

      <a-row >
        <a-col :md="24">
          <span class="line">在线充值</span>
        </a-col>
        <a-col :md="1" :offset="1">
          <span class="line">充值金额：</span>
        </a-col>
        <a-col :md="1" >
          <a-input size="large" v-model="chargeAmount"></a-input>
        </a-col>
        <a-col :md="1" >
          <span class="line">元</span>
        </a-col>
        <a-col :md="6">
          <a-radio-group default-value="1000" size="large" @change="changeAmount">
            <a-radio-button value="1000">
              1000元
            </a-radio-button>
            <a-radio-button value="2000">
              2000元
            </a-radio-button>
            <a-radio-button value="3000">
              3000元
            </a-radio-button>
            <a-radio-button value="4000">
              4000元
            </a-radio-button>
            <a-radio-button value="5000">
              5000元
            </a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col :md="5">
          <span class="line money">eBay卖家专属：充5000送500</span>
        </a-col>

      </a-row>

      <a-row style="margin-top:40px">
        <a-col :md="6" :offset="1">
          <a-radio-group default-value="a" size="large">

            <a-radio class="line" value="a"></a-radio>
            <wechat/>

            <!--            <a-radio class="line" value="b"></a-radio>-->
            <!--            <alipay/>-->

          </a-radio-group>
        </a-col>

      </a-row>

      <a-row style="margin-top:20px" >
        <a-col :md="2" :offset="1">
          <a-button class="pay" type="primary" @click="handleRecharge">充值</a-button>
        </a-col>

      </a-row>
<!--      <a-row style="margin-top:40px">-->
<!--        <a-form-item label="银行转账">-->
<!--        </a-form-item>-->
<!--        <a-row>-->
<!--          <a-col :md="3" :offset="1">-->
<!--            <p>开户行：上海浦东发展银行</p>-->
<!--            <p>姓名：李四</p>-->
<!--            <p>银行卡号：620 ****** 7777</p>-->
<!--            <p>转账附言：DSB 2222</p>-->
<!--          </a-col>-->

<!--        </a-row>-->
<!--      </a-row>-->
    </a-card>
    <!-- 二维码遮盖层 -->
    <a-modal v-model="visible" title="支付二维码" footer="" @cancel="handleCancel">
      <div class="qrcode" ref="qrcode" id="qrcode"> </div>
    </a-modal>
    <!--    <a-modal v-model="visible" title="支付二维码">-->
    <!--      <div class="qrcode" ref="qrcode"></div>-->
    <!--    </a-modal>-->
  </div>
</template>

<script>

import { wechat, alipay } from '@/core/icons'
import { payment, paymentResult, getAccountInfo } from '@/api/userinfo'
import QRCode from 'qrcodejs2'

var paymentStatusInterval

export default {
  components: {
    wechat,
    alipay
  },
  data: function () {
    return {
      subTotalAccountBalance: 0.00,
      visible: false,
      chargeAmount: 1000,
      payUrl: '',
      billNo: '',
      qr: null
    }
  },
  filters: {

  },
  created () {
    getAccountInfo().then((res) => {
      this.subTotalAccountBalance = res.data.subTotalAccountBalance
    })
  },
  methods: {
    // 充值
    handleRecharge () {
      const newQueryParam = { chargeAmount: this.chargeAmount }
      payment(newQueryParam).then((res) => {
        console.log(res)
        this.visible = true
        this.payUrl = res.data.paymentResponse
        this.billNo = res.data.billNo
        this.$nextTick(() => {
          this.crateQrcode()
        })
      })
    },
    changeAmount (e) {
      this.chargeAmount = e.target.value
    },
    // 生成二维码
    crateQrcode () {
      const that = this
      this.qr = new QRCode('qrcode', {
        text: that.payUrl,
        width: 150, // 图像宽度
        height: 150, // 图像高度
        colorDark: '#000000', // 前景色
        colorLight: '#ffffff', // 背景色
        typeNumber: 4,
        correctLevel: QRCode.CorrectLevel.H
      })

      var queryparam = {
        outOrderID: this.billNo
      }

      paymentStatusInterval = setInterval(() => {
        paymentResult(queryparam).then((res) => {
          if (res.code === 200) {
            that.visible = false
            that.$notification.open({
              message: '支付成功!',
              description:
                '支付成功!',
              duration: 5
            })
            this.handleCancel()

            getAccountInfo().then((res) => {
              this.subTotalAccountBalance = res.data.subTotalAccountBalance
            })
          }
        }).catch((res) => {
          console.log(res)
        })
      }, 5000)
    },
    // 关闭弹框,清除已经生成的二维码
    handleCancel () {
      this.payUrl = ''
      this.billNo = ''
      this.$refs.qrcode.innerHTML = ''
      clearInterval(paymentStatusInterval)
    }
  }
}
</script>

<style lang="less" scoped>
  @height: 326px;
  @width: 100px;

  .account-settings-info-title{
    margin-bottom: 20px;
  }
  .money{
    color:red;
  }

  .pay{
    margin-left: 10px;
  }

  .line{
    line-height: 3;
  }
  svg{
    width: 40px;
    height: 40px;
  }
  .qrcode{
        margin-left: 33%;
  }
</style>
