<template>
    <div class="record pad flex flex-column hidden">
        <div class="head flex flex-x-sb flex-y-c">
            <button-radio
                v-model="type"
                :list="typeList"
            ></button-radio>
            <div>
                <el-select
                    class="period"
                    placeholder="请选择"
                    v-model="period"
                    @change="change"
                >
                    <el-option
                        v-for="(item, index) in periodList"
                        :key="index"
                        :label="item"
                        :value="index"
                    ></el-option>
                </el-select>

                <!-- 按天 -->
                <el-date-picker
                    placeholder="请选择"
                    v-model="value[0]"
                    value-format="yyyy-MM-dd"
                    v-show="period === 0"
                ></el-date-picker>

                <!-- 按周 -->
                <el-date-picker
                    type="week"
                    placeholder="请选择"
                    v-model="value[1]"
                    format="第 W 周"
                    v-show="period === 1"
                ></el-date-picker>

                <!-- 按月 -->
                <el-date-picker
                    type="month"
                    placeholder="请选择"
                    v-model="value[2]"
                    v-show="period === 2"
                ></el-date-picker>

                <!-- 按学期 -->
                <el-select
                    class="term"
                    placeholder="请选择"
                    v-model="value[3]"
                    v-show="period === 3"
                >
                    <el-option
                        v-for="item in termList"
                        :key="item.value"
                        :label="`${item.term_name} ${item.term_category}`"
                        :value="item.b_id"
                    ></el-option>
                </el-select>

                <!-- 自定义 -->
                <el-date-picker
                    type="daterange"
                    v-model="value[4]"
                    range-separator="~"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    v-show="period === 4"
                ></el-date-picker>
            </div>
        </div>

        <div class="flex-g1 flex hidden">
            <class-student-list class="column" v-if="type"></class-student-list>
            <class-list class="column" :is-student="!!type"></class-list>
            <ranking-list class="column" v-if="!type"></ranking-list>
            <evaluate-list class="column"></evaluate-list>
        </div>
    </div>
</template>

<script>
export default {
  components: {
    ButtonRadio: () => import('@/common/ButtonRadio'),
    ClassList: () => import('./components/ClassList'),
    RankingList: () => import('./components/RankingList'),
    EvaluateList: () => import('./components/EvaluateList'),
    ClassStudentList: () => import('./components/ClassStudentList')
  },
  data () {
    return {
      type: 0, // 类型
      typeList: [ // 类型列表
        { label: '班级表现', value: 0 },
        { label: '学生表现', value: 1 }
      ],
      period: 0, // 期间
      periodList: ['按天', '按周', '按月', '按学期', '自定义'], // 期间列表
      ready: false, // 首次加载学期列表
      termList: [], // 学期列表
      value: [null, null, null, '', null] // 列表值
    }
  },
  methods: {
    // 期间改变
    change () {
      if (this.period === 3 && !this.ready) {
        this.ready = true
        this.$api.commonApi.getTermList().then(res => {
          if (res.data.Status && res.data.Data.length) {
            this.termList = res.data.Data
            this.value[3] = res.data.Data[0].b_id
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.head {
    margin-bottom: 15px;
    .period {
        width: 120px;
        margin-right: 10px;
    }
    .term, .el-date-editor {
        width: 240px;
    }
}
/deep/ .column {
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    &:not(:last-child) {
        width: 30%;
    }
    &:last-child {
        width: 40%;
    }
    & + .column {
        border-left: 1px solid #DCDFE6;
    }
    .head {
        font-size: 20px;
        line-height: 30px;
        flex-shrink: 0;
        &::before {
            content: "";
            display: inline-block;
            width: 8px;
            height: 30px;
            border-radius: 4px;
            background-color: @color-primary;
            margin-right: 10px;
            vertical-align: top;
        }
    }
    ul {
        flex-grow: 1;
        overflow-y: auto;
        margin-top: 15px;
        li {
            height: 75px;
            padding: 0 10px;
            transition-duration: 0.1s;
            & + li {
                border-top: 1px solid #DCDFE6;
            }
        }
        &.hover li {
            cursor: pointer;
            &:hover {
                color: @color-primary;
            }
            &.active {
                background-color: @color-primary-disabled;
            }
        }
    }
}
</style>
