<template>
    <!-- 暂无数据 -->
    <div class="v-empty w100p h100p flex flex-column flex-x-c flex-y-c">
        <img class="icon" :class="size" :src="img" v-if="!hideImg">
        <span class="text" :class="size">
            <slot>暂无数据</slot>
        </span>
    </div>
</template>

<script>
import { getFileHost } from '@/assets/utils/host.js'
export default {
  props: {
    hideImg: { type: Boolean, default: false },
    img: { type: String, default: getFileHost('/Common/empty.png', 1) },
    size: { type: String, default: 'default' } // default small
  }
}
</script>

<style lang="less" scoped>
.v-empty {
    line-height: normal;
    .icon {
        margin-bottom: 10px;
        &.default {
            width: 100px;
        }
        &.small {
            width: 80px;
        }
    }
    .text {
        color: #909399;
        &.small {
            font-size: 14px;
        }
    }
}
</style>
