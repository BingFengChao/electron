import { isDate, isString } from '@/assets/js/types'

// 前面补 0
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

//  -- 计算两个日期相差的时长 --
// 匹配
const differReg = /dd?|hh?|mm?|ss?/g
// 保留小数位数
const differFix = (time, digit) => digit ? time.toFixed(digit) : Math.floor(time)
// 获取时间差
const differTime = {
  d: time => time / 1000 / 60 / 60 / 24,
  h: (time, add) => time / 1000 / 60 / 60 % 24 + (add ? Math.floor(differTime.d(time)) * 24 : 0),
  m: (time, add) => time / 1000 / 60 % 60 + (add ? Math.floor(differTime.h(time, true)) * 60 : 0),
  s: (time, add) => time / 1000 % 60 + (add ? Math.floor(differTime.s(time, true)) * 60 : 0)
}
// 获取是否合并时长
const getMerge = (config, res) => {
  return /hh?/.test(res) ? config.dtoh
    : /mm?/.test(res) ? config.htom
      : /ss?/.test(res) ? config.mtos
        : false
}
// 获取减去的时长
const getTime = {
  s: time => time * 1000,
  m: time => getTime.s(time) * 60,
  h: time => getTime.m(time) * 60,
  d: time => getTime.h(time) * 24
}
export const differ = (params = {}) => {
  // 合并配置
  const config = {
    format: 'd天 hh:mm:ss',
    digit: 0,
    minus: 0,
    ...params
  }

  // 计算时长
  if (config.minus && isString(config.minus)) {
    const time = config.minus.slice(0, -1)
    const unit = config.minus.slice(-1)
    config.minus = getTime[unit](time)
  }
  config.time = validDate(config.end) - validDate(config.start) - config.minus

  // 是否合并时间
  config.dtoh = 'dtoh' in config ? config.dtoh : !config.format.includes('d')
  config.htom = 'htom' in config ? config.htom : !config.format.includes('h')
  config.mtos = 'mtos' in config ? config.mtos : !config.format.includes('m')

  // 获取时间
  const tool = {
    d: time => differFix(differTime.d(time), config.digit),
    dd: time => add0(tool.d(time)),
    h: (time, add) => differFix(differTime.h(time, add), config.digit),
    hh: (time, add) => add0(tool.h(time, add)),
    m: (time, add) => differFix(differTime.m(time, add), config.digit),
    mm: (time, add) => add0(tool.m(time, add)),
    s: (time, add) => differFix(differTime.s(time, add), config.digit),
    ss: (time, add) => add0(tool.s(time, add))
  }

  return config.format.replace(differReg, res => tool[res](config.time, getMerge(config, res)))
}
