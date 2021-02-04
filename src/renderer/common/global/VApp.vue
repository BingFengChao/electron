<template>
    <div class="v-app flex flex-column" v-if="tabs.length">
        <el-tabs
            type="card"
            v-model="tab"
            @tab-click="$router.replace(path + tab)"
            v-if="tabsOnLogin && $store.state.userInfo"
        >
            <el-tab-pane
                v-for="(item, index) in tabs"
                :key="index"
                :label="isObject ? item.label : item"
                :name="isObject ? item.path : index + ''"
            ></el-tab-pane>
        </el-tabs>
        <keep-alive v-if="keepAlive">
            <router-view class="flex-g1 bg-white br10" :class="[{ pad }, contentClass]"></router-view>
        </keep-alive>
        <router-view class="flex-g1 bg-white br10" :class="[{ pad }, contentClass]" v-else></router-view>
    </div>
    <div class="v-app bg-white br10" :class="{ pad }" v-else>
        <slot></slot>
    </div>
</template>

<script>
import { isObject } from '@/assets/utils/types.js'
export default {
  props: {
    tabs: { type: Array, default: () => [] }, // 使用 tabs
    // tabs 例如 ['页面 1', '页面 2'] 默认子路由为对应的索引 0 和 1
    // 或指定 label 和 path 的对象数组 [{ label: '页面 1', path: 'one' }, { label: '页面 2', path: 'two' }]
    keepAlive: { type: Boolean, default: false }, // 路由切换使用 keep-alive
    contentClass: { type: String, default: '' }, // 传入 tabs 时给 router-view 的样式
    pad: { type: Boolean, default: true }, // 内容是否使用 pad 样式
    tabsOnLogin: { type: Boolean, default: false } // 是否只在登录时显示 tabs
  },
  data () {
    return {
      isObject: this.tabs.every(item => isObject(item)), // tabs 是否是对象数组
      path: this.getPath()[0], // 父级路径
      tab: this.getPath()[1] // 当前 tab
    }
  },
  created () {
    if (this.tabs.length) {
      // 监听路由保持 tab 和路由对应（直接输入地址 tab 不会自动改变）
      this.$watch('$route', $route => {
        const tab = this.getPath()[1]
        if (tab !== this.tab) this.tab = tab
      })
    }
  },
  methods: {
    // 获取路径
    getPath () {
      const pathList = this.$route.path.split('/')
      const path = pathList.slice(0, -1).join('/') + '/'
      const tab = pathList[pathList.length - 1]
      return [path, tab]
    }
  }
}
</script>

<style lang="less" scoped>
.v-app {
    position: relative;
}
</style>
