### CardHeader

```javascript
function select (record) {

}
function more (record) {

}
function button (record) {

}

    const CardHeaderConfig = {
      title: 'Offer Analysis',
      style: {
        'fontSize': '12px',
        'height': '45px',
      },
      tipsOps: {
        text: 'prompt text',
      },
      // button 列表
      buttonOps: {
        data: [
          {
            key: 0,
            value: '左侧',
            // 默认是否选中
            active: true
          },
          {
            key: 1,
            value: '中间',
            active: false
          },
          {
            key: 2,
            value: '中间',
            active: false
          },
          {
            key: 3,
            value: '中间',
            active: false
          },
          {
            key: 4,
            value: '右侧',
            active: false
          }
        ]
      },
      selectOps: {
        // 默认值
        copywriting: 'all',
        data: [
          {
            key: 0,
            value: '列表1'
          },
          {
            key: 1,
            value: '列表2'
          },
          {
            key: 2,
            value: '列表3'
          }
        ]
      },

      links: {
        text: '我是链接',
        style: {
          fontSize: '12px'
        }
      }
    }

    <CardHeader 
      option={ CardHeaderConfig }
      onSelectClick={ select }
      onMoreClick={ more }
      onButtonClick={ button }
    />
```