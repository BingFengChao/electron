<template>
    <div>
        <h1>{{ detail.title }}</h1>
        <div class="info">班级：{{ '一年级一班' }}</div>
        <div class="info">科目：{{ '语文' }}</div>
        <div class="info">作业类型：{{ '图文类' }}</div>
        <div class="info">作业日期：{{ '2020-03-04' }}</div>
        <div class="info">建议完成时长（分钟）：{{ '10' }}</div>
        <div class="info">是否限时提交：{{ '否' }}</div>

        <div class="head">内容</div>
        <div class="body pre-wrap">{{ '内容' }}</div>

        <div class="head">视频</div>
        <div class="body">{{ '视频' }}</div>

        <div class="head">附件</div>
        <div class="body file flex flex-y-c" v-for="(item, index) in detail.file" :key="index">
            <span class="name flex-g1 ellipsis" :title="item.name">{{ item.name }}</span>
            <el-link type="primary" icon="el-icon-view" @click="preview(item.url)">在线查看</el-link>
            <el-link type="primary" icon="el-icon-download" @click="download(item.url)">下载</el-link>
        </div>
    </div>
</template>

<script>
import { download } from '@/assets/utils/formatFile.js'
import { getFileOnlinePreview } from '@/assets/utils/host.js'
export default {
  props: {
    detail: { type: Object, default: () => {} }
  },
  data () {
    return {
      download
    }
  },
  methods: {
    // 在线查看
    preview (url) {
      open(getFileOnlinePreview(url))
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
    font-size: 24px;
    font-weight: bold;
}
.info {
    margin-top: 10px;
}
.head {
    margin-top: 30px;
    color: #909399;
}
.body {
    margin-top: 10px;
}
.file .el-link {
    margin-left: 10px;
    flex-shrink: 0;
}
</style>
