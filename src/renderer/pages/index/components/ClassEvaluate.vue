<template>
    <v-card title="今日课堂评价" :link="{ name: 'classEvaluate' }">
        <ul class="flex flex-wrap flex-x-sb">
            <li v-for="item in list" :key="item.id">
                <div class="item tc">
                    <div class="count bg-primary-disabled">{{ item.count }}</div>
                    <div class="icon"></div>
                    <div class="type bg-primary c-white br10">{{ item.type }}</div>
                    <div class="name">点评{{ item.name }}</div>
                </div>
            </li>
            <li class="placeholder" v-for="(item, index) in 5" :key="index"></li>
        </ul>
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
        { name: '张三', type: '诚实守信', count: 2, id: '_1' },
        { name: '张三', type: '诚实守信', count: 2, id: '_2' },
        { name: '张三', type: '诚实守信', count: 2, id: '_3' },
        { name: '张三', type: '诚实守信', count: 2, id: '_4' },
        { name: '张三', type: '诚实守信', count: 2, id: '_5' },
        { name: '张三', type: '诚实守信', count: 2, id: '_6' },
        { name: '张三', type: '诚实守信', count: 2, id: '_7' },
        { name: '张三', type: '诚实守信', count: 2, id: '_8' },
        { name: '张三', type: '诚实守信', count: 2, id: '_9' },
        { name: '张三', type: '诚实守信', count: 2, id: '_10' },
        { name: '张三', type: '诚实守信', count: 2, id: '_11' },
        { name: '张三', type: '诚实守信', count: 2, id: '_12' },
        { name: '张三', type: '诚实守信', count: 2, id: '_13' },
        { name: '张三', type: '诚实守信', count: 2, id: '_14' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
ul {
    padding: 10px 20px;
    li {
        width: 100px;
        padding: 10px;
        &.placeholder {
            padding-top: 0;
            padding-bottom: 0;
        }
    }
}
.item {
    position: relative;
    .count {
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        line-height: 24px;
        border-radius: 50%;
    }
    .icon {
        height: 80px;
        background: url("@{domain}/icon-medal.png") no-repeat center / contain;
    }
    .type {
        font-size: 14px;
        line-height: 20px;
        margin-top: -15px;
    }
    .name {
        font-size: 14px;
    }
}
</style>
