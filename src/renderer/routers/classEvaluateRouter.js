import $store from '@/store'
export default [
  {
    // 课堂评价
    name: 'classEvaluate',
    path: '/classEvaluate',
    component: resolve => require(['pages/classEvaluate/ClassEvaluate'], resolve),
    redirect: () => `/classEvaluate/${$store.state.userInfo ? '0' : '1'}`,
    children: [
      {
        // 添加评价
        path: '0',
        component: resolve => require(['pages/classEvaluate/add/Add'], resolve)
      },
      {
        // 评价记录
        path: '1',
        component: resolve => require(['pages/classEvaluate/record/Record'], resolve)
      }
    ]
  }
]
