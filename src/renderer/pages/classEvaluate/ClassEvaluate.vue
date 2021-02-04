<template>
    <v-app :tabs="tabs" :pad="false" tabs-on-login></v-app>
</template>

<script>
export default {
  data () {
    return {
      tabs: ['添加评价', '评价记录']
    }
  }
}
</script>

<style lang="less" scoped>
</style>
