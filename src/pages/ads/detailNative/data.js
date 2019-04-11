export const data = {
    // 收藏文案
    collection: 'Collection',
    /* 
      图片展示方式 
      static 静态面试 | staticPlay 播放 | staticScroll 滚动 | scroll 滚动图片
    */
    // images: {
    //   type: 'static',
    //   src: require('@/assets/cs.png')
    // },
    images: {
      type: 'staticPlay',
      src: require('@/assets/cs.png')
    },
    // images: {
    //   type: 'scroll',
    //   srcArr: [
    //     {
    //       value: 0,
    //       src: require('@/assets/cs.png')
    //     },
    //     {
    //       value: 1,
    //       src: require('@/assets/cs.png')
    //     },
    //     {
    //       value: 2,
    //       src: require('@/assets/cs.png')
    //     },
    //   ]
    // },
    // images: {
    //   type: 'play',
    //   src: 'https://www.w3schools.com/html/mov_bbb.mp4'
    // },
    // images: {
    //   type: 'staticScroll',
    //   src: require('@/assets/cs.png')
    // },
    // 标题
    title: 'Canzoni Karaoke, basi musical',
}
 
export const dataSource = [
  {
    cell: 2, // 占据行数，主要分为1或者两个值
    label: 'Search Position', // 当前行配置的标题
    type: 'radio', // 装饰组件的类型
    field: 'ID1', // 字段标识
    // 建议选项，当不存在field时，option为配置跟dataSource相同
    option: [ 
      { value: '1', name: 'Advertiser Name' },
      { value: '2', name: 'URL' },
      { value: '3', name: 'Advertising Content' }
    ]
  }, 
  {
    cell: 2,
    label: 'Marketing Objective',
    type: 'radio',
    field: 'ID2',
    option: [
      { value: '1', name: 'test1' },
      { value: '2', name: 'test2' }
    ]
  },
  {
    cell: 2,
    label: 'Ads Format',
    type: 'checkbox',
    field: 'ID3',
    option: [
      { value: '1', name: 'test1' },
      { value: '2', name: 'test2' },
      { value: '3', name: 'test3' },
      { value: '4', name: 'test4' }
    ]
  }, 
  {
    cell: 2,
    label: 'Device',
    type: 'checkbox',
    field: 'ID4',
    option: [
      { value: '1', name: 'test1' },
      { value: '2', name: 'test2' },
      { value: '3', name: 'test3' },
    ]
  }, 
  {
    cell: 2,
    label: 'Device',
    type: 'checkbox',
    field: 'ID5',
    option: [
      { value: '1', name: 'test1' },
      { value: '2', name: 'test2' },
      { value: '3', name: 'test3' },
    ]
  }, 
  {
    cell: 1,
    field: 'firstSeenDate',
    label: 'Fiest Seen Date',
    type: 'datePicker',
    cb: v => v,
    option: [
      { value: 1, name: '最近一个月', type: 'month' },
      { value: 3, name: '最近三个月', type: 'month' },
      { value: 6, name: '最近六个月', type: 'month' }
    ]
  },
  {
    cell: 1,
    field: 'lastSeenDate',
    label: 'Last Seen Date',
    type: 'datePicker',
    cb: v => v,
    option: [
      { value: 1, name: '最近一个月', type: 'month' },
      { value: 3, name: '最近三个月', type: 'month' },
      { value: 6, name: '最近六个月', type: 'month' }
    ]
  },
  {
    combine: true,
    cell: 1,
    label: 'Premium Search',
    option: [
      {
        field: 'Geo',
        label: 'Geo',
        type: 'select',
        multiple: true,
        option: [
          { value: '1', name: '测试1' },
          { value: '2', name: '测试2' },
          { value: '3', name: '测试3' }
        ]
      },
      {
        field: 'language2',
        label: 'Language2',
        type: 'select',
        multiple: false,
        option: [
          { value: '1', name: '测试1' },
          { value: '2', name: '测试2' },
          { value: '3', name: '测试3' }
        ]
      },
      {
        field: 'language2',
        label: 'Language2',
        type: 'select',
        multiple: false,
        option: [
          { value: '1', name: '测试1' },
          { value: '2', name: '测试2' },
          { value: '3', name: '测试3' }
        ]
      }
    ]
  }
]

export const tableData = {
	head: {
		label: 'Basic Information',
		help: 'Basic Information',
		more: 'See All 1,287 Money Pages>>',
	},
	data: [
		{
			title: 'Viewed',
			content: 'Feed',
		},
		{
			title: 'Viewed',
			content: 'Feed',
		},
		{
			title: 'Viewed',
			content: 'Feed',
		},
		{
			title: 'Viewed',
			content: 'Feed',
		},
		{
			title: 'Viewed',
			content: 'Feed',
		},
		{
			title: 'Viewed',
			content: 'Feed',
		},
		{
			title: 'Viewed',
			content: 'Feed',
		},
	]
}

// Device Type 图标
export let deviceType = []

// Geo 图标
export let geo = []


