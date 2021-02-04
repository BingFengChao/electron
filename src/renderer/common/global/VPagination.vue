<template>
    <div class="v-pagination tc" v-if="total > pageSizes[0]">
        <el-pagination
            :total="total"
            :page-size="size"
            :current-page="current"
            :page-sizes="pageSizes"
            :layout="layout"
            @size-change="size = $event"
            @current-change="current = $event"
        ></el-pagination>
    </div>
</template>

<script>
export default {
  props: {
    total: { type: Number, default: 0 }, // 总条数
    pageSize: { type: Number, default: 20 }, // 每页条数
    currentPage: { type: Number, default: 1 }, // 当前页
    pageSizes: { type: Array, default: () => [20, 50, 100] }, // 可选页数
    layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' }, // 分页布局
    top: { type: Boolean, default: true } // 是否在分页改变时回到顶部
  },
  computed: {
    // 每页条数
    size: {
      get () {
        return this.pageSize
      },
      set (value) {
        this.$emit('update:page-size', value)
        this.$emit('change')
        if (this.top) scroll(0, 0)
      }
    },
    // 当前页
    current: {
      get () {
        return this.currentPage
      },
      set (value) {
        this.$emit('update:current-page', value)
        this.$emit('change')
        if (this.top) scroll(0, 0)
      }
    }
  },
  methods: {
    // 重置
    reset () {
      this.$emit('update:page-size', 20)
      this.$emit('update:current-page', 1)
      if (this.top) scroll(0, 0)
    }
  }
}
</script>

<style lang="less" scoped>
.v-pagination {
    padding-top: 13px;
}
</style>
