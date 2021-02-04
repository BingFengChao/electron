<template>
  <div>
    <!-- 右键菜单栏 -->
    <div v-show="menuVisible" id="menu" :style="'left:'+coordinate.menuX+';top:'+coordinate.menuY">
        <ul class="menu">
            <li class="menu_item padding_35" v-show="menuMode!=='blank'" @click="clickFile">打开</li>
            <li class="menu_item padding_35" v-show="menuMode==='file'">下载</li>
            <li class="menu_item"  @click.prevent.stop="showUploadMenu" v-show="menuMode !== 'file' && menuMode !== 'blank' || (menuMode === 'blank' && rightMenuFolder[0].isFolder === false)"><span class="upload_line"><i class="el-icon-upload upload-icon"></i></span>上传材料</li>
            <li class="menu_item padding_35" v-show="menuMode === 'personal' || menuMode === 'file'" @click="renameVisible = true">重命名</li>
            <li class="menu_item padding_35" v-show="menuMode === 'file'" @click="shareVisible = true">分享</li>
            <li class="menu_item padding_35" v-show="menuMode === 'personal' || menuMode === 'file'" @click="deleteVisible = true">删除</li>
            <li class="menu_item" style="text-align:center" v-show="menuMode === 'blank' && rightMenuFolder[0].isFolder === true" @click="newFolderVisible = true">新建个人文件夹</li>
        </ul>
    </div>

    <!-- 上传菜单栏 -->
    <div v-show="uploadVisible" id="upload_menu" :style="'left:'+coordinate.uploadX+';top:'+coordinate.uploadY">
        <p class="upload_title">普通文档</p>
        <ul class="upload_menu">
            <li class="menu_item"><span class=" upload_line"><i class="el-icon-document document-icon"></i></span>本地上传</li>
        </ul>
        <p class="upload_title">腾讯文档</p>
        <ul class="upload_menu">
            <li class="menu_item"><span class="upload_line"><i class="el-icon-document-remove document-icon"></i></span>在线文档</li>
            <li class="menu_item"><span class="upload_line"><i class="el-icon-document-copy document-icon"></i></span>在线表格</li>
            <li class="menu_item"><span class="upload_line"><i class="el-icon-document-checked document-icon"></i></span>导入文档在线编辑</li>
        </ul>
    </div>

    <!-- 重命名窗口 -->
    <el-dialog title="重命名" :visible.sync="renameVisible" width="500px">
        <el-input v-model="rename" placeholder="请输入名称"></el-input>
        <div slot="footer" class="dialog-footer">
            <el-button @click="renameVisible = false">取 消</el-button>
            <el-button type="primary" @click="renameVisible = false">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 新建文件夹窗口 -->
    <el-dialog title="新建个人文件夹" :visible.sync="newFolderVisible" width="500px">
        <el-input v-model="newFolderName" placeholder="请输入文件夹名称"></el-input>
        <div slot="footer" class="dialog-footer">
            <el-button @click="newFolderVisible = false">取 消</el-button>
            <el-button type="primary" @click="newFolderVisible = false">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 删除文件窗口 -->
    <el-dialog title="删除确认" :visible.sync="deleteVisible" width="500px">
        <h3>删除后不可恢复，确定删除吗？</h3>
        <div slot="footer" class="dialog-footer">
            <el-button @click="deleteVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteVisible = false">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 分享窗口 -->
    <el-dialog class='share-ctn' title="分享" :visible.sync="shareVisible" width="500px">
        <div class="header-ctn">
            <span>分享给：</span>
            <el-button class="person-btn" icon="el-icon-plus" @click="teacherSelectorOptions.isBlock = true">选择教师</el-button>
            <span class="person-count">已选择 <span style="color:blue">6</span> 人</span>
        </div>
        <div class="tag-ctn">
            <el-tag
                v-for="(tag, index) in tags"
                :key="index"
                effect="dark"
                type="info"
                color="#F2F2F2"
                size="medium"
                closable>
                {{tag.name}}
            </el-tag>
        </div>

        <div slot="footer" class="dialog-footer">
            <el-button @click="shareVisible = false">取 消</el-button>
            <el-button type="primary" @click="shareVisible = false">确 定</el-button>
        </div>
        <!-- <teacher-selector
            :teacherSelectorOptions="teacherSelectorOptions"
            @closeTeacherSelector="teacherSelectorOptions.isBlock = false">
        </teacher-selector> -->
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
    uploadVisible: { // 上传菜单栏显示
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
    menuMode: { // 右键的文件属于那种类型（file: 文件，personal: 个人文件夹, blank: 右键空白 ）
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
      renameVisible: false, // 重命名窗口
      rename: '',
      newFolderVisible: false, // 新建文件夹窗口
      newFolderName: '',
      deleteVisible: false, // 删除文件窗口
      shareVisible: false, // 分享文件窗口
      tags: [
        { name: '标某某' },
        { name: '某某某' },
        { name: '某某某' },
        { name: '某某某' },
        { name: '某某某' },
        { name: '某某某' }
      ]
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
    width: 120px;

    .menu {

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

#upload_menu {
    position: absolute;
    z-index: 999;
    border-radius: 3px;
    background-color: white;
    border: 1px solid rgb(235, 235, 235);
    width: 200px;

    .upload_title {
        line-height: 35px;
        padding-left: 10px;
        color: #AAAAAA;
    }

    .upload_menu {
        .menu_item {
            line-height: 45px;
            font-size:13px;
            cursor: pointer;
            &:hover {
                background-color: #1790ff;
                color: white;
            }

            .upload_line {
                padding: 0 6px 0 10px;
                .document-icon {
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

.share-ctn{
    .header-ctn {
        .person-btn {
            font-size: 14px;
        }

        .person-count {
            margin-left: 5px;
        }
    }
    /deep/ .tag-ctn {
        margin-left: 55px;
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
