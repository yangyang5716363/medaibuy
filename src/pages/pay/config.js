export const newUserBuyMonthlyProduct = [
  { name: null, price: null, unit: null, cycle: null }, 
  { name: 'Start', price: 29, unit: '$', cycle: 'Monthly' }, 
  { name: 'Basic', price: 49, unit: '$', cycle: 'Monthly' }, 
  { name: 'Pro', price: 99, unit: '$', cycle: 'Monthly' }, 
]
export const newUserBuyColumns = [
  {
    content: [
      {
        data: ['Category','Normal (Shopify)','COD (Cash on Delivery)','FP (Knockoff)','BH (Black Hat Ads)'],
      }, {
        data: ['Premium Search','GEO','Language','Action','E-Commerce platform','Network','Tracking System'],
      }, {
        data: ['Usage Limitation','Search Limited per day', 'Collection Limited'],
      }, {
        data: ['Search Position','Advertiser Name','URL','Advertising Content'],
      }, {
        data: ['Ads Type','Image','Video','Carousel'],
      }, {
        data: ['Marketing Objective','PPE','WC','APP Install'],
      }, {
        data: ['Device','Desktop','Android','IOS'],
      },
    ],
    isShowBtn: false,
    productCode: null,
  },
  {
    content: [
      {
        data: [null,'check','close','close','close'],
      }, {
        data: [null,'only America','only English','close','check','close','close'],
      }, {
        data: [null,100,5],
      }, {
        data: [null,'check','check','check'],
      }, {
        data: [null,'check','check','check'],
      }, {
        data: [null,'check','check','close'],
      }, {
        data: [null,'check','check','check'],
      },
    ],
    isShowBtn: true,
    productCode: 'start',
  },
  {
    content: [
      {
        data: [null,'check','close','close','close'],
      }, {
        data: [null,'check','check','close','check','close','close'],
      }, {
        data: [null,300,10],
      }, {
        data: [null,'check','check','check'],
      }, {
        data: [null,'check','check','check'],
      }, {
        data: [null,'check','check','close'],
      }, {
        data: [null,'check','check','check'],
      },
    ],
    isShowBtn: true,
    productCode: 'basic',
  },
  {
    content: [
      {
        data: [null,'check','check','check','close'],
      }, {
        data: [null,'check','check','check','check','close','close'],
      }, {
        data: [null,600,20],
      }, {
        data: [null,'check','check','check'],
      }, {
        data: [null,'check','check','check'],
      }, {
        data: [null,'check','check','close'],
      }, {
        data: [null,'check','check','check'],
      },
    ],
    isShowBtn: true,
    productCode: 'pro',
  },
]
export const instructions = [
  {
    key: 0,
    message: ' - where "month" is a non-natural month measured in 30 days.',
  },
  {
    key: 1,
    message: ' - the product version of the product items will be cleared at the end of non-natural, and reactivate in the next month.',
  },
  {
    key: 2,
    message: ' - Add-on package and reward package does not accumulate until next month, it will cleared at end of the month with the product version.',
  },
]
export const media = {
  productCode: 'mediabuy',
  price: '$199',
  unit: ' / Monthly',
  info: {
    '1. Multi-Platform': 'Facebook, Native, Adult…',
    '2. Offer Info': 'Category, Traffic Share, Tracking Tool, Networks…',
    '3. Ad Creative': 'Safe Image, Post URL, Landing Page URL，Money Page Download…',
    '4. Trends': 'op offers/ networks/ traffic platforms/ advertisers…'
  }
}