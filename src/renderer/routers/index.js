import indexRouter from './indexRouter' // 首页
import classEvaluateRouter from './classEvaluateRouter' // 课堂评价
import schoolResourcesRouter from './schoolResourcesRouter' // 校本资源
import callNamesRouter from './callNamesRouter' // 课堂点名
import smallToolsRouter from './smallToolsRouter' // 小工具
import todayAttendanceRouter from './todayAttendanceRouter' // 今日考勤
import todayHomeworkRouter from './todayHomeworkRouter' // 今日作业
import classNoticeRouter from './classNoticeRouter' // 班级公告
import moralEducationRouter from './moralEducationRouter' // 班级德育
import classLiteracyRouter from './classLiteracyRouter' // 班级素养

export default [].concat(
  indexRouter,
  classEvaluateRouter,
  schoolResourcesRouter,
  callNamesRouter,
  smallToolsRouter,
  todayAttendanceRouter,
  todayHomeworkRouter,
  classNoticeRouter,
  moralEducationRouter,
  classLiteracyRouter
)
