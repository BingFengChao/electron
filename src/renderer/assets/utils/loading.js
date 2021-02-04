import { Loading } from 'element-ui'

let loading = null
let loadingCount = 0

export const showLoading = () => {
  if (loadingCount === 0) loading = Loading.service()
  loadingCount++
}

export const hideLoading = () => {
  if (loadingCount > 0) {
    loadingCount--
    if (loadingCount === 0) loading.close()
  }
}
