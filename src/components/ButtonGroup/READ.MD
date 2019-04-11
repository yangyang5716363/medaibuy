
### ButtonGroup

```javascript
function onButtonClick (record) {

}

    const buttonOps: {
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
    }

    <ButtonGroup 
      { ...buttonOps } 
      onButtonClick={ onButtonClick } 
    />
```