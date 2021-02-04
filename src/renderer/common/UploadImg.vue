<template>
    <div class="v-upload-img">
        <ul :class="{ center, hover }">
            <!-- 图片列表 -->
            <li v-for="(item, index) in imgList" :key="item">
                <el-image :fit="fit" :src="item" @click="$refs.preview.show(index)" :style="{ width, height }">
                    <div class="image-error" slot="error">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
                <div class="modal" v-if="hover">
                    <el-link icon="el-icon-zoom-in" :underline="false" @click="$refs.preview.show(index)"></el-link>
                    <el-link icon="el-icon-delete" :underline="false" @click="deleteFile(index)"></el-link>
                </div>
                <el-link
                    v-else
                    class="del"
                    type="danger"
                    icon="el-icon-error"
                    :underline="false"
                    @click="deleteFile(index)"
                ></el-link>
            </li>
            <!-- 上传按钮 -->
            <li v-if="list.length < limit">
                <el-upload
                    accept="image/*"
                    drag
                    action
                    :multiple="multiple"
                    :http-request="uploadFile"
                    :show-file-list="false"
                    :style="{ width, height }"
                >
                    <i class="add el-icon-plus"></i>
                </el-upload>
            </li>
            <!-- 图片两端对齐的填充 -->
            <template v-if="!center">
                <li v-for="n in limit" :key="n"></li>
            </template>
        </ul>

        <!-- 图片预览 -->
        <v-preview :list="imgList" ref="preview"></v-preview>
    </div>
</template>

<script>
import { ossUpload, ossDelete } from '@/assets/utils/ossTool.js'
import { getFileHost, getFileUrl, getObjectKey } from '@/assets/utils/host.js'
import { isString, isFile } from '@/assets/utils/types.js'
let timer = null
const getUrl = item => isString(item) ? getFileUrl(item) : isFile(item) ? URL.createObjectURL(item) : getFileHost(item.url)
const getKey = item => isString(item) ? getObjectKey(item) : item.objectKey
export default {
  components: {
    VPreview: () => import('@/common/VPreview')
  },
  props: {
    list: { type: Array, default: () => [] }, // 图片列表，上传和删除时会同步改变
    limit: { type: Number, default: 9 }, // 限制上传数量（达到上限隐藏上传按钮）
    confirm: { type: Boolean, default: true }, // 删除时是否需要确认
    multiple: { type: Boolean, default: false }, // 一次性可上传多张图片
    immediate: { type: Boolean, default: false }, // 每次上传和删除都直接上传或删除到 OSS
    hover: { type: Boolean, default: false }, // 预览和删除在 hover 时显示
    center: { type: Boolean, default: false }, // 图片整体居中
    fit: { type: String, default: 'cover' }, // 图片伸缩模式，同原生 object-fit
    width: { type: String, default: '100px' }, // 图片宽
    height: { type: String, default: '100px' }, // 图片高
    oss: { type: Object, default: () => ({}) } // 上传文件配置，参考 ossTool.js（除了 file 和 key 属性无需传入）
    // 裁剪----
  },
  data () {
    return {
      uploadList: [], // 上传新的图片时的文件列表
      deleteList: [] // 删除已上传的图片时的列表
    }
  },
  computed: {
    imgList: vm => vm.list.map(getUrl) // 图片预览列表
  },
  methods: {
    // 上传
    uploadFile ({ file }) {
      if (this.list.length < this.limit) {
        file.type.slice(0, 6) !== 'image/'
          ? this.$message.warning('请上传图片')
          : this.immediate
            ? ossUpload({ ...this.oss, file }).then(this.uploadCall)
            : this.uploadCall(file)
      } else {
        // 批量上传时超出最大数量只提示一次
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.$message.warning(`最多上传 ${this.limit} 张图片`)
        }, 300)
      }
    },
    // 上传回调
    uploadCall (file) {
      this.list.push(file)
      if (isFile(file)) this.uploadList.push(file)
      this.$emit('upload', file)
    },
    // 删除
    deleteFile (index) {
      if (confirm) {
        this.$confirm('确定删除吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.deleteCall(index)
        }).catch(() => {})
      } else {
        this.deleteCall(index)
      }
    },
    // 删除回调
    deleteCall (index) {
      const item = this.list[index]
      new Promise((resolve, reject) => {
        if (isFile(item)) resolve(true)
        else if (!this.immediate) resolve()
        else ossDelete({ ...this.oss, key: getKey(item) }).then(resolve)
      }).then(file => {
        this.list.splice(index, 1)
        if (file) this.uploadList = this.list.filter(isFile)
        else if (!this.immediate) this.deleteList.push(item)
        this.$emit('delete', item)
      })
    },
    // 上传
    uploadOSS () {
      return new Promise((resolve, reject) => {
        if (this.uploadList.length) {
          ossUpload({ ...this.oss, file: this.uploadList }).then(res => {
            const index = this.list.findIndex(item => isFile(item))
            if (index > -1) this.list.splice(index, this.list.length - index, ...res)
            this.uploadList = []
            resolve(res)
          })
        } else {
          resolve([])
        }
      })
    },
    // 删除
    deleteOSS () {
      return new Promise((resolve, reject) => {
        if (this.deleteList.length) {
          ossDelete({ ...this.oss, key: this.deleteList.map(getKey) }).then(() => {
            this.deleteList = []
            resolve()
          })
        } else {
          resolve()
        }
      })
    },
    // 上传和删除到 OSS
    upload () {
      return this.deleteOSS().then(this.uploadOSS)
    },
    // 重置
    reset () {
      this.uploadList = []
      this.deleteList = []
    }
  }
}
</script>

<style lang="less" scoped>
ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: -10px;
    &.center {
        justify-content: center;
    }
    &.hover .modal:hover {
        opacity: 1;
    }
    li {
        padding: 10px;
        position: relative;
        &:empty {
            padding: 0;
            width: 120px;
        }
        .del {
            font-size: 24px;
            background-color: #fff;
            border-radius: 50%;
            position: absolute;
            top: 0px;
            right: 0px;
        }
        .modal {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            border-radius: 6px;
            transition-duration: 0.2s;
            background-color: rgba(#000, 0.5);
            opacity: 0;
            .el-link {
                color: #fff;
                font-size: 20px;
                padding: 8px;
            }
        }
        /deep/ .el-upload {
            vertical-align: top;
            width: 100%;
            height: 100%;
            .el-upload-dragger {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .add {
            font-size: 24px;
        }
    }
}
.el-image {
    border-radius: 6px;
    border: 1px solid #DCDFE6;
    vertical-align: top;
    cursor: pointer;
    /deep/ .image-error {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        color: #909399;
    }
}
</style>
