import { isDate } from '@/assets/utils/types.js'
// import { getDate } from '@/assets/utils/date.js'

const dayCN = '日一二三四五六'
const add0 = n => {
  if (n >= 10 || n <= -10) return n
  return n >= 0 ? '0' + n : (n + '').replace('-', '-0')
}
// 判断 date
const validDate = date => {
  date = !date ? new Date() : isDate(date) ? date : new Date(date)
  if (isNaN(date.getTime())) throw new Error('Invalid Date')
  return date
}

// 日期
const reg = /yy(yy)?|mm?|dd?|hh?|ss?/gi
const tool = {
  yyyy: date => date.getFullYear(), // 4位年
  yy: date => tool.yyyy(date).slice(2), // 2位年
  M: date => date.getMonth() + 1, // 月
  MM: date => add0(tool.M(date)), // 月补0
  d: date => date.getDate(), // 日
  dd: date => add0(tool.d(date)), // 日补0
  H: date => date.getHours(), // 24时
  HH: date => add0(tool.H(date)), // 24时补0
  h: date => tool.H(date) % 12 || 12, // 12时
  hh: date => add0(tool.h(date)), // 12时补0
  a: date => tool.H(date) < 12 ? 'am' : 'pm', // am/pm
  A: date => tool.H(date) < 12 ? 'AM' : 'PM', // AM/PM
  AA: date => tool.H(date) < 12 ? '上午' : '下午', // 上午/下午
  m: date => date.getMinutes(), // 分
  mm: date => add0(tool.m(date)), // 分补0
  s: date => date.getSeconds(), // 秒
  ss: date => add0(tool.s(date)), // 秒补0
  D: date => date.getDay(), // 星期
  DD: date => dayCN[tool.D(date)] // 中文星期
}
export const getDate = (params = {}) => {
  params.date = validDate(params.date)
  const config = {
    format: 'yyyy/MM/dd HH:mm:ss',
    ...params
  }

  // 设置相对时间
  if (config.day) config.date.setDate(config.date.getDate() + config.day)
  if (config.hour) config.date.setHours(config.date.getHours() + config.hour)
  if (config.minute) config.date.setMinutes(config.date.getMinutes() + config.minute)
  if (config.second) config.date.setSeconds(config.date.getSeconds() + config.second)

  return config.format.replace(reg, res => tool[res](config.date))
}
