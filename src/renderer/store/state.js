const token = localStorage.boardToken || ''
const schoolCode = localStorage.boardSchoolCode || '10086'
const companyId = localStorage.boardCompanyId || '60315ee1-a798-4e3a-9116-0c656854578d'
const classInfo = localStorage.boardClassInfo ? JSON.parse(localStorage.boardClassInfo) : null
const roomInfo = localStorage.boardRoomInfo ? JSON.parse(localStorage.boardRoomInfo) : null

export default {
  token, // token
  schoolCode, // 学校 code
  companyId, // 学校 id
  classInfo, // 绑定的班级信息
  roomInfo, // 绑定的功能室信息
  userInfo: null, // 登录的用户信息
  ossClient: null, // OSS 实例
  ossExpireTime: 0 // OSSToken 过期时间
}
