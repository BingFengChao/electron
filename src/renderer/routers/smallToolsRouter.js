export default [
  {
    // 小工具
    name: 'smallTools',
    path: '/smallTools',
    component: resolve => require(['pages/smallTools/SmallTools'], resolve),
    redirect: '/smallTools/0',
    children: [
      {
        // 计时器
        path: '0',
        component: resolve => require(['pages/smallTools/timer/Timer'], resolve)
      },
      {
        // 随机选人
        path: '1',
        component: resolve => require(['pages/smallTools/randomSelect/RandomSelect'], resolve)
      },
      {
        // 接龙
        path: '2',
        component: resolve => require(['pages/smallTools/solitaire/Solitaire'], resolve)
      }
    ]
  }
]
