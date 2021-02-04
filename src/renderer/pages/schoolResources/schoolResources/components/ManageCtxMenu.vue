<template>
  <div>
    <!-- 右键菜单栏 -->
    <div v-show="menuVisible" id="menu" :style="'left:'+coordinate.menuX+';top:'+coordinate.menuY">
        <ul class="menu" style="width:120px">
            <li class="menu_item padding_35" v-show="menuMode !== 'blank'" @click="clickFile">打开</li>
            <li class="menu_item padding_35" v-show="menuMode !== 'blank'">编辑</li>
            <li class="menu_item padding_35" v-show="menuMode !== 'blank'" @click="deleteVisible = true">删除</li>
            <li class="menu_item" style="text-align:center" v-show="menuMode === 'blank' && rightMenuFolder[0].isFolder" @click="newFolderVisible = true">新建文件夹</li>
        </ul>
        <ul class="menu" style='width:230px'  v-show="menuMode === 'blank' && !rightMenuFolder[0].isFolder">
            <li class="menu_item" style="text-align:center">合并所有文档到新文件夹</li>
        </ul>
    </div>

    <!-- 新建文件夹窗口 -->
    <el-dialog title="新建个人文件夹" class="newfile-dialog" :visible.sync="newFolderVisible" width="700px" :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="ruleForm.folderType === 'usual'?usualRules:taskRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="文件夹名称" prop="name">
                <el-input placeholder="请输入..." v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="文件夹类型" prop="folderType">
                <el-radio-group v-model="ruleForm.folderType">
                    <el-radio label="usual">常规文件夹</el-radio>
                    <el-radio label="task">任务文件夹</el-radio>
                </el-radio-group>
                <el-alert
                    type="info"
                    class="tips"
                    :closable="false"
                    :description="ruleForm.folderType === 'usual'?tipsText.usual:tipsText.task"
                    show-icon>
                </el-alert>
            </el-form-item>
            <el-form-item label="公开/不公开" prop="private">
                <el-radio-group v-model="ruleForm.private">
                    <el-radio label="private">不公开</el-radio>
                    <el-radio label="publicToAll">对所有教师公开</el-radio>
                    <el-radio label="publickToPart">对部分教师公开</el-radio>
                    <!-- <span style="display:inline-block" class="add-teacher-ctn" v-if="ruleForm.private === 'publickToPart'">
                        <el-button class="person-btn" icon="el-icon-plus" @click="teacherSelectorOptions.isBlock = true">添加教师</el-button>
                    </span> -->
                </el-radio-group>
            </el-form-item>
            <el-form-item class="limit-ctn" v-if="ruleForm.folderType === 'task'" label="每人上传数" prop="limitCount">
                <el-radio-group v-model="ruleForm.limitCount">
                    <el-radio label="limit">限制数量</el-radio>
                    <span style="display:inline-block;width:100px" v-if="ruleForm.limitCount === 'limit'"><el-input v-model="input" placeholder="请输入..."></el-input></span>
                    <el-radio label="noLimit">不限制数量</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="管理者" prop="manager">
                <!-- <div class="header-ctn">
                    <el-button class="person-btn" icon="el-icon-plus" @click="teacherSelectorOptions.isBlock = true">添加教师</el-button>
                    <span class="person-count">已选择 <span style="color:blue">2</span> 人</span>
                </div> -->
                <div class="tag-ctn">
                    <el-tag
                        v-for="(tag, index) in ruleForm.manager"
                        :key="index"
                        effect="dark"
                        type="info"
                        color="#F2F2F2"
                        size="medium"
                        closable>
                        {{tag.name}}
                    </el-tag>
                </div>
            </el-form-item>
            <el-form-item v-if="ruleForm.folderType === 'task'" label="教师" prop="uploadTeacher">
                <!-- <div class="header-ctn">
                    <el-button class="person-btn" icon="el-icon-plus" @click="teacherSelectorOptions.isBlock = true">添加教师</el-button>
                    <span class="person-count">已选择 <span style="color:blue">2</span> 人</span>
                </div> -->
                <div class="tag-ctn">
                    <el-tag
                        v-for="(tag, index) in ruleForm.uploadTeacher"
                        :key="index"
                        effect="dark"
                        type="info"
                        color="#F2F2F2"
                        size="medium"
                        closable>
                        {{tag.name}}
                    </el-tag>
                </div>
            </el-form-item>
            <el-form-item class="submit-ctn">
                <el-button size="medium" type="primary" @click="newFolderVisible = false">保存</el-button>
            </el-form-item>
        </el-form>
        <!-- <teacher-selector
            :teacherSelectorOptions="teacherSelectorOptions"
            @closeTeacherSelector="teacherSelectorOptions.isBlock = false">
        </teacher-selector> -->
    </el-dialog>

    <!-- 删除文件窗口 -->
    <el-dialog title="删除确认" :visible.sync="deleteVisible" width="500px">
        <h3>删除后不可恢复，确定删除吗？</h3>
        <div slot="footer" class="dialog-footer">
            <el-button @click="deleteVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteVisible = false">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  props: {
    menuVisible: { // 右键菜单栏显示
      type: Boolean,
      default: false
    },
    rightMenuData: { // 右键文件的数据
      type: Object,
      default: () => {
        return {}
      }
    },
    rightMenuFolder: { // 右键空白所在层的文件夹数据
      type: Array,
      default: () => {
        return []
      }
    },
    coordinate: { // 右键菜单栏坐标
      type: Object,
      default: () => {
        return {}
      }
    },
    menuMode: { // 右键的文件属于那种类型（ blank: 右键空白 ）
      type: String,
      default: ''
    }
  },
  components: {
    // TeacherSelector: () => import('@/common/TeacherSelector')
  },
  data () {
    return {
      // teacherSelectorOptions: {
      //     isBlock: false,
      //     isShow: true
      // },
      newFolderVisible: false,
      newFolderName: '',
      deleteVisible: false,
      shareVisible: false,
      tipsText: {
        usual: '常规文件夹是专门用来放置学校常规资源，不限制上传浇水，不限制上传文档数量，建好后可以一直使用。',
        task: '任务文件夹是收集任务式的资源，有明确的上传教师范围，有明确的篇数要求，一般都是针对一个学期的文件夹。'
      },
      ruleForm: {
        name: '',
        folderType: 'usual',
        private: 'private',
        limitCount: 'limit',
        uploadCount: '',
        manager: [
          { name: '标某某' },
          { name: '某某某' }
        ],
        uploadTeacher: [
          { name: '标某某' },
          { name: '某某某' }
        ]
      },
      usualRules: {
        name: [
          { required: true, message: '请输入文件夹名称' }
        ]
      },
      taskRules: {
        name: [
          { required: true, message: '请输入文件夹名称' }
        ],
        limitCount: [
          { required: true, message: '请选择是否限制上传数量' }
        ],
        manager: [
          { required: true, message: '请选择教师' }
        ],
        uploadTeacher: [
          { required: true, message: '请选择教师' }
        ]
      }
    }
  },
  methods: {
    showUploadMenu (event) {
      // event.stopPropagation()
      this.$emit('showUploadMenu')
    },
    clickFile () {
      const file = this.rightMenuData
      this.$emit('menuOpenFile', file)
    }
  }
}
</script>

