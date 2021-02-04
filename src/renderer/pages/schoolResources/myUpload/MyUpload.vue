<template>
    <div>
        <div class="headerNav">
            <div class="leftNav">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item
                        v-for="(breadcrumbItem, index) of breadcrumb"
                        :key="index"
                        @click.native="backCrumb(index)">
                            {{ breadcrumbItem }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="rightNav">
                <search></search>
                <div class="feature">
                    <div :class="{'icon-sel': bigMode}" class="icon-ctn" @click="bigMode = true">
                        <i class="el-icon-picture"></i>
                    </div>
                    <div :class="{'icon-sel': !bigMode}" class="icon-ctn" @click="bigMode = false">
                        <i class="el-icon-s-operation"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="folderCtn" >
            <component :is="bigMode?'big-folder':'small-folder'"
                :file-list="currentFileList"
                @showMenu="showMenu"
                @intoFolder="intoFolder"
                @uploadFile="uploadFile"
                @tableIntoFile="intoFolder">
            </component>
        </div>

        <!-- 右键菜单栏 -->
        <myupload-ctx-menu
            :menuVisible="menuVisible"
            :uploadVisible="uploadVisible"
            :rightMenuData="rightMenuData"
            :rightMenuFolder="rightMenuFolder"
            :coordinate="coordinate"
            :menuMode="menuMode"
            @showUploadMenu="showUploadMenu"
            @menuOpenFile="intoFolder">
        </myupload-ctx-menu>

        <upload-file :selectFolderVisible="selectFolderVisible" @uploadSuccess="selectFolderVisible = false"></upload-file>

        <!-- 侧滑块查看普通文档 -->
        <el-drawer
            title="查看"
            :visible.sync="documentDrawer"
            :size="'60%'"
            :modal="false">
            <span>文档内容</span>
        </el-drawer>

    </div>
</template>

<script>
export default {
  components: {
    Search: () => import('../components/Search'),
    BigFolder: () => import('../components/BigFolder'),
    SmallFolder: () => import('../components/SmallFolder'),
    MyuploadCtxMenu: () => import('../components/MyuploadCtxMenu'),
    UploadFile: () => import('../components/UploadFile')
  },
  data () {
    return {
      // currentComponent: 'BigFolder', // BigFolder 大图标模式，SmallFolder 小图标模式
      bigMode: true, // 文件夹大小图标模式  true为大，false为小
      menuVisible: false, // 右键菜单栏
      menuMode: '', // 菜单根据模式显示对于内容
      uploadVisible: false, // 上传菜单栏
      documentDrawer: false, // 查看文档抽屉
      rightMenuData: {}, // 右键选中文件夹或文件数据
      rightMenuFolder: [], // 右键空白储存当前文件夹数据
      coordinate: { // 菜单栏坐标
        menuX: '0px',
        menuY: '0px',
        uploadX: '0px',
        uploadY: '0px'
      },
      currentFileList: [],
      selectFolderVisible: false, // 查看文件侧滑框
      selectFolderList: [], // 上传文件选择文件夹列表
      breadcrumb: ['首页'], // 面包屑
      fileListData: {
        firstLevelData: [
          {
            id: 991,
            name: '第一级文件夹',
            typeName: '学校文件夹',
            type: 'school',
            icon: 'el-icon-folder',
            descript: '我上传了10个文档',
            isFocus: false,
            isFolder: true,
            folderData: 'secondLevelData',
            nextIsFolder: true,
            uploadCount: '10',
            author: '张三',
            updateTime: '2020-08-22 12:00'
          },
          {
            id: 992,
            name: '第一级文件夹',
            typeName: '个人文件夹',
            type: 'personal',
            icon: 'el-icon-folder',
            descript: '我上传了10个文档',
            isFocus: false,
            isFolder: true,
            folderData: 'secondLevelData',
            nextIsFolder: true,
            uploadCount: '10',
            author: '张三',
            updateTime: '2020-08-22 12:00'
          }
        ],
        secondLevelData: [
          {
            id: 1001,
            name: '第二级文件夹',
            typeName: '学校文件夹',
            type: 'school',
            icon: 'el-icon-folder',
            descript: '我上传了10个文档',
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
            typeName: '学校文件夹',
            type: 'school',
            icon: 'el-icon-folder',
            descript: '我上传了10个文档',
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
            type: 'file',
            icon: 'el-icon-document',
            descript: '我上传了10个文档',
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
  created () {
    this.initDataFromRoute(this.$route)
  },
  watch: {
    $route (to, from) {
      this.initDataFromRoute(to)
    }
  },
  methods: {
    initDataFromRoute (route) {
      /* 根据路由参数初始化数据 */
      if (route.query.folderName) {
        this.currentFileList = this.fileListData[route.query.folderName]
        this.breadcrumb = JSON.parse(route.query.breadcrumb)
      } else {
        this.currentFileList = this.fileListData.firstLevelData
        this.breadcrumb = ['首页']
      }
    },
    backCrumb (index) {
      /* 点击面包屑返回前几级 */
      if (index < this.breadcrumb.length - 1) {
        const backPageCount = index - this.breadcrumb.length + 1
        this.$router.go(backPageCount)
      }
    },
    intoFolder (file) {
      /* 进入下一级文件夹 */
      if (file.isFolder) {
        // 进入文件夹
        this.breadcrumb.push(file.name)
        this.$router.push({
          path: '/education/myResources/index',
          query: {
            folderName: file.folderData,
            breadcrumb: JSON.stringify(this.breadcrumb)
          }
        })
      } else {
        // 查看文件
        this.documentDrawer = true
      }
    },
    uploadFile (fileData, row) {
      /* 文件选择上传位置 */
      this.selectFolderVisible = true
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
      this.uploadVisible = false
      this.menuVisible = true
      const coordinate = this.coordinate
      coordinate.menuX = MouseEvent.pageX + 5 + 'px'
      coordinate.menuY = MouseEvent.pageY + 'px'
      coordinate.uploadX = MouseEvent.pageX + 130 + 'px'
      coordinate.uploadY = MouseEvent.pageY + 'px'
      document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
    },
    foo () {
      /* 取消鼠标监听事件 菜单栏 */
      this.menuVisible = false
      this.uploadVisible = false
      document.removeEventListener('click', this.foo) // 关掉监听
    },
    showUploadMenu () {
      this.uploadVisible = !this.uploadVisible
    }
  }
}
</script>
<style lang="less" scoped>
.headerNav {
    display: flex;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    background: #e7e7e7;

    .leftNav {
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

    .rightNav {
        padding: 0 30px;
        display: flex;

        .feature {
            height: 32px;
            margin: 7px 0 0 35px;
            padding-left: 35px;
            border-left: 1px solid #9e9e9e;
            display: flex;

            div {
                width: 27px;
                height: 27px;
                margin: 3px 5px;
                text-align: center;
                line-height: 55px;
                display: flex;
                background: #f5f5f5;
                cursor: pointer;
                &:hover {
                    border: 1px solid #1890FF;
                }
                &:active {
                    opacity: 0.7;
                }

                i {
                    display: block;
                    align-self: center;
                    margin: 0 auto;
                    font-size: 18px;
                }
            }
        }
    }
}
.icon-sel {
    border: 1px solid #1890FF;
}
</style>
