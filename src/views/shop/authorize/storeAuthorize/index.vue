<template>
    <div style="padding: 5px 54px">
            <div class="clearfix">
            </div>
            <div class="content">
                <Amazon></Amazon>
                <Ebay></Ebay>
            </div>
    </div>
</template>

<script>
import Amazon from './amazonAuthorize'
import Ebay from './ebayAuthorize'
export default {
  components: {
    Amazon,
    Ebay
  }
}
</script>
<style>
    .box-card {
        width: 818px;
    }
    .linkWord{
        color:#409EFF;
        text-align:center;
        display: block;
        margin-bottom: 20px;
    }
    .content {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .qidai{
        background: #e5e5e5;
        font-size: 20px;
        text-align: center;
        line-height: 140px;
        letter-spacing: 2px;
    }
</style>
