import http from '@/request/http.js'
export default {
  getToken: () => http.get('/api/AliOSS/GetToken')
}
