<template>
  <div class="block-title">{{ title }}</div>
</template>

<script>
export default {
  name: 'BlockTitle',
  props: {
    title: String
  }
}
</script>

<style scoped lang="scss">
  .block-title {
    margin: 0;
    padding: 20px 16px 16px 12px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
</style>
