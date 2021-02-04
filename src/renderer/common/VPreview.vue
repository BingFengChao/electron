<template>
    <div class="v-preview">
        <el-image :preview-src-list="list" ref="preview"></el-image>
    </div>
</template>

<script>
let ready = false
export default {
  props: {
    list: { type: Array, default: () => [] }
  },
  methods: {
    show (index = 0) {
      if (this.list.length) {
        this.$refs.preview.showViewer = true
        this.$nextTick(() => {
          this.$refs.preview.$children[0].index = index
          if (ready) {
            this.$refs.preview.$children[0].deviceSupportInstall()
            this.$refs.preview.$children[0].$refs['el-image-viewer__wrapper'].focus()
          } else {
            ready = true
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.v-preview {
    line-height: 0;
    font-size: 0;
    /deep/ .el-image__error {
        display: none;
    }
}
</style>
