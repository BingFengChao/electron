<template>
  <el-dialog
    title="请选择目标文件夹（必选）"
    :visible.sync="selectFolderVisible"
    width="500px">
      <div class="folder-select">
        <div class="folder-line select-first">
          <i class="el-icon-folder folder-icon"></i>
          <span class="folderName">一年级文案</span>
        </div>
        <div v-for="(item, index) of 3" :key="index" class="folder-line select-second canSelect">
          <i class="el-icon-folder folder-icon"></i>
          <span class="folderName" @click="upload">语文文案</span>
        </div>
      </div>
      <div class="folder-select">
        <div class="folder-line select-first">
          <i class="el-icon-folder folder-icon"></i>
          <span class="folderName">二年级文案</span>
        </div>
        <div v-for="(item, index) of 3" :key="index" class="folder-line select-second canSelect">
          <i class="el-icon-folder folder-icon"></i>
          <span class="folderName" @click="upload">语文文案</span>
        </div>
      </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UploadFile',
  props: {
    selectFolderVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    upload () {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.$emit('uploadSuccess')
    }
  }
}
</script>

<style lang="less" scoped>
.folder-select {
  font-size: 18px;

  .folder-line {
    line-height: 40px;

    .folder-icon {
      font-size: 30px;
      vertical-align: middle;
    }

    .folderName {
      vertical-align: middle;
      margin-left: 5px;
    }
  }

  .select-first {
    padding-left: 10px;
  }

  .select-second {
    padding-left: 60px;
  }
}

.canSelect {
  cursor: pointer;
  color: black;
  &:hover{
    color: #409eff;
  }
}
</style>
