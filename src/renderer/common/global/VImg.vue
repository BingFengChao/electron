<template>
    <!-- 图片 -->
    <el-image class="v-img bg-page" fit="cover" v-bind="$attrs">
        <div slot="error" class="h100p flex flex-x-c flex-y-c">
            <i class="icon" :class="[user ? 'user w100p h100p' : 'el-icon-picture-outline', { mini }]"></i>
        </div>
    </el-image>
</template>

<script>
export default {
  props: {
    user: { type: Boolean, default: false }, // 是否在加载失败时使用用户 icon
    mini: { type: Boolean, default: false } // 是否使用小尺寸的加载失败 icon
  }
}
</script>

<style lang="less" scoped>
.v-img {
    border-radius: 4px;
    vertical-align: top;
    .icon {
        font-size: 40px;
        color: #929292;
        &.user {
            background: url("@{headImg}") no-repeat center / cover;
        }
        &.mini {
            font-size: 24px;
        }
    }
}
</style>
