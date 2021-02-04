<template>
    <el-dialog
        :title="title[step]"
        :visible.sync="visible"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
    >
        <template v-if="step === 0">
            <p>选择小黑板绑定的房间类型</p>
            <el-radio-group v-model="type" @change="getRoomList">
                <el-radio
                    v-for="(item, index) in typeList"
                    :key="index"
                    :label="index"
                >{{ item }}</el-radio>
            </el-radio-group>

            <p>选择{{ typeList[type] }}</p>
            <el-select v-model="classId" v-if="!type">
                <el-option
                    v-for="item in classList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-select v-model="roomId" v-else>
                <el-option
                    v-for="item in roomList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <template slot="footer">
                <el-button type="primary" @click="getQrcode">确定</el-button>
            </template>
        </template>

        <template v-else-if="step === 1">
            <p>请系统管理员/班级管理员用微信扫码确认</p>
            <div class="qrcode">
                <div ref="qrcode"></div>
                <i class="refresh el-icon-refresh" @click="refresh" v-if="status === 1"></i>
            </div>
            <div class="tips c-danger tc" v-if="status">
                {{ status === 1 ? '二维码已失效，请刷新' : '非管理员，无配置权限' }}
            </div>

            <template slot="footer">
                <el-link type="primary" @click="back">返回上一步</el-link>
            </template>
        </template>

        <template v-else>
            <div class="tc">
                <i class="success el-icon-success c-success"></i>
                <div>配置成功</div>
            </div>

            <template slot="footer">
                <el-button type="primary" @click="success">进入 (3s)</el-button>
            </template>
        </template>
    </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false, // 是否显示弹窗
      title: ['小黑板配置', '扫码确认', '配置成功'], // 标题
      step: 0, // 配置步骤

      typeList: ['班级', '功能室'], // 类型列表
      type: 0, // 当前类型
      classList: [], // 班级列表
      classId: '', // 选择的班级
      ready: false, // 初始化加载功能室
      roomList: [], // 功能室列表
      roomId: '', // 选择的功能室

      qrcode: {}, // 二维码
      status: 0, // 二维码状态: 0 正常, 1 失效, 2 无权限
      qrcodeTimer: null, // 二维码失效计时器

      classInfo: {}, // 班级信息
      countDown: 3, // 进入倒计时秒
      countDownTimer: null // 成功倒计时计时器
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取班级列表
    getClassList () {
      this.classList = []
    },
    // 获取功能室列表
    getRoomList (type) {
      if (type && !this.ready) {
        this.ready = true
        this.roomList = []
      }
    },
    // 获取二维码
    getQrcode () {
      this.step = 1
      // ----
      this.qrcode = new window.QRCode(this.$refs.qrcode, {
        text: 'https://www.baidu.com',
        width: 128,
        height: 128
      })
      // ----定时过期
      this.qrcodeTimer = setTimeout(() => {
        this.status = 1
      }, 5 * 60 * 1000)
      this.scanCall()
    },
    // 扫码回调
    scanCall () {
      // ----
      setTimeout(() => {
        const res = 0 // 测试有无权限----
        if (!res) {
          this.status = 2
        } else {
          this.classInfo = { teacherId: '123' }
          this.step = 2
          clearTimeout(this.qrcodeTimer)
          this.countDownTimer = setInterval(() => {
            this.countDown--
            if (this.countDown === 1) this.success()
          }, 1000)
        }
      }, 3000)
    },
    // 刷新二维码----
    refresh () {
      this.status = 0
      this.qrcode.makeCode('https://www.qq.com')
    },
    // 返回上一步
    back () {
      this.step = 0
      this.status = 0
      clearTimeout(this.qrcodeTimer)
    },
    // 进入
    success () {
      clearInterval(this.countDownTimer)
      this.$store.commit('saveClassInfo', this.classInfo)
    }
  }
}
</script>

<style lang="less" scoped>
.success {
    font-size: 50px;
}
</style>
