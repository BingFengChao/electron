<template>
    <div>
        <div class="head">{{ isStudent ? student.name : '班级统计' }}</div>
        <v-chart class="flex-s0" :options="options" v-if="list.length"></v-chart>
        <ul class="hover">
            <li
                class="flex flex-x-sb flex-y-c"
                :class="{ active: active === item }"
                v-for="(item, index) in list"
                :key="index"
                @click="change(item)"
            >
                <div class="flex flex-y-c">
                    <i class="icon tc">{{ item.name[0] }}</i>
                    <div class="name">{{ item.name }}</div>
                </div>
                <div class="flex flex-y-c">
                    <div class="count" :class="item.add >= item.minus ? 'c-primary' : 'c-danger'">
                        {{ item.add > item.minus ? '+' : '' }}{{ item.add - item.minus }}
                    </div>
                    <i class="arrow el-icon-arrow-right"></i>
                </div>
            </li>
        </ul>
        <v-empty v-if="!list.length"></v-empty>
    </div>
</template>

<script>
import 'echarts/lib/chart/pie'
export default {
  props: {
    isStudent: { type: Boolean, default: false } // 是否是学生模式
  },
  data () {
    return {
      options: {
        color: ['#c23531', '#91c7ae'],
        series: {
          type: 'pie',
          radius: ['60%', '85%'],
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              formatter: '',
              rich: {
                a: {
                  fontSize: 32,
                  fontWeight: 'bold'
                },
                b: {
                  fontSize: 16,
                  marginTop: 20
                }
              }
            }
          },
          data: []
        }
      },
      list: [], // 列表
      active: {}, // 当前项
      student: {} // 当前学生
    }
  },
  created () {
    this.getList()
    this.$bus.$on('evaluate-change', item => {
      this.student = item
    })
  },
  methods: {
    // 获取列表
    getList () {
      this.list = [
        { name: '全部点评', add: 22, minus: 8 },
        { name: '大众点评', add: 1, minus: 10 },
        { name: '全部点评', add: 22, minus: 8 },
        { name: '大众点评', add: 1, minus: 10 },
        { name: '全部点评', add: 22, minus: 8 },
        { name: '大众点评', add: 1, minus: 10 },
        { name: '全部点评', add: 22, minus: 8 },
        { name: '大众点评', add: 1, minus: 10 },
        { name: '全部点评', add: 22, minus: 8 },
        { name: '大众点评', add: 1, minus: 10 },
        { name: '全部点评', add: 22, minus: 8 },
        { name: '大众点评', add: 10, minus: 10 }
      ]
      this.change(this.list[0])
    },
    // 当前项改变
    change (item) {
      this.active = item
      this.options.series.emphasis.label.formatter = ['{a|{b}}', `{b|${item.name}}`].join('\n')
      this.options.series.data = [
        { name: '-' + item.minus, value: item.minus },
        { name: '+' + item.add, value: item.add }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.echarts {
    margin: 15px auto 0;
    width: 200px;
    height: 200px;
}
.icon {
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 50%;
    margin-right: 10px;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 0 0 10px;
}
.name {
    line-height: 1;
}
.count {
    font-size: 20px;
    font-weight: bold;
    margin-right: 5px;
}
.arrow {
    font-size: 20px;
}
</style>
