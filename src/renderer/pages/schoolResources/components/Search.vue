<template>
    <div class="header-search">
        <el-input placeholder="输入关键字搜索" v-model="search" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      search: ''
    }
  }
}
</script>
<style lang="less" scoped>
    .header-search {
        .input-with-select {
            vertical-align: middle;
        }
    }
</style>
