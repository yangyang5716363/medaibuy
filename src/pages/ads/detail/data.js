export const data = {
    // 收藏文案
    collection: 'Collection',

    logo: require('@/assets/cs2.png'),

    logoTitle: 'am Tangan Wanita Gedi 2018',

    // 描述
    description: " (Live 2018) - Bia-gio Antonaccivi ALWAYS REMEMBER US THIS WAY",
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
    // 介绍
    introduction: 'Song Service offre canzoni karaoke e basi musicali in formato MP3 e MIDI. Scarica oltre successi italiani e internazionali.',
    // icon 列表
    applications: [
      {
        type: 'thumbs-up',
        value: 293
      },
      {
        type: 'message',
        value: 47
      },
      {
        type: 'bounce',
        value: 80
      },
      {
        type: 'time',
        value: 248
      },
      {
        type: 'mobile',
        value: 248
      },
      {
        type: 'sports',
        value: 248
      },
      {
        type: 'eye',
        value: '2018.11.11~2019.01.15'
      }
    ],
    
    // 原始地址
    original: {
      content: 'https://www.baidu.com',
      url: 'https://www.baidu.com'
    },

    more: 'Learn More'
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
    cell: 2,
    field: 'date',
    label: 'Datepick',
    type: 'datePicker',
    cb: v => v && v.join(','),
    option: [
      { value: 1, name: 'Last 1 Month', type: 'month' },
      { value: 3, name: 'Last 3 Months', type: 'month' },
      { value: 6, name: 'Last 6 Months', type: 'month' }
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

// Basic Information 表格
export const basicInformation = {
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
			title: 'Ads Position',
			content: 'Feed',
		},
		{
			title: 'First Seen',
			content: 'Feed',
		},
		{
			title: 'Last Seen',
			content: 'Feed',
		},
		{
			title: 'Device',
			content: 'Feed',
		},
		{
			title: 'Marketing Objective',
			content: 'Feed',
		},
		{
			title: 'BH Category',
			content: 'Feed',
		},
		{
			title: 'Geo',
			content: 'Feed',
		},
		{
			title: 'E-Commerce Platform',
			content: 'Feed',
		},
	]
}

// Offer Information 表格
export const offerInformation = {
	head: {
		label: 'Offer Information',
		help: 'Offer Information',
		more: 'Offer Information Pages>>',
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
	]
}

export const AdvertiserDomain = {
  head: {
		label: 'Advertiser Domain Analysis',
		help: 'Advertiser Domain Analysis',
		more: 'Advertiser Domain Analysis Money Pages>>',
  },
  
  data: {
    image: '',
    title: 'Amazon.com',
    content: 'free two-day shipping for hundreds',
  },

  geo: [
    {
      count: 19,
      description: 'Global Rank',
    },
    {
      count: 19,
      description: 'Global Rank',
    },
    {
      count: 19,
      description: 'Global Rank',
    },
    {
      count: 19,
      description: 'Global Rank',
    },
    {
      count: 19,
      description: 'Global Rank',
    },
  ]
}

