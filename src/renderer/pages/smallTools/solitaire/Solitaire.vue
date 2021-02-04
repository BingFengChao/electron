<template>
    <div>
        <div class="box">
            <div class="card" :class="{ active: status === 1 }">
                <div class="front flex flex-x-c flex-y-c" :style="transitionDuration">
                    <i class="icon top"></i>
                    <div class="unknown br10 c-white tc" v-if="!isResult">?</div>
                    <div class="tc" v-else>
                        <v-img class="avatar" :src="selectedList[selectedList.length - 1].src" user></v-img>
                        <div class="name c-white">{{ selectedList[selectedList.length - 1].Name }}</div>
                    </div>
                    <i class="icon bottom"></i>
                </div>
                <div class="back" :style="transitionDuration"></div>
            </div>
            <div class="card bg"></div>
            <div class="card bg"></div>
        </div>

        <div class="foot tc">
            <el-button v-bind="btnAttr" @click="start" v-if="!status">开始抽选</el-button>
            <template v-else>
                <el-button v-bind="btnAttr" :disabled="status === 1" @click="reset">重来一轮</el-button>
                <el-button
                    v-bind="btnAttr"
                    :disabled="status === 1 || !unselectedList.length"
                    @click="start"
                >下一个 (剩{{ unselectedList.length }}人)</el-button>
            </template>
        </div>
    </div>
</template>

<script>
export default {
  inject: ['btnAttr', 'randomInt'],
  data () {
    return {
      list: [], // 学生列表
      unselectedList: [], // 未抽选的列表
      selectedList: [], // 已抽选的列表
      status: 0, // 状态: 0 未开始, 1 抽选中, 2 结束
      duration: 3000, // 动画时长
      isResult: false // 是否显示结果
    }
  },
  computed: {
    transitionDuration: vm => ({ transitionDuration: (vm.status === 1 ? vm.duration : 0) + 'ms' })
  },
  created () {
    this.$parent.$parent.getStudentList(list => {
      this.list = list
      this.unselectedList = [...this.list]
    })
  },
  methods: {
    // 开始
    start () {
      this.status = 1
      setTimeout(() => {
        this.status = 2
      }, this.duration)
      this.isResult = false
      setTimeout(() => {
        const index = this.randomInt(this.unselectedList.length)
        this.selectedList.push(this.unselectedList.splice(index, 1)[0])
        this.isResult = true
      }, this.duration - 1000)
    },
    // 重来一轮
    reset () {
      this.status = 0
      this.isResult = false
      this.unselectedList = [...this.list]
      this.selectedList = []
    }
  }
}
</script>

<style lang="less" scoped>
.box {
    position: relative;
    margin-top: 50px;
}
.card {
    width: 240px;
    height: 360px;
    position: relative;
    transform-style: preserve-3d;
    perspective: 1000px;
    .front, .back, &.bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 10px;
        box-shadow: 0 0 0 10px #fff;
        backface-visibility: hidden;
        background-color: #2E425A;
    }
    .back {
        transform: rotateY(180deg);
    }
    &.active .front {
        transform: rotateY(1080deg);
    }
    &.active .back {
        transform: rotateY(1260deg);
    }
}
.front {
    .icon {
        width: 32px;
        height: 32px;
        background: url("@{domain}/plum-blossom.svg") no-repeat center / contain;
        position: absolute;
        &.top {
            top: 10px;
            left: 10px;
        }
        &.bottom {
            right: 10px;
            bottom: 10px;
        }
    }
    .unknown {
        width: 100px;
        line-height: 100px;
        font-size: 80px;
        box-shadow: 0 0 0 8px #fff;
    }
}
.back, .bg {
    background: url("@{domain}/plum-blossom.svg") no-repeat center / 50%;
}
.bg {
    z-index: -1;
    transform-origin: -20% 80%;
    transform: scale(0.9) rotate(-40deg);
    & + .bg {
        transform-origin: -35% 80%;
        transform: scale(0.9) rotate(-20deg);
    }
}
.foot {
    margin-top: 50px;
}
</style>
