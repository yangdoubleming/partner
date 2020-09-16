<template>
    <div class="container33">
        <a-tabs default-active-key="1" class="tab" style="margin:30px;">
            <a-tab-pane name='store' key="1" tab="店铺授权">
                <StoreAuthorize></StoreAuthorize>
            </a-tab-pane>
        </a-tabs>
        <!-- <div class="submit-btn" @click="goBack">返回</div> -->
    </div>
</template>
<script>
  import StoreAuthorize from './storeAuthorize'
  export default {
    components: {
        StoreAuthorize,
    },
    data() {
        return {
            type:'store'
        };
    },
    created(){
        this.type = this.$route.query.type || 'store'
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        }
    }
  };
</script>
<style>
    .el-tabs__item {
        font-size: 20px;
    }
    .tab-box{
        /* width: 96%;
        margin: 30px auto; */
        width: 100%;
    }
    .submit-btn{
        width: 130px;
        height: 40px;
        margin: 20px auto;
        font-size: 16px;
        color:white;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
    }
    .tab .el-tabs__item.is-active, .tab .el-tabs__item:hover {
        color: #E51E5F;
    }
    .container33{
        width: 100%;
        overflow: hidden;
        background: white;
    }

    .page-header-index-wide{
        width: 100%
    }

</style>