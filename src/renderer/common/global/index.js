import VApp from './VApp'
import VEmpty from './VEmpty'
import VImg from './VImg'
import VPagination from './VPagination'

export default function (Vue) {
  Vue.component('VApp', VApp)
  Vue.component('VEmpty', VEmpty)
  Vue.component('VImg', VImg)
  Vue.component('VPagination', VPagination)
}
