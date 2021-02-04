<template>
    <div class="add">
        <template v-if="!dialog">
            <el-button
                round
                type="primary"
                :disabled="!checked.length"
                @click="show"
            >已选择 {{ checked.length }} 人，去评价</el-button>
            <class-seating is-checked v-model="checked"></class-seating>
        </template>

        <el-dialog title="评价" :visible.sync="visible" append-to-body>
            <div class="box" :class="tab === '0' ? 'praise' : 'improve'">
                <div class="group">
                    <div class="head">我常用点评项（在“设置”中管理）</div>
                    <ul class="body flex flex-wrap flex-x-sb">
                        <li class="handle" v-if="tab === '0'">
                            <div class="item bg-page tc cp c-primary" @click="$refs.form.show(0)">
                                <i class="icon el-icon-circle-plus-outline"></i>
                                <div class="name">表扬信</div>
                            </div>
                        </li>
                        <li class="handle" v-else>
                            <div class="item bg-page tc cp c-danger" @click="$refs.form.show(1)">
                                <i class="icon el-icon-remove-outline"></i>
                                <div class="name">通报</div>
                            </div>
                        </li>
                        <li v-for="(item, index) in commonList[tab]" :key="index">
                            <div
                                class="item bg-page tc cp"
                                :class="{ active: commentChecked[tab].includes(item) }"
                                @click="select(item)"
                            >
                                <img :src="item.icon">
                                <div class="name">{{ item.name }}</div>
                                <div class="checked el-icon-success"></div>
                            </div>
                        </li>
                        <li class="placeholder" v-for="(item, index) in 8" :key="commonList[tab].length + index"></li>
                    </ul>
                </div>
                <div class="group">
                    <div class="head">全部点评项</div>
                    <ul class="body flex flex-wrap flex-x-sb">
                        <li v-for="(item, index) in commentList[tab]" :key="index">
                            <div
                                class="item bg-page tc cp"
                                :class="{ active: commentChecked[tab].includes(item) }"
                                @click="select(item)"
                            >
                                <img :src="item.icon">
                                <div class="name">{{ item.name }}</div>
                                <div class="checked el-icon-success"></div>
                            </div>
                        </li>
                        <li class="placeholder" v-for="(item, index) in 8" :key="commentList[tab].length + index"></li>
                    </ul>
                </div>
            </div>

            <v-form ref="form"></v-form>

            <template slot="footer">
                <el-tabs class="small hidden" type="card" v-model="tab" @tab-click="getImproveList()">
                    <el-tab-pane name="0" label="表扬"></el-tab-pane>
                    <el-tab-pane name="1" label="待改进"></el-tab-pane>
                </el-tabs>
                <el-button
                    type="primary"
                    class="form-btn"
                    round
                    :disabled="!commentChecked[tab].length"
                    @click="submit"
                >提交评价</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
  components: {
    ClassSeating: () => import('@/common/classSeating/ClassSeating'),
    VForm: () => import('./components/VForm')
  },
  props: {
    dialog: { type: Boolean, default: false } // 外部调用的弹窗模式
  },
  data () {
    return {
      checked: [], // 选中的学生
      visible: false, // 是否显示弹窗
      tab: '0', // 当前 tab
      ready: [false, false], // 首次加载点评项
      commonList: [
        [], // 常用表扬项
        [] // 常用待改进项
      ],
      commentList: [
        [], // 表扬项
        [] // 待改进项
      ],
      commentChecked: [
        [], // 表扬的选中
        [] // 待改进的选中
      ]
    }
  },
  methods: {
    // 显示弹窗
    show (checked) {
      this.visible = true
      this.getPraiseList()
      if (this.dialog) this.checked = checked
    },
    // 获取表扬项列表
    getPraiseList () {
      if (!this.ready[0]) {
        this.ready[0] = true
        this.commentList[0] = [
          { name: '善于思考', icon: '' },
          { name: '善于思考', icon: '' },
          { name: '善于思考', icon: '' },
          { name: '善于思考', icon: '' },
          { name: '善于思考', icon: '' },
          { name: '善于思考', icon: '' },
          { name: '善于思考', icon: '' },
          { name: '善于思考', icon: '' },
          { name: '善于思考', icon: '' },
          { name: '善于思考', icon: '' }
        ]
        this.commonList[0] = this.commentList[0].slice(0, 3)
      }
    },
    // 获取表扬项列表
    getImproveList () {
      if (this.tab === '1' && !this.ready[1]) {
        this.ready[1] = true
        this.commentList[1] = [
          { name: '随意走动', icon: '' },
          { name: '随意走动', icon: '' },
          { name: '随意走动', icon: '' },
          { name: '随意走动', icon: '' },
          { name: '随意走动', icon: '' },
          { name: '随意走动', icon: '' },
          { name: '随意走动', icon: '' },
          { name: '随意走动', icon: '' },
          { name: '随意走动', icon: '' },
          { name: '随意走动', icon: '' }
        ]
        this.commonList[1] = this.commentList[1].slice(0, 3)
      }
    },
    // 选择项
    select (item) {
      const index = this.commentChecked[this.tab].indexOf(item)
      index === -1 ? this.commentChecked[this.tab].push(item) : this.commentChecked[this.tab].splice(index, 1)
    },
    // 提交
    submit () {

    }
  }
}
</script>

<style lang="less" scoped>
.add {
    height: 0;
    position: relative;
    .el-button {
        width: 300px;
        height: 40px;
        position: absolute;
        top: -60px;
        left: 50%;
        transform: translateX(-50%);
    }
}
.el-tabs {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    height: 40px;
}
.box {
    .group + .group {
        margin-top: 30px;
    }
    .head {
        margin-bottom: 15px;
    }
    .body {
        margin: -10px;
        li {
            width: 180px;
            padding: 10px;
            &.placeholder {
                padding: 0;
            }
            &:not(.handle) .item::before {
                color: #fff;
                width: 36px;
                text-align: center;
                line-height: 24px;
                font-size: 14px;
                position: absolute;
                top: 5px;
                left: 5px;
            }
        }
    }
    &.praise li:not(.handle) .item::before {
        content: "+2";
        background-color: @color-primary;
    }
    &.improve li:not(.handle) .item::before {
        content: "-1";
        background-color: @color-danger;
    }
}
.item {
    padding: 10px;
    border: 1px solid #DCDFE6;
    position: relative;
    .icon {
        font-size: 40px;
    }
    img {
        display: block;
        height: 40px;
    }
    .name {
        margin-top: 5px;
        line-height: 20px;
    }
    .checked {
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 24px;
        color: #909399;
    }
    &:hover, &.active {
        border-color: @color-primary;
    }
    &.active {
        background-color: @color-primary-disabled;
        .checked {
            color: @color-primary;
        }
    }
}
</style>
