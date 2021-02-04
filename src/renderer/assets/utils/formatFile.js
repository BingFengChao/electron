import $api from '@/api'
import { isString, isNumber } from '@/assets/utils/types.js'

// import {  } from '@/assets/utils/formatFile.js'

// base64 转 file
export const base64ToFile = (base64, name = Date.now()) => {
  const reg = /^data:(.+?\/(.+?));base64,/
  const originStr = atob(base64.replace(reg, ''))
  const U8Arr = new Uint8Array(originStr.length)
  for (let i = 0; i < originStr.length; i++) U8Arr[i] = originStr.charCodeAt(i)
  const [, type, suffix] = base64.match(reg)
  return new File([U8Arr], name + '.' + suffix, { type })
}

// 转换文件大小
export const getSize = size => {
  if (!isString(size) && !isNumber(size)) return '-'
  if (isString(size)) {
    size = Number(size)
    if (!size || isNaN(size)) return '-'
  }
  return size < 1024 ? size + 'B'
    : size < 1024 ** 2 ? (size / 1024).toFixed(2) - 0 + 'KB'
      : size < 1024 ** 3 ? (size / 1024 ** 2).toFixed(2) - 0 + 'MB'
        : size < 1024 ** 4 ? (size / 1024 ** 3).toFixed(2) - 0 + 'GB'
          : (size / 1024 ** 4).toFixed(2) - 0 + 'TB'
}

// 获取文件名称
export const getName = (url = '') => url.includes('/') ? url.slice(url.lastIndexOf('/') + 1) : url

// 获取文件后缀
export const getSuffix = (url = '') => {
  const name = getName(url)
  return name.includes('.') ? name.slice(name.lastIndexOf('.')) : ''
}

// 获取文件 icon
const TYPE_REG = {
  word: /\.(docx?|dotx?|docm|dotm|wps|wpt)$/i,
  excel: /\.(xlsx?|xltx?|xlsm|xltm|csv|ett?)$/i,
  ppt: /\.(pptx?|potx?|ppsx?|pptm|potm|ppsm|dps|dpt)$/i,
  pdf: /\.pdf$/i,
  image: /\.(jpe?g|png|gif|webp|svg|bmp|ico|tiff?|jfif)$/i,
  video: /\.(avi|mpeg|ogv|ts|webm|3gp|3g2|wmv|afs|asx|rm|rmvb|mp4|mov|m4v|dat|mkv|flv|vob|ogg|mod)$/i,
  audio: /\.(aac|midi?|mp3|oga|opus|wav|weba|aiff?|au|ram|rmi|vqf|ape)$/i,
  txt: /\.txt$/i,
  zip: /\.(bz2?|epub|gz|jar|rar|zip|7z|cab|arj|lzh|ace|uue|iso|mpq)$/i,
  unknown: /[^]?/
}
export const getType = url => {
  const suffix = getSuffix(url)
  for (const type in TYPE_REG) if (TYPE_REG[type].test(suffix)) return type
}

// 下载文件
const IS_WX = /MicroMessenger/i.test(navigator.userAgent)
const WX_SUPPORT_FILE = ['word', 'excel', 'ppt', 'pdf', 'image']
export const download = (url, name) => {
  if (IS_WX) {
    const unSupport = !WX_SUPPORT_FILE.includes(getType(url))
    if (unSupport) alert('若无法下载请点击右上角菜单选择在浏览器中打开')
    open(url)
  } else {
    if (!name) name = getName(url)
    $api.commonApi.formGetFile(url).then(res => {
      const a = document.createElement('a')
      a.href = URL.createObjectURL(res.data)
      a.download = name
      a.click()
    }).catch(() => open(url))
  }
}
