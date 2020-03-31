<template>
  <div>
    <router-link to="/404">
      <van-button type="default">404</van-button>
    </router-link>
    <router-link to="/login">
      <van-button type="primary">登陆页面</van-button>
    </router-link>
    <router-link to="/index/teacher">
      <van-button type="default">教师主页</van-button>
    </router-link>
    <router-link to="/signup">
      <van-button type="primary">学生填表</van-button>
    </router-link>
    <router-link to="/signup/teacher">
      <van-button type="info">教师填表</van-button>
    </router-link>
    <router-link to="/signup/list">
      <van-button type="warning">学生信息列表</van-button>
    </router-link>
    <router-link to="/signup/info">
      <van-button type="danger">学生详细信息</van-button>
    </router-link>
  </div>
</template>
<script>

</script>
