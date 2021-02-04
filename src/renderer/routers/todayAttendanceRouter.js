export default [
  {
    // 今日考勤
    name: 'todayAttendance',
    path: '/todayAttendance',
    component: resolve => require(['pages/todayAttendance/TodayAttendance'], resolve)
  }
]
