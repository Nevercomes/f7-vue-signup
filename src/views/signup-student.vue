<template>
  <div class="app-container">
    <van-image class="signup__screen-bg-img" width="100%" height="100%" fit="cover" :src="signupBg" />
    <div class="signup__form">
      <div class="ignore">

        <div class="signup__form-item" :class="[invalid.name ? 'signup__form-item--invalid' : '']">
          <div class="signup__form-icon">
            <van-icon name="user-circle-o" color="white" size="20px" />
            <div class="icon-decoration" />
          </div>
          <div class="signup__form-divider" />
          <input class="signup__form-input" v-model="form.name" type="text" placeholder="姓名" @blur="validInput($event, form.name)" />
        </div>

        <div class="signup__form-item" :class="[invalid.shopid ? 'signup__form-item--invalid' : '']">
          <div class="signup__form-icon">
            <van-icon name="location-o" color="white" size="20px" />
            <div class="icon-decoration" />
          </div>
          <div class="signup__form-divider" />
          <input class="signup__form-input" :value="formDisplay.shop" type="text" readonly="readonly" placeholder="学习校区"
            @click="shopPicker = true" />
          <div class="signup__form-select-icon">
            <van-icon name="arrow" color="white" size="20px" />
          </div>
        </div>

        <div class="signup__form-item" :class="[invalid.classtype ? 'signup__form-item--invalid' : '']">
          <div class="signup__form-icon">
            <van-icon name="apps-o" color="white" size="20px" />
            <div class="icon-decoration" />
          </div>
          <div class="signup__form-divider" />
          <input class="signup__form-input" :value="formDisplay.classType" type="text" readonly="readonly" placeholder="报名班种"
            @click="classTypePicker = true" />
          <div class="signup__form-select-icon">
            <van-icon name="arrow" color="white" size="20px" />
          </div>
        </div>

        <div class="signup__form-item" :class="[invalid.school ? 'signup__form-item--invalid' : '']">
          <div class="signup__form-icon">
            <van-icon name="wap-home-o" color="white" size="20px" />
            <div class="icon-decoration" />
          </div>
          <div class="signup__form-divider" />
          <input disabled class="signup__form-input" type="text" placeholder="就读学校" @click="showArea = true" />
          <div class="signup__form-select-icon">
            <van-icon name="arrow" color="white" size="20px" />
          </div>
        </div>

        <div class="signup__form-item" :class="[invalid.major ? 'signup__form-item--invalid' : '']">
          <div class="signup__form-icon">
            <van-icon name="star-o" color="white" size="20px" />
            <div class="icon-decoration" />
          </div>
          <div class="signup__form-divider" />
          <input class="signup__form-input" v-model="form.major" type="text" placeholder="在校专业" @blur="validInput($event, form.major)" />
        </div>

        <div class="signup__form-item" :class="[invalid.enrollSchool ? 'signup__form-item--invalid' : '']">
          <div class="signup__form-icon">
            <van-icon name="underway-o" color="white" size="20px" />
            <div class="icon-decoration" />
          </div>
          <div class="signup__form-divider" />
          <input class="signup__form-input" v-model="form.gread" type="text" readonly="readonly" placeholder="入学时间"
            @click="enrollPicker = true" />
          <div class="signup__form-select-icon">
            <van-icon name="arrow" color="white" size="20px" />
          </div>
        </div>

        <div class="signup__form-item" :class="[invalid.phone ? 'signup__form-item--invalid' : '']">
          <div class="signup__form-icon">
            <van-icon name="phone-o" color="white" size="20px" />
            <div class="icon-decoration" />
          </div>
          <div class="signup__form-divider" />
          <input class="signup__form-input" v-model="form.phone" type="text" placeholder="联系电话" @blur="validInput($event, form.phone)" />
        </div>

        <div class="signup__form-item" :class="[invalid.qq ? 'signup__form-item--invalid' : '']">
          <div class="signup__form-icon">
            <van-icon name="chat-o" color="white" size="20px" />
            <div class="icon-decoration" />
          </div>
          <div class="signup__form-divider" />
          <input class="signup__form-input" v-model="form.qq" type="text" placeholder="QQ号码" @blur="validInput($event, form.qq)" />
        </div>
      </div>
      <button class="signup__form-btn" @click="onSubmit">提 交 信 息</button>
      <div class="signup__form-footer">
        以上信息仅使用于卓越设计教育机构报名信息登记
      </div>
    </div>

    <!-- 就读学校的选取 -->
    <!-- <van-dialog v-model="showArea" title="就读学校">
      <van-dropdown-item v-model="areaIndex" :options="showAreaList" />
      <van-field v-model="form.school" placeholder="请输入学校名称"></van-field>
    </van-dialog> -->
    <van-dialog v-model="showArea" title="标题" show-cancel-button>
      <img src="https://img.yzcdn.cn/vant/apple-3.jpg">
    </van-dialog>
    <van-popup v-model="shopPicker" position="bottom">
      <van-picker show-toolbar :columns="shops" @cancel="shopPicker = false" @confirm="shopPickerConfirm" />
    </van-popup>
    <van-popup v-model="classTypePicker" position="bottom">
      <van-picker show-toolbar :columns="timeProAndClasTypeList" @cancel="classTypePicker = false" @confirm="classTypePickerConfirm" />
    </van-popup>
    <van-popup v-model="enrollPicker" position="bottom">
      <van-picker show-toolbar :columns="enrollDates" @cancel="enrollPicker = false" @confirm="enrollPickerConfirm" />
    </van-popup>
  </div>
