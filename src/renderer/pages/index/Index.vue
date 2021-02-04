<template>
    <div class="box">
        <!-- <template v-if="$store.state.roomInfo && !$store.state.classInfo"> -->
            <el-row :gutter="10">
                <el-col :span="8">
                    <!-- 班级信息 -->
                    <class-info></class-info>
                    <!-- 今日考勤 -->
                    <today-attendance></today-attendance>
                </el-col>
                <el-col :span="8">
                    <!-- 今日作业 -->
                    <today-homework></today-homework>
                </el-col>
                <el-col :span="8">
                    <!-- 班级公告 -->
                    <class-notice></class-notice>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <!-- 课表 -->
                    <today-schedule></today-schedule>
                </el-col>
                <el-col :span="8">
                    <!-- 今日课堂评价 -->
                    <class-evaluate></class-evaluate>
                </el-col>
                <el-col :span="8">
                    <!-- 班级德育 -->
                    <moral-education></moral-education>
                    <!-- 今日值日表 -->
                    <duty-roster></duty-roster>
                </el-col>
            </el-row>
        <!-- </template>
        <template v-else>
            <div>{{ $store.state.roomInfo.name }}</div>
            <el-button type="danger">未登录，请登录</el-button>
        </template> -->
    </div>
</template>

<script>
export default {
  components: {
    ClassInfo: () => import('./components/ClassInfo'),
    TodayAttendance: () => import('./components/TodayAttendance'),
    TodayHomework: () => import('./components/TodayHomework'),
    ClassNotice: () => import('./components/ClassNotice'),
    TodaySchedule: () => import('./components/TodaySchedule'),
    ClassEvaluate: () => import('./components/ClassEvaluate'),
    MoralEducation: () => import('./components/MoralEducation'),
    DutyRoster: () => import('./components/DutyRoster')
  }
}
</script>

<style lang="less" scoped>
.box {
    display: flex;
    flex-direction: column;
    & > div {
        flex: 1 0;
        overflow: hidden;
        & + div {
            margin-top: 10px;
        }
    }
}
.el-col {
    height: 100%;
    .box
}
</style>
