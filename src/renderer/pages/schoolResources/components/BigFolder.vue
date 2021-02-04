<template>
  <div class="container">
        <div id="drop_area" class="file-item" v-for="file of fileList" :key="file.id">
            <div
                tabindex="0" hidefocus="true"
                class="folderCtn"
                @contextmenu.prevent.stop="contextMenu($event,file)"
                @dblclick="intoFolder(file)"
                @dragenter.stop.prevent="borderHover = true"
                @dragleave.stop.prevent="borderHover = false"
                @dragover.stop.prevent="borderHover = true"
                @drop.stop.prevent="fileDrop($event,file)">
                    <div class="types">{{ file.typeName }}</div>
                    <i :class="file.icon" class="file-icon"></i>
                    <h4 class="folder-name">{{ file.name }}</h4>
                    <h6 class="descript">{{ file.descript }}</h6>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'BigFolder',
  props: {
    fileList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      borderHover: false // 拖拽区域显示样式
    }
  },
  mounted () {
  },
  methods: {
    contextMenu (MouseEvent, file) {
      const type = file.type
      const row = file
      this.$emit('showMenu', MouseEvent, type, row)
    },
    intoFolder (file) {
      this.$emit('intoFolder', file)
    },
    fileDrop (event, file) {
      this.borderHover = false
      const fileData = event.dataTransfer.files
      const row = this.file
      this.$emit('uploadFile', fileData, row)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
    .file-item {
        .folderCtn {
            position: relative;
            text-align: center;
            width: 260px;
            height: 200px;
            margin: 10px;
            border: 1px solid #D7D7D7;
            cursor: pointer;
            &:hover {
                border: 1px solid #1890FF;
            }
            &:focus {
                border: 1px solid #1890FF;
            }
            &:active {
                opacity: 0.7;
            }

            .types {
                position: absolute;
                top: 0;
                left: 0;
                background: #F2F2F2;
                color: #7F7F7F;
                font-size: 5px;
                padding: 2px 4px;
            }

            .file-icon {
                font-size: 80px;
                margin-top: 30px;
            }

            .folder-name {
                font-size: 17px;
                color: #333333;
                margin-bottom: 7px;
            }

            .descript {
                font-size: 11px;
                color: #7F7F7F;
            }
        }

    }
}
</style>
