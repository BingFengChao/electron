export default [
  {
    // 校本资源
    name: 'schoolResources',
    path: '/schoolResources',
    component: resolve => require(['pages/schoolResources/SchoolResources'], resolve),
    redirect: '/schoolResources/0',
    children: [
      {
        // 我上传的
        path: '0',
        component: resolve => require(['pages/schoolResources/myUpload/MyUpload'], resolve)
      },
      {
        // 收藏/分享
        path: '1',
        component: resolve => require(['pages/schoolResources/collectShare/CollectShare'], resolve)
      },
      {
        // 校内资源
        path: '2',
        component: resolve => require(['pages/schoolResources/schoolResources/SchoolResources'], resolve)
      },
      {
        // 直播
        path: '3',
        component: resolve => require(['pages/schoolResources/live/Live'], resolve)
      },
      {
        // 点播
        path: '4',
        component: resolve => require(['pages/schoolResources/demand/Demand'], resolve)
      }
    ]
  }
]
