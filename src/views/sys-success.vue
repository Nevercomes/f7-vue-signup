<!-- 表单提交等操作成功跳转的页面 -->
<template>
  <div class="app-container">
    <van-nav-bar title="成功提示" @click-left="onBack" left-arrow />
    <div class="sucesss-page__box">
      <div class="sucesss-page__title">{{title}}</div>
      <van-image class="sucesss-page__image" width="100px" height="100px" fit="cover" :src="imgUrl" />
      <div class="sucesss-page__message">{{message}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '操作成功',
        message: '恭喜操作成功',
        imgUrl: require('../assets/img/success.png')
      }
    },
    created() {
      const title = this.$route.query && this.$route.query.title
      const message = this.$route.query && this.$route.query.message
      this.title = title || this.title
      this.message = message || this.message
    },
    methods: {
      onBack() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .sucesss-page__box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sucesss-page__title {
    margin-top: 30px;
    font-size: 40px;
    font-weight: bold;
  }

  .sucesss-page__image {
    margin: 30px 0;
  }

  .sucesss-page__message {
    color: darkgrey;
  }
</style>
