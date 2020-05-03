<!-- 数据舱-报名学生统计页面 -->
<template>
  <div class="app-container">
    <van-nav-bar :title="title"   />
    <van-tabs v-model="active">
      <van-tab title="生源地">
        <table class="statistic__table">
          <thead>
            <tr>
              <th>生源地</th>
              <th>学生人数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in areaData" :key="index">
              <td>{{item.province}}</td>
              <td>{{item.number}}</td>
            </tr>
          </tbody>
        </table>
      </van-tab>
      <van-tab title="校区">
        <table class="statistic__table">
          <thead>
            <tr>
              <th>校区</th>
              <th>学生人数</th>
              <th>市场人数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in schoolData" :key="index">
              <td>{{item.schoolName}}</td>
              <td>{{item.studentNumber}}</td>
              <td>{{item.teacherNumber}}</td>
            </tr>
          </tbody>
        </table>
      </van-tab>
      <van-tab title="专业">
        <table class="statistic__table">
          <thead>
            <tr>
              <th>专业</th>
              <th>学生人数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in proData" :key="index">
              <td>{{item.proName}}</td>
              <td>{{item.studentNumber}}</td>
            </tr>
          </tbody>
        </table>
      </van-tab>
      <van-tab title="时间轴">
        <table class="statistic__table">
          <thead>
            <tr>
              <th>年份</th>
              <th>平时班人数</th>
              <th>暑假班人数</th>
              <th>寒假班人数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in yearData" :key="index">
              <td>{{item.year}}</td>
              <td>{{item.normalNumber}}</td>
              <td>{{item.summerNumber}}</td>
              <td>{{item.winterNumber}}</td>
            </tr>
          </tbody>
        </table>
      </van-tab>
    </van-tabs>
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
  import {
    renderArea,
    renderSchool,
    renderPro,
    renderYear
  } from '@/api/statistic.js'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Statistic',
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
      }
    },
    data() {
      return {
        active: '0',
        areaData: [],
        schoolData: [],
        proData: [],
        yearData: [],
        queryParams: {
          year: undefined
        }
      }
    },
    created() {
      renderArea().then(res => {
        this.areaData = res.data
      })
      renderSchool().then(res => {
        this.schoolData = res.data
      })
      renderPro().then(res => {
        this.proData = res.data
      })
      renderYear().then(res => {
        this.yearData = res.data
      })
      // 获取当前时间
      const now = new Date()
      this.queryParams.year = now.getFullYear()
    },
    methods: {
      onBack() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="scss">
  .statistic__table {
    padding: 20px;
    width: 100%;

    & thead {
      padding: 15px 0;
    }

    & tr {
      margin: 10px;
    }

    & td {
      text-align: center;
      padding: 10px 0;
    }

  }
</style>
