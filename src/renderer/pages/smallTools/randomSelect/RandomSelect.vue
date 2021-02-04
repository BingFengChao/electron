<template>
    <div>
        <template v-if="!status">
            <div>设定抽选人数</div>
            <div class="count">{{ count }}</div>
            <div class="flex flex-y-c" v-if="list.length">
                <el-slider v-model="count" :max="list.length" :show-tooltip="false"></el-slider>
                <span>共 {{ list.length }} 人</span>
            </div>
        </template>

        <template v-else>
            <ul class="student flex flex-wrap flex-x-c tc">
                <li
                    :class="{ cp: status === 2, active: checked.includes(item) }"
                    v-for="(item, index) in result"
                    :key="index"
                    @click="change(item)"
                >
                    <v-img class="avatar" :src="item.src" user></v-img>
                    <div class="name">{{ item.Name }}</div>
                    <i class="checked el-icon-success" v-if="status === 2"></i>
                </li>
            </ul>
            <el-progress :percentage="percentage" :show-text="false" v-if="status !== 2"></el-progress>
        </template>

        <div class="foot tc" v-if="status !== 1">
            <el-button v-bind="btnAttr" :disabled="!count" @click="start" v-if="!status">开始</el-button>
            <template v-else>
                <el-checkbox
                    border
                    v-model="isCheckAll"
                    :indeterminate="!!checked.length && checked.length < result.length"
                    @change="checked = isCheckAll ? [...result] : []"
                >全选</el-checkbox>
                <el-button v-bind="btnAttr" @click="reset">重新抽选</el-button>
                <el-button
                    v-bind="btnAttr"
                    :disabled="!checked.length"
                    @click="$refs.evaluate.show(checked)"
                >发送评价</el-button>
            </template>
        </div>

        <class-evaluate ref="evaluate" dialog></class-evaluate>
    </div>
</template>

<script>
let timer = null // 定时器
let randomList = [] // 随机数列表
export default {
  components: {
    ClassEvaluate: () => import('pages/classEvaluate/add/Add')
  },
  inject: ['btnAttr', 'randomInt'],
  data () {
    return {
      list: [], // 学生列表
      count: 0, // 抽选人数
      status: 0, // 状态: 0 未开始, 1 抽选中, 2 结束
      percentage: 0, // 进度
      result: [], // 抽选结果
      checked: [], // 选中的人数
      isCheckAll: false, // 是否全选
      cutDuration: 500, // 切换时长
      duration: 10000 // 抽选时长（和进度条 .el-progress-bar__inner 同步）
    }
  },
  created () {
    this.$parent.$parent.getStudentList(list => {
      this.list = list
    })
  },
  methods: {
    // 开始
    start () {
      this.status = 1
      setTimeout(() => {
        this.percentage = 100
        this.pending()
        timer = setInterval(this.pending, this.cutDuration)
        setTimeout(this.end, this.duration)
      })
    },
    // 获取不重复的随机数
    getRandom () {
      const res = this.randomInt(this.list.length)
      return randomList.includes(res) ? this.getRandom() : res
    },
    // 抽选中
    pending () {
      randomList = []
      // eslint-disable-next-line no-unused-vars
      for (const i of Array(this.count)) randomList.push(this.getRandom())
      this.result = randomList.map(i => this.list[i])
    },
    // 结束
    end () {
      clearInterval(timer)
      this.status = 2
    },
    // 选择学生
    change (item) {
      if (this.status === 2) {
        const index = this.checked.indexOf(item)
        index === -1 ? this.checked.push(item) : this.checked.splice(index, 1)
        this.isCheckAll = this.checked.length === this.result.length
      }
    },
    // 重新抽选
    reset () {
      this.status = this.percentage = 0
      this.checked = []
    }
  }
}
</script>

<style lang="less" scoped>
.count {
    font-size: 150px;
    line-height: 150px;
    margin-top: 30px;
}
.el-slider {
    width: 500px;
    margin-right: 15px;
}
.student {
    li {
        padding: 10px;
        position: relative;
        .checked {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 24px;
            color: #909399;
            background-color: #fff;
            border-radius: 50%;
        }
        &.active .checked {
            color: @color-primary;
        }
    }
}
.el-progress {
    width: 500px;
    height: 40px;
    padding-top: 15px;
    margin: 30px auto 0;
    /deep/ .el-progress-bar__inner {
        transition: width 10s linear;
    }
}
.foot {
    margin-top: 30px;
    .el-checkbox {
        margin-right: 10px;
    }
}
</style>
