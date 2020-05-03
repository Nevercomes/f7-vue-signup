<!-- 教师下的报名学生的index索引列表 -->
<template>
  <div class="app-container">
    <!-- nav -->
    <van-nav-bar :title="title" />
    <!-- 年份检索 -->
    <div class="year-query-bar">
      <van-button icon="arrow-left" type="default" @click="subYear"  />
      <div>{{queryParams.year}}年</div>
      <van-button icon="arrow" type="default" @click="addYear"  />
    </div>
    <!-- index-list -->
    <van-index-bar :index-list="indexList">
      <div v-for="(item, idx) in indexList" :key="idx">
        <van-index-anchor :index="item">
          {{item}}
        </van-index-anchor>
        <van-cell v-for="obj in object[item]" :key="obj.id" @click="onClick(obj.id)">{{obj.name}}</van-cell>
      </div>
    </van-index-bar>

    <!-- 加载提示 -->
    <data-loading :loading="loading"></data-loading>
    <!-- 无数据提示 -->
    <van-empty v-if="!loading && empty" description="暂无学生数据,快去招生吧~" />

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
      <van-tabbar-item v-if="role == 'manager'" replace to="/signup/statistic" icon="chart-trending-o">
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
  import {
    mapGetters
  } from 'vuex'
  import DataLoading from '@/components/DataLoading.vue'

  export default {
    name: 'SignupIndexList',
    components: {
      DataLoading
    },
    computed: {
      ...mapGetters([
        'role'
      ]),
      title: function() {
        let arr = []
        arr.push('报名学生列表')
        if (this.queryParams.year) arr.push(this.queryParams.year + '年')
        if (this.shopName) arr.push(this.shopName)
        return arr.join('-')
      },
      empty: function() {
        return !this.dataList || this.dataList.length == 0
      }
    },
    watch: {
      // 箭头函数的this会是undefined
      // "queryForm.year": {
      //   handler (val, oldVal) {
      //     let arr = []
      //     arr.push('报名学生列表')
      //     arr.push(val + '年')
      //     console.log(this)
      //     if (this.shopName) arr.push(this.shopName)
      //     this.title = arr.join('-')
      //   },
      //   deep: true
      // }
    },
    data() {
      return {
        // 加载状态
        loading: false,
        // 原始数据
        dataList: [],
        // index排序后的数据
        indexList: [],
        // index排序辅助对象
        object: {},
        // 查询参数
        queryParams: {
          name: '',
          pageNo: -1,
          year: undefined
        }
      }
    },
    created() {
      this.getList()
      // 获取当前时间
      const now = new Date()
      this.queryParams.year = now.getFullYear()
    },
    methods: {
      getList() {
        this.loading = true
        listSignup(this.queryParams).then(res => {
          this.dataList = res.data
          this.indexList = []
          this.object = {}
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
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      onClick(id) {
        // 跳转到详情页面
        this.$router.push({
          name: 'signupInfo',
          query: {
            id: id
          }
        })
      },
      subYear() {
        if (this.queryParams.year) {
          this.queryParams.year = this.queryParams.year - 1
          this.getList()
        }
      },
      addYear() {
        if (this.queryParams.year) {
          this.queryParams.year = this.queryParams.year + 1
          this.getList()
        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .year-query-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
