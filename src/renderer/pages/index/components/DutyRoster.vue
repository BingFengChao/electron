<template>
    <v-card title="今日值日表">
        <ul class="flex flex-wrap tc">
            <li
                class="bg-primary-disabled br16"
                v-for="(item, index) in list"
                :key="index"
            >{{ item.leader ? '组长：' : '' }}{{ item.name }}</li>
        </ul>
        <div class="icon"></div>
        <v-empty v-if="!list.length"></v-empty>
    </v-card>
</template>

<script>
export default {
  components: {
    VCard: () => import('@/common/VCard')
  },
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
      this.list = [
        { name: '张三', leader: true },
        { name: '张三' },
        { name: '张三' },
        { name: '张三' },
        { name: '张三' },
        { name: '张三' },
        { name: '张三' },
        { name: '张三' },
        { name: '张三' },
        { name: '张三' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
ul {
    padding: 0 30px 15px;
    li {
        padding: 0 15px;
        line-height: 32px;
        margin-top: 15px;
        margin-right: 15px;
        z-index: 1;
    }
}
.icon {
    position: absolute;
    right: 15px;
    bottom: 10px;
    width: 50px;
    height: 50px;
    background: url("@{domain}/icon-duty.png") no-repeat center / contain;
}
</style>