<style lang="less" scoped>
#menu {
    position: absolute;
    z-index: 999;
    border-radius: 3px;
    background-color: white;
    border: 1px solid rgb(235, 235, 235);

    .menu {
        width: 120px;
        .menu_item {
            line-height: 35px;
            border-bottom: 1px solid rgb(235, 235, 235);
            font-size:13px;
            cursor: pointer;
            &:hover {
                background-color: #1790ff;
                color: white;
            }

            .upload_line {
                padding: 0 6px 0 10px;
                .upload-icon {
                    font-size: 22px;
                    vertical-align: middle;
                }
            }
        }

        .padding_35 {
            padding-left: 40px;
        }
    }
}

/deep/ .dialog-footer {
    text-align: center;
    .el-button {
        width: 100px;
        height: 35px;
    }
}

.newfile-dialog {
    z-index: 50;
    /deep/ .el-dialog__body {
        padding-top: 10px;
        .el-form-item {
            margin: 25px 0;
        }
    }

    /deep/ .limit-ctn {
        position: relative;
        .el-radio:first-child {
            margin-right: 5px;
        }
        .el-radio:last-child {
            margin-left: 20px;
        }
    }

    /deep/ .submit-ctn {
        .el-button {
            margin-left: 145px;
            margin-top: 50px;
        }
    }

    /deep/ .tips {
        background: #E6F7FF;

        .el-alert__icon {
            color: #409EFF;
        }
        .el-alert__description {
            color: rgb(100, 100, 100);
            font-size: 13px;
        }
    }

    .header-ctn {
        .person-btn {
            font-size: 14px;
        }

        .person-count {
            margin-left: 5px;
        }
    }
    /deep/ .tag-ctn {
        .el-tag {
            border: none;
            margin: 5px;
            color: rgb(46, 46, 46);
            font-size: 14px;
            vertical-align: middle;
            line-height: 32px;

            .el-tag__close {
                font-size: 18px;
                color: rgb(168, 168, 168);
            }
        }
    }
}
</style>
