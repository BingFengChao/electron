<template>
    <!-- 文章详情 -->
    <div class="v-article flex flex-column" ref="article">
        <div class="body flex-g1 scroll-y">
            <div class="content">
                <slot></slot>
            </div>
        </div>
        <div class="foot flex flex-x-c flex-y-c bg-page" v-if="length">
            <el-link
                :underline="false"
                class="el-icon-arrow-left"
                @click="view(index - 1)"
                :disabled="index === 0"
            ></el-link>
            <span class="progress">{{ index + 1 }} / {{ length }}</span>
            <el-link
                :underline="false"
                class="el-icon-arrow-right"
                @click="view(index + 1)"
                :disabled="index === length - 1"
            ></el-link>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    length: { type: Number, default: 0 }, // 切换上下一条
    index: { type: Number, default: 0 } // 当前进度
  },
  methods: {
    view (index) {
      this.$emit('update:index', index)
      this.$emit('view')
      this.$refs.article.scrollTop = 0
    }
  }
}
</script>

<style lang="less" scoped>
.v-article {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .body {
        padding: 20px;
        .content {
            max-width: 750px;
            margin: 0 auto;
        }
    }
    .foot {
        .el-link {
            font-size: 24px;
            padding: 10px;
        }
        .progress {
            font-size: 20px;
            margin: 0 20px;
        }
    }
}
</style>
