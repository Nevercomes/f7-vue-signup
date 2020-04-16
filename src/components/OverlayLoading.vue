<template>
  <van-overlay :show="show">
    <div class="wrapper">
      <van-loading size="24px" vertical>{{text}}</van-loading>
    </div>
  </van-overlay>
</template>

<script>
  export default {
    name: 'OverlayLoading',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        default: '加载中...'
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
