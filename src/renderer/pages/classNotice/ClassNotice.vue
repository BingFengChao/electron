<template>
    <v-app :pad="false" class="flex">
        <div class="left flex flex-column">
            <div class="tc">
                <el-select class="btn" v-model="type" @change="getList">
                    <el-option
                        v-for="item in typeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </div>
            <ul class="flex-g1 scroll-y">
                <li
                    class="pad cp"
                    :class="{ 'active': active === index }"
                    v-for="(item, index) in list"
                    :key="index"
                    @click="getDetail(item, index)"
                >{{ item.title }}</li>
            </ul>
        </div>
        <div class="right flex-g1">
            <v-article>
                <v-detail :detail="detail"></v-detail>
            </v-article>
        </div>
    </v-app>
</template>

<script>
import typeList from 'pages/classNotice/components/typeList'
export default {
  components: {
    VArticle: () => import('@/common/VArticle'),
    VDetail: () => import('./components/VDetail')
  },
  data () {
    typeList.unshift({ label: '全部通知', value: '' })
    return {
      typeList,
      type: '', // 当前类型
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
        { type: 0, title: '朗诵文章', date: '08-07', new: true, file: [{ name: '附件.xlsx' }] },
        { type: 1, title: '微积分啊', date: '08-08' },
        { type: 2, title: '社团招生', date: '08-07', club: '飞行爱好者', student: ['张三', '李四', '王五'] },
        { type: 0, title: '朗诵文章', date: '08-07', new: true, file: [{ name: '附件.xlsx' }] },
        { type: 1, title: '微积分啊', date: '08-08' },
        { type: 2, title: '社团招生', date: '08-07', club: '飞行爱好者', student: ['张三', '李四', '王五'] },
        { type: 0, title: '朗诵文章', date: '08-07', new: true, file: [{ name: '附件.xlsx' }] },
        { type: 1, title: '微积分啊', date: '08-08' },
        { type: 2, title: '社团招生', date: '08-07', club: '飞行爱好者', student: ['张三', '李四', '王五'] },
        { type: 0, title: '朗诵文章', date: '08-07', new: true, file: [{ name: '附件.xlsx' }] },
        { type: 1, title: '微积分啊', date: '08-08' },
        { type: 2, title: '社团招生', date: '08-07', club: '飞行爱好者', student: ['张三', '李四', '王五'] },
        { type: 0, title: '朗诵文章', date: '08-07', new: true, file: [{ name: '附件.xlsx' }] },
        { type: 1, title: '微积分啊', date: '08-08' },
        { type: 2, title: '社团招生', date: '08-07', club: '飞行爱好者', student: ['张三', '李四', '王五'] },
        { type: 0, title: '朗诵文章', date: '08-07', new: true, file: [{ name: '附件.xlsx' }] },
        { type: 1, title: '微积分啊', date: '08-08' },
        { type: 2, title: '社团招生', date: '08-07', club: '飞行爱好者', student: ['张三', '李四', '王五'] }
      ]
      this.getDetail(this.list[0], 0)
    },
    // 获取详情
    getDetail (item, index) {
      this.detail = item // ----
      this.active = index
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
.left {
    width: 300px;
    padding-top: 15px;
    border-right: 1px solid #DCDFE6;
    ul {
        margin-top: 15px;
        border-top: 1px solid #DCDFE6;
        li {
            & + li {
                border-top: 1px solid #DCDFE6;
            }
            &:hover {
                color: @color-primary;
            }
            &.active {
                color: #fff;
                background-color: @color-primary;
            }
        }
    }
}
.right {
    position: relative;
}
</style>
