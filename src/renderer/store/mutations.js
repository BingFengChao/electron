export default {
  saveToken (state, payload) {
    state.token = localStorage.boardToken = payload
  },
  saveSchoolCode (state, payload) {
    state.schoolCode = localStorage.boardSchoolCode = payload
  },
  saveCompanyId (state, payload) {
    state.companyId = localStorage.boardCompanyId = payload
  },
  saveClassInfo (state, payload) {
    state.classInfo = payload
    localStorage.boardClassInfo = JSON.stringify(payload)
  },
  saveRoomInfo (state, payload) {
    state.roomInfo = payload
    localStorage.boardRoomInfo = JSON.stringify(payload)
  },
  saveUserInfo (state, payload) {
    state.userInfo = payload
  },
  saveOssClient (state, data) {
    state.ossClient = data
  },
  saveOssExpireTime (state, data) {
    state.ossExpireTime = data
  }
}
