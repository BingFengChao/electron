<template>
    <v-card title="今日考勤" padding :link="{ name: 'todayAttendance' }">
        <div class="h100p flex flex-column flex-x-sb" v-if="periodList.length">
            <button-radio
                size="small"
                v-model="period"
                :list="periodList"
                label-key="name"
                value-key="id"
                center
                @change="getCount"
            ></button-radio>
            <ul class="data flex tc">
                <li class="flex-g1 flex-s0" v-for="(item, index) in statusList" :key="item.color">
                    <div>
                        <span class="count">{{ statusCount[index] }}</span>
                        <span class="unit">人</span>
                    </div>
                    <p class="status" :class="item.color">{{ item.name }}</p>
                </li>
            </ul>
        </div>
        <v-empty v-else></v-empty>
    </v-card>
</template>

<script>
import { statusList } from '@/assets/common.js'
export default {
  components: {
    VCard: () => import('@/common/VCard'),
    ButtonRadio: () => import('@/common/ButtonRadio')
  },
  data () {
    return {
      periodList: [], // 时段列表
      period: '', // 当前时段
      statusList, // 状态列表
      statusCount: [] // 考勤人数列表
    }
  },
  created () {
    this.getPeriodList()
  },
  methods: {
    // 获取时段列表
    getPeriodList () {
      this.periodList = [
        { name: '上午', id: '1' },
        { name: '下午', id: '2' },
        { name: '晚上', id: '3' }
      ]
      this.period = this.periodList[0].id
      this.getCount()
    },
    // 获取考勤人数
    getCount () {
      this.statusCount = [20, 10, 0, 2]
    }
  }
}
</script>

<style lang="less" scoped>
.data {
    .count {
        font-weight: bold;
        font-size: 20px;
    }
    .unit {
        font-size: 14px;
    }
    .status {
        margin-top: 5px;
    }
}
</style>
