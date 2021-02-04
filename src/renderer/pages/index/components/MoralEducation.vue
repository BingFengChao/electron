<template>
    <v-card :title="`第${week}周班级德育`" :link="{ name: 'moralEducation' }">
        <ul class="h100p flex flex-y-c tc">
            <li class="flex-g1" v-for="(item, index) in statusList" :key="item.name">
                <div class="count" :class="item.color">{{ list[index] }}</div>
                <div class="type">{{ item.name }}</div>
            </li>
        </ul>
    </v-card>
</template>

<script>
export default {
  components: {
    VCard: () => import('@/common/VCard')
  },
  data () {
    return {
      week: 10, // 当前周
      statusList: [ // 状态列表
        { name: '扣班级', color: 'c-danger' },
        { name: '加班级', color: 'c-primary' },
        { name: '扣学生', color: 'c-danger' },
        { name: '加学生', color: 'c-primary' }
      ],
      list: [] // 数据
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList () {
      this.list = ['-10', '+10', '-40', '+30']
    }
  }
}
</script>

<style lang="less" scoped>
ul {
    padding: 0 30px;
    .count {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 6px;
    }
}
</style>
