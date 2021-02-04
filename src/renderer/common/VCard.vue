<template>
    <!-- 卡片栏目 -->
    <div class="v-card br16 hidden">
        <div class="head bg-primary flex flex-x-sb flex-y-c">
            <span class="title c-white">{{ title }}</span>
            <slot name="action">
                <i
                    class="action el-icon-arrow-right tc cp c-white"
                    @click="action"
                    v-if="isBoolean(isLink) ? isLink : !!link"
                ></i>
            </slot>
        </div>
        <div class="body bg-white scroll-y" :class="{ padding }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { isBoolean } from '@/assets/utils/types.js'
export default {
  props: {
    title: { type: String, default: '' }, // 标题
    link: { type: Object }, // 要跳转的链接
    isLink: { type: [Boolean, Number], default: 0 }, // 是否展示右侧箭头（默认传入了 link 就展示）
    padding: { type: Boolean, default: false } // 是否使用 padding
  },
  data () {
    return {
      isBoolean
    }
  },
  methods: {
    // 跳转链接
    action () {
      if (this.link) this.$router.push(this.link)
      this.$emit('action')
    }
  }
}
</script>

<style lang="less" scoped>
.v-card {
    .head {
        height: 54px;
        padding: 0 30px;
        .title, .action {
            font-size: 20px;
        }
        .action {
            margin-right: -30px;
            width: 60px;
            line-height: 54px;
            transition-duration: 0.1s;
            &:hover {
                background-color: rgba(#fff, 0.3);
            }
        }
    }
    .body {
        height: calc(~"100% - 54px");
        &.padding {
            padding: 20px 30px;
        }
    }
}
</style>
