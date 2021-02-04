import $api from '@/api'
import $store from '@/store'
import client from '@/assets/oss.js'
import ossConfig from '@/assets/ossConfig.js'
import ossPaths from '@/assets/ossPaths.js'
import { base64ToFile } from '@/assets/utils/formatFile.js'
import { isObject, isString } from '@/assets/utils/types.js'
import { showLoading, hideLoading } from '@/assets/utils/loading.js'
import { encode } from '@/assets/utils/code.js'
import { getDate } from '@/assets/utils/date.js'

// 默认配置
let config = {
  bucket: ossConfig.bussinessFileBucket,
  path: ossPaths.default
}

// 获取 OSS 秘钥
const ossInit = call => {
  if (!$store.state.ossClient || Date.now() > $store.state.ossExpireTime) {
    $api.aliOssApi.getToken().then(res => {
      const { Status: status, Data: data } = res.data
      if (status) {
        // 初始化 OSS 客户端
        $store.commit('saveOssClient', client({
          accessKeyId: data.AccessKeyId,
          accessKeySecret: data.AccessKeySecret,
          stsToken: data.SecurityToken,
          endpoint: config.bucket.endpoint,
          bucket: config.bucket.bucket,
          region: config.bucket.region
        }))
        // token 1 小时过期
        $store.commit('saveOssExpireTime', Date.now() + 60 * 60 * 1000)
        call()
      }
    })
  } else {
    call()
  }
}

// 格式化 OSS 上传参数
const add0 = n => n > 9 ? n : '0' + n
const formatParams = (file, realname) => {
  const date = new Date()
  const today = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(add0).join('')
  const point = file.name.lastIndexOf('.')
  file.fileName = file.name.slice(0, point)
  file.suffix = file.name.slice(point)
  let randomNumber = ''
  for (var i = 0; i < 10; i++) randomNumber += Math.floor(Math.random() * 10)
  let storeAs = `${config.path}/${today}/pc_file_${randomNumber}_${date.getTime()}`
  storeAs += !realname ? file.suffix : `/${file.name}`
  return { storeAs, file }
}

// 获取图片水印
export const watermark = wordOrParams => {
  const params = !wordOrParams ? {} : isString(wordOrParams) ? { word: wordOrParams } : wordOrParams
  params.word = params.word || getDate({ format: 'yyyy/MM/dd HH:mm:ss' })
  const config = {
    color: 'FFFFFF',
    size: 16,
    shadow: 50,
    g: 'se',
    x: 20,
    y: 15,
    ...params
  }

  return [
    '?x-oss-process=image/watermark',
    'text_' + encode(config.word),
    'color_' + config.color,
    'size_' + config.size,
    'shadow_' + config.shadow,
    'g_' + config.g,
    'x_' + config.x,
    'y_' + config.y
  ].join()
}

// 上传到 OSS
const uploadToOss = (fileObj, index, params) => {
  const { realname, progress, success } = params
  return new Promise(resolve => {
    const { storeAs, file } = formatParams(fileObj, realname)
    $store.state.ossClient.multipartUpload(storeAs, file, {
      progress: percent => {
        if (progress) progress(percent * 100, index)
      }
    }).then(result => {
      if (result.res && result.res.status === 200) {
        const res = {
          url: `/${result.name}`,
          objectKey: result.name,
          name: file.fileName,
          suffix: file.suffix,
          fullName: file.name,
          type: file.type,
          size: file.size
        }
        if (params.watermark && /^\.(png|jpe?g|webp)$/.test(res.suffix)) {
          res.url += params.watermark === true ? watermark()
            : isString(params.watermark) ? params.watermark
              : params.watermark[index]
        }
        if (success) success(res, index)
        resolve(res)
      }
    })
  })
}
// 上传文件
/*
params: {
    bucket {Object}：oss 配置
    path {String}：文件保存路径
    file {File/FileArray}：文件或文件数组
    watermark {Boolean/String/StringArray}：图片水印
    realname {Boolean}：是否以真实文件名保存，上传附件时使用，便于下载和预览时使用实际的文件名
    progress {Function}：上传进度回调，参数为上传的进度（范围 0~100），如果是上传文件数组则会有第二个参数当前上传文件的 index
    success {Function}：上传文件数组时传入，每次文件上传成功的回调，参数分别为结果对象和当前 index（then() 只在所有文件上传完才触发）
}
*/
export const ossUpload = (params = {}) => {
  return new Promise((resolve, reject) => {
    if (!params.file) return reject(new Error('upload 方法文件对象不能为空'))
    if (!isObject(params)) return reject(new Error('upload 方法只接受对象类型参数'))
    config = { ...config, ...params }
    ossInit(() => {
      const isArray = Array.isArray(params.file)
      const list = (isArray ? params.file : [params.file])
        .map(item => isString(item) ? base64ToFile(item) : item)
        .map((file, index) => uploadToOss(file, index, params))
      if (config.loading) showLoading()
      Promise.all(list).then(res => {
        if (config.loading) hideLoading()
        resolve(isArray ? res : res[0])
      })
    })
  })
}

// 删除文件
/*
params: {
    bucket {Object}：oss 配置
    path {String}：文件保存路径
    key {String/StringArray}：objectKey 或 objectKey 数组
}
*/
export const ossDelete = (params = {}) => {
  return new Promise((resolve, reject) => {
    if (!params.key) return reject(new Error('del 方法 key 不能为空'))
    if (!isObject(params)) return reject(new Error('del 方法只接受对象类型参数'))
    config = { ...config, ...params }
    ossInit(() => {
      const key = Array.isArray(params.key) ? params.key : [params.key]
      if (config.loading) showLoading()
      $store.state.ossClient.deleteMulti(key).then(result => {
        if (result.res.status === 200) {
          if (config.loading) hideLoading()
          resolve()
        }
      })
    })
  })
}