</template>

<script>
  import mapGetters from 'vuex'
  import SignupBg from '@/assets/img/signup-bg.jpg'
  import {
    hasClass,
    addClass,
    removeClass,
    isNullOrEmpty,
    getQueryParam
  } from '@/utils/util.js'

  import {
    getSchools,
    getClassTypes,
    getPros,
    saveSignup,
    getOpenId,
    getAreas
  } from '@/api/signup.js'

  export default {
    name: 'SignupStudent',
    // computed: {
    //   ...mapGetters({
    //     'shopId'
    //   })
    // },
    data() {
      return {
        leadTeacher: '277d648ce0ba414f990dcd4b4c8d6022',
        shopId: '8e5d6871ec224bc792ce65b8f7a29213',
        school: '',

        shops: [],
        realShops: [],
        shopPicker: false,

        classTypes: [],
        realClassTypes: [],
        classTypePicker: false,

        areaList: [],
        showAreaList: [],
        showArea: false,
        areaIndex: 0,

        pros: [],
        realPros: [],

        classTimes: [
          '平时班',
          '暑假7月',
          '暑假8月',
          '寒假1月',
          '寒假2月',
        ],

        timeProAndClasTypeList: [],

        enrollPicker: false,
        enrollDates: [],

        form: {},
        formDisplay: {},
        invalid: {},

        signupBg: SignupBg
      }
    },
    created() {
      let state = getQueryParam('state')
      if (!isNullOrEmpty(state)) {
        state = state.split('&')
        this.shopId = state[0]
        this.leadTeacher = state[1]
      }
      this.reset()
      this.getOpenId()
      this.getSchools(this.shopId)
      this.getClassTypes(this.shopId)
      this.getPros(this.shopId)
      this.getClassTimes()
      this.initEnrollDate()
      this.getAreas()
    },
    methods: {
      reset() {
        this.form = {
          shopid: this.shopId,
          leadTeacher: this.leadTeacher,
          name: undefined,
          shopid: undefined,
          province: undefined,
          classTime: undefined,
          bmzy: undefined,
          bmzyname: undefined,
          classtype: undefined,
          school: undefined,
          major: undefined,
          gread: undefined,
          phone: undefined,
          qq: undefined,
          openId: undefined
        };
        this.formDisplay = {
          shop: undefined,
          classType: undefined
        };
        this.invalid = {
          name: undefined,
          shopid: undefined,
          classtype: undefined,
          school: undefined,
          major: undefined,
          enrollSchool: undefined,
          phone: undefined,
          qq: undefined
        };
      },
      getOpenId() {
        const code = getQueryParam('code')
        getOpenId(code).then(res => {
          this.form.openId = res.data
        })
      },
      getSchools(shopId) {
        getSchools(shopId).then(res => {
          // 从学校中取出区域
          let areas = res.data.map(s => s.area)
          let aSet = new Map()
          // 过滤得到相同的区域
          areas = areas.filter(a => !aSet.has(a.id) && aSet.set(a.id, 'foo'))
          // 将相同区域的学校设置到同一区域下
          areas = areas.map(item => {
            item.sList = res.data.filter(s => s.area.id == item.id)
            return item
          })
          // 保留原始对象结构的school
          let shopPickerList = areas.map(item => {
            let children = []
            item.sList.forEach(s => {
              children.push({
                text: s.name
              })
            })
            return {
              text: item.name,
              children: children
            }
          })
          this.realShops = areas
          this.shops = shopPickerList
        })
      },
      getClassTypes(shopId) {
        getClassTypes(shopId).then(res => {
          this.realClassTypes = res.data
          this.classTypes = res.data.map(c => c.classtypename)
          this.timeProAndClasTypeList[2] = {
            values: this.classTypes
          }
        })
      },
      getPros(shopId) {
        getPros(shopId).then(res => {
          this.realPros = res.data
          this.pros = res.data.map(p => p.name)
          this.timeProAndClasTypeList[1] = {
            values: this.pros
          }
        })
      },
      getClassTimes() {
        this.timeProAndClasTypeList[0] = {
          values: this.classTimes
        }
      },
      getAreas() {
        getAreas().then(res => {
          this.areaList = res.data
          this.showAreaList = []
          for (let i in this.areaList) {
            const area = this.areaList[i]
            this.showAreaList.push({
              text: area.name,
              value: i
            })
          }
        })
      },
      initEnrollDate() {
        let year = new Date().getFullYear()
        this.enrollDates.push('已工作')
        for (let i = 0; i < 10; i++) {
          this.enrollDates.push(year + '年')
          year = year - 1
        }
      },
      onSubmit() {
        if (this.validate()) {
          // 调用提交方法
          saveSignup(this.form).then(res => {
            this.$notify({
              type: 'success',
              message: '提交信息成功，请您等待老师联系'
            })
          })
        }
      },
      shopPickerConfirm(value, index) {
        this.shopPicker = false
        this.formDisplay.shop = value[1]
        this.form.province = this.realShops[index[0]].code
        this.form.shopid = this.realShops[index[0]].sList[index[1]].id
        this.invalid.shopid = false
        this.$forceUpdate()
      },
      classTypePickerConfirm(value, index) {
        this.classTypePicker = false
        this.formDisplay.classType = value[1] + '-' + value[2] + '-' + value[0]
        this.form.classtype = this.realClassTypes[index[2]].id
        this.form.bmzy = this.realPros[index[1]].id
        this.form.bmzyname = this.formDisplay.classType
        this.form.classTime = value[0]
        this.invalid.classtype = false
        this.$forceUpdate()
      },
      enrollPickerConfirm(value) {
        this.enrollPicker = false
        this.form.gread = value
        this.invalid.enrollSchool = false
        this.$forceUpdate()
      },
      validate() {
        this.invalid = {
          name: undefined,
          shopid: undefined,
          classtype: undefined,
          school: undefined,
          major: undefined,
          enrollSchool: undefined,
          phone: undefined,
          qq: undefined
        };
        let isInvalid = false
        if (isNullOrEmpty(this.form.name)) {
          isInvalid = true
          this.invalid.name = true
        }
        if (isNullOrEmpty(this.form.shopid)) {
          isInvalid = true
          this.invalid.shopid = true
        }
        if (isNullOrEmpty(this.form.classtype)) {
          isInvalid = true
          this.invalid.classtype = true
        }
        if (isNullOrEmpty(this.form.school)) {
          isInvalid = true
          this.invalid.school = true
        }
        if (isNullOrEmpty(this.form.major)) {
          isInvalid = true
          this.invalid.major = true
        }
        if (isNullOrEmpty(this.form.enrollSchool)) {
          isInvalid = true
          this.invalid.enrollSchool = true
        }
        if (isNullOrEmpty(this.form.phone)) {
          isInvalid = true
          this.invalid.phone = true
        }
        if (isNullOrEmpty(this.form.qq)) {
          isInvalid = true
          this.invalid.qq = true
        }
        if (isInvalid) {
          this.$notify({
            type: 'warning',
            message: '请正确填写所有信息'
          })
          this.$forceUpdate()
        } else {
          if (!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
            this.invalid.phone = true
            this.$notify({
              type: 'warning',
              message: '手机号码格式不正确，请重新输入'
            })
            this.$forceUpdate()
            return false
          }
          return true
        }
      },
      validInput(e, value) {
        const ele = e.target
        const ep = e.target.parentElement
        if (isNullOrEmpty(value)) {
          addClass(ep, 'signup__form-item--invalid')
          this.$notify({
            type: 'warning',
            message: ele.placeholder + '不能为空'
          })
        } else {
          if (hasClass(ep, 'signup__form-item--invalid')) {
            removeClass(ep, 'signup__form-item--invalid')
          }
          if (ele.placeholder == '联系电话' && !(/^1[3456789]\d{9}$/.test(value))) {
            addClass(ep, 'signup__form-item--invalid')
            this.$notify({
              type: 'warning',
              message: '手机号码格式不正确，请重新输入'
            })
          }
        }
      }
    },
  }
</script>

<style>
  .signup__form {
    position: relative;
    top: 120px;
  }
</style>
