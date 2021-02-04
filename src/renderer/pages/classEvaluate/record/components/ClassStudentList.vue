<template>
    <div>
        <div class="head">
            <span>班级统计</span>
            <el-select v-model="order" @change="sort">
                <el-option label="按姓名首字母排序" :value="0"></el-option>
                <el-option label="按累计积分排序" :value="1"></el-option>
            </el-select>
        </div>
        <ul class="hover">
            <li
                class="flex flex-x-sb flex-y-c"
                :class="{ active: active === item }"
                v-for="(item, index) in list"
                :key="index"
                @click="change(item)"
            >
                <div class="flex flex-y-c">
                    <v-img :src="item.avatar" user mini></v-img>
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
export default {
  data () {
    return {
      order: 0, // 排序: 0 按姓名, 1 按积分
      list: [], // 列表
      active: {} // 当前项
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList () {
      this.list = [
        { name: '张三', add: 22, minus: 8 },
        { name: '李四', add: 14, minus: 10 },
        { name: '王五', add: 22, minus: 8 },
        { name: '张三', add: 22, minus: 8 },
        { name: '李四', add: 1, minus: 10 },
        { name: '王五', add: 1, minus: 10 },
        { name: '张三', add: 22, minus: 8 },
        { name: '李四', add: 1, minus: 10 },
        { name: '王五', add: 22, minus: 8 },
        { name: '张三', add: 22, minus: 8 },
        { name: '李四', add: 1, minus: 10 },
        { name: '王五', add: 10, minus: 10 }
      ]
      this.sort()
      this.change(this.list[0])
    },
    // 排序改变
    sort () {
      const nameSort = (a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN')
      const scoreSort = (a, b) => (a.add - a.minus) - (b.add - b.minus)
      this.list.sort(this.order ? scoreSort : nameSort)
    },
    // 当前项改变
    change (item) {
      this.active = item
      this.$bus.$emit('evaluate-change', item)
    }
  }
}
</script>

<style lang="less" scoped>
.el-select {
    float: right;
    width: 160px;
}
.v-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
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
