<template>
  <section>
        <div class="container">
            <div class="head">
                <div class="info">
                    <!-- <div class="box">
                        <div class="up">
                            <el-button type="primary" plain size="mini">{{shopData.shopDataInfo && shopData.shopDataInfo.platform}}</el-button>
                        </div>
                        <div class="down">{{shopData.shopDataInfo && shopData.shopDataInfo.shopName}}</div>
                    </div> -->
                    <div class="box">
                        <div class="up">店铺排名</div>
                        <div class="down">{{shopData.shopRank}}</div>
                    </div>
                    <div class="box">
                        <div class="up">年销售额</div>
                        <div class="down">{{shopData.yearAmount}}<span>万</span></div>
                    </div>
                    <div class="box">
                        <div class="up">已授信交易额</div>
                        <div class="down">{{shopData.creditAmount}}<span>万</span></div>
                    </div>
                </div>
            </div>
            <div class="left-con">
                <div class="up">
                    <div style="float:left;font-size:16px;margin:20px 0 0 20px;">关联物流</div>
                    <div style="float:right;">
                        <!-- <el-button size="mini" type="primary" style="float:right;margin:13px 20px 0 0;">去申请</el-button>
                        <div style="margin-right:8px;float:right;margin-top:20px;">可申请运费贷<span>60万</span></div>
                        <div style="float:right; color:#e5e5e5;margin:20px 8px 0 8px;">|</div>
                        <div style="float:right;margin-top:20px;">物流匹配交易额<span>200万</span></div> -->
                    </div>
                </div>
                <div style="margin:20px"><el-alert title="与店铺关联的物流越多，贷款额度及通过率越高" type="info" show-icon></el-alert></div>
                <!-- <el-button icon="el-icon-plus" style="margin:20px 0 20px 350px;"></el-button> -->
                <div style="width:100%;background:#f5f6f8;height:20px;"></div>
                <div class="up">
                    <div style="float:left;font-size:16px;margin:20px 0 0 20px;">关联收款</div>
                    <div style="float:right;">
                        <!-- <el-button size="mini" type="primary" style="float:right;margin:13px 20px 0 0;">去申请</el-button>
                        <div style="margin-right:8px;float:right;margin-top:20px;">可申请应收贷<span>60万</span></div>
                        <div style="float:right; color:#e5e5e5;margin:20px 8px 0 8px;">|</div>
                        <div style="float:right;margin-top:20px;">收款匹配交易额<span>200万</span></div> -->
                    </div>
                </div>
                <div style="margin:20px"><el-alert title="与店铺关联的收款越多，贷款额度及通过率越高" type="info" show-icon></el-alert></div>
                <!-- <el-button icon="el-icon-plus" style="margin:20px 0 20px 350px;"></el-button> -->
            </div>
            <div class="right-con">
                <div style="font-size:16px;color:#101010;margin:20px 0 0 20px;">贷款信息</div>
                <div style="font-size:12px;color:#101010;margin:10px 0 0 20px;">授信额度/已提取金额</div>
                <!-- <div style="font-size:18px;color:#101010;margin:5px 0 0 20px;">{{shopData.yearAmount}}万&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{{shopData.creditAmount}}万&nbsp;&nbsp;&nbsp;<el-button type="primary" size="mini" plain>跨运保</el-button></div> -->
                <!-- <div style="font-size:12px;color:#101010;margin:10px 0 0 20px;">贷款编号：&nbsp;&nbsp;&nbsp;<span style="color:#1890ff">DSB235164623133453</span></div> -->
                <div style="font-size:12px;color:#101010;margin:10px 0 0 20px;">放款方：&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期限：-</div>
                <div style="font-size:12px;color:#101010;margin:10px 0 20px 20px;">状态：&nbsp;&nbsp;&nbsp;<span style="color:#1890ff">-</span></div>
                <div style="width:100%;background:#f5f6f8;height:20px;"></div>
                <div style="font-size:16px;color:#101010;margin:20px 0 0 20px;">授权情况&nbsp;&nbsp;&nbsp;<el-button type="success" size="mini" plain>{{shopData.shopSaasInfo&&shopData.shopSaasInfo.status==0?'已授权':'未授权'}}</el-button></div>
                <div style="font-size:12px;color:#101010;margin:10px 0 0 20px;">贷款编号：&nbsp;&nbsp;&nbsp;-</div>
                <div style="font-size:12px;color:#101010;margin:10px 0 0 20px;">放款方：&nbsp;&nbsp;&nbsp;-</div>
                <div style="font-size:12px;color:#101010;margin:10px 0 20px 20px;">状态：&nbsp;&nbsp;&nbsp;<span style="color:#1890ff">-</span></div>
                <div style="width:100%;background:#f5f6f8;height:20px;"></div>
                <div class="left">
                    <div class="shop">订单信息</div>
                    <div class="num-box">
                        <div class="box">
                            <div class="word">订单总数</div>
                            <div class="num">{{0}}万</div>
                        </div>
                        <div class="box">
                            <div class="word">订单总金额</div>
                            <div class="num">{{0}}万</div>
                        </div>
                        <!-- <div class="box">
                            <div style="color:#1890ff;font-size:16px;">查看全部</div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div></section>
