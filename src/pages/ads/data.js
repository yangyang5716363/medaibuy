import * as offerServices from '@/services/offer'

export const data = {
  1: {
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
        value: 293,
        title: 'like',
      },
      {
        type: 'message',
        value: 47,
        title: 'comments',
      },
      {
        type: 'bounce',
        value: 80,
        title: 'forward',
      },
      {
        type: 'time',
        value: 248,
        title: 'duration',
      },
      {
        type: 'mobile',
        value: 248,
        title: 'Devices',
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
  },
  2: {
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
  },
}

export const combine = {
  combine: true,
  cell: 1,
  label: 'Premium Search',
  option: [
    {
      field: 'language',
      label: 'Language',
      type: 'select',
      multiple: true,
      option: [],
      cb: v => v
    },
    {
      field: 'country',
      label: 'Geo',
      type: 'select',
      multiple: true,
      option: [],
      cb: v => v
    },
    {
      field: 'action',
      label: 'Action',
      type: 'select',
      multiple: true,
      option: [],
      cb: v => v
    },
    // {
    //   field: 'platform',
    //   label: 'E-Commerce Platform',
    //   type: 'select',
    //   multiple: true,
    //   option: [],
    //   cb: v => v
    // },
    {
      field: 'network',
      label: 'Affiliate Network',
      type: 'select',
      multiple: true,
      option: [],
      cb: v => v
    },
    {
      field: 'bhCategory',
      label: 'Category',
      type: 'select',
      multiple: true,
      option: []
    },
    {
      field: 'offerName',
      label: 'Offer Name',
      type: 'input',
      onSearch: offerServices.fetchOfferName,
    },
  ]
}

export const facebook = [
  {
    cell: 1, // 占据行数，主要分为1或者两个值
    label: 'Search Position', // 当前行配置的标题
    type: 'radio', // 装饰组件的类型
    field: 'keywordType', // 字段标识
    // 建议选项，当不存在field时，option为配置跟dataSource相同
    option: [ 
      { value: 1, name: 'Advertiser Name', disabled: true },
      { value: 2, name: 'URL', disabled: true },
      { value: 3, name: 'Advertising Content', disabled: true }
    ],
    cb: v => v
  },
  // {
  //   cell: 2,
  //   label: 'Marketing Objective',
  //   type: 'radio',
  //   field: 'socialPpeWcFlag',
  //   option: [
  //     { value: '1', name: 'PPE' },
  //     { value: '2', name: 'WC' },
  //     { value: '3', name: 'APP Install' },
  //   ],
  //   cb: v => v
  // },
  {
    cell: 2,
    label: 'Ads Format',
    type: 'checkbox',
    field: 'showType',
    option: [
      { value: 1, name: 'Image' },
      { value: 3, name: 'Video' },
      { value: 4, name: 'Carousel' },
    ],
    cb: v => v
  },
  {
    cell: 2,
    label: 'Device',
    type: 'checkbox',
    field: 'socialDevice',
    option: [
      { value: '1', name: 'Desktop' },
      { value: '2', name: 'Android' },
      { value: '3', name: 'IOS' },
    ],
    cb: v => v
  }, 
  {
    cell: 2,
    field: 'firstSeenDate',
    label: 'First Seen Date',
    type: 'datePicker',
    placeholder: 'First Seen',
    option: [
      { value: 1, name: 'Last 1 Month', type: 'month' },
      { value: 3, name: 'Last 3 Months', type: 'month' },
      { value: 6, name: 'Last 6 Months', type: 'month' }
    ],
    cb: v => v
  }, 
  {
    cell: 2,
    field: 'lastSeenDate',
    label: 'Last Seen Date',
    type: 'datePicker',
    placeholder: 'Last Seen',
    option: [
      { value: 1, name: 'Last 1 Month', type: 'month' },
      { value: 3, name: 'Last 3 Months', type: 'month' },
      { value: 6, name: 'Last 6 Months', type: 'month' }
    ],
    cb: v => v
  }, 
  combine,
]

