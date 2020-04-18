<!-- 调用微信登录的页面，也是默认进入的页面 -->
<template>
  <div>正在请求微信授权登录...</div>
</template>

<script>

  import {
    toRedirect
  } from '@/api/login.js'
  import {
    getQueryParam,
    isNullOrEmpty
  } from '@/utils/util.js'

  export default {
    created() {
      const path = getQueryParam('router_path') || 'signupList'
      const query = getQueryParam('query') || ''
      let param = {
        router_path: path,
        query: query
      }
      toRedirect(param).then(res => {
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
