<template>
  <f7-page>
    <f7-login-screen class="demo-login-screen" :opened="loginScreenOpened" @loginscreen:closed="loginScreenOpened = false">
      <f7-page login-screen>
        <f7-login-screen-title>Login</f7-login-screen-title>
        <f7-list form>
          <f7-list-input label="用户名" type="text" floating-label placeholder="你的用户名" required error-message="用户名不能为空"
            validate-on-blur clear-button :value="form.username" @input="form.username = $event.target.value" @blur="getShops"></f7-list-input>
          <f7-list-input label="密码" type="password" floating-label placeholder="你的密码" required error-message="密码不能为空"
            validate-on-blur clear-button :value="form.password" @input="form.password = $event.target.value"></f7-list-input>
          <f7-list-input label="门店" type="text" floating-label placeholde="选择门店" required error-message="门店不能为空"
            validate-on-blur readonly="readonly" id="shopid-picker" :value="form.shopName">
          </f7-list-input>
        </f7-list>
        <f7-list>
          <f7-list-button @click="signIn">Sign In</f7-list-button>
        </f7-list>
        <!-- <f7-block-footer><br>Copyright © 2018-2019.<br>Powered By 铸才网络科技</f7-block-footer> -->
      </f7-page>
    </f7-login-screen>
  </f7-page>
</template>

<script>
  import Cookies from "js-cookie";
  import {
    encrypt,
    decrypt
  } from '@/utils/jsencrypt'
  import {
    getShops
  } from '@/api/shop.js'

  export default {
    data() {
      return {
        loginScreenOpened: true,
        loading: false,
        form: {
          username: '',
          password: '',
          shopName: '',
          shopId: ''
        },
        shops: []
      };
    },
    mounted() {
      this.$f7ready((f7) => {});
    },
    methods: {
      signIn() {
        const self = this;
        const app = self.$f7;

        this.loading = true
        this.$store
          .dispatch("login", this.form)
          .then(() => {
            this.loading = false;
            // this.$f7router.push({
            //   path: this.redirect || "/"
            // });
            console.log('success')
          })
          .catch(() => {
            this.loading = false;
          });
      },
      getShops() {
        getShops(this.form.username).then(res => {
          const self = this;
          self.shops = res
          const app = self.$f7
          this.form.shopId = ''
          this.form.shopName = ''
          let values = Array.isArray(self.shops) ? self.shops.map(shop => shop.id) : []
          let displayValues = Array.isArray(self.shops) ? self.shops.map(shop => shop.shopname) : []
          app.picker.destroy('#shopid-picker')
          app.picker.create({
            inputEl: '#shopid-picker',
            cols: [{
              textAlign: 'center',
              values: values,
              displayValues: displayValues,
              onChange: (picker, value, displayValue) => {
                self.form.shopId = value
                self.form.shopName = displayValue
              }
            }]
          })
        })
      }
    },
  };
</script>
