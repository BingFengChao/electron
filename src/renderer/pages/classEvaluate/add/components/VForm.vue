<template>
    <el-dialog
        :title="!type ? '表扬信' : '通报'"
        :visible.sync="visible"
        append-to-body
        :before-close="done => $confirm('确认关闭吗？').then(done).catch(() => {})"
        @closed="$refs.form.resetFields()"
    >
        <el-form :model="form" :rules="rules" ref="form" label-position="top" :show-message="false">
            <el-form-item class="text" label="评价内容（必填，200字以内）" prop="text">
                <el-input
                    type="textarea"
                    placeholder="请输入"
                    v-model="form.text"
                    :maxlength="maxlength"
                    show-word-limit
                    :rows="5"
                ></el-input>
                <template v-show="list[type].length">
                    <el-link class="comment" :underline="false" @click="showComment = !showComment">
                        常用评语
                        <i :class="`el-icon-arrow-${showComment ? 'up' : 'down'}`"></i>
                    </el-link>
                    <el-collapse-transition>
                        <ul class="comment-list flex flex-wrap" v-show="showComment">
                            <li
                                class="br16 bg-primary-disabled cp"
                                v-for="(item, index) in list[type]"
                                :key="index"
                                @click="addComment(item)"
                            >{{ item }}</li>
                        </ul>
                    </el-collapse-transition>
                </template>
            </el-form-item>
            <el-form-item label="图片（选填，最多9张）" prop="img">
                <upload-img
                    ref="img"
                    multiple
                    :list="form.img"
                    :oss="{ path, loading: true }"
                ></upload-img>
            </el-form-item>
        </el-form>

        <template slot="footer">
            <el-button
                type="primary"
                class="form-btn"
                round
                @click="submit"
            >提交评价</el-button>
        </template>
    </el-dialog>
</template>

<script>
import ossPaths from '@/assets/ossPaths.js'
export default {
  components: {
    UploadImg: () => import('@/common/UploadImg')
  },
  data () {
    return {
      path: ossPaths.classEvaluate,
      visible: false, // 是否显示弹窗
      type: 0, // 类型: 0 表扬信, 1 通报
      maxlength: 200, // 输入最大长度
      form: {
        text: '', // 评价
        img: [] // 图片
      },
      rules: {
        text: { required: true, message: '必填', trigger: 'blur' }
      },
      showComment: true, // 常用评语是否展开
      ready: [false, false], // 首次加载常用评语
      list: [
        [], // 表扬信常用评语
        [] // 通报常用评语
      ]
    }
  },
  methods: {
    // 显示弹窗
    show (type) {
      this.visible = true
      this.type = type
      !type ? this.getPraiseList() : this.getImproveList()
    },
    // 获取表扬信常用评语列表
    getPraiseList () {
      if (!this.ready[0]) {
        this.ready[0] = true
        this.list[0] = [
          '天啊，表现得真不错！',
          '爱你们，你们的真的很贴心！',
          '啦啦啦，我是卖报的小行家！',
          '天啊，表现得真不错！',
          '爱你们，你们的真的很贴心！',
          '啦啦啦，我是卖报的小行家！',
          '发电量卡积分到复健科大减肥的的会计师法定付款单飒飒今飞凯达设计费放得开了撒积分到'
        ]
      }
    },
    // 获取通报常用评语列表
    getImproveList () {
      if (!this.ready[1]) {
        this.ready[1] = true
        this.list[1] = [
          '天啊，表现得真不错！',
          '爱你们，你们的真的很贴心！',
          '啦啦啦，我是卖报的小行家！',
          '天啊，表现得真不错！',
          '爱你们，你们的真的很贴心！',
          '啦啦啦，我是卖报的小行家！',
          '发电量卡积分到复健科大减肥的的会计师法定付款单飒飒今飞凯达设计费放得开了撒积分到'
        ]
      }
    },
    // 添加快捷评语
    addComment (item) {
      const text = this.form.text + item
      text.length > this.maxlength
        ? this.$message(`不能超过 ${this.maxlength} 个字`)
        : this.form.text = text
    },
    // 提交
    submit () {
      this.$refs.form.validate().then(() => {
        this.$message.success('可提交')
        // this.$refs.img.upload().then(() => {
        //     this.$api.xxx.createOrUpdate({
        //         ...this.form
        //     })
        // })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
    .el-form-item {
        &.text /deep/ .el-form-item__label {
            padding-bottom: 0;
        }
        &.is-error /deep/ textarea::placeholder {
            color: #F56C6C;
        }
    }
    .el-textarea {
        margin-bottom: -35px;
        /deep/ textarea {
            padding-bottom: 35px;
        }
    }
}
.comment {
    margin-left: 5px;
    background-color: #fff;
    padding: 0 10px;
    line-height: 24px;
}
.comment-list {
    li {
        line-height: 32px;
        padding: 0 20px;
        margin-right: 10px;
        margin-top: 10px;
        &:hover {
            color: #fff;
            background-color: @color-primary;
        }
    }
}
</style>
