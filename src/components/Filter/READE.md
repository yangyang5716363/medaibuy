### Filter组件使用

```javascript
const onChange = (data) => {} // filter改变时的事件
const getInstance = ref => this.ref = ref
 this.ref._reset() // 重置

// filter 选项配置
const dataSource = [
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
      }, {
        cell: 2,
        label: 'Marketing Objective',
        type: 'radio',
        field: 'ID2',
        option: [
          { value: '1', name: 'test1' },
          { value: '2', name: 'test2' }
        ]
      }, {
        cell: 1,
        label: 'Ads Format',
        type: 'checkbox',
        field: 'ID3',
        option: [
          { value: '1', name: 'test1' },
          { value: '2', name: 'test2' },
          { value: '3', name: 'test3' },
          { value: '4', name: 'test4' }
        ]
      }, {
        cell: 1,
        field: 'date',
        label: 'Datepick',
        type: 'datePicker',
        cb: v => v && v.join(','),
        option: [
          { value: 1, name: '最近一个月', type: 'month' },
          { value: 3, name: '最近三个月', type: 'month' },
          { value: 6, name: '最近六个月', type: 'month' }
        ]
      }, {
        combine: true,
        cell: 1,
        label: 'Premium Search',
        option: [
          {
            field: 'language',
            label: 'Language',
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
          }
        ]
      }
    ]
```