<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-dropdown>
        <span class="action ant-dropdown-link link-dropdown-menu">
          <a-icon id="trigger" type="appstore" style="font-size: 20px;"/>
        </span>
        <a-card slot="overlay" class="link-dropdown-menu-wrapper" style="width:300px">

          <a-row :gutter="48" class="btn-group">
            <a-col class="link-item" :md="12" :sm="12" @click="linkTos('sy')" style="cursor:pointer">
              <div class="center">
                首页
              </div>
            </a-col>
            <a-col class="link-item" :md="12" :sm="12" @click="linkTos('bx')" style="cursor:pointer">
              <div class="center">
                保险
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-dropdown>
      <a-dropdown >
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-icon id="trigger" type="user" style="font-size: 20px;"/>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper" style="text-align:center" >
          <a-menu-item key="1" >
            <div>{{ user.legalPersonName }}</div>
          </a-menu-item>
          <!-- <a-menu-divider/>
            <a-menu-item key="/account/settings/userinfo" >
              <router-link :to="{ name: 'UserInfo' }">
                <a-icon type="profile" />
                个人信息
              </router-link>
            </a-menu-item>
            <a-menu-item key="/account/settings/company">
              <router-link :to="{ name: 'CompanyInfo' }">
                <a-icon type="profile" />
                企业信息
              </router-link>
            </a-menu-item>
            <a-menu-item key="/account/settings/accountinfo">
              <router-link :to="{ name: 'AccountInfo' }">
                <a-icon type="pay-circle" />
                账户信息
              </router-link>
            </a-menu-item>
            <a-menu-item key="/account/settings/security">
              <router-link :to="{ name: 'SecuritySetting' }">
                <a-icon type="setting" />
                安全设置
              </router-link>
            </a-menu-item>
          <a-menu-divider/> -->

          <a-menu-item key="logo">
            <a href="javascript:;" @click="handleLogout">
              <a-button style="width:100%">退出登录</a-button>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions } from 'vuex'

import { getVO } from '@/api/userinfo'

export default {
  name: 'UserMenu',
  components: {
    NoticeIcon
  },
  computed: {
  },
  data () {
    return {
      user: {}
    }
  },
  created () {
    getVO()
      .then(res => {
        this.user = res.data
      })
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          console.log(111, this)
          return this.logout({}).then(() => {
            // setTimeout(() => {
            //   window.location.reload()
            // }, 16)
          }).catch(err => {
            this.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    },
    linkTos (type) {
      var token = localStorage.getItem('token')
      if (type === 'sy') {
        window.open(`http://www.dowsure.com/`)
      } else {
        window.open(`http://saas.dousha8ao.com?token=${token}`)
      }
    },
    recharge () {
      this.$router.push({
        name: 'Recharge'
      })
    }
  }
}
</script>

<style scoped>
  .link-dropdown-menu-wrapper{
    padding: 25px;
  }
  .link-item .blogo{
    width: 60%;
  }

  .center{
    text-align: center;
  }
</style>
