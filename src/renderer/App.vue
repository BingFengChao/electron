<template>
    <el-container id="app" class="h100p bg-page hidden">
        <template v-if="$store.state.classInfo">
            <el-header height="80px">
                <v-header></v-header>
            </el-header>
            <el-main>
                <router-view class="h100p"></router-view>
            </el-main>

            <el-footer height="100px" class="bg-white">
                <v-footer></v-footer>
            </el-footer>
        </template>
        <v-set v-else></v-set>
    </el-container>
</template>

<script>
export default {
  components: {
    VSet: () => import('pages/app/VSet'),
    VHeader: () => import('pages/app/VHeader'),
    VFooter: () => import('pages/app/VFooter')
  },
  data () {
    return {
    }
  },
  provide: {
    // 按钮公共属性
    btnAttr: {
      class: 'form-btn',
      type: 'primary',
      round: true
    }
  },
  created () {
    // 登录----
    // this.$router.replace('index')
    this.$store.commit('saveClassInfo', { teacherId: '123' })
  }
}
</script>

<style lang="less" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #606266;
}
header, footer {
    padding: 0;
}
main {
    padding: 20px 40px;
}
</style>
