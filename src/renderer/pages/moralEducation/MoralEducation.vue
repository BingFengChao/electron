<template>
    <v-app>
        <template v-if="periodList.length">
            <el-select class="btn" v-model="period" @change="getList">
                <el-option
                    v-for="(item, index) in periodList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
            <ul class="data pad flex tc">
                <li class="flex-g1 flex-s0 default" v-for="(item, index) in statusList" :key="index">
                    <div class="count" :class="item.color">{{ statusCount[index] }}</div>
                    <p class="name">{{ item.name }}</p>
                </li>
                <li class="flex-g1 flex-s0 small" v-for="(item, index) in scoreList" :key="item.color">
                    <div class="count">{{ scoreCount[index] }}</div>
                    <p class="name">{{ item }}</p>
                </li>
            </ul>
            <el-table height="calc(100% - 180px - 45px)" :data="list">
                <el-table-column align="center" label="#" type="index" width="50" fixed></el-table-column>
                <el-table-column align="center" label="姓名" prop="name" min-width="100" fixed></el-table-column>
                <el-table-column
                    align="center"
                    min-width="100"
                    v-for="(column, index) in list[0].data"
                    :key="index"
                    :index="index"
                >
                    <template #header>{{ column.name }}</template>
                    <template v-slot="{ row }">
                        <span :class="row.data[index].score ? (row.data[index].score.includes('-') ? 'c-danger' : 'c-primary') : ''">
                            {{ row.data[index].score || '-' }}
                        </span>
                    </template>
                </el-table-column>
                <v-empty slot="empty"></v-empty>
            </el-table>
            <v-pagination
                :total="total"
                :page-size.sync="pageSize"
                :current-page.sync="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                @change="getList"
            ></v-pagination>
        </template>
        <v-empty v-else></v-empty>
    </v-app>
</template>

<script>
export default {
  data () {
    return {
      periodList: [], // 周列表
      period: '', // 当前周
      statusList: [ // 状态列表
        { name: '班级总扣分', color: 'c-danger' },
        { name: '班级总加分', color: 'c-success' },
        { name: '年级排名', color: '' }
      ],
      statusCount: [], // 扣分情况
      scoreList: ['扣班级', '加班级', '扣学生', '加学生'], // 扣分列表
      scoreCount: [], // 扣分数
      list: [], // 列表
      total: 0, // 总条数
      pageSize: 10, // 每页条数
      currentPage: 1 // 当前页
    }
  },
  created () {
    this.getPeriodList()
  },
  methods: {
    // 获取时段列表
    getPeriodList () {
      this.periodList = [
        { name: '第8周', id: '1' },
        { name: '第9周', id: '2' },
        { name: '第10周', id: '3' }
      ]
      this.period = this.periodList[this.periodList.length - 1].id
      this.getList()
    },
    // 获取列表
    getList () {
      this.statusCount = ['-50', '+40', 10]
      this.scoreCount = ['-10', '+10', '-40', '+30']
      const item = {
        name: '张三',
        data: [
          { name: '好人好事', score: '+10' },
          { name: '卫生检查', score: '-12' },
          { name: '纪律检查', score: '' },
          { name: '课间检查', score: '-1' },
          { name: '值日检查', score: '' },
          { name: '宿舍检查', score: '+3' },
          { name: '好人好事', score: '+10' },
          { name: '卫生检查', score: '-12' },
          { name: '纪律检查', score: '' },
          { name: '课间检查', score: '-1' },
          { name: '值日检查', score: '' },
          { name: '宿舍检查', score: '+3' },
          { name: '好人好事', score: '+10' },
          { name: '卫生检查', score: '-12' },
          { name: '纪律检查', score: '' },
          { name: '课间检查', score: '-1' },
          { name: '值日检查', score: '' },
          { name: '宿舍检查', score: '+3' }
        ]
      }
      this.list = [...Array(10)].map(() => item)
      this.total = 12
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
        &.default .count {
            font-size: 48px;
        }
        &.small .count {
            font-size: 28px;
        }
        .count {
            line-height: 50px;
        }
        .name {
            margin-top: 6px;
            line-height: 1;
        }
    }
}
</style>
