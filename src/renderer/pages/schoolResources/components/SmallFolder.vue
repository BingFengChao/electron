<template>
  <div class="container">
    <el-table
      :data="fileList"
      class="table"
      highlight-current-row
      @row-dblclick="intoFolder(file)"
      style="width: 100%">
        <el-table-column
          label="名称"
          width="260">
          <template slot-scope="scope">
            <div class="is-folder">
              <i :class="scope.row.icon+' file-icon'"></i>
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="fileList[0] && fileList[0].isFolder"
          prop="typeName"
          label="类型"
          width="170">
        </el-table-column>
        <el-table-column
          v-if="!manageMode && (fileList[0] && fileList[0].isFolder)"
          prop="uploadCount"
          label="我上传的数量"
          width="170">
        </el-table-column>
        <el-table-column
          v-if="manageMode"
          prop="private"
          label="公开/不公开"
          width="180">
        </el-table-column>
        <el-table-column
          v-if="manageMode"
          prop="documentCount"
          label="文档数量"
          width="150">
        </el-table-column>
        <el-table-column
          prop="author"
          label="创建人"
          width="160">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="创建时间"
          min-width="220">
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'SmallFolder',
  props: {
    fileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    manageMode: { // 是否为我管理的页面使用
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    intoFolder (file) {
      this.$emit('intoFolder', file)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  /deep/ .table{
      font-size: 16px;
      width: 100%;

      tr {
        th.is-leaf {
          border: none;

          .cell {
            line-height: 30px;
            border-left: 1px solid rgb(202, 202, 202);
            padding-left: 20px;
          }
        }

        th.is-leaf:first-child {
          padding-left: 30px;
        }
      }

      .el-table__row td{
        border: none;
        padding-left: 12px;

        .is-folder{
          cursor: pointer;
          &:hover{
            color: #409eff;
          }

          .file-icon {
            font-size: 24px;
            vertical-align: sub;
          }
        }
      }

      .el-table__row td:first-child {
        padding-left: 20px;
      }
  }

  .pagination {
    text-align: center;
    margin-top: 50px;
  }
}
</style>
