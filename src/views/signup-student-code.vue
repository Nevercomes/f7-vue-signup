<template>
  <div>正在加载报名页面...</div>
</template>

<script>
  import {
    toRedirect
  } from '@/api/signup.js'
  import {
    getQueryParam
  } from '@/utils/util.js'
  
  export default {
    created() {
      const shopId = getQueryParam('shopId')
      const userId = getQueryParam('userId')
      toRedirect({
        shopId: shopId,
        userId: userId
      }).then(res => {
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
