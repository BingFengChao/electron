<template>
    <v-app>
        <template v-if="periodList.length">
            <button-radio
                v-model="period"
                :list="periodList"
                label-key="name"
                value-key="id"
                @change="getList"
            ></button-radio>
            <ul class="data pad flex tc">
                <li class="flex-g1 flex-s0" v-for="(item, index) in peopleList" :key="index">
                    <div class="count">{{ peopleCount[index] }}</div>
                    <p class="name">{{ item }}</p>
                </li>
                <li class="flex-g1 flex-s0" v-for="(item, index) in statusList.slice(1)" :key="item.color">
                    <div class="count">{{ statusCount[index] }}</div>
                    <p class="name" :class="item.color">{{ item.name }}</p>
                </li>
            </ul>
            <el-table height="calc(100% - 180px)" :data="list">
                <el-table-column align="center" label="#" type="index" width="50"></el-table-column>
                <el-table-column align="center" label="姓名" prop="name" min-width="100"></el-table-column>
                <el-table-column align="center" min-width="100">
                    <template #header>
                        <span>考勤结果</span>
                        <el-select class="filter status" v-model="status" @change="filter">
                            <el-option
                                v-for="(item, index) in statusList"
                                :key="index"
                                :label="item.name"
                                :value="index"
                            ></el-option>
                        </el-select>
                    </template>
                    <template v-slot="{ row }">
                        <span :class="statusList[row.status + 1].color">{{ statusList[row.status + 1].name }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" min-width="100">
                    <template #header>
                        <span>考勤方式</span>
                        <el-select class="filter type" v-model="type" @change="filter">
                            <el-option
                                v-for="(item, index) in typeList"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </template>
                    <template v-slot="{ row }">{{ typeList.find(n => n.id === row.type).name }}</template>
                </el-table-column>
                <el-table-column align="center" prop="date" min-width="150">
                    <template #header>
                        <span>时间</span>
                        <el-link class="date" type="primary" @click="dateSort">
                            <span>{{ order ? '正' : '倒' }}序</span>
                            <i class="el-icon-sort"></i>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="备注" prop="remark" show-overflow-tooltip></el-table-column>
                <v-empty slot="empty"></v-empty>
            </el-table>
        </template>
        <v-empty v-else></v-empty>
    </v-app>
</template>

<script>
import { statusList } from '@/assets/common.js'
export default {
  components: {
    ButtonRadio: () => import('@/common/ButtonRadio')
  },
  data () {
    return {
      periodList: [], // 时段列表
      period: '', // 当前时段
      peopleList: ['总人数', '走读', '住宿'], // 人数列表
      peopleCount: [], // 学生人数
      statusList: [{ name: '全部' }].concat(statusList), // 状态列表
      statusCount: [], // 考勤人数
      typeList: [ // 考勤方式
        { name: '全部', id: '' },
        { name: '班牌', id: '0' },
        { name: '手环', id: '1' },
        { name: '闸机', id: '2' }
      ],
      status: 0, // 考勤结果筛选
      type: '', // 考勤方式筛选
      order: true, // 时间排序: true 正序, false 倒序
      allList: [], // 全部列表
      list: [] // 列表
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
      this.getList()
    },
    // 获取列表
    getList () {
      this.peopleCount = [32, 20, 12]
      this.statusCount = [20, 10, 0, 2]
      this.allList = this.list = [
        { name: '张三', status: 0, type: '0', date: '2020-03-25 08:24', remark: '一（1）班班牌' },
        { name: '李四', status: 1, type: '1', date: '2020-03-26 08:24', remark: 'stu02020222222' },
        { name: '张三', status: 2, type: '2', date: '2020-03-27 08:24', remark: '' },
        { name: '李四', status: 3, type: '1', date: '2020-03-28 08:24', remark: '自发请假（病假）' },
        { name: '张三', status: 0, type: '0', date: '2020-03-25 08:24', remark: '阶梯室监控01' },
        { name: '李四', status: 0, type: '1', date: '2020-03-25 08:24', remark: '班主任刘其湛提交' },
        { name: '张三', status: 0, type: '0', date: '2020-03-25 08:24', remark: '闸机001' },
        { name: '李四', status: 0, type: '1', date: '2020-03-25 08:24', remark: '' },
        { name: '张三', status: 0, type: '0', date: '2020-03-25 08:24', remark: '' },
        { name: '李四', status: 0, type: '1', date: '2020-03-25 08:24', remark: '' },
        { name: '张三', status: 0, type: '0', date: '2020-03-25 08:24', remark: '' },
        { name: '李四', status: 0, type: '1', date: '2020-03-25 08:24', remark: '' }
      ]
    },
    // 考勤结果筛选
    filter () {
      this.list = this.allList.filter(item => {
        return (this.status ? (item.status + 1 === this.status) : item.status > -1) &&
                    (this.type ? (item.type === this.type) : item.type)
      })
    },
    // 时间排序
    dateSort () {
      this.order = !this.order
      this.order
        ? this.list.sort((a, b) => new Date(a.date) - new Date(b.date))
        : this.list.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  }
}
</script>

<style lang="less" scoped>
.data {
    margin: 15px 0;
    border: 1px solid #DCDFE6;
    li {
        padding: 3px 0;
        &:nth-child(4) {
            border-left: 1px solid #DCDFE6;
        }
        .count {
            font-size: 48px;
            line-height: 50px;
        }
        .name {
            margin-top: 6px;
            line-height: 1;
        }
    }
}
.filter {
    margin-left: 5px;
    &.status {
        width: 50px;
    }
    &.type {
        width: 50px;
    }
    // 无法实现 el-input 改文字，有些事件产生在 el-input 上
    /deep/ .el-input__inner {
        color: @color-primary;
        background-color: transparent;
        border: none;
        font-weight: normal;
        padding: 0;
        height: 32px;
        line-height: 32px;
    }
    /deep/ .el-input__icon {
        color: @color-primary;
        width: auto;
        line-height: 32px;
    }
}
.date {
    vertical-align: top;
    margin-left: 5px;
}
</style>
