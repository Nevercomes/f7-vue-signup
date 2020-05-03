<!-- 登录页面 -->
<template>
  <div class="app-container">
    <van-nav-bar title="登录" />
    <van-form @submit="signIn" style="margin-top: 30px;">
      <van-field v-model="form.username" label="用户名" type="text" name="username" placeholder="用户名" :rules="[{required: true, message: '请输入用户名'}]"
        @blur="getShops">
      </van-field>
      <van-field v-model="form.password" label="密码" type="password" name="password" placeholder="密码" :rules="[{required: true, message: '请输入密码'}]">
      </van-field>
      <van-field v-model="displayForm.shopName" label="门店" type="text" name="shopId" readonly placeholder="请选择登录门店"
        right-icon="arrow" @click="showPicker = true" :rules="[{required: true, message: '请选择登录门店'}]">
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- <van-overlay :show="loading">
      <van-loading size="24px" vertical>登录中</van-loading>
    </van-overlay> -->
    <overlay-loading :show="loading" :text="'登录中...'"></overlay-loading>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="shops" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>

<script>
  import Cookies from "js-cookie";
  import OverlayLoading from '@/components/OverlayLoading.vue'
  import {
    mapGetters
  } from 'vuex'

  import {
    encrypt,
    decrypt
  } from '@/utils/jsencrypt'
  import {
    getShops
  } from '@/api/shop.js'
  import {
    getQueryParam,
    parseQuery
  } from '@/utils/util.js'

  export default {
    components: {
      OverlayLoading
    },
    computed: {
      ...mapGetters([
        'openId'
      ])
    },
    data() {
      return {
        loading: false,
        routerPath: 'signupList',
        query: {},

        displayForm: {},
        form: {},

        shops: [],
        realShops: [],
        showPicker: false
      };
    },
    created() {
      this.reset()
      // 获取url中的code
      const code = getQueryParam('code')
      this.routerPath = getQueryParam('router_path') || this.routerPath
      this.query = parseQuery(getQueryParam('query')) || this.query
      console.log(this.routerPath)
      console.log(this.query)
      if (code) {
        this.wxLogin(code)
      }
    },
    methods: {
      reset() {
        this.form = {
          username: '15211142974',
          password: '',
          shopId: '',
          openId: ''
        }
        this.displayForm = {
          shopName: ''
        }
      },
      signIn(values) {
        this.loading = true
        this.form.openId = this.openId || ''
        this.$store
          .dispatch("Login", this.form)
          .then(() => {
            this.loading = false;
            this.msgSuccess('登录成功')
            this.$router.push({
              name: this.routerPath,
              query: {
                signupId: 'f60e70d58b2641c8810b35cca538fcfb'
              }
            })
          })
          .catch((error) => {
            console.log(error)
            this.msgError('登录失败，用户名或密码错误')
            this.loading = false;
          });
      },
      wxLogin(code) {
        this.loading = true
        this.$store.dispatch("WxLogin", code).then(() => {
          this.loading = false;
          this.msgSuccess('微信授权登录成功')
          this.$router.push({
            name: this.routerPath,
            query: this.query
          })
        }).catch((error) => {
          console.log(error)
          this.msgError('微信授权登录失败，请使用账号密码登录')
          this.loading = false;
        });
      },
      getShops() {
        getShops(this.form.username).then(res => {
          this.realShops = res
          this.shops = res.map(s => s.shopname)
        })
      },
      onConfirm(value, index) {
        this.showPicker = false
        this.form.shopId = this.realShops[index].id
        this.displayForm.shopName = value
      }
    },
  };
</script>
