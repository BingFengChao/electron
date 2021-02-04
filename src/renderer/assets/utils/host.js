// ---- 获取域名 ----
import ossConfig from '@/assets/ossConfig.js'

const isProd = process.env.NODE_ENV === 'production'
const onlinePreviewHost = 'https://onlinepreview.vschool100.cn/onlinePreview'
const wxQrcodeHost = 'https://mp.weixin.qq.com/cgi-bin/showqrcode'

// 文件域名 - type [默认为 0]: 0 - OSS 业务文件域名，1 - OSS 静态文件域名，2 - 老平台图片域名，3 - 老平台文件域名
// 说明：传入域名和类型，根据类型返回拼接完整的域名，默认不传类型为 OSS 业务文件域名
/* 示例
import { getFileHost } from '@/assets/utils/host.js'
...
const url = getFileHost('/xxx.png') // https://bussiness-file-bucket.oss-cn-shenzhen.aliyuncs.com/xxx.png
const url = getFileHost('/xxx.png', 2) // http://test.vschool100.com:8888/xxx.png
*/
export const getFileHost = (url, type = 0) => {
  if (!url || /^https?:\/\/|^blob:|^data:/.test(url) || !/^[0123]$/.test(type)) {
    return url
  } else if (type === 0) {
    return ossConfig.bussinessFileBucket.domain + url
  } else if (type === 1) {
    return ossConfig.staticResourcesFileBucket.domain + url
  } else if (type === 2) {
    return isProd
      ? 'https://image.vschool100.cn' + url
      : 'http://test.vschool100.com:8888' + url
  } else {
    return isProd
      ? 'https://oa.vschool100.cn' + url
      : 'https://test.vschool100.com' + url
  }
}

// 当文件域名是个 OSS json 对象时返回其中的 url 并拼接好, 不是就返回原链接的拼接，用法和 getFileHost 相同，多了个参数可指定 key
/* 示例
import { getFileUrl } from '@/assets/utils/host.js'
...
const url = getFileUrl('{"url":"/xxx.jpg","objectKey":"","name":""}') // https://bussiness-file-bucket.oss-cn-shenzhen.aliyuncs.com/xxx.jpg
const url = getFileUrl('{"url":"/xxx.jpg","objectKey":"","name":""}', 1) // https://static-resources-file-bucket.oss-cn-shenzhen.aliyuncs.com/xxx.jpg
const url = getFileUrl('{"src":"/xxx.jpg","objectKey":"","name":""}', 1, 'src') // https://static-resources-file-bucket.oss-cn-shenzhen.aliyuncs.com/xxx.jpg
*/
export const getFileUrl = (url, type = 0, key = 'url') => {
  if (url && typeof url === 'string' && url[0] === '{') {
    try {
      JSON.parse(url)
    } catch (e) {
      throw new Error('host.js > getFileUrl 的 url 参数不是 json 对象')
    }
    return getFileHost(JSON.parse(url)[key], type)
  } else {
    return getFileHost(url, type)
  }
}

// 当文件域名是个 OSS json 对象时返回其中的 objectKey，或指定其他属性
/* 示例
import { getObjectKey } from '@/assets/utils/host.js'
...
const url = getObjectKey('{"url":"/xxx.jpg","objectKey":"xxx.jpg","name":""}') // xxx.jpg
*/
export const getObjectKey = (url, key = 'objectKey') => {
  if (url && typeof url === 'string' && url[0] === '{') {
    try {
      JSON.parse(url)
    } catch (e) {
      throw new Error('host.js > getObjectKey 的 url 参数不是 json 对象')
    }
    return JSON.parse(url)[key]
  } else {
    return url
  }
}

export const getHeadImgDomain = url => {
  if (url) {
    const imgReg = /^https?:\/\/|^blob:|^data:/
    if (imgReg.test(url)) {
      return url
    } else {
      // return `${ossConfig.bussinessFileBucket.domain}${url}`
      return isProd
        ? `https://image.vschool100.cn${url}`
        : `http://test.vschool100.com:8888${url}`
    }
  } else {
    return `${
      ossConfig.staticResourcesFileBucket.domain
    }/Common/head.png`
  }
}

// 获取文件预览地址
export const getFileOnlinePreview = (url, type = 0) => {
  if (!url) {
    return new Error('Invalid url')
  }
  return `${onlinePreviewHost}?url=${encodeURIComponent(getFileHost(url, type))}`
}

// 获取微信二维码 传入tik
export const getWxQrcode = ticket => {
  if (!ticket) {
    return new Error('Invalid ticket')
  }
  return `${wxQrcodeHost}?ticket=${ticket}`
}
