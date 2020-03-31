<template>
  <div class="app-container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载"
        @load="onLoad">
        <van-cell v-for="item in dataList" :key="item.id" :title="item.name" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import {
    listSignup
  } from '@/api/signup.js'

  export default {
    name: 'SignupList',
    data() {
      return {
        // 数据加载
        loading: false,
        // 数据加载完毕
        finished: false,
        // 数据加载错误
        error: false,
        // 数据刷新
        refreshing: false,

        dataList: [],

        queryParams: {
          pageNo: 1,
          pageSize: 30,
          leadTeacher: '277d648ce0ba414f990dcd4b4c8d6022'
        }
      }
    },
    created() {
      this.onLoad()
    },
    methods: {
      onLoad() {
        this.loading = true
        listSignup(this.queryParams).then(res => {
          this.error = false
          this.loading = false;
          // 如果调用了刷新 则清空列表数据
          if (this.refreshing) {
            this.dataList = [];
            this.refreshing = false;
          }
          this.dataList = this.dataList.concat(res.data.list)
          console.log(this.dataList)
          // 判断是否加载完了数据
          if (this.hasMore(this.queryParams.pageNo, this.queryParams.pageSize, res.data.count)) {
            this.queryParams.pageNo = this.queryParams.pageNo + 1
          } else {
            this.finished = true
          }
        })
      },
      onRefresh() {
        // 清空列表数据
        console.log('refresh')
        this.finished = false;
        this.queryParams.pageNo = 1
        // 重新加载
        this.loading = true
        this.onLoad()
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
