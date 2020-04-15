<!-- 学生报名信息详情页面 -->
<template>
  <div class="app-container">
    <van-nav-bar title="缴费详情" @click-left="onBack" left-arrow />
    <block-title :title="'学生信息'"></block-title>
    <van-panel :title="student.name" :desc="studentDesc">
      <div class="panel-content">
        <van-cell-group>
          <block-cell title="上课校区" :value="classShop" />
          <block-cell title="报名班种" :value="classType" />
          <block-cell title="联系方式" :value="contact" />
        </van-cell-group>
      </div>
    </van-panel>

    <block-title :title="'缴费信息'"></block-title>
    <van-form @submit="onSubmit">
      <van-field v-model="form.tuition" type="number" name="tuition" label="学费" placeholder="学费" :rules="[{ required: true, message: '请填写学费' }]" />
      <van-field v-model="form.reserve" type="number" name="reserve" label="预留金" placeholder="预留金" :rules="[{ required: true, message: '请填写预留金' }]" />
      <van-field v-model="form.discount" type="number" name="discount" label="优惠" placeholder="优惠" :rules="[{ required: true, message: '请填写优惠' }]" />
      <van-field v-model="form.newOrOld" type="text" readonly name="newOrOld" label="新旧学员" placeholder="请选择是否为新学员"
        :rules="[{required: true, message:'请选择是否为新学员'}]" right-icon="arrow" @click="showPicker = true" />
      <van-field v-model="finalTuition" readonly name="finalTuition" label="应缴学费" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="newOrOldOptions" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>

<script>
  import BlockTitle from '@/components/BlockTitle.vue'
  import BlockCell from '@/components/BlockCell.vue'

  import {
    isNullOrEmpty
  } from '@/utils/util.js'
  import {
    getSignup,
    updateSignup
  } from '@/api/signup.js'

  export default {
    name: 'SignupTeacher',
    components: {
      BlockTitle,
      BlockCell
    },
    data() {
      return {
        newOrOldOptions: [
          '新学员',
          '老学员'
        ],

        showPicker: false,

        form: {},
        student: {},
        signupId: '7e8c0310d5784b3ebc3de9a9cb16db03'
      }
    },
    computed: {
      finalTuition: function() {
        return this.form.tuition ? this.form.tuition - this.form.reserve - this.form.discount : ''
      },
      studentDesc: function() {
        return this.student.school + '-' + this.student.major + '-' + this.student.gread
      },
      classShop: function() {
        return this.student.provincename + '-' + this.student.shopname
      },
      classType: function() {
        return this.student.classTime + '-' + this.student.bmzyname + '-' + this.student.classtypename
      },
      contact: function() {
        let phone = this.student.phone
        if (!isNullOrEmpty(phone))
          phone = phone.substr(0, 3) + '-' + phone.substr(3, 4) + '-' + phone.substr(7, 4)
        return phone + " / " + this.student.qq
      }
    },
    created() {
      this.signupId = this.$route.query && this.$route.query.id
      this.reset()
      this.getSignup(this.signupId)
    },
    methods: {
      reset() {
        this.form = {
          id: undefined,
          tuition: undefined,
          reserve: undefined,
          newOrOld: '',
          discount: undefined
        }
      },
      getSignup(signupId) {
        getSignup(signupId).then(res => {
          this.student = res.data
          this.form.id = res.data.id
          this.form.tuition = this.student.tuition
          this.form.reserve = this.student.reserve
          this.form.newOrOld = this.student.newOrOld
          this.form.discount = this.student.discount
        })
      },
      onSubmit(values) {
        this.student.tuition = this.form.tuition
        this.student.reserve = this.form.reserve
        this.student.newOrOld = this.form.newOrOld
        this.student.discount = this.form.discount
        updateSignup(this.student).then(res => {
          if (res.code == 1) {
            this.$notify({
              type: 'success',
              message: '报名信息修改成功'
            })
          } else {
            this.$notify({
              type: 'danger',
              message: '报名信息修改失败'
            })
          }
        })
      },
      onConfirm(value, index) {
        this.form.newOrOld = value
        this.showPicker = false
      },
      onBack() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="scss">
  .app-container {
    min-height: calc(100vh - 56px);
    padding-bottom: 20px;
  }

  .panel-content {
    padding: 10px 20px 20px 16px;
  }
</style>
