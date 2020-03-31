<template>
  <div class="block-cell">
    <span class="block-cell__title">{{ title }}</span>
    <span class="block-cell__value">{{ value }}</span>
  </div>
</template>

<script>
  export default {
    name: 'BlockTitle',
    props: {
      title: String,
      value: String
    }
  }
</script>

<style scoped lang="scss">
  .block-cell {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
  }
  
  .block-cell__title {
    min-width: 20%;
  }

  .block-cell__value {
    position: relative;
    overflow: hidden;
    color: #969799;
    text-align: right;
    vertical-align: middle;
    word-wrap: break-word;

    flex: 1;
  }
</style>
