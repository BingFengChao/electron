<template>
    <swiper class="h100p" ref="swiper" :options="options">
        <swiper-slide
            class="flex flex-column flex-x-c flex-y-c cp"
            :class="{ active: active === item.key }"
            v-for="item in list"
            :key="item.key"
            @click.native="change(item)"
        >
            <i class="iconfont" v-html="item.icon"></i>
            <span class="name">{{ item.name }}</span>
            <i class="bar"></i>
        </swiper-slide>
    </swiper>
</template>

<script>
import tabList from './tabList.js'
export default {
  data () {
    return {
      options: { slidesPerView: 9 },
      list: [], // 列表
      active: '' // 当前 tab
    }
  },
  watch: {
    $route () {
      this.sync()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList () {
      setTimeout(() => {
        this.list = tabList
        this.active = tabList[0].key
        this.options.slidesPerView = Math.min(this.list.length, 9)
        this.$emit('init', tabList)
        this.sync()
      })
    },
    // tab 切换
    change (tab) {
      this.active = tab.key
      this.$router.push({ name: tab.key })
      this.$bus.$emit('tab-change', tab)
    },
    // 非底部切换路由时同步 tab
    sync () {
      const key = this.$route.path.replace(/\/(\w+)(\/.+)?/, '$1')
      const index = this.list.findIndex(item => item.key === key)
      if (index > -1 && this.active !== key) {
        this.active = this.list[index].key
        this.$refs.swiper.$swiper.slideTo(index, 0, false)
        this.$bus.$emit('tab-change', this.list[index])
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-slide {
    &:hover, &.active {
        color: @color-primary;
    }
    &.active .bar {
        background-color: @color-primary;
    }
    .iconfont {
        font-size: 32px;
    }
    .name {
        font-size: 24px;
        margin-top: 10px;
    }
    .bar {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 60px;
        height: 4px;
        border-radius: 2px;
    }
}
</style>
