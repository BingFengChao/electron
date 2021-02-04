<template>
    <div class="class-seating h100p flex flex-column flex-y-c br10 hidden">
        <div
            class="student flex-g1 scroll-y"
            ref="student"
        >
            <!-- @mousedown="selectStart"
            @mousemove="selectMove"
            @mouseup="selectEnd" -->
            <ul v-if="isSort">
                <li class="row nowrap tc" v-for="(rowItem, rowIndex) in list" :key="rowIndex">
                    <div v-for="(item, index) in rowItem" :key="index">
                        <v-item :item="item" :active="value.includes(item)" @click="change(item)" v-slot="{ item }">
                            <slot v-bind:item="item"></slot>
                        </v-item>
                    </div>
                </li>
            </ul>
            <ul class="flex flex-wrap flex-x-sb" v-else>
                <li v-for="(item, index) in list" :key="index">
                    <v-item :item="item" :active="value.includes(item)" @click="change(item)" v-slot="{ item }">
                        <slot v-bind:item="item"></slot>
                    </v-item>
                </li>
                <li class="placeholder" v-for="(item, index) in 8" :key="list.length + index"></li>
            </ul>
            <div
                class="drag"
                :style="{ left: left + 'px', top: top + 'px', width: width + 'px', height: height + 'px' }"
                v-if="isDrag"
            ></div>
            <v-empty v-if="!list.length"></v-empty>
        </div>
        <div class="platform tc">
            <span>讲台</span>
        </div>
    </div>
</template>

