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
    padding: 40px 32px 32px 24px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 28px;
    line-height: 32px;
  }
</style>
