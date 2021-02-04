import { getFileHost, getFileUrl } from '@/assets/utils/host.js'

// import {  } from '@/assets/utils/util.js'

// 获取头像（类型可能是 0 或 2 或 3）
const reComToCn = str => str.replace(/(^https:\/\/image\.vschool100)\.com/, '$1.cn')
export const getAvatar = url => {
  if (!url) {
    return url
  } else if (url[0] === '{') {
    return reComToCn(getFileUrl(url))
  } else {
    const type = /^\\Base64UploadFile/.test(url) ? 3 : 2
    return reComToCn(getFileHost(url, type))
  }
}

// 数组对象根据对象的 key 去重
export const uniqueByKey = (list, key) => {
  const arr = []
  for (const listItem of list) if (!arr.find(arrItem => arrItem[key] === listItem[key])) arr.push(listItem)
  return arr
}
