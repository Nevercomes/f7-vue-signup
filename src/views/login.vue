<template>
  <div class="app-container">
    登录页面
  </div>
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
    },
    methods: {
      signIn() {
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
            this.msgSuccess('登录失败，用户名或密码错误')
            this.loading = false;
          });
      },
      getShops() {
        getShops(this.form.username).then(res => {
          
        })
      }
    },
  };
</script>