export const native = [
  {
    combine: true,
    cell: 1,
    label: 'Premium Search',
    option: [
      {
        field: 'country',
        label: 'Geo',
        type: 'select',
        multiple: true,
        option: []
      },
      {
        field: 'language',
        label: 'Language',
        type: 'select',
        multiple: true,
        option: []
      },
      {
        field: 'device',
        label: 'Device Type',
        type: 'select',
        multiple: true,
        option: []
      },
      {
        field: 'network',
        label: 'Traffic Network',
        type: 'select',
        multiple: true,
        option: []
      },
      {
        cell: 1,
        field: 'firstSeenDate',
        label: 'Fiest Seen Date',
        type: 'datePicker',
        placeholder: 'First Seen',
        option: [
          { value: 1, name: 'Last 1 Month', type: 'month' },
          { value: 3, name: 'Last 3 Months', type: 'month' },
          { value: 6, name: 'Last 6 Months', type: 'month' }
        ]
      },
      {
        cell: 1,
        field: 'lastSeenDate',
        label: 'Last Seen Date',
        type: 'datePicker',
        placeholder: 'Last Seen',
        option: [
          { value: 1, name: 'Last 1 Month', type: 'month' },
          { value: 3, name: 'Last 3 Months', type: 'month' },
          { value: 6, name: 'Last 6 Months', type: 'month' }
        ]
      },
      {
        field: 'picHeightRange',
        label: 'Height',
        type: 'select',
        multiple: true,
        option: [
          { name: '0-100', value: '0-100' },
          { name: '100-200', value: '100-200' },
          { name: '200-300', value: '200-300' },
          { name: '300-400', value: '300-400' },
          { name: '400-500', value: '400-500' },
          { name: '500-600', value: '500-600' },
          { name: '600-700', value: '600-700' },
          { name: '700-800', value: '700-800' },
          { name: '800-900', value: '900-1000' },
          { name: '1000-', value: '1000+∞'}
        ]
      },
      {
        field: 'picWidthRange',
        label: 'Width',
        type: 'select',
        multiple: true,
        option: [
          { name: '0-100', value: '0-100' },
          { name: '100-200', value: '100-200' },
          { name: '200-300', value: '200-300' },
          { name: '300-400', value: '300-400' },
          { name: '400-500', value: '400-500' },
          { name: '500-600', value: '500-600' },
          { name: '600-700', value: '600-700' },
          { name: '700-800', value: '700-800' },
          { name: '800-900', value: '900-1000' },
          { name: '1000-', value: '1000+∞'}
        ]
      },
      {
        field: 'affiliateNetwork',
        label: 'Affiliate Network',
        type: 'select',
        multiple: true,
        option: []
      },
      {
        field: 'bhCategory',
        label: 'Category',
        type: 'select',
        multiple: true,
        option: []
      },
      {
        field: 'offerName',
        label: 'Offer Name',
        type: 'input',
        onSearch: offerServices.fetchOfferName,
      },
      {
        field: 'dd',
        label: ' ',
        type: '',
        multiple: true,
        option: []
      },
    ]
  }
]

export const adult = [
  {
    combine: true,
    cell: 1,
    label: 'Premium Search',
    option: [
      {
        field: 'country',
        label: 'Geo',
        type: 'select',
        multiple: true,
        option: []
      },
      {
        field: 'language',
        label: 'Language',
        type: 'select',
        multiple: true,
        option: []
      },
      {
        field: 'device',
        label: 'Device Type',
        type: 'select',
        multiple: true,
        option: []
      },
      {
        field: 'network',
        label: 'Traffic Network',
        type: 'select',
        multiple: true,
        option: []
      },
      {
        cell: 1,
        field: 'firstSeenDate',
        label: 'Fiest Seen Date',
        type: 'datePicker',
        placeholder: 'First Seen',
        option: [
          { value: 1, name: 'Last 1 Month', type: 'month' },
          { value: 3, name: 'Last 3 Months', type: 'month' },
          { value: 6, name: 'Last 6 Months', type: 'month' }
        ]
      },
      {
        cell: 1,
        field: 'lastSeenDate',
        label: 'Last Seen Date',
        type: 'datePicker',
        placeholder: 'Last Seen',
        option: [
          { value: 1, name: 'Last 1 Month', type: 'month' },
          { value: 3, name: 'Last 3 Months', type: 'month' },
          { value: 6, name: 'Last 6 Months', type: 'month' }
        ]
      },
      {
        field: 'picHeightRange',
        label: 'Height',
        type: 'select',
        multiple: true,
        option: [
          { name: '0-100', value: '0-100' },
          { name: '100-200', value: '100-200' },
          { name: '200-300', value: '200-300' },
          { name: '300-400', value: '300-400' },
          { name: '400-500', value: '400-500' },
          { name: '500-600', value: '500-600' },
          { name: '600-700', value: '600-700' },
          { name: '700-800', value: '700-800' },
          { name: '800-900', value: '900-1000' },
          { name: '1000-', value: '1000+∞'}
        ]
      },
      {
        field: 'picWidthRange',
        label: 'Width',
        type: 'select',
        multiple: true,
        option: [
          { name: '0-100', value: '0-100' },
          { name: '100-200', value: '100-200' },
          { name: '200-300', value: '200-300' },
          { name: '300-400', value: '300-400' },
          { name: '400-500', value: '400-500' },
          { name: '500-600', value: '500-600' },
          { name: '600-700', value: '600-700' },
          { name: '700-800', value: '700-800' },
          { name: '800-900', value: '900-1000' },
          { name: '1000-', value: '1000+∞'}
        ]
      },
      {
        field: 'affiliateNetwork',
        label: 'Affiliate Network',
        type: 'select',
        multiple: true,
        option: []
      },
      {
        field: 'bhCategory',
        label: 'Category',
        type: 'select',
        multiple: true,
        option: []
      },
      {
        field: 'offerName',
        label: 'Offer Name',
        type: 'input',
        onSearch: offerServices.fetchOfferName,
      },
    ]
  }
]

// 排序数组
export const sortByArr = {
  facebook: [
    {
      key: `default`,
      value: `Comprehensive`,
      active: true,
    },
    {
      key: `lastSeenMs`,
      value: `Latest`,
      active: false,
    },
    {
      key: `hits`,
      value: `Hottest`,
      active: false,
    },
    {
      key: `likes`,
      value: `Likes`,
      active: false,
    },
    {
      key: `comments`,
      value: `Comments`,
      active: false,
    },
    {
      key: `shares`,
      value: `Shares`,
      active: false,
    },
    {
      key: `days`,
      value: `Days`,
      active: false,
    },
  ],
  native: [
    {
      key: `updateTime`,
      value: `Latest`,
      active: true,
    },
    {
      key: `days`,
      value: `Days`,
      active: false,
    },
  ]
}
