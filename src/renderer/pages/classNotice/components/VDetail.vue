<template>
    <div>
        <div class="title">
            <i class="new c-white" v-if="detail.new">最新</i>
            <h1 class="inline">{{ detail.title }}</h1>
            <span class="tag">{{ typeList[detail.type].label }}</span>
            <span class="tag" v-if="detail.type === 2">{{ detail.club }}社团</span>
        </div>
        <div class="info label">
            <span>{{ '叶海龙' }}</span>
            <span>{{ '2020-06-22 12:55' }}</span>
        </div>
        <div class="info pre-wrap">{{ '内容' }}</div>

        <template v-if="detail.type === 0">
            <div class="head">链接</div>
            <el-link
                class="body"
                type="primary"
                icon="el-icon-link"
                :href="'https://element.eleme.io'"
                target="_blank"
            >这里放置链接的名称</el-link>

            <div class="head">附件</div>
            <div class="body file flex flex-y-c" v-for="(item, index) in detail.file" :key="index">
                <span class="name flex-g1 ellipsis" :title="item.name">{{ item.name }}</span>
                <el-link type="primary" icon="el-icon-view" @click="preview(item.url)">在线查看</el-link>
                <el-link type="primary" icon="el-icon-download" @click="download(item.url)">下载</el-link>
            </div>
        </template>

        <template v-else-if="detail.type === 2">
            <div class="head">本班在&lt;{{ detail.club }}社团&gt;名单</div>
            <div class="body student">
                <span v-for="(item, index) in detail.student" :key="index">{{ item }}</span>
            </div>
        </template>
    </div>
</template>

<script>
import { download } from '@/assets/utils/formatFile.js'
import { getFileOnlinePreview } from '@/assets/utils/host.js'
import typeList from 'pages/classNotice/components/typeList'
export default {
  props: {
    detail: { type: Object, default: () => {} }
  },
  data () {
    return {
      download,
      typeList
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
.title {
    position: relative;
    .new {
        position: absolute;
        top: -20px;
        left: 0;
        width: 50px;
        height: 50px;
        background-image: linear-gradient(135deg, transparent 20%, @color-danger 20% 50%, transparent 50%);
        text-indent: 14px;
        padding: 2px 15px 0 2px;
        line-height: 1;
        & + h1::before {
            content: "";
            margin-right: 20px;
        }
    }
    h1 {
        font-size: 24px;
        font-weight: bold;
    }
    .tag {
        display: inline-block;
        color: #fff;
        background-color: #606266;
        border-radius: 4px;
        padding: 5px 10px;
        line-height: 1;
        font-size: 14px;
        vertical-align: text-bottom;
        margin-left: 10px;
    }
}
.info {
    margin-top: 10px;
}
.label {
    color: #909399;
    border-bottom: 1px solid #DCDFE6;
    line-height: 40px;
    font-size: 14px;
    span + span {
        margin-left: 15px;
    }
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
.student span {
    margin-top: 10px;
    margin-right: 15px;
}
</style>
