<template>
    <div>
        <div class="head bg-page">
            提示：只能在内网打开查看。
        </div>
        <div class="body flex flex-g1 hidden">
            <div class="left flex flex-column">
                <div class="title pad bg-page">作业列表</div>
                <ul class="list flex-g1 scroll-y">
                    <li
                        class="cp"
                        :class="{ active: active === index }"
                        v-for="(item, index) in list"
                        :key="index"
                        @click="getDetail(item, index)"
                    >
                        <div class="item">
                            <div class="flex flex-x-sb flex-y-c">
                                <span class="subject flex flex-y-c">{{ item.subject }}科目作业</span>
                                <span class="duration">{{ item.duration }}分钟</span>
                            </div>
                            <div class="info">
                                <span>{{ item.createBy }}</span>
                                <span>{{ item.date }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="right flex-g1 flex flex-column">
                <div class="title pad bg-page">作业内容</div>
                <div class="content flex-g1">
                    <v-article>
                        <!-- <v-detail :detail="detail"></v-detail> -->
                        qweqwe
                    </v-article>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  components: {
    VArticle: () => import('@/common/VArticle')
    // VDetail: () => import('./components/VDetail')
  },
  data () {
    return {
      name: '五年级一班', // 班级名称
      minute: 30, // 分钟
      list: [], // 列表
      active: -1, // 当前索引
      detail: {} // 详情
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList () {
      this.list = [
        { subject: '语文', duration: 10, createBy: '张三', date: '08-07', title: '这是作业标题' },
        { subject: '数学', duration: 10, createBy: '张三', date: '08-08', title: '这是作业标题' },
        { subject: '语文', duration: 10, createBy: '张三', date: '08-07', title: '这是作业标题' },
        { subject: '数学', duration: 10, createBy: '张三', date: '08-08', title: '这是作业标题' },
        { subject: '语文', duration: 10, createBy: '张三', date: '08-07', title: '这是作业标题' },
        { subject: '数学', duration: 10, createBy: '张三', date: '08-08', title: '这是作业标题' },
        { subject: '语文', duration: 10, createBy: '张三', date: '08-07', title: '这是作业标题' },
        { subject: '数学', duration: 10, createBy: '张三', date: '08-08', title: '这是作业标题' },
        { subject: '语文', duration: 10, createBy: '张三', date: '08-07', title: '这是作业标题' },
        { subject: '数学', duration: 10, createBy: '张三', date: '08-08', title: '这是作业标题' }
      ]
      this.getDetail(this.list[0], 0)
    },
    // 获取详情
    getDetail (item, index) {
      this.active = index
      this.detail = item // ----
      // this.$api.xxApi.getExcellentWorkDetail({
      //     id: item.id
      // }).then(res => {
      //     if (res.data.Status) {
      //         this.detail = res.data.Data
      //         this.visible = true
      //     }
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.head {
    border: 1px solid #DCDFE6;
    font-size: 14px;
    line-height: 30px;
    padding: 0 30px;
    span {
        font-weight: bold;
    }
}
.body {
    margin-top: 15px;
    .left, .right {
        border: 1px solid #DCDFE6;
        .title {
            line-height: 40px;
            padding: 0 30px;
        }
    }
    .left {
        width: 260px;
        ul {
            li {
                position: relative;
                padding-left: 10px;
                line-height: 1;
                &:hover, &.active {
                    color: @color-primary;
                }
                &.active::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 5px;
                    background-color: @color-primary;
                }
                & + li .item {
                    border-top: 1px solid #DCDFE6;
                }
                .item {
                    padding: 15px 15px 15px 5px;
                    .subject::before {
                        content: "";
                        display: inline-block;
                        width: 4px;
                        height: 10px;
                        background-color: @color-primary;
                        margin-right: 5px;
                    }
                    .duration {
                        border-left: 1px solid #DCDFE6;
                        padding-left: 10px;
                        line-height: 18px;
                    }
                    .info {
                        margin-top: 10px;
                        font-size: 14px;
                        color: #909399;
                        span + span {
                            margin-left: 15px;
                        }
                    }
                }
            }
        }
    }
    .right {
        margin-left: 15px;
    }
}
.content {
    position: relative;
}
</style>
