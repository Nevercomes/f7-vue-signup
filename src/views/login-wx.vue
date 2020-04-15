<!-- 调用微信登录的页面，也是默认进入的页面 -->
<template>
  <div>正在请求微信授权登录...</div>
</template>

<script>

  import {
    toRedirect
  } from '@/api/login.js'

  export default {
    created() {
      toRedirect().then(res => {
        if(res.data != undefined && res.data != '') {
          window.location.href = res.data
        } else {
          this.$router.push({
            name: 'login'
          })
        }
      })
    }
  }

</script>

<style>
</style>
