<template>
    <v-app :tabs="tabs" :pad="false"></v-app>
</template>

<script>
export default {
  data () {
    return {
      tabs: ['我上传的', '收藏/分享', '校内资源', '直播', '点播']
    }
  }
}
</script>

<style lang="less" scoped>
</style>
