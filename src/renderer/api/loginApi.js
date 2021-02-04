import http from '@/request/http.js'
export default {
  // 获取 token
  getToken: params => http.post('/api/Login/GetToken', params)
}
