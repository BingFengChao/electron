<template>
    <v-app class="scroll-y">
        <div class="head flex pad">
            <v-chart class="flex-s0" :options="options"></v-chart>
            <div class="data flex-g1 tc">
                <div class="flex">
                    <div class="flex-g1">
                        <div class="score default">{{ totalScore }}</div>
                        <div class="name">素养总分值</div>
                    </div>
                    <div class="flex-g1">
                        <div class="score default">{{ gradeRanked }}</div>
                        <div class="name">年级排名</div>
                    </div>
                </div>
                <ul class="flex flex-wrap flex-x-sb">
                    <li v-for="(item, index) in scoreList" :key="index">
                        <div class="score small">{{ item.score }}</div>
                        <div class="name">{{ item.name }}</div>
                    </li>
                    <li class="placeholder" v-for="(item, index) in 6" :key="scoreList.length + index"></li>
                </ul>
            </div>
        </div>
        <ul class="body flex flex-wrap flex-x-sb">
            <li v-for="(item, index) in list" :key="index">
                <div class="item flex flex-y-c">
                    <div class="user">
                        <v-img class="avatar" :src="item.avatar" user></v-img>
                        <span class="name tc c-white">{{ item.name }}</span>
                    </div>
                    <div class="score flex-g1 tc">{{ item.score }}</div>
                    <i class="number tr c-white" :class="item.number <= 3 ? 'primary' : 'info'">{{ item.number }}</i>
                </div>
            </li>
            <li class="placeholder" v-for="(item, index) in 8" :key="list.length + index"></li>
        </ul>
    </v-app>
</template>

<script>
import 'echarts/lib/chart/radar'
export default {
  data () {
    return {
      options: {
        radar: {
          radius: '70%',
          indicator: []
        },
        series: {
          type: 'radar',
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#5b8ff9',
            borderColor: '#fff',
            borderWidth: 1
          },
          lineStyle: {
            color: '#5b8ff9'
          },
          areaStyle: {
            color: 'rgba(91, 143, 249, 0.5)'
          },
          data: [{
            value: []
          }]
        }
      },
      totalScore: 0, // 素养总分值
      gradeRanked: 0, // 年级排名
      scoreList: [], // 分值列表
      list: [] // 列表
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList () {
      this.totalScore = 1250
      this.gradeRanked = 5
      this.scoreList = [
        { name: '品德素养1', score: 100 },
        { name: '品德素养2', score: 200 },
        { name: '品德素养3', score: 50 },
        { name: '品德素养4', score: 200 },
        { name: '品德素养5', score: 250 },
        { name: '品德素养6', score: 100 },
        { name: '品德素养7', score: 150 },
        { name: '品德素养8', score: 100 },
        { name: '品德素养9', score: 150 },
        { name: '品德素养10', score: 200 }
      ]
      this.options.radar.indicator = this.scoreList.map((item, index) => ({
        name: item.name,
        max: 300,
        axisLabel: { show: !index }
      }))
      this.options.series.data[0].value = this.scoreList.map(item => item.score)
      const list = [
        { name: '张三', avatar: '', score: 250 },
        { name: '张三', avatar: '', score: 250 },
        { name: '张三', avatar: '', score: 248 },
        { name: '张三', avatar: '', score: 247 },
        { name: '张三', avatar: '', score: 245 },
        { name: '张三', avatar: '', score: 244 },
        { name: '张三', avatar: '', score: 242 },
        { name: '张三', avatar: '', score: 240 },
        { name: '张三', avatar: '', score: 230 },
        { name: '张三', avatar: '', score: 220 },
        { name: '张三', avatar: '', score: 210 },
        { name: '张三', avatar: '', score: 200 },
        { name: '张三', avatar: '', score: 200 },
        { name: '张三', avatar: '', score: 200 },
        { name: '张三', avatar: '', score: 200 },
        { name: '张三', avatar: '', score: 200 }
      ]
      // 同分的人同名次
      let number = 0
      this.list = list.map((item, index) => {
        const prev = list[index - 1]
        item.number = prev && item.score === prev.score ? number : ++number
      })
      this.list = list
    }
  }
}
</script>

<style lang="less" scoped>
.head {
    border: 1px solid #DCDFE6;
    .echarts {
        width: 360px;
        height: 300px;
    }
    .data {
        margin-left: 15px;
        .score {
            &.default {
                color: #303133;
                font-size: 48px;
            }
            &.small {
                font-size: 32px;
            }
        }
        .name {
            color: #909399;
            font-size: 14px;
        }
        li {
            width: 150px;
            margin-top: 40px;
        }
    }
}
.body {
    margin: 10px -10px -5px;
    li {
        width: 180px;
        padding: 5px 10px;
        &.placeholder {
            padding: 0;
        }
        .item {
            height: 80px;
            border: 1px solid #DCDFE6;
            position: relative;
            padding: 10px;
            .user {
                width: 64px;
                position: relative;
                .avatar {
                    width: 64px;
                    height: 64px;
                }
                .name {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    font-size: 12px;
                    line-height: 20px;
                    background-color: rgba(#000, 0.5);
                    border-radius: 0 0 4px 4px;
                }
            }
            .score {
                font-size: 28px;
            }
            .number {
                position: absolute;
                top: 0;
                right: 0;
                width: 24px;
                height: 24px;
                line-height: 1;
                font-size: 12px;
                padding: 2px;
                &.primary {
                    background-image: linear-gradient(45deg, transparent 50%, @color-primary 50%);
                }
                &.info {
                    background-image: linear-gradient(45deg, transparent 50%, #909399 50%);
                }
            }
        }
    }
}
</style>
