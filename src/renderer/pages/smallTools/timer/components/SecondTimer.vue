<template>
    <div>
        <div class="time flex">
            <span class="item">{{ time[0] }}</span>
            <span class="item">{{ time[1] }}</span>
            <span class="item">{{ time[2] }}</span>
        </div>

        <div class="tc">
            <el-button v-bind="btnAttr" @click="start" v-if="!isPlay">开始</el-button>
            <template v-else>
                <el-button v-bind="btnAttr" @click="reset">复位</el-button>
                <el-button v-bind="btnAttr" @click="pause">{{ isPause ? '继续' : '暂停' }}</el-button>
            </template>
        </div>
    </div>
</template>

<script>
let timer = null // 定时器
let startTime = 0 // 每次计时的开始时间 (单位ms)
let pauseStartTime = 0 // 每次暂停的开始时间 (单位ms)
let pauseTime = 0 // 暂停的时长 (单位ms)
export default {
  inject: ['btnAttr', 'add0'],
  data () {
    return {
      time: ['00', '00', '00'], // 时间（分, 秒, 毫秒）
      isPlay: false, // 是否开始
      isPause: false // 是否暂停
    }
  },
  methods: {
    // 开始
    start () {
      startTime = Date.now()
      this.isPlay = true
      this.startTimer()
    },
    // 计时
    startTimer () {
      timer = setInterval(() => {
        const diff = Date.now() - startTime - pauseTime
        const m = Math.floor(diff / 1000 / 60)
        const s = Math.floor(diff / 1000 % 60)
        const ms = Math.floor(diff % 1000 / 10)
        this.time = [m, s, ms].map(this.add0)
      }, 10)
    },
    // 暂停/继续
    pause () {
      if (!this.isPause) {
        clearInterval(timer)
        pauseStartTime = Date.now()
      } else {
        pauseTime += Date.now() - pauseStartTime
        this.startTimer()
      }
      this.isPause = !this.isPause
    },
    // 重新开始
    reset () {
      clearInterval(timer)
      pauseTime = 0
      this.time = ['00', '00', '00']
      this.isPlay = this.isPause = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
