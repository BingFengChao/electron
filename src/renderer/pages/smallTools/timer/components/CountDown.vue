<template>
    <div>
        <div class="time flex" :class="{ select: !isPlay }">
            <template v-if="!isPlay">
                <div class="tc" :class="{ colon: index === 2 }" v-for="(item, index) in list" :key="index">
                    <el-button size="mini" icon="el-icon-plus" @click="plus(item)"></el-button>
                    <div class="value">{{ item.value }}</div>
                    <el-button size="mini" icon="el-icon-minus" @click="minus(item)"></el-button>
                </div>
            </template>
            <template v-else>
                <span class="item">{{ time[0] }}</span>
                <span class="item">{{ time[1] }}</span>
            </template>
        </div>

        <div class="tc">
            <el-button
                v-bind="btnAttr"
                @click="start"
                :disabled="list.every(item => !item.value)"
                v-if="!isPlay"
            >开始</el-button>
            <template v-else>
                <el-button v-bind="btnAttr" @click="reset">复位</el-button>
                <el-button v-bind="btnAttr" @click="pause">{{ isPause ? '继续' : '暂停' }}</el-button>
            </template>
        </div>
    </div>
</template>

<script>
let timer = null // 定时器
let duration = 0 // 倒计时的时长 (单位s)
export default {
  inject: ['btnAttr', 'add0'],
  data () {
    return {
      list: [ // 定时
        { value: 0, max: 9 }, // 分，十位
        { value: 0, max: 9 }, // 分，个位
        { value: 0, max: 5 }, // 秒，十位
        { value: 0, max: 9 } // 秒，个位
      ],
      time: ['00', '00'], // 时间（分, 秒）
      isPlay: false, // 是否开始
      isPause: false // 是否暂停
    }
  },
  methods: {
    // 加
    plus (item) {
      item.value = item.value === item.max ? 0 : item.value + 1
    },
    // 减
    minus (item) {
      item.value = item.value === 0 ? item.max : item.value - 1
    },
    // 开始
    start () {
      const list = this.list.map(item => item.value + '')
      this.time = [list[0] + list[1], list[2] + list[3]]
      duration = this.time[0] * 60 + this.time[1] * 1
      this.isPlay = true
      this.startTimer()
    },
    // 计时
    startTimer () {
      timer = setInterval(() => {
        if (duration > 1) {
          duration--
          const m = Math.floor(duration / 60)
          const s = Math.floor(duration % 60)
          this.time = [m, s].map(this.add0)
        } else {
          this.reset()
        }
      }, 1000)
    },
    // 暂停/继续
    pause () {
      !this.isPause ? clearInterval(timer) : this.startTimer()
      this.isPause = !this.isPause
    },
    // 重新开始
    reset () {
      clearInterval(timer)
      for (const item of this.list) item.value = 0
      this.time = ['00', '00']
      this.isPlay = this.isPause = false
    }
  }
}
</script>

<style lang="less" scoped>
.time.select {
    padding: 12px 30px;
}
.value {
    width: 100px;
}
.colon {
    margin-left: 15px;
    padding-left: 15px;
}
.el-button {
    position: relative;
    z-index: 1;
}
</style>
