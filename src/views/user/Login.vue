<template>
  <div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  components: {

  },
  data () {
    return {

    }
  },
  created () {
    const token = this.$route.query.token
    localStorage.setItem('token', token)
    if (token) {
      this.$store.dispatch('auth', token).then(_ => {
        location.reload()
      })
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