<script>
import { getAvatar } from '@/assets/utils/util.js'
export default {
  model: { prop: 'value', event: 'change' },
  props: {
    isChecked: { type: Boolean, default: false }, // 是否可选择学生
    value: { type: Array, default: () => [] }, // 选中的值
    isHover: { type: Boolean, default: false }, // 是否显示 hover 效果
    isCustom: { type: Boolean, default: false } // 自定义列表
  },
  components: {
    VItem: () => import('./components/VItem')
  },
  data () {
    return {
      list: [], // 列表
      isSort: false, // 是否排过序
      isDrag: false, // 是否拖拽中
      top: 0, // 选中区域的 top 位置
      left: 0, // 选中区域的 left 位置
      width: 0, // 选中区域的宽
      height: 0 // 选中区域的高
    }
  },
  created () {
    if (!this.isCustom) this.getList()
  },
  mounted () {
    if (this.isCustom) this.$emit('init')
  },
  methods: {
    // 获取列表
    getList () {
      const res = { data: { Data: [] } }
      res.data.Data = [
        {
          Name: '张宇聪',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqmvqe4nicJia6fXSpNjviaQUFDLZcTebU8ljzsIf9byLf1bsJdXj2ylDaJSAib5LWpcDMaxAebUGziadw/132'
        },
        {
          Name: '全恺欣',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/QVMGjUia0RbegyTolicvuPrLicEj942SayS8caRWkf5cc5vs9G4e6LHv0Vzl8GEkXPd8lwk0Cq5zbfH8hXnmVXlPg/132'
        },
        {
          Name: '秦绾凝',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLNkzXHz0QPxPzicdnzMMuJzDLjJZygRC3FJh23vWnAiaiah30fyoJatrLlEFhVYF9sNianHq1f7iah2UQ/132'
        },
        {
          Name: '李林荣',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/2EO7I27Owe0aR2fbJicuZlWJ8GXVkBQO7YkKG3UlfbiaDrs1p3kEr411xFZfm5q4yBgtOib6JE2yz2EdhK5BbbIGA/132'
        },
        {
          Name: '李沛钧',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/1bAtXwwEbYO00ianibpR5dTvFiazQ5xrXXQFEQZ2sVwia6Tp92rpcDcGia0picJjjicVTgjWVmfqEWp6x5GoCzIo3GyIw/132'
        },
        {
          Name: '唐果',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epwdBKQGD4ycTlicHoVU47nkibWHtrFbSUnLy4FMO8ODm0G3uick9fmGaiaibjGZAqVswuibBfIkRStmlZg/132'
        },
        {
          Name: '刘彧恒',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLfafQ69EVEeRxlU585jib5dVVV4C3LTfiaialJoD302CmcKoYNJBXRYLaJibHYOZtgoWXc9Ce9Qn2V9Q/132'
        },
        {
          Name: '彭可馨',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoCvexPicLA7YvD7Mytc6MLScMOue4YWZUr4gJxO0DwCqSp9DaCI89SvIVdE5v7ZqW5BZMSxajPx1A/132'
        },
        {
          Name: '梅语轩',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIt5XZkfyGjGwWMg7HfMibceQtS2zOueeYGBCXbk4maxic0OicibWY1YdBRyb73j8zHrBc18dGhuGrrUA/132'
        },
        {
          Name: '黄均贤',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/lUwGAbfbv7rdqbIuhTDiaJ1DuFYqlSjFR8JZlfoJKLdvQWNHqTLJWiatuDTjg5TGdErJGwibBrkzibmuY5vRiaP9YdA/132'
        },
        {
          Name: '郭祖源',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/mjssftbtaYXG1UIeyHJ6U18L7wcnDloIiavtsv5WLjo5hXyBwJ7P1T7ZxG9cBCYiaBmBB3h3cg9ViajbJCMlaDOBQ/132'
        },
        {
          Name: '冯艺右',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/TBoTAZgxQyS7ibAZxIrtel9sL376TQYVstVrzKX8aib0TAwmw6iaWfvjImpqnzhJfNvN26MdnuLxXCata6zDktqFg/132'
        },
        {
          Name: '曾许杰',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/8oSsWllB4OA7tkVEEdbW2ZsibNrF6FAQvXGQYIGZmwvaMrtIpMUhnvTFZibzdalFE0f6bNIiafNQIQicTSQCczcFFw/132'
        },
        {
          Name: '钟秉宸',
          Img: 'http://thirdwx.qlogo.cn/mmopen/vi_32/3gM5EEOt7JA8DgnddumW5qjIEZxicyrdF4JFicj3WsFyGM4Dzw1FAKW8FBjVZxe2VXe5CNibQxLrq2fnpQGEHVCSg/132'
        },
        {
          Name: '丁一晨',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/w7GlNWmVAwIA4Jlhz6JPWmYPvE3UwsP2YyFxBZLHtypYGxkp60jnb4guqK4E3CXsNWFia7nIxesEliclHK28VHew/132'
        },
        {
          Name: '贺宇翔',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIyibbhRKiciae01V0iba2iao0BLcQqzibfKicibATqH0pYZaa4kFXicDmdP1ibQca8sJgIEnA3qzREfrhcYaeg/132'
        },
        {
          Name: '冯玮健',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/TwemaolLFcPyNG5KunwVWicdA2tHmxXgic0zZrF1n8ZTCZ3gxq8kL8NOR8JbG59MtdNBNk9gocUNaqge4Hg42JUA/132'
        },
        {
          Name: '王子睿',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJN337fRnS95MWyT2kia1oEV4pcpZKftARjhD8y6KfJSmI5HqZ6T7SIC90ttrvse87agxdn8ICUpyg/132'
        },
        {
          Name: '吴雅暄',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/G9hGD2Mwp1cangGNV8SNd3ibbXJnicaEkrC00vvy58Sdsdk0Via2nUptxYzv4dNOAlZnwTgT8bapJAWUsicL9skbhg/132'
        },
        {
          Name: '刘欣然',
          Img: 'http://thirdwx.qlogo.cn/mmopen/XKRgaYXX7KON8YtoyzLicYL2oJVDq82jHcmticz1YDibCz7V7PBOicqQbzia2zIOUY7xicHbc3octg1y1juHngK6MgbicB9W2tvlkTa/132'
        },
        {
          Name: '陈希宸',
          Img: ''
        },
        {
          Name: '何翰霖',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/6LhwsPzu42PkWJ8yjTBdGm7hmDlDsZak7WLxDccUpdDHHgvEOhwGnwjrhIHNhuTGVzQxCp7Nib1GwwFQWwoibDHg/132'
        },
        {
          Name: '廖雨茜',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/CSsl92Gb67nyEwbCrM4QsC2QMoMDRnDxwicET9J9nxvpX9tL9VnssvRbq3XTiaza6QqkYRSBibkZiaM8BiaOa9KticTA/132'
        },
        {
          Name: '阮海翔',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/3Ko0eH05zmjBq1CchlxJ1I9wYQSiaOaGuHibcCibfQTjm37tEva06FpichCy6PFIbQMGISgogf9yxNxAR82G14Jt3Q/132'
        },
        {
          Name: '龙泳澎',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/6diboGicuUUEl2yp5WAjFA675CXhdEqdY4CzZubQy0HSIGzXZ5h1vApu6n6J5KCNCw1QnCDA0MPD3FJlxxjwwm5g/132'
        },
        {
          Name: '简楚诚',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/iaWKUCqRiaOZL5LXxydHNo3U2AUsozJMV7hiblmWKC3icibqTvBYWC5gnc32bG0EhibFLm96Zjib9EwCI1RsoM8HjLic3g/132'
        },
        {
          Name: '梁熙妤',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJuVV69Gk8Fpn8p5SdIEgiciartwcs39JYXX4duXMiaCNdm4PlkmMatKP13VdbsWca05J8Cub6Yjuj1A/132'
        },
        {
          Name: '杨睿涵',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKYD3PZfvQVMY2k15qAwNbTdq5co3Dy6iakricicOQpNBzKIXPdG4d1y3lzbbAsdSZ62OZqXHl2717Zg/132'
        },
        {
          Name: '冯鑫悦',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJe1HUfbI5DiaibEaCstFIfxoppGgJXpW4g99aCy9ZH69pj0e88ryBaXKMKVX1e5FmKVYleOGN9z9w/132'
        },
        {
          Name: '范芷沫',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLyHLPP7ibEOyicia5icDouw7g3qRficpoQMibJFYlT5PpcZOF6JuOTRcXvwTDu8zG3pjEdBPia3WD5jxoibQ/132'
        },
        {
          Name: '曾煜宸',
          Img: null
        },
        {
          Name: '张睿思',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/eF7ZpHz5aGaQCvQkHwX2qovYibczav9Ue6VtNpxob0xJCMchaLuq5G4qGWC24zPdkD6MnFQMiaMicwLWWIbmZpIow/132'
        },
        {
          Name: '黎彦均',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqDwfIbibdG0bbFCpDqrkQ96uO48XUOou5ic7icvppVHuguYhpFUopVhicntbzUrJ7vXrLtNZpltq74zw/132'
        },
        {
          Name: '苏语彤',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLqydSpP4UoMVyCsJo7d6fAeMTzNodZevLk1f4m1vTM8jfMAX3XgeAiaju7ibViaT5S1ibNFaQUn0ia0nQ/132'
        },
        {
          Name: '林小雨',
          Img: ''
        },
        {
          Name: '黄乐言',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DDKdvHlk4cDU7AR2mJCwMlMCEAH89QhzsVbc9l51ibKLo7wAmwg2uz2wyeyyUTcyozmuTWeZ6TDxOOSWecjr9jw/132'
        },
        {
          Name: '吴睿轩',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Sc7snD0o2ue3h7SZzApCadMiasawequibwbicHuBCL8dGr1ft0QUVZKcv6Hnvzx7LcWoA7BujgMPYg4WqW6icZLia6g/132'
        },
        {
          Name: '邓一诺',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/cB2uHyb94xibuEGD0ibBGaUibX9xtpfKcPso9bw5dJSInQg2asdhDsdEyn4JaVFzXLOESHRAmXkxRuay3RY9wNnsw/132'
        },
        {
          Name: '霍梓童',
          Img: null
        },
        {
          Name: '冯艺左',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoePFnTj4HsSUsBb52libeEmz0jOZf58cRgkU5wkY6iasl9VzGhd4Qz8111J5fsqPMgVXMx6xIicwHoQ/132'
        },
        {
          Name: '冯子袁',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/WchTYIQ8uC5MMIOA6uk8lS2RZDh8NKMQwN9zF7IWib8JpHugjwsa7FPJiaWCu6wqoAO5pibSXLuQ2C4c9cK1y6Diaw/132'
        },
        {
          Name: '罗一芯',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/s2aSHNhPkTpSgv2YuPEoCFVzfnx5dNhrh97K0nGfUmYpO4oBv4lp1kncA2Bjmoz8D95P3CiaibOzJs6NWzWAlyVw/132'
        },
        {
          Name: '郑悠然',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Y5Jtrt6xqdJ31fxYyas9rrnJxOaQMOLQDNwqDRIibDibHyIrrjUUx1xcxv8GVPe2ibNAIotiar931pewgBUWMEmq7A/132'
        },
        {
          Name: '简楚善',
          Img: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJJY7lrrNCMqH9QX6iaxRtNKUnBia1qXBbk5e0h9JicBzj28ErZ4ddNJnVicSstZgzkT5VibK2aOwAIV9g/132'
        }
      ]
      res.data.Data.forEach((item, index) => {
        item.src = item.Img && getAvatar(item.Img.replace('/Middle/', '/Small/'))
      })
      this.sort(res.data.Data)
    },
    // 排列座位
    sort (data) {
      this.isSort = 'LineNumber' in data[0]
      let list = []
      // 排过序使用二维数组排序，否则直接按拼音排
      if (this.isSort) {
        const maxRow = Math.max(...data.map(item => item.LineNumber)) // 最大行数
        const maxCol = Math.max(...data.map(item => item.ColumnNumber)) // 最大列数
        list = Array(maxRow).fill(null).map(() => Array(maxCol).fill(null))
        for (const item of data) list[item.LineNumber - 1][item.ColumnNumber - 1] = item
      } else {
        list = data.sort((a, b) => a.Name.localeCompare(b.Name, 'zh-Hans-CN'))
      }
      this.list = list
      this.seatCount = data.length
    },
    // 选择学生
    change (item) {
      if (this.isChecked) {
        const index = this.value.indexOf(item)
        index === -1 ? this.value.push(item) : this.value.splice(index, 1)
        this.$emit('change', this.value)
      }
      this.$emit('item-click', item)
    },
    // 批量选择开始
    selectStart (e) {
      if (!this.isDrag) {
        this.isDrag = true
        this.top = e.pageY - 160 + this.$refs.student.scrollTop
        this.left = e.pageX - 40
      }
    },
    // 批量选择
    selectMove (e) {
      if (this.isDrag) {
        this.width = e.pageX - 40 - this.left
        this.height = e.pageY - 160 + this.$refs.student.scrollTop - this.top
      }
    },
    // 批量选择结束
    selectEnd () {
      this.isDrag = false
      this.width = 0
      this.height = 0
    }
  }
}
</script>

<style lang="less" scoped>
.student {
    overflow-x: hidden;
    user-select: none;
    position: relative;
    padding: 10px 20px 0;
    .row {
        margin: 0 auto;
        padding: 0 10px;
    }
    li {
        width: 200px;
        padding: 5px 10px;
        &.placeholder {
            padding: 0;
        }
    }
    .drag {
        position: absolute;
        background-color: rgba(@color-primary, 0.2);
        border: 1px solid rgba(@color-primary, 0.5);
    }
}
.platform {
    width: 600px;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    position: relative;
    margin-top: 10px;
    span {
        position: relative;
        z-index: 1;
    }
    &::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        border-bottom: 60px solid @color-page;
    }
}
</style>
