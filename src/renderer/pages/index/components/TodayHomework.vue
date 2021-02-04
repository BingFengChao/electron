<template>
    <v-card title="今日作业" :link="{ name: 'todayHomework' }">
        <v-list class="list" :list="list" v-slot="{ item }" @click="getDetail">
            <div class="subject flex-s0 tc bg-success c-white br16">{{ item.subject }}</div>
            <div class="title flex-g1 ellipsis">{{ item.title }}</div>
            <div class="date flex-s0">{{ item.date }}</div>
        </v-list>
        <v-empty v-if="!list.length"></v-empty>

        <el-dialog title="作业内容" :visible.sync="visible">
            <v-article
                :length="list.length"
                :index.sync="index"
                @view="getDetail(list[index], index)"
            >
                <v-detail :detail="detail"></v-detail>
            </v-article>
        </el-dialog>
    </v-card>
</template>

<script>
export default {
  components: {
    VCard: () => import('@/common/VCard'),
    VList: () => import('./components/VList'),
    VArticle: () => import('@/common/VArticle'),
    VDetail: () => import('pages/todayHomework/components/VDetail')
  },
  data () {
    return {
      list: [], // 列表
      detail: {}, // 详情
      index: -1, // 当前作业索引
      visible: false // 是否显示弹窗
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList () {
      this.list = [
        { subject: '语文', title: '朗诵文章', date: '08-07', file: [{ name: '附件.xlsx' }, { name: '附件.xlsx' }] },
        { subject: '数学', title: '微积分', date: '08-08', file: [{ name: '附件.xlsx' }, { name: '附件.xlsx' }] },
        { subject: '语文', title: '朗诵文章', date: '08-07', file: [{ name: '附件.xlsx' }, { name: '附件.xlsx' }] },
        { subject: '数学', title: '微积分', date: '08-08', file: [{ name: '附件.xlsx' }, { name: '附件.xlsx' }] },
        { subject: '语文', title: '朗诵文章', date: '08-07', file: [{ name: '附件.xlsx' }, { name: '附件.xlsx' }] },
        { subject: '数学', title: '微积分', date: '08-08', file: [{ name: '附件.xlsx' }, { name: '附件.xlsx' }] },
        { subject: '语文', title: '朗诵文章', date: '08-07', file: [{ name: '附件.xlsx' }, { name: '附件.xlsx' }] },
        { subject: '数学', title: '微积分', date: '08-08', file: [{ name: '附件.xlsx' }, { name: '附件.xlsx' }] },
        { subject: '语文', title: '朗诵文章', date: '08-07', file: [{ name: '附件.xlsx' }, { name: '附件.xlsx' }] },
        { subject: '数学', title: '微积分', date: '08-08', file: [{ name: '附件.xlsx' }, { name: '附件.xlsx' }] }
      ]
    },
    // 获取详情
    getDetail (item, index) {
      this.detail = item // ----
      this.index = index
      this.visible = true // ----
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
.subject {
    width: 75px;
    line-height: 32px;
}
.title {
    padding: 0 30px;
}
</style>
