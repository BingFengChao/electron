<template>
    <div>
        <div class="head">
            <span>评价详情</span>
            <el-checkbox
                class="flex flex-y-c"
                v-model="checked"
                @change="list = checked ? selfList : allList"
                v-if="$store.state.userInfo"
            >只看自己的评价记录</el-checkbox>
        </div>
        <ul>
            <li
                class="flex flex-x-sb flex-y-c"
                v-for="(item, index) in list"
                :key="index"
            >
                <div class="flex">
                    <i class="icon" :class="item.add > item.minus ? 'add' : 'minus'"></i>
                    <div class="body flex flex-column flex-x-sb">
                        <div>
                            <span class="count tc iblock" :class="item.add >= item.minus ? 'c-primary' : 'c-danger'">{{
                                item.add > item.minus ? '+' : '' }}{{ item.add - item.minus
                            }}</span>
                            <span class="comment">表扬{{ item.name }}，{{ item.comment }}</span>
                        </div>
                        <div class="info">{{ item.teacher }}老师 于{{ item.date }}点评</div>
                    </div>
                </div>
                <el-link
                    :underline="false"
                    type="danger"
                    class="del el-icon-circle-close"
                    @click="del(item.id)"
                    v-if="$store.state.userInfo"
                ></el-link>
            </li>
        </ul>
        <v-empty v-if="!list.length"></v-empty>
    </div>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 列表
      allList: [], // 全部列表
      selfList: [], // 自己评价的列表
      checked: false // 只看自己评价的
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList () {
      this.list = this.allList = [
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '刘其湛', date: '2020-08-28 12:34:56', id: '123' },
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '刘其湛', date: '2020-08-28 12:34:56', id: '123' },
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '兰莹', date: '2020-08-28 12:34:56' },
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '兰莹', date: '2020-08-28 12:34:56' },
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '兰莹', date: '2020-08-28 12:34:56' },
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '兰莹', date: '2020-08-28 12:34:56' },
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '兰莹', date: '2020-08-28 12:34:56' },
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '兰莹', date: '2020-08-28 12:34:56' },
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '兰莹', date: '2020-08-28 12:34:56' },
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '兰莹', date: '2020-08-28 12:34:56' },
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '兰莹', date: '2020-08-28 12:34:56' },
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '兰莹', date: '2020-08-28 12:34:56' },
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '兰莹', date: '2020-08-28 12:34:56' },
        { name: '张三', add: 22, minus: 8, comment: '善于思考', teacher: '兰莹', date: '2020-08-28 12:34:56' },
        { name: '李四', add: 1, minus: 10, comment: '善于思考', teacher: '兰莹', date: '2020-08-28 12:34:56' }
      ]
      const { userInfo } = this.$store.state
      if (userInfo) this.selfList = this.allList.filter(item => item.id === userInfo.id)
    },
    // 删除
    del (id) {
      this.$confirm('确定删除吗？', '提示', {
        type: 'warning'
      }).then(() => {
        // this.$api.xxxApi.xxxDelete({
        //     b_id: id
        // }).then(res => {
        //     this.$handleResponse(res).then(() => {
        //         this.$message.success('已删除')
        //         this.getList()
        //     }).catch(() => {})
        // })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-checkbox {
    float: right;
    /deep/ .el-checkbox__inner {
        width: 20px;
        height: 20px;
        vertical-align: top;
        &::after {
            border-width: 2px;
            width: 5px;
            height: 10px;
            left: 6px;
        }
    }
    /deep/ .el-checkbox__label {
        font-size: 20px;
        line-height: 30px;
    }
}
.icon {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    &.add {
        background: url("@{domain}/evaluate0.png") no-repeat center / contain;
    }
    &.minus {
        background: url("@{domain}/evaluate1.png") no-repeat center / contain;
    }
}
.body {
    padding: 3px 0;
    .count {
        font-weight: bold;
        padding: 0 10px;
        border-radius: 4px;
        line-height: 20px;
        min-width: 50px;
        margin-right: 10px;
        &.c-primary {
            border: 1px solid @color-primary;
        }
        &.c-danger {
            border: 1px solid @color-danger;
        }
    }
    .comment {
        line-height: 20px;
    }
    .info {
        color: #909399;
        font-size: 14px;
        line-height: 1;
    }
}
.del {
    font-size: 24px;
}
</style>
