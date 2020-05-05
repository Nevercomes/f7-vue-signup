<!-- 教师招生码 -->
<template>
  <div class="app-container">
    <van-nav-bar title="招生码" />
    <div class="signup__code-box">
      <!-- <vue-qr :logoSrc="imgUrl" class="sigup__qrcode" :text="qrText" :size="300"></vue-qr> -->
      <div class="title">{{title}}</div>
      <vue-qr v-if="qrcodeType == 'sign'" class="sigup__qrcode" :text="qrText" :size="300"></vue-qr>
      <van-image v-if="qrcodeType == 'zhuoyue'" :src="zhuoyueUrl" width="300" height="300"></van-image>
      <van-button class="signup__code-btn" plain type="info" @click="changeQrCode">切换二维码</van-button>
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
      <van-tabbar-item v-if="role == 'manager'" replace to="/signup/statistic" icon="chart-trending-o">
        统计
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import vueQr from 'vue-qr'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: "signupQrcode",
    components: {
      vueQr
    },
    computed: {
      ...mapGetters([
        'userId',
        'shopId',
        'loginName',
        'role',
        'name'
      ])
    },
    created() {
      // dev to prod
      const url = 'http://haitun158.natapp1.cc/signup/code'
      // const url = 'http://www.haitun158.com/fenxiao/signup/code'
      this.qrText = url + '?shopId=' + this.shopId + '&userId=' + this.userId + "&phone=" + this.loginName
    },
    data() {
      return {
        imgUrl: require('../assets/img/code-default.jpg'),
        zhuoyueUrl: require('../assets/img/zhuoyue-qrcode.jpg'),
        qrText: '',
        qrcodeType: 'sign',
        title: this.name ? this.name + '招生二维码' : '招生二维码'
      }
    },
    methods: {
      changeQrCode() {
        if (this.qrcodeType == 'sign') {
          this.qrcodeType = 'zhuoyue'
          this.title = '卓越手绘设计家公众号'
        } else if (this.qrcodeType == 'zhuoyue') {
          this.qrcodeType = 'sign'
          this.title = this.name + '招生二维码'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .signup__code-box {
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-top: 5vh;
  }

  .title {
    font-size: 40px;
  }

  .signup__code-btn {
    margin-top: 5vh;
  }
</style>
