import axios from 'axios'
import $api from '@/api'
import $store from '@/store'
import { Message } from 'element-ui'
import { showLoading, hideLoading } from '@/assets/utils/loading.js'

// 开发环境下登录状态过期自动获取 token
const getToken = () => {
  if (process.env.NODE_ENV === 'development') {
    $api.loginApi.getToken({
      userType: 1,
      schoolCode: '10086',
      userName: 'lanyAdmin',
      passWord: '7A90DDBB4FC3F89D51B40D8700309FFA'
    }).then(res => {
      if (res.data.Status) {
        $store.commit('saveToken', res.data.Data.token)
        setTimeout(() => location.reload(), 500)
      }
    })
  }
}

// 去抖动防止出现多个错误提示
let timer = null

// 创建 axios 实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT,
  headers: { 'content-type': 'application/json; charset=utf-8' },
  loading: true // 如果接口不需要 loading 可设置 false，例如 axios.get('/', { params, loading: false })
})

// 请求拦截器
instance.interceptors.request.use(config => {
  if (config.loading) showLoading()
  // 后期可以判断是否存在 token，或者某些接口例如登录不使用 token，目前是从 App 中登陆过来，所以无需判断
  config.headers.authorization = 'Bearer ' + $store.state.token
  return config
}, error => {
  console.log('请求拦截 error', error)
  return Promise.error(error)
})

// 响应拦截器
instance.interceptors.response.use(res => {
  if (res.config.loading) hideLoading()
  if (res.status !== 200) {
    Promise.reject(res)
  } else if (res.data.type !== 'application/json') {
    Promise.resolve(res.data)
    // ----FileReader
    // const reader = new FileReader()
    // reader.readAsText(res.data)
    // reader.onload = () => {
    //     const data = JSON.parse(reader.result)
    //     Message.error(data.ResponseError.LongMessage)
    // }
  } else if (res.data.Status) {
    Promise.resolve(res.data)
  } else {
    Message.error(res.data.ResponseError.LongMessage)
    Promise.reject(res.data.ResponseError.LongMessage)
  }
}, err => {
  if (err.response && err.response.config.loading) hideLoading()
  // 如果 err.response 存在是接口返回的错误，否则是断网
  if (err.response && err.response.status === 401) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      Message.error('登录状态已过期')
      getToken()
    }, 300)
  } else {
    Message.error(err.response ? err.response.status + '' : '网络错误')
  }
  return Promise.reject(err)
})

export default instance
