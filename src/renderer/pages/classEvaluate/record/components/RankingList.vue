<template>
    <div>
        <div class="head">排行榜</div>
        <ul>
            <li
                class="flex flex-x-sb flex-y-c"
                v-for="(item, index) in list"
                :key="index"
            >
                <div class="flex flex-y-c">
                    <i class="number tc" :class="item.number <= 3 ? 'no no' + item.number : ''">{{ item.number }}</i>
                    <div class="name">{{ item.name }}</div>
                </div>
                <div class="count" :class="item.add >= item.minus ? 'c-primary' : 'c-danger'">
                    {{ item.add > item.minus ? '+' : '' }}{{ item.add - item.minus }}
                </div>
            </li>
        </ul>
        <v-empty v-if="!list.length"></v-empty>
    </div>
</template>

<script>
export default {
  data () {
    return {
      list: [] // 列表
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList () {
      const list = [
        { name: '张三', add: 22, minus: 0 },
        { name: '张三', add: 22, minus: 0 },
        { name: '张三', add: 22, minus: 1 },
        { name: '张三', add: 22, minus: 2 },
        { name: '张三', add: 22, minus: 3 },
        { name: '张三', add: 22, minus: 4 },
        { name: '张三', add: 22, minus: 5 },
        { name: '张三', add: 22, minus: 6 },
        { name: '张三', add: 22, minus: 7 },
        { name: '张三', add: 22, minus: 8 },
        { name: '张三', add: 22, minus: 9 },
        { name: '张三', add: 22, minus: 9 },
        { name: '张三', add: 22, minus: 9 },
        { name: '张三', add: 22, minus: 9 },
        { name: '李四', add: 1, minus: 10 },
        { name: '张三', add: 0, minus: 0 }
      ]
      // 只展示有分值的人，同分的人同名次
      let number = 0
      this.list = list.filter(item => item.add || item.minus).map((item, index) => {
        const prev = list[index - 1]
        item.number = prev && item.add - item.minus === prev.add - prev.minus ? number : ++number
        return item
      })
    }
  }
}
</script>

<style lang="less" scoped>
.number {
    width: 40px;
    line-height: 40px;
    margin-right: 10px;
    font-size: 20px;
    font-weight: bold;
    &.no {
        color: transparent;
    }
    &.no1 {
        background: url("@{domain}/ranking1.png") no-repeat center / contain;
    }
    &.no2 {
        background: url("@{domain}/ranking2.png") no-repeat center / contain;
    }
    &.no3 {
        background: url("@{domain}/ranking3.png") no-repeat center / contain;
    }
}
.name {
    line-height: 1;
}
.count {
    font-size: 20px;
    font-weight: bold;
    margin-right: 5px;
}
</style>
