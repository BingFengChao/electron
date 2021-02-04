<template>
    <div>
        <div class="headerNav">
            <div class="leftNav">
                <span class="type-title">类型:</span>
                <el-radio-group v-model="folderType" size="small" @change="folderTypeChange">
                    <el-radio-button label="all">全部</el-radio-button>
                    <el-radio-button label="myFavor">我收藏的</el-radio-button>
                    <el-radio-button label="myShare">我分享的</el-radio-button>
                    <el-radio-button label="shareMe">分享给我的</el-radio-button>
                </el-radio-group>
            </div>
            <div class="rightNav">
                <el-select class="timer-select" v-model="timeSelect" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <search></search>
            </div>
        </div>
        <div class="folderCtn" >
            <div class="smallCtn">
                <small-folder
                    :file-list="currentFileList"
                    @tableIntoFile="intoFolder">
                </small-folder>
            </div>
        </div>

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
    SmallFolder: () => import('../components/SmallFolder')
  },
  data () {
    return {
      folderType: 'all', // 文件类型（文件类型（all: 全部，myFavor: 我收藏的，myShare: 我分享的, shareMe: 分享给我的 ））
      timeSelect: 'allItem', // 学期选择框数据
      menuMode: '', // 菜单根据模式显示对于内容
      options: [{
        value: 'allItem',
        label: '全部学期'
      }],
      documentDrawer: false,
      currentFileList: [],
      fileListData: [
        {
          id: 1201,
          name: '我收藏的.docx',
          typeName: '我收藏的',
          type: 'myFavor',
          icon: 'el-icon-document',
          descript: '我上传了10个文档',
          isFocus: false,
          isFolder: true,
          nextIsFolder: false,
          uploadCount: '10',
          author: '张三',
          updateTime: '2020-08-22 12:00'
        },
        {
          id: 1202,
          name: '我分享的.docx',
          typeName: '我分享的',
          type: 'myShare',
          icon: 'el-icon-document',
          descript: '我上传了10个文档',
          isFocus: false,
          isFolder: true,
          nextIsFolder: false,
          uploadCount: '10',
          author: '张三',
          updateTime: '2020-08-22 12:00'
        },
        {
          id: 1203,
          name: '分享给我的.docx',
          typeName: '分享给我的',
          type: 'shareMe',
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
  },
  created () {},
  mounted () {
    this.folderType = 'all'
    this.currentFileList = this.fileListData
  },
  methods: {
    folderTypeChange (value) {
      if (value === 'all') {
        this.currentFileList = this.fileListData
      } else {
        const fileList = []
        for (let i = 0; i < this.fileListData.length; i++) {
          if (this.fileListData[i].type === value) {
            fileList.push(this.fileListData[i])
          }
        }
        this.currentFileList = fileList
      }
    },
    intoFolder (file) {
      /* 打开文件 */
      this.documentDrawer = true
    }
  }
}
</script>

<style lang="less" scoped>
// .headerNav {
//     display: flex;
//     justify-content: space-between;
//     height: 45px;
//     line-height: 45px;
//     background: #e7e7e7;

//     .leftNav {
//         padding: 0 20px;
//         font-size: 18px;
//     }

//     .rightNav {
//         padding: 0 30px;
//         display: flex;
//     }
// }
.headerNav {
    display: flex;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    background: #e7e7e7;

    .leftNav {
        padding: 0 20px;
        font-size: 18px;

        .type-title {
            color: rgb(48, 48, 48);
        }

        .el-radio-group {
            vertical-align: middle;
            margin-bottom: 3px;

            .el-radio-button {
                margin: 0 5px;

                .el-radio-button__inner {
                    border-radius: 25px;
                }
            }
        }
    }

    .rightNav {
        padding: 0 30px;
        display: flex;
        .timer-select{
            padding-top: 1px;
            margin-right: 15px;
        }
    }
}
</style>
