<template>
  <div class="loading-box">
    <van-loading v-if="loading" color="#1989fa">加载中...</van-loading>
  </div>
</template>

<script>
  export default {
    props: {
      loading: {
        required: true,
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style>
  .loading-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px 0;
  }
</style>
