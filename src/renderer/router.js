import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/routers'

Vue.use(VueRouter)

// 取消重复跳转同一个路由的报错
const { push, replace } = VueRouter.prototype
VueRouter.prototype.push = function (to) { return push.call(this, to).catch(() => {}) }
VueRouter.prototype.replace = function (to) { return replace.call(this, to).catch(() => {}) }

const router = new VueRouter({ routes })
router.beforeEach((to, from, next) => {
  next()
})

export default router
