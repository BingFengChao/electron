import http from '@/request/http.js'
export default {
  // 获取学期列表
  getTermList: params => http.get('/api/SystemAdmin/TermInfo/List', { params })
}