</template>

<script>

import {
  STable
} from '@/components'
import {
  getList
} from '@/api/shop'

const statusMap = {
  0: {
    status: 'success',
    text: '已授信'
  },
  1: {
    status: 'processing',
    text: '授信中'
  },
  2: {
    status: 'error',
    text: '未授信'
  }
}
const typeMap = {
  1: {
    text: 'amazon'
  },
  2: {
    text: 'eBay'
  },
  3: {
    text: '敦煌网'
  },
  4: {
    text: 'wish'
  },
  5: {
    text: 'cdiscount'
  },
  6: {
    text: 'shopee'
  },
  7: {
    text: '阿里速卖通'
  }
}

export default {
  name: 'ShopTable',
  components: {
    STable
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [{
        title: '店铺名称',
        dataIndex: 'shopName',
        align: 'center'
      },
      {
        title: '平台',
        dataIndex: 'type',
        align: 'center',
        scopedSlots: {
          customRender: 'type'
        }
      },
      {
        title: '授权站点',
        dataIndex: 'authStatation',
        align: 'center'
      },
      {
        title: '收款商',
        dataIndex: 'receipt',
        align: 'center'
      },
      {
        title: '授信状态',
        dataIndex: 'status',
        align: 'center',
        scopedSlots: {
          customRender: 'status'
        }
      },
      {
        title: '月均销售额',
        dataIndex: 'sellAmount',
        align: 'center'
      },
      {
        title: '授权日期',
        dataIndex: 'tokenTime',
        align: 'center'
      },
      {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: {
          customRender: 'action'
        },
        align: 'center'
      } ],

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const newQueryParam = Object.assign({}, this.queryParam)
        console.log(parameter)

        newQueryParam.current = parameter.pageNo
        newQueryParam.size = parameter.pageSize

        return getList()
          .then(res => {
            res.data.map((item, index) => {
              item.key = item.id
            })
            const result = {
              data: res.data
            }
            return result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: false, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false,
      tableData: [],
      shopData: {}
    }
  },
  filters: {
    loanStatusFilterOfText (type) {
      return statusMap[type].text
    },
    loanStatusFilterOfStatus (type) {
      return statusMap[type].status
    },
    typeFilter (type) {
      return typeMap[type].text
    }
  },
  created () {

  },
  methods: {
    handleView (record) {
      this.$router.push({
        name: 'LoanDetail',
        query: {
          loanNo: record.loanNo,
          productNo: record.productNo
        }
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
        width: 1200px;
        margin: 30px auto;
        overflow: hidden;
       .head{
           width:100%;
           height: 80px;
           background-color: white;
           .info{
                width: 800px;
                height: 80px;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
               .box{
                   .up{
                       text-align: center;
                       font-size: 14px;
                       color: #5f5a59;
                       margin-bottom: 6px;
                   }
                   .down{
                       font-size: 22px;
                       color: #101010;
                   }
               }
           }
       }
       .left-con{
           margin-top: 30px;
           width: 785px;
           float: left;
           background: white;
           overflow: hidden;
           .up{
               overflow: hidden;
               font-size: 14px;
               color: #101010;
           }
       }
       .right-con{
           margin-top: 30px;
           width: 385px;
           float: right;
           background: white;
           .left{
                width: 400px;
                height: 150px;
                background-color: white;
                float: left;
                .shop{
                    font-size: 16px;
                    margin: 15px;
                }
                .num-box{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    align-items: center;
                    margin-top: 16px;
                    .box{
                        .num{
                            font-size: 20px;
                            text-align: center;
                            margin-top: 12px;
                        }
                        .word{
                            font-size: 14px;
                            color: #5f5a59;
                        }
                    }
                }
            }
       }
       .btn{
            display: block;
            width: 150px;
            height: 46px;
            line-height: 46px;
            text-align: center;
            background: #E51E5F;
            color: #fff;
            border: 0;
            border-radius: 6px;
            margin: 40px auto;
            clear: both;
            cursor: pointer;
        }
    }
</style>
