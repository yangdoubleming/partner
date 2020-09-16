<template>
    <section>
        <div class="authorize-box">
            <div class="up">
                <img :src="amazonLogo" class="up-left">
                <div class="up-right" @click="showAmazonDialog">
                    <span>新增并授权eBay店铺</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="down">
                <div class="down-left" @click="linkTo('/shop/ebayAuthorizeList')">
                    <i class="el-icon-search"></i>
                    <span>查看授权店铺</span>
                </div>
                <div class="down-right">
                    <i class="el-icon-question"></i>
                    <a href="./ebay.pdf" target="_blank">查看授权帮助</a>
                </div>
            </div>
        </div>
        <a-modal
            title="eBay-新增店铺并授权"
            :visible="amazonDialogVisible"
            :centered="amazonCenter"
            :width="setWidth"
            @cancel="handleCancel"
            :footer="null">
            <a class="linkWord" href="./ebay.pdf" target="_blank" >查看授权帮助</a>
            <div style="margin:15px auto">
                <a-input placeholder="店铺名称" v-model="amazonValidateForm.shopName" />
            </div>
            <div style="margin:15px auto">
                <a-input placeholder="eBay用户名"  v-model="amazonValidateForm.account" />
            </div>
            <a-button type="primary" @click="submitAmazonForm" style="width:80px;margin: 0 auto;display:block" >
                授 权
            </a-button>
        </a-modal>
    </section>
</template>

<script>
    import config from '@/config/defaultSettings'
    import { ebayAuthorize } from '@/api/shop'
    export default {
        data() {
            return {
               modelStatus:false,
                setWidth:'520px',
                station:[],
                authShopAll:[],
                loading:false,
                //   amazon授权=====================================================
                amazonDialogVisible: false,
                amazonLogo: config.publicPath + '/icons/ebayLogo.jpg',
                amazonCenter: true,
                amazonValidateForm: {
                    shopName:'',
                    account:'',
                }
            };
        },
        mounted(){
           if(document.body.clientWidth<780){
                this.setWidth = '95%'
            }else{
                this.setWidth = '520px'
            }
        },
        methods: {
            showAmazonDialog(){
                this.amazonDialogVisible = true
            },
            submitAmazonForm() {
                if (!this.amazonValidateForm.shopName || !this.amazonValidateForm.account) 
                return this.$message.warning("所有字段都必填")
                this.loading = true
                ebayAuthorize(this.amazonValidateForm).then(result=>{
                    this.$message.success(result.message)
                    this.loading = false
                    this.amazonDialogVisible = false
                }).catch(err=>{
                    this.$message.error(err.message)
                    this.loading = false
                    this.amazonDialogVisible = false
                })
                
            },
            linkTo(path){
                this.$router.push({path:path})
            },
            handleCancel(){
                this.amazonDialogVisible = false
            }
        }
    };
</script>

<style>
    .authorize-box{
        width: 326px;
        height: 140px;
        border: 1px solid #d4e3ff;
        margin: 20px 0px;
    }
    .authorize-box .up{
        width: 100%;
        height: 80px;
        border-bottom: 1px solid #d4e3ff;
    }
    .authorize-box .up-left{
        width: 86px;
        float: left;
        margin-left: 30px;
        margin-top: 25px;
    }
    .authorize-box .up-right{
        float: right;
        font-size: 13px;
        line-height: 80px;
        color: #409EFF;
        margin-right: 8px;
        cursor: pointer;
    }
    .authorize-box .down{
        height: 60px;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
    .authorize-box .down-left{
        cursor: pointer;
    }
    .authorize-box .down-right{
        cursor: pointer;
    }
    .submit-btn{
        width: 130px;
        height: 40px;
        /* background-image: url(../../assets/register/btn-bg.png); */
        font-size: 16px;
        color:white;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
    }
</style>