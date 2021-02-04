<template>
    <el-row :gutter="20" class="h100p c-white bg-primary">
        <el-col :span="8" class="left h100p flex flex-y-c">
            <img class="logo" :src="getFileHost('/board/logo.png', 1)" alt="logo">
            <span class="name">南山区珠光小学小黑板</span>
        </el-col>
        <el-col :span="8" class="center tc">{{ tab }}</el-col>
        <el-col :span="8" class="right flex">
            <i class="min el-icon-minus"></i>
            <i class="max flex flex-x-c flex-y-c"></i>
            <i class="close el-icon-close"></i>
        </el-col>
    </el-row>
</template>

<script>
import { getFileHost } from '@/assets/utils/host.js'
export default {
  data () {
    return {
      getFileHost,
      tab: '首页' // 当前 tab
    }
  },
  created () {
    this.$bus.$on('tab-change', item => {
      this.tab = item.name
    })
  }
}
</script>

<style lang="less" scoped>
.left {
    line-height: 1;
    .logo {
        width: 43px;
        margin-left: 40px;
    }
    .name {
        font-size: 32px;
        margin-left: 10px;
    }
}
.center {
    line-height: 80px;
    font-size: 42px;
    font-weight: bold;
}
.right {
    justify-content: flex-end;
    i {
        font-size: 28px;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        cursor: pointer;
        transition-duration: 0.2s;
    }
    .max::before {
        content: "";
        width: 24px;
        height: 24px;
        border: 2px solid #eee;
        border-radius: 4px;
    }
    .min:hover, .max:hover {
        background-color: rgba(#fff, 0.5);
    }
    .close:hover {
        background-color: @color-danger;
    }
}
</style>
