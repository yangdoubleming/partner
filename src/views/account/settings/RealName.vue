<template>
  <div>
    <div>
      <a-row>
        <a-alert message="恭喜！您已完成实名认证" type="success" show-icon />
      </a-row>
      <a-form layout="horizontal" :label-col="{ span: 2, offset:1 }" :wrapper-col="{ span: 20, offset:1 }">
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
          label="实控人"
        >
          <span>{{ detail.legalPersonName }}</span>
        </a-form-item>

        <a-form-item
          label="身份证号"

        >
          <span>{{ detail.idCard }}</span>
        </a-form-item>

      </a-form>

    </div>

  </div>
</template>

<script>

import { getVO } from '@/api/userinfo'

export default {
  data () {
    return {
      detail: {}
    }
  },
  created () {
    getVO()
      .then(res => {
        this.detail = res.data
      })
  },
  methods: {
    editCompany () {
      this.company.companyId = '1'
    }
  }
}
</script>

<style scoped>
  .item{
    float: left;
  }
</style>
