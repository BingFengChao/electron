<template>
    <v-card title="课表">
        <button-radio
            slot="action"
            size="small"
            type="warning"
            v-model="day"
            :list="dayList"
            @change="getList"
        ></button-radio>
        <div
            class="item flex hidden"
            :class="{ 'bg-primary-disabled': active === index }"
            v-for="(item, index) in list"
            :key="item.sortcode"
        >
            <p class="nowrap" style="width: 16%;">{{ item.sort }}</p>
            <p class="nowrap tc" style="width: 32%;">{{ item.time }}</p>
            <p class="nowrap tc" style="width: 32%;">{{ item.SubjectName }}</p>
            <p class="nowrap tr" style="width: 20%;">{{ item.TeacherName }}</p>
            <i class="active bg-success tc c-white" v-if="active === index">上课中</i>
        </div>
        <v-empty v-if="!list.length"></v-empty>
    </v-card>
</template>

<script>
import { getDate } from '@/assets/utils/date.js'
export default {
  components: {
    VCard: () => import('@/common/VCard'),
    ButtonRadio: () => import('@/common/ButtonRadio')
  },
  data () {
    return {
      day: 0, // 日期
      dayList: [ // 日期列表
        { label: '今天', value: 0 },
        { label: '明天', value: 1 }
      ],
      list: [], // 列表
      active: -1 // 当前课
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList () {
      const res = { data: { ResponseTime: getDate() } }
      const list = [
        {
          SubjectName: '数学',
          TeacherName: '方炳祥',
          time: '08:2008:55',
          sortcode: 1,
          sort: '第一节'
        },
        {
          SubjectName: '英语',
          TeacherName: '何思颖',
          time: '09:0509:40',
          sortcode: 2,
          sort: '第二节'
        },
        {
          SubjectName: '语文',
          TeacherName: '冯凌',
          time: '10:0010:35',
          sortcode: 4,
          sort: '第三节'
        },
        {
          SubjectName: '眼保健操',
          TeacherName: '',
          time: '10:4510:50',
          sortcode: 6,
          sort: '眼保健操'
        },
        {
          SubjectName: '语文',
          TeacherName: '冯凌',
          time: '10:5011:25',
          sortcode: 7,
          sort: '第四节'
        },
        {
          SubjectName: '音乐',
          TeacherName: '王雅菡',
          time: '11:3512:10',
          sortcode: 8,
          sort: '第五节'
        },
        {
          SubjectName: '体育',
          TeacherName: '张博',
          time: '14:3015:05',
          sortcode: 12,
          sort: '第六节'
        },
        {
          SubjectName: '眼保健操',
          TeacherName: '',
          time: '15:1515:20',
          sortcode: 13,
          sort: '眼保健操'
        },
        {
          SubjectName: '科学',
          TeacherName: '方炳祥',
          time: '15:2015:55',
          sortcode: 14,
          sort: '第七节'
        },
        {
          SubjectName: '大课间',
          TeacherName: '',
          time: '15:5516:30',
          sortcode: 15,
          sort: '大课间'
        }
      ]
      const today = res.data.ResponseTime.slice(0, 11)
      const now = new Date(res.data.ResponseTime).getTime()
      list.forEach((item, index) => {
        const startTime = item.time.slice(0, 5)
        const endTime = item.time.slice(5)
        list[index].time = startTime + '~' + endTime
        // 定时显示上课中的课
        const start = new Date(today + startTime).getTime()
        const end = new Date(today + endTime).getTime()
        // 开始了才能结束，所以只做开始判断，在开始后调用结束
        if (now < start) {
          const readyStart = start - now
          const readyEnd = end - now - readyStart
          clearTimeout(window['_indexScheduleStart' + index])
          window['_indexScheduleStart' + index] = setTimeout(this.change, readyStart, index, readyEnd)
        } else if (now >= start && now < end) {
          this.change(index, end - now)
        }
      })
      this.list = list
    },
    // 当前课改变
    change (index, end) {
      this.active = index
      clearTimeout(window['_indexScheduleEnd' + index])
      window['_indexScheduleEnd' + index] = setTimeout(() => {
        this.active = -1
      }, end)
    }
  }
}
</script>

<style lang='less' scoped>
.item {
    padding: 0 30px;
    line-height: 60px;
    position: relative;
    & + .item {
        border-top: 1px solid #DCDFE6;
    }
    .active {
        height: 40px;
        width: 65px;
        transform: rotate(45deg) translate(9px, -25px);
        position: absolute;
        top: 0;
        right: 0;
        font-size: 12px;
    }
}
</style>
