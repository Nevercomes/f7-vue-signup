<!-- 教师招生码 -->
<template>
  <div class="app-container">
    <van-nav-bar title="招生码" />
    <div class="signup__code_box">
      <vue-qr :logoSrc="imgUrl" class="sigup__qrcode" :text="qrText" :size="300"></vue-qr>
    </div>
    <van-tabbar route>
      <!-- <van-tabbar-item replace to="/index/teacher" icon="home-o">
        主页
      </van-tabbar-item> -->
      <van-tabbar-item replace to="/signup/list" icon="friends-o">
        学生
      </van-tabbar-item>
      <van-tabbar-item replace to="/signup/qr" icon="qr">
        招生码
      </van-tabbar-item>
      <van-tabbar-item replace to="/signup/statistic" icon="chart-trending-o">
        统计
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import vueQr from 'vue-qr'
  import {mapGetters} from 'vuex'
  export default {
    name: "signupQrcode",
    components: {
      vueQr
    },
    computed: {
      ...mapGetters([
        'userId',
        'shopId',
        'loginName'
      ])
    },
    created() {
      const url = 'http://haitun158.natapp1.cc/signup'
      this.qrText = url + '?shopId=' + this.shopId + '&userId=' + this.userId + "&phone=" + this.loginName
    },
    data() {
      return {
        imgUrl: require('../assets/img/code-default.jpg'),
        qrText: ''
      }
    },
  }
</script>

<style scoped lang="scss">
  .signup__code_box {
    height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
