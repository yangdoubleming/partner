<template>
  <div>
    <a-card>
      <a-row :gutter="12">
        <a-col :span="24">
          <p class="title">{{ title }}</p>

          <p class="desc">{{ description }}</p>

          <a-row :gutter="24" >
            <a-col :span="6" v-for="(item ,i) in items" :key="i">
              <div class="">
                {{ item.title }}
              </div>
              <div class="info">
                {{ item.value }}
              </div>
            </a-col>

          </a-row>

        </a-col>
      </a-row>

    </a-card>
    <div class="btn-group">
      <a-button @click="jump(title)">产品详情</a-button>
      <a-button @click="jump(title)">立即申请</a-button>
    </div>

  </div>

</template>

<script>
export default {
  props: {
    productName: {
      type: String,
      default: ''
    },
    productUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      required: true
    }
  },
  name: 'Apply',
  data () {
    return {
    }
  },
  methods: {
    jump (title) {
      var token = localStorage.getItem('token')
      if (title === '汇丰银行 跨商贷') {
        window.open(`http://creditloan.dowsure.com?token=${token}`)
      } else if (title === '邮储银行 跨运保') {
        window.open(`http://freightsure.dowsure.com?token=${token}`)
      } else if (title === '宁波人保 跨商保') {
        window.open(`http://creditsure.dowsure.com?token=${token}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .img{
    margin-top:20px;
    width: 50px;
    height: 50px;
    background-color: rgb(249, 249, 245);
  }

  .btn-group {
    height: 50px;

    button{
      width: 50%;
      background-color: rgb(249, 249, 245);
      height: inherit;
    }
  }

  .title{
    font-size:20px;
  }

  .info{
    font-size:20px;
  }

  .desc{
    font-size: 12px;
    height: 30px;
    color: rgba(97, 98, 97, 1);
  }
</style>
