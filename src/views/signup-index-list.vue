<!-- 教师下的报名学生的index索引列表 -->
<template>
  <div class="app-container">
    <van-nav-bar title="报名学生列表" />
    <van-index-bar :index-list="indexList">
      <div v-for="(item, idx) in indexList" :key="idx">
        <van-index-anchor :index="item">
          {{item}}
        </van-index-anchor>
        <van-cell v-for="obj in object[item]" :key="obj.id" @click="onClick(obj.id)">{{obj.name}}</van-cell>
      </div>
    </van-index-bar>
    <van-tabbar route>
      <!-- <van-tabbar-item replace to="/index/teacher" icon="home-o">
        主页
      </van-tabbar-item> -->
      <van-tabbar-item replace to="/signup/list" icon="friends-o">
        学生
      </van-tabbar-item>
      <van-tabbar-item replace to="/signup/qr" icon="qr">
        招生码
      </van-tabbar-item>
      <van-tabbar-item replace to="/signup/statistic" icon="chart-trending-o">
        统计
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import pinyin from '@/utils/pinyin.js'
  import {
    listSignup
  } from '@/api/signup.js'

  export default {
    name: 'SignupIndexList',
    data() {
      return {
        dataList: [],
        indexList: [],
        object: {},
        queryParams: {
          name: '',
          leadTeacher: '277d648ce0ba414f990dcd4b4c8d6022',
          pageNo: -1
        }
      }
    },
    created() {
      listSignup(this.queryParams).then(res => {
        this.dataList = res.data
        this.dataList.forEach(element => {
          var py = pinyin.getFirstCamelChars(element.name);
          if (!this.object[py]) {
            this.object[py] = [];
            this.indexList.push(py)
          }
          this.object[py].push(element);
        });
        // 添加数据排序
        this.indexList.sort();
      })
    },
    methods: {
      onClick(id) {
        // 跳转到详情页面
        this.$router.push({
          name: 'signupInfo',
          query: {
            id: id
          }
        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
