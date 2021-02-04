<template>
    <div class="container">
        <div class="headerNav">
            <div class="leftNav">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item
                        v-for="(breadcrumbItem, index) of breadcrumb"
                        :key="index"
                        @click.native="backCrumb(index)">
                            {{ breadcrumbItem.name }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>

        <div class="folderCtn" @contextmenu.prevent="showMenu">
            <div class="smallCtn">
                <small-folder
                    :file-list="currentFileList"
                    :manage-mode="true"
                    @showMenu="showMenu"
                    @tableIntoFile="intoFolder">
                </small-folder>
            </div>
        </div>

        <!-- 右键菜单栏 -->
        <manage-ctx-menu
            :menuVisible="menuVisible"
            :rightMenuData="rightMenuData"
            :rightMenuFolder="rightMenuFolder"
            :coordinate="coordinate"
            :menuMode="menuMode"
            @menuOpenFile="intoFolder">
        </manage-ctx-menu>

        <!-- 侧滑块查看普通文档 -->
        <el-drawer
            title="查看"
            :visible.sync="documentDrawer"
            :size="'60%'">
            <span>文档内容</span>
        </el-drawer>
    </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    SmallFolder: () => import('../components/SmallFolder'),
    ManageCtxMenu: () => import('./components/ManageCtxMenu')
  },
  data () {
    return {
      menuVisible: false, // 右键菜单栏
      menuMode: '', // 菜单根据模式显示对于内容
      documentDrawer: false, // 查看文档抽屉
      rightMenuData: {}, // 右键选中文件夹或文件数据
      rightMenuFolder: [], // 右键空白储存当前文件夹数据
      coordinate: { // 菜单栏坐标
        menuX: '0px',
        menuY: '0px'
      },
      breadcrumb: [ // 面包屑
        {
          name: '首页',
          isFolder: true,
          folderName: 'firstLevelData'
        }
      ],
      currentFileList: [],
      fileListData: {
        firstLevelData: [
          {
            id: 1201,
            name: '教案文件夹',
            typeName: '任务文件夹',
            type: 'folder',
            icon: 'el-icon-folder',
            descript: '我上传了10个文档',
            documentCount: '1000',
            private: '不公开',
            isFocus: false,
            isFolder: true,
            folderData: 'secondLevelData',
            nextIsFolder: false,
            uploadCount: '10',
            author: '张三',
            updateTime: '2020-08-22 12:00'
          },
          {
            id: 1202,
            name: '教案文件夹',
            typeName: '常规文件夹',
            type: 'folder',
            icon: 'el-icon-folder',
            descript: '我上传了10个文档',
            documentCount: '220',
            private: '对所有教师公开',
            isFocus: false,
            isFolder: true,
            folderData: 'secondLevelData',
            nextIsFolder: false,
            uploadCount: '10',
            author: '张三',
            updateTime: '2020-08-22 12:00'
          },
          {
            id: 1203,
            name: '教案文件夹',
            typeName: '常规文件夹',
            type: 'folder',
            icon: 'el-icon-folder',
            descript: '我上传了10个文档',
            documentCount: '80',
            private: '对所有教师公开',
            isFocus: false,
            isFolder: true,
            folderData: 'secondLevelData',
            nextIsFolder: false,
            uploadCount: '10',
            author: '张三',
            updateTime: '2020-08-22 12:00'
          }
        ],
        secondLevelData: [
          {
            id: 1001,
            name: '第二级文件夹',
            typeName: '常规文件夹',
            type: 'folder',
            icon: 'el-icon-folder',
            descript: '我上传了10个文档',
            documentCount: '80',
            private: '对所有教师公开',
            isFocus: false,
            isFolder: true,
            folderData: 'thirdLevelData',
            nextIsFolder: false,
            uploadCount: '10',
            author: '张三',
            updateTime: '2020-08-22 12:00'
          },
          {
            id: 1002,
            name: '第二级文件夹',
            typeName: '教案文件夹',
            type: 'folder',
            icon: 'el-icon-folder',
            descript: '我上传了10个文档',
            documentCount: '80',
            private: '对所有教师公开',
            isFocus: false,
            isFolder: true,
            folderData: 'thirdLevelData',
            nextIsFolder: false,
            uploadCount: '10',
            author: '张三',
            updateTime: '2020-08-22 12:00'
          }
        ],
        thirdLevelData: [
          {
            id: 1101,
            name: '第三级文件.txt',
            typeName: '文件',
            type: 'folder',
            icon: 'el-icon-document',
            descript: '我上传了10个文档',
            documentCount: '80',
            private: '对所有教师公开',
            isFocus: false,
            isFolder: false,
            nextIsFolder: false,
            uploadCount: '10',
            author: '张三',
            updateTime: '2020-08-22 12:00'
          }
        ]
      }
    }
  },
  mounted () {
    this.currentFileList = this.fileListData.firstLevelData
  },
  methods: {
    backCrumb (index) {
      this.isFileMode = false
      const breadcrumb = this.breadcrumb
      if (index < breadcrumb.length - 1) {
        const folderName = breadcrumb[index].folderName
        this.currentFileList = this.fileListData[folderName]
        this.breadcrumb = breadcrumb.slice(0, index + 1)
      }
    },
    intoFolder (file) {
      /* 进入下一级文件夹 */
      if (file.isFolder) {
        // 双击文件夹
        const breadcrumbData = {
          name: file.name,
          isFolder: file.isFolder,
          folderName: file.folderData
        }
        this.breadcrumb.push(breadcrumbData)
        this.currentFileList = this.fileListData[file.folderData]
      } else {
        // 双击文件
        this.documentDrawer = true
      }
    },
    showMenu (MouseEvent, type, row) {
      /* 右键文件夹或文件时触发 */
      if (type) {
        // 右键文件夹或者文件
        this.menuMode = type
        this.rightMenuData = row
        this.rightMenuFolder = []
      } else {
        // 右键空白处
        this.menuMode = 'blank'
        this.rightMenuFolder = this.currentFileList
        this.rightMenuData = {}
      }
      this.menuVisible = false
      this.menuVisible = true
      const coordinate = this.coordinate
      coordinate.menuX = MouseEvent.pageX + 5 + 'px'
      coordinate.menuY = MouseEvent.pageY + 'px'
      document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
    },
    foo () {
      /* 取消鼠标监听事件 菜单栏 */
      this.menuVisible = false
      this.uploadVisible = false
      document.removeEventListener('click', this.foo) // 关掉监听
    }
  }
}
</script>

<style lang="less" scoped>
.container {

    .headerNav {
        display: flex;
        justify-content: space-between;
        height: 45px;
        line-height: 45px;
        background: #e7e7e7;

        /deep/ .leftNav {
            padding: 0 20px;
            font-size: 18px;

            .el-breadcrumb {
                font-size: 18px;
                line-height: 45px;
                .el-breadcrumb__item {
                    &:not(:last-child) .el-breadcrumb__inner{
                        cursor: pointer;
                        &:hover {
                            color: #1890FF;
                        }
                    }

                    &:last-child .el-breadcrumb__inner{
                        color: black;
                    }
                }

            }
        }
    }

    .folderCtn{
        min-height: 500px;
    }
}

</style>
